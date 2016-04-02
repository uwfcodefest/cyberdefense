/*eslint-env node*/
var path = require('path'),
	config = require('./config'),
	express = require('express'),
	q = require('q'),
	bodyParser = require('body-parser'),
	cookieParser = require('cookie-parser'),
	http = require('http'),
	_ = require('lodash'),
	debug = require('debug')('app:init'),
	errors = require('./libs/errors');

import DB from './db';
import {readToken} from './libs/auth';

module.exports = function () {
	var app = express();

	// Get rid of express header
	app.disable('x-powered-by');

	// Use IP address from HAProxy X-Forwarded-For header
	app.enable('trust proxy');

	app.db = DB;
	app.use((req, res, next) => {
		DB.connected.then(db => {
			req.db = db;
			next();
		}, () => next())
	});

	http.globalAgent.maxSockets = config.connectionPool;

	app.get('/*', (req, res, next) => {
		if (_.includes(req.get('Accept'), 'text/html'))
			req.url = '/';
		next();
	});

	// Serve app shell when root is requested
	app.get('/', (req, res, next) => {
		res.sendFile('/index.html', {root: config.dataDir}, err => {
			if (err) {
				console.log(err);
				res.status(err.status).end();
			}
		});
	});
	app.use('/assets', express.static(path.resolve(config.dataDir)));

	// Setup parsers
	app.use(bodyParser.json());

	app.use((err, req, res, next) => {
		res.status(400).send('Malformed Request');
	});

	app.use(cookieParser());
	app.use(readToken);

	app.use(bodyParser.urlencoded({
		extended: true
	}));
	
	app.ready = DB.connect(config.db)
		.then(
			db => debug('DB initialized') || (app.db = db),
			err => debug(err)
		)
		.then(
			() => require('./api.js')(app),
			err => debug(err)
		)
		.then(
			() => {
				debug('API initialized!');

				// Send 404 for any requests that don't match API or static routes
				app.use((req, res) => {
					res.status(404).send('Not Found');
				});

				// Error handling
				app.use(errors.catchAll);

				debug('Application initialized!');
			},
			err => debug(err)
		);

	return app;
};
