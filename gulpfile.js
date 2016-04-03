/*eslint-env node */
require('babel-core/register')();

var gulp = require('gulp'),
	nodemon = require('gulp-nodemon'),
	pack = require('./package');

require('./build/main');

gulp.task('watch:test', function () {
	gulp.watch(['server/**/*.js', 'server/**/*.jsx'], ['test']);
});

gulp.task('watch:server', function () {
	return nodemon({
		script: pack.main,
		watch: ['server', 'server.js', 'common'],
		env: process.env
	})
});

gulp.task('watch', ['watch:server', 'watch:app']);

gulp.task('default', ['watch']);
