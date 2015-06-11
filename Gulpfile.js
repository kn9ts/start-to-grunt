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

// Task Task
/** The styles task looks for any .scss files in the app/styles directory of your project  
* && preprocess them using sass and then saves the minified versions in the app/styles dir
**/

gulp.task('styles', function(){
  gulp.src(['app/styles/**/*.scss'])
    .pipe(sass())
    .on('error', gutil.log)
    .pipe(autoprefixer('last 2 versions'))
    .on('error', gutil.log)
    .pipe(gulp.dest('app/styles/'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('app/styles/'))
});

//Run `gulp styles` to make gulp run the styles task and output the processed css


// Images optimization & compiling
gulp.task('images', function(){
	...
});
    
    