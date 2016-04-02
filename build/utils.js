/*eslint-env node */
var notify = require('node-notifier'),
	_ = require('lodash'),
	config = require('../server/config'),
	chalk = require('chalk'),
	spawn = require('child_process').spawn,
	q = require('q');

var Utils = module.exports = {};


Utils.notify = function (msg) {
	notify.notify({
		title: config.app.title || 'Notification',
		message: msg
	});
};

Utils.onEnd = function (msg, color) {
	return function () {
		if (!color)
			console.log(msg);
		else
			console.log(chalk[color](msg));
		Utils.notify(msg);
	}
};

Utils.onErr = function (err) {
	if (err) {
		console.log(chalk.red(err.toString()));
		if (this.emit)
			this.emit('end');
	}
};

Utils.spawnCmd = function (task) {
	return q.promise(function (resolve, reject) {
		spawn(task.cmd, task.args, _.merge({}, {
			stdio: 'inherit',
			cwd: process.cwd()
		}, task.ops || {}))
			.on('error', function (err) {
				console.log(err);
				reject(err);
			})
			.on('exit', resolve);
	})
};
