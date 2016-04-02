/*eslint-env node*/
// TODO - remove config dep, use app.locals.config to access config data
var config = require('./config'),
	_ = require('lodash'),
	q = require('q'),
	debug = require('debug')('app:api');

var modules = require('./api/modules');

module.exports = function (app) {
	var basePath = config.api.path + '/';

	if (config.enable.api)
		return q.resolve().then(() => {
			app.locals.api = {};
			app.locals.apiPath = basePath;

			_.map(modules, function (module) {
				app.use(basePath + module.name, module.app());
				app.locals.api[module.name] = basePath + module.name;

				debug(`Initialized ${module.name}API...`);
			});

		}, err => debug(err));
	else
		return debug('API disabled!') || q.resolve();
};

