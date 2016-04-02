/*eslint-env node */
var gulp = require('gulp'),
	plugins = require('gulp-load-plugins')({
		pattern: ['gulp-*', 'gulp.*', 'node-*']
	}),
	notifier = require('node-notifier'),
	browserify = require('browserify'),
	chalk = require('chalk'),
	watchify = require('watchify'),
	babelify = require('babelify'),
	source = require('vinyl-source-stream'),
	buffer = require('vinyl-buffer'),
	pack = require('../package'),
	utils = require('./utils'),
	fse = require('fs-extra'),
	path = require('path');

function makeBundle(cb) {
	return browserify({
		entries: [pack.paths.dist.app.js.entryPoint],
		extensions: ['.jsx'],
		transform: [babelify],
		debug: process.env.NODE_ENV != 'production',
		cache: {}, packageCache: {}, fullPaths: true
	})
		.external(pack.paths.src.vendor.deps.concat(pack.paths.src.vendor.libs))
		.on('error', utils.onErr)
		.on('end', () => cb ? cb() : null);
}

function appJS(cb) {
	fse.copy(path.resolve('public/index.html'), path.resolve('assets/index.html'), () => {
		bundleApp(makeBundle(cb))
	});
}

function watchAppJS() {
	var watcher = watchify(makeBundle());

	watcher
		.on('update', function () {
			bundleApp(watcher);
		})
		.on('error', utils.onErr);

	return bundleApp(watcher);
}

function bundleApp(b) {
	var bundle = b.bundle()
		.on('error', utils.onErr)
		.pipe(source(pack.paths.dist.app.js.file));

	if (process.env.NODE_ENV == 'production' || process.env.MINIFY == 'true')
		bundle = bundle
			.pipe(buffer())
			.pipe(plugins.uglify());

	return bundle
		.pipe(gulp.dest(pack.paths.dist.app.js.dir))
		.on('end', utils.onEnd('AppJS Bundled!', 'green'));
}

function appSCSS(cb) {
	gulp.src(pack.paths.src.app.scss)
		.pipe(plugins.concat(pack.paths.dist.app.css.file))
		.pipe(plugins.sass())
		.on('error', function (err) {
			console.log(err.toString());
			this.emit('end');
		})
		.pipe(plugins.bytediff.start())
		.pipe(plugins.minifyCss())
		.pipe(plugins.bytediff.stop())
		.pipe(gulp.dest(pack.paths.dist.app.css.dir))
		.on('end', () => {
			utils.onEnd('App SCSS compiled!')();
			cb();
		});
}

function appTest() {
	return gulp.src(pack.paths.src.app.test, {read: false})
		.pipe(plugins.mocha({
			reporter: 'mocha-unfunk-reporter',
			slow: 20
		}))
		.on('error', function (err) {
			notifier.notify({
				title: 'Mocha',
				message: err.message,
				sound: true
			});
			console.error(chalk.red(err.message));
			process.exit(0);
		});
}

gulp.task('appJS', appJS);
gulp.task('watchAppJS', watchAppJS);
gulp.task('appSCSS', appSCSS);
gulp.task('app', ['appJS', 'appSCSS']);
gulp.task('test', appTest);

gulp.task('watch:app', function () {
	gulp.watch([pack.paths.src.app.scss], ['appSCSS']);
	return watchAppJS();
});


module.exports = {
	appJS: appJS, 
	appSCSS: appSCSS
};
