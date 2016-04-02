/*eslint-env node*/
'use strict';

import _ from 'lodash';
import debug from 'debug';
import q from 'q';
import seraph from 'seraph';
import seraphModel from 'seraph-model';
import express from 'express';
import request from 'request';

import {ValidationError, wrap} from './libs/errors';
import {ensureParamID} from './libs/utils';

/**
 *
 * DB Module Setup
 *
 */

let dbg = debug('app:db'),
	dbgCrud = debug('app:crud');

export default class DB {
	static _connection = q.defer();
	static connected = DB._connection.promise;
	static models = [];
	static connect = (ops = {uri: 'db:9099'}) => {
		// Skip connecting if we are already connected
		if (q.isFulfilled(DB.connected))
			return dbg('Already connected to DB') || DB.connected;

		if (!_.isObject(ops))
			ops = {uri: ops}; // Allow uri to be passed in instead of ops object

		dbg(`Connecting to DB: ${ops.uri}`);
		return DB.ping(ops.uri)
			.then(
				() => dbg(`DB connection established!`) || DB._connection.resolve(seraph(ops.uri)),
				() => dbg(`DB connection failed!`) || DB._connection.reject()
			)
	};
	/**
	 * Sends a request to the provided uri to probe if it is currently up. Returns a Promise that is resolved if a 200
	 * response is received and rejected otherwise
	 * @param uri
	 * @returns {Promise}
	 */
	static ping = (uri) => {
		return q.Promise((resolve, reject) => {
			request(uri, (err, res, body) => {
				if (err || res.statusCode != 200)
					return reject(err ? err.toString() : res.statusCode);
				resolve()
			})
		})
	};
	static registerSchema = (schema, label) => {
		q.Promise((resolve, reject) => {
			DB.connected.then(db => {
				dbg(`Registering new Schema: ${label}`);

				// Create seraph model instance and attach to schema
				let model = seraphModel(db, label);
				schema.model = model;
				schema.DB = DB;
				model.type = schema.type;

				DB.models.push({model, schema, label});

				resolve(schema);
			}, reject)
		});

		return schema;
	};
	static api = {
		neo4j: function (schema) {
			this.schema = schema;

			this.list = () =>
				q.ninvoke(schema.model, 'findAll')
					.then(models => _.map(models, model => schema.toJSON(model, schema.blacklist)));

			this.create = (data) =>
				new schema(data).validate(schema.validationSettings.create)
					.then(
						() => q.ninvoke(schema.model, 'save', data),
						err => q.reject(new ValidationError(err))
					)
					.then(model => schema.toJSON(model, schema.blacklist));

			this.read = (id, ops = {raw: false}) =>
				q.ninvoke(schema.model, 'read', id)
					.then(model => ops.raw ? model : schema.toJSON(model, schema.blacklist));

			this.update = (id, data) =>
				this.read(id, {raw: true})
					.then(result => {
						return this.create(_.assign(result, data));
					});

			this.destroy = (id) =>
				q.ninvoke(schema.model, 'delete', id);

			this.destroyAll = () =>
				q.Promise((resolve, reject) => {
					DB.connected.then(db =>
						db.queryRaw('MATCH (n) DETACH DELETE n', {}, err => {
							if (err)
								return reject(err);
							resolve();
						}))
				});

			return this;
		}
	};

	static CRUD(api) {
		return {
			list: (req, res, next) =>
			dbgCrud(`listing ${api.schema.type}s`) ||
			api.list()
				.done(::res.json, err => next(wrap(err))),

			create: (req, res, next) =>
			dbgCrud(`creating ${api.schema.type}`) ||
			api.create(req.body)
				.done(::res.json, err => next(wrap(err))),

			read: (req, res, next) =>
			dbgCrud(`reading ${api.schema.type}:${req.params.id}`) ||
			api.read(req.params.id)
				.done(::res.json, err => next(wrap(err))),

			update: (req, res, next) =>
			dbgCrud(`updating ${api.schema.type}:${req.params.id}`) ||
			api.update(req.params.id, req.body)
				.done(::res.json, err => next(wrap(err))),

			destroy: (req, res, next) =>
			dbgCrud(`deleting ${api.schema.type}:${req.params.id}`) ||
			api.destroy(req.params.id)
				.done(() => res.status(200).send(), err => next(wrap(err))),

			destroyAll: (req, res, next) =>
			dbgCrud(`deleting all ${api.schema.type}s`) ||
			api.destroyAll()
				.done(() => res.status(200).send(), err => next(wrap(err)))
		}
	};

	static CRUDEndpoint(schema) {
		let app = express.Router();
		let crud = DB.CRUD(DB.api.neo4j(schema));

		// Attach routes
		app.get('/', crud.list);
		app.post('/', crud.create);
		app.delete('/', crud.destroyAll);
		app.get('/:id', ensureParamID(), crud.read);
		app.put('/:id', ensureParamID(), crud.update);
		app.delete('/:id', ensureParamID(), crud.destroy);

		app.use((req, res, next) =>
			dbgCrud(`404`) || res.status(404).send()
		);

		return app;
	}
}
