import _ from 'lodash';
import glob from 'glob';
import path from 'path';
import config from '../config';
import {MissingParameterError, MissingIDError} from './errors';


export function globMap(globPath, callback) {
	return _.map(glob.sync(globPath), function (appPath) {
		var paths = {
			file: path.resolve(appPath).split(path.sep).pop().split('.')[0],
			full: path.resolve(appPath),
			dir: path.dirname(path.resolve(appPath)).split(path.sep).pop()
		};
		return callback(paths);
	});
}

export function globReduce(globPath, callback) {
	return _.reduce(glob.sync(globPath), function (map, appPath) {
		var paths = {
			file: path.resolve(appPath).split(path.sep).pop().split('.')[0],
			full: path.resolve(appPath),
			dir: path.dirname(path.resolve(appPath)).split(path.sep).pop()
		};
		return callback(map, paths);
	}, {});
}

export function ensurePostData(...data) {
	return (req, res, next) => {
		if (_(data).every(param => {
				if (!_.isUndefined(req.body[param]) && !_.isNull(req.body[param]))
					return true;
				else
					return next(new MissingParameterError(param)) && false;
			}))
			next();
	}
}

export function ensureParamData(...data) {
	return (req, res, next) => {
		if (_(data).every(param => {
				if (!_.isUndefined(req.params[param]) && !_.isNull(req.params[param]))
					return true;
				else
					return next(new MissingParameterError(param)) && false;
			}))
			next();
	}
}

export function ensureParamID() {
	return (req, res, next) => {
		if (!_.isFinite(Number(req.params.id)))
			return next(new MissingIDError());
		req.params.id = Number(req.params.id);
		next();
	}
}
