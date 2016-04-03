/*eslint-env node */
var gulp = require('gulp'),
	plugins = require('gulp-load-plugins')({
		pattern: ['gulp-*', 'gulp.*', 'node-*']
	}),
	_ = require('lodash'),
	browserify = require('browserify'),
	source = require('vinyl-source-stream'),
	buffer = require('vinyl-buffer'),
	utils = require('./utils'),
	pack = require('../package'),
	path = require('path'),
	fse = require('fs-extra'),
	q = require('q');

module.exports = {
	vendorCSS: vendorCSS, 
	vendorJS: vendorJS, 
	vendorMisc: vendorMisc
};
gulp.task('vendor', ['vendorJS', 'vendorCSS', 'vendorMisc']);
gulp.task('vendorMisc', vendorMisc);
gulp.task('vendorCSS', vendorCSS);
gulp.task('vendorJS', vendorJS);

function vendorJS(cb) {
	var b = browserify({
		debug: process.env.NODE_ENV != 'production'
	})
		.on('error', utils.onErr);
	
	var deps = pack.paths.src.vendor.deps
		.concat(pack.paths.src.vendor.libs);
	
	_.map(deps, function (id) {
		b.require(id);
	});
	
	var stream = b.bundle()
		.pipe(source(pack.paths.dist.vendor.js.file));
	
	if (process.env.NODE_ENV == 'production' || process.env.MINIFY == 'true')
		stream = stream
			.pipe(buffer())
			.pipe(plugins.uglify());
	
	return stream.pipe(gulp.dest(pack.paths.dist.vendor.js.dir))
		.on('end', utils.onEnd('VendorJS Bundled!', 'green'));
}

function vendorCSS(cb) {
	var replace = {
		'/assets/fonts': /(themes\/default\/assets\/fonts)/g // Replace path to semantic font-icons
	};
	
	return gulp.src(pack.paths.src.vendor.css)
		.pipe(plugins.tap(function (file) {
			// For each CSS file
			file.contents = new Buffer( // Replace file contents
				_.reduce(replace, function (file, regex, str) { // Perform successive iterations on file contents
					return file.replace(regex, str); // Replace any string in file contents matched by regex 
				}, file.contents.toString()) // Need to use string instead of buffer
			);
		}))
		.pipe(plugins.concat(pack.paths.dist.vendor.css.file))
		.pipe(plugins.bytediff.start())
		.pipe(plugins.minifyCss())
		.pipe(plugins.bytediff.stop())
		.pipe(gulp.dest(pack.paths.dist.vendor.css.dir))
		.on('end', () => {
			utils.onEnd('Vendor SCSS compiled!')();
			cb();
		})
}

function vendorMisc(cb) {
	q.nfcall(
		fse.copy,
		path.resolve(pack.paths.src.vendor.fonts), 
		path.resolve(pack.paths.dist.vendor.fonts))
			.then(
				() => {
					cb();
				}, 
				err => console.error(err));
}
