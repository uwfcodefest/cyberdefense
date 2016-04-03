/*eslint-env node*/
/**
 * This module defines a set of common CRUD routes that operate on Mongoose models
 */
	
import errorHandler from './errors';
import _ from 'lodash';
import express from 'express';
import _debug from 'debug';
import mongoose from 'mongoose';

let debug = _debug('app:lib'),
	methods = ['list', 'read', 'create', 'update', 'destroy', 'emptyDB'];

/**
 * Export a function to attach CRUD endpoints to the given model.
 *
 * @param model
 * @param middleware
 * @param hooks
 * @returns {*}
 */
export default function (model, middleware, hooks) {
	if (arguments.length == 2)
		hooks = middleware;

	// Create the micro-app
	let app = express.Router();

	// Attach middleware
	if (_.isArray(middleware))
		_.map(middleware, fn => app.use(fn));
	else if (_.isFunction(middleware))
		app.use(middleware);

	// Attach the CRUD interface
	return CRUD(app, model, buildHookMap(hooks));
};

/**
 *  Returns an object with a REST-ful API attached
 *
 * @param app
 * @param model
 * @param hooks
 * @returns {{list: Function, read: Function, create: Function, update: Function, destroy: Function}}
 */
function CRUD(app, model, hooks) {
	app.route('/')
		.get(list(model, hooks.list))
		.post(create(model, hooks.create))
		.delete(emptyDB(model, hooks.emptyDB));
	
	app.route('/:id')
		.get(read(model, hooks.read))
		.post(update(model, hooks.update))
		.delete(destroy(model, hooks.destroy));
	
	return app;
}

/**
 * Returns an object with middleware hooks for each CRUD endpoint.
 *
 * @param hooks
 * @returns {*}
 */
function buildHookMap(hooks) {
	return _.reduce(_methods, (map, action) => {
		if (hooks && _.isPlainObject(hooks[action])) {
			map[action] = _.merge({
				pre: [],
				post: []
			}, hooks[action])
		}
		else if (hooks && _.isFunction(hooks[action])) {
			map[action] = {
				pre: hooks[action],
				post: []
			}
		}
		else
			map[action] = {
				pre: [],
				post: []
			};
		return map;
	}, {});
}

/**
 * Returns a function that will respond to requests with a list of all the documents
 * defined by the given model.
 *
 * @param model
 * @returns {Function}
 * @param hook
 */
function list(model, hook) {
	
	return function list(req, res, next) {
		debug("Got list request", req.method, req.baseUrl + req.path);
		hook.pre(req, res, function (err, ops) {
			if (err)
				return next(err);

			model.findAll(ops || {}, errorHandler.saveCB(next, (docs) => {
				hook.post(docs, req, res, (err) => {
					if (err)
						return next(err);

					res.json(_.map(docs, (doc) => {
						return ModelToObj(doc);
					}))
				})
			}));
			
		})
	}
	
}

/**
 * Returns a function that will respond to requests with a single document identified by
 * the _id parameter
 *
 * @param model
 * @returns {Function}
 * @param hook
 */
function read(model, hook) {
	
	return function read(req, res, next) {
		debug("Got read request", req.method, req.baseUrl + req.path);
		hook.pre(req, res, function (err) {
			if (err)
				return next(err);

			model.read(req.params.id, errorHandler.saveCB(next, function (doc) {
				hook.post(doc, req, res, function (err) {
					if (err)
						return next(err);

					res.json(ModelToObj(doc));
				})
			}))
			
		})
	}
	
}

/**
 * Returns a function which creates the given model from POST data in the request.
 *
 * @param model
 * @returns {Function}
 * @param hook
 */
function create(model, hook) {
	return function create(req, res, next) {
		debug("Got create request", req.method, req.baseUrl + req.path);
		hook.pre(req, res, function (err) {
			if (err)
				return next(err);

			// Save the new model
			model.save(req.body, errorHandler.saveCB(next, function (doc) {
				hook.post(doc, req, res, function (err) {
					if (err)
						return next(err);

					res.json(ModelToObj(doc));
				})
			}))
		})
	}
}

/**
 * Returns a function which updates a document with the POST data in the request. The
 * document's _id must be sent along with the POST data or the request will be rejected.
 *
 * @param model
 * @param hook
 */
function update(model, hook) {
	return function update(req, res, next) {
		debug("Got update request", req.method, req.baseUrl + req.path);
		hook.pre(req, res, function (err) {
			if (err)
				return next(err);

			model.read(req.params.id, errorHandler.saveCB(res, function (doc) {
				// Update the model
				_.merge(doc, req.body, function (a, b) {
					if ((_.isArray(a) && _.isArray(b)) || (_.isPlainObject(a) && _.isPlainObject(b)))
						return b;
				});

				// Validate and save the new model data
				model.save(doc, errorHandler.saveCB(next, function () {
					hook.post(doc, req, res, function (err) {
						if (err)
							return next(err);

						res.json(ModelToObj(doc));
					})
				}))
				
			}))
		})
	}
}

/**
 * Returns a function which removes a document given by the _id POST parameter.
 *
 * @param model
 * @param hook
 */
function destroy(model, hook) {
	return function destroy(req, res, next) {
		debug("Got destroy request", req.method, req.baseUrl + req.path);
		hook.pre(req, res, function (err) {
			if (err)
				return next(err);

			model.findById(req.params.id, errorHandler.saveCB(next, function (doc) {
				model.remove({_id: req.params.id}, errorHandler.saveCB(next, function () {

					hook.post(doc, req, res, function (err) {
						if (err)
							return next(err);

						res.sendStatus(200);
					})
				}))
			}))
		})
	}
}

/**
 * Returns a function that empties a collection
 *
 * @param model
 * @param hook
 * @returns {Function}
 */
function emptyDB(model, hook) {
	return function (req, res, next) {
		debug("Got emptyDB request", req.method, req.baseUrl + req.path);
		hook.pre(req, res, function (err) {
			if (err)
				return next(err);

			mongoose.connection.db.dropCollection(model.collection.name, function (err) {
				if (err)
					return next(err);

				hook.post(req, res, function (err) {
					if (err)
						return next(err);

					res.sendStatus(200);
				})
			})
		})
	}
}

/**
 * Turns the given model into a plain object. Will call the exportData() fn on
 * the model if the fn exists.
 *
 * @param model
 * @returns {Array|Object|*}
 * @constructor
 */
function ModelToObj(model) {
	return model;
}
