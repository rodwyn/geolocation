var gulp = require('gulp');
var jade = require('gulp-jade');
var stylus = require('gulp-stylus');
var browserify = require('browserify');
var source = require('vinyl-source-stream');

gulp.task('js', function () {

	browserify('./src/js/main.js')
		.bundle()
		.pipe(source('bundle.js'))
		.pipe(gulp.dest('./build/js'));

});

gulp.task('jade', function () {

	gulp.src('./src/jade/**/*.jade')
		.pipe(jade())
		.pipe(gulp.dest('./build/html/'));

});

gulp.task('php', function () {

	gulp.src('./src/php/**/*.php')
		.pipe(gulp.dest('./build/php/'));

});

gulp.task('styl', function () {

	gulp.src('./src/styl/**/*.styl')
		.pipe(stylus())
		.pipe(gulp.dest('./build/css/'));

});

gulp.task('build', ['js', 'jade', 'styl', 'php'], function () {});

gulp.task('watch', function () {

	gulp.watch('./src/js/**/*.js', ['js']);
	gulp.watch('./src/jade/**/*.jade', ['jade']);
	gulp.watch('./src/styl/**/*.styl', ['styl']);
	gulp.watch('./src/php/**/*.php', ['php']);

});