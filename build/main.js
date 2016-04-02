/*eslint-env node */
var gulp = require('gulp'),
	fs = require('fs'),
	chalk = require('chalk'),
	argv = require('yargs').argv,
	pack = require('../package'),
	path = require('path'),
	spawn = require('child_process').spawn,
	async = require('async'),
	q = require('q'),
	semver = require('semver'),
	rimraf = require('rimraf'),
	config = require('../server/config');

var app = require('./app');
var vendor = require('./vendor');

gulp.task('deploy', deploy);
gulp.task('buildImage', buildImage);
gulp.task('transfer', transfer);
gulp.task('launch', launch);
gulp.task('hashPassword', hashPassword);

gulp.task('clean', clean);
gulp.task('bump', bump);

gulp.task('build', function (cb) {
	async.series([
		clean,
		async.parallel.bind(async, [
			app.appJS,
			app.appSCSS,
			vendor.vendorCSS,
			vendor.vendorJS,
			vendor.vendorMisc
		])
	], cb);
});

function clean(cb) {
	q.all([
			q.nfcall(rimraf, 'assets/css'),
			q.nfcall(rimraf, 'assets/js'),
			q.nfcall(rimraf, 'assets/fonts'),
			q.nfcall(rimraf, 'assets/index.html')
		])
		.then(() => cb())
}

function bump() {
	var bumpType = 'patch';
	
	if (!semver.valid(pack.version)) {
		console.log(chalk.red('Bump error: Package version is invalid!'));
		return;
	}
	
	if (argv.minor)
		bumpType = 'minor';
	else if (argv.major)
		bumpType = 'major';
	
	pack.version = semver.inc(pack.version, bumpType);
	
	fs.writeFileSync('./package.json', JSON.stringify(pack, null, 2));
	
	console.log(chalk.green('Bumped to', pack.version));
}

function deploy(cb) {
	console.log(chalk.green('Deploying version', pack.version));
	spawn('./build/deploy.sh', [pack.namespace, pack.version, pack.dockerArgs], {
		stdio: 'inherit'
	})
		.on('error', function (err) {
			console.error(err);
			cb(err);
		})
		.on('exit', function () {
			console.log(chalk.green(`Deployment of version ${pack.version} successful!`));
			cb();
		})
}

function buildImage(cb) {
	console.log(chalk.green('Building version', pack.version));
	spawn('./build/build.sh', [pack.namespace, pack.version], {
		stdio: 'inherit'
	})
		.on('error', function (err) {
			console.error(err);
			cb(err);
		})
		.on('exit', function () {
			console.log(chalk.green('Build successful!'));
			cb();
		})
}

function transfer(cb) {
	spawn('./build/transfer.sh', [pack.namespace, `${pack.namespace}/web:${argv.latest ? 'latest' : pack.version}`], {
		stdio: 'inherit'
	})
		.on('error', function (err) {
			console.error(err);
			cb(err);
		})
		.on('exit', cb)
}

function launch(cb) {
	spawn('./build/launch.sh', [pack.namespace, `${pack.namespace}/web:${argv.version ? argv.version : 'latest'}`, `${pack.namespace}_web`, pack.dockerArgs], {
		stdio: 'inherit'
	})
		.on('error', function (err) {
			console.error(err);
			cb(err);
		})
		.on('exit', cb)
}

function hashPassword(cb) {
	var bcrypt = require('bcrypt');
	
	const pass = argv.pass;
	
	bcrypt.genSalt(config.auth.saltWorkFactor, (err, salt) => {
		if (err) return console.error(err);
		
		// hash the password using our new salt
		bcrypt.hash(pass, salt, (err, hash) => {
			if (err) return console.error(err);
			
			// override the cleartext password with the hashed one
			console.log(`Hash(${pass}) = ${hash}`);
			cb()
		})
	})
}
