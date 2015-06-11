// Gulp reference point
var gulp = require('gulp');

// Plugins are referenced here
var sass = require('gulp-sass');
var imagemin = require('gulp-imagemin');
var gutil = require('gulp-util');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var rename = require('gulp-rename');
var minifycss = require('gulp-minify-css');

// CSS Task
gulp.task('styles', function(){
  gulp.src(['src/styles/**/*.scss'])
    .pipe(sass())
    .on('error', gutil.log)
    .pipe(autoprefixer('last 2 versions'))
    .on('error', gutil.log)
    .pipe(gulp.dest('dist/styles/'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('dist/styles/'))
});

// Images optimization
gulp.task('images', function(){
	...
});
    
    