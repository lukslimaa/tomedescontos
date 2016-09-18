var gulp = require('gulp');
var ts = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

var tsProject = ts.createProject({
	// todo
});

gulp.task('compress', function() {
  var tsResults = gulp.src('src/app/**/*.ts')
	                    .pipe(sourcemaps.init())
	                    .pipe(ts(tsProject));
  return tsResults.js.pipe(uglify()).pipe(sourcemaps.write())
    .pipe(concat('tomedescontos.js')).pipe(gulp.dest('WebContent/www/app'));
});

gulp.task('scripts', function() {
	var tsResults = gulp.src('src/app/**/*.ts')
	                    .pipe(sourcemaps.init())
	                    .pipe(ts(tsProject));
    
	return tsResults.js
	                .pipe(sourcemaps.write())
	                .pipe(gulp.dest('WebContent/www/app'));
});

gulp.task('lib', function() {
	return gulp.src('bower_components/angular/angular.min.js')
	           .pipe(concat('lib.js'))
			   .pipe(gulp.dest('www/assets/js'));
});

gulp.task('templates', function() {
	return gulp.src('src/app/**/*.tpl.html')
			   .pipe(gulp.dest('www/assets/pages/templates'));
});

gulp.task('watch', ['scripts'], function() {
	gulp.watch('src/app/**/*.ts', ['scripts']);
});