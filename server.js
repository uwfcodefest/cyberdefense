/*eslint-env node*/
require('babel-core/register')();

var chalk = require('chalk');
var	config = require('./server/config');
var	debug = require('debug')('app:server');
var fs = require('fs');
var util = require('util');

// Write PID to file
fs.writeFile('server.pid', process.pid, (err) => {
	if (err)
		console.error('Error writing PID file!')
});

/**
 * App Setup
 */

var app = module.exports = require('./server/app.js')();

app.ready
	.then(() => {
		if (config.interface)
			app.listen(config.port, config.interface, onListen);
		else
			app.listen(config.port, onListen);
	});

function onListen() {
	debug(`${chalk.green(config.app.title)} listening on port ${chalk.green(config.port)} in ${chalk.green(process.env.NODE_ENV || 'development')} mode`);
}

function shutdown() {
	debug("Received kill signal, shutting down gracefully.");
	app.close(function () {
		debug("Closed out remaining connections.");
		process.exit()
	});
	
	// if after 
	setTimeout(function () {
		debug("Could not close connections in time, forcefully shutting down");
		process.exit()
	}, 10 * 1000);
}

process.on('uncaughtException', function(err) {
	console.error(chalk.red('Caught unhandled exception!'));
	console.error(err);
	throw err;
});

/**
 * Signal handling
 */

process.on('SIGINT', () => {
	debug('Got SIGINT');
	process.exit(0);
});

// SIGUSR2 is used by nodemon to restart the app, only bind in production
if (process.env.NODE_ENV == 'production')
	process.on('SIGUSR2', () => {
		debug('Got SIGUSR2, shutting down gracefully!');
		shutdown();
	});

process.on('SIGPIPE', () => {
	debug('Got SIGPIPE');

	console.log(util.inspect(process.memoryUsage()));
});

