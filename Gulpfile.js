// Gulp reference point
var gulp = require('gulp');

// Plugins are referenced here
var sass = require('gulp-sass');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var gutil = require('gulp-util');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync');
var rename = require('gulp-rename');
var minifycss = require('gulp-minify-css');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

//Live Browser Reload
//baseDir
gulp.task('browser-sync', function() {
  browserSync({
      server: {
          baseDir: "./"
      }
  });
});

// Task Task
/** The styles task looks for any .scss files in the app/styles directory of your project  
* && preprocess them using sass and then saves the minified versions in the app/dist/styles dir
**/
//Run `gulp styles` to make gulp run the styles task and output the processed css
gulp.task('styles', function(){
  gulp.src(['app/styles/**/*.scss'])
    .pipe(sass())
    .on('error', gutil.log)
    .pipe(autoprefixer('last 2 versions'))
    .on('error', gutil.log)
    .pipe(gulp.dest('dist/styles/'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('dist/styles/'))
    .pipe(browserSync.reload({stream:true}))
});

// Image Task
gulp.task('images', function(){
  gulp.src('app/images/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('dist/images/'));
});

// JS Tasking
gulp.task('js', function(){
  return gulp.src('app/js/**/*.js')
    .pipe(concat('application.js'))
    .on('error', gutil.log)
    .pipe(gulp.dest('dist/js/'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .on('error', gutil.log)
    .pipe(gulp.dest('dist/js/'))
    .pipe(browserSync.reload({stream:true}))
});

gulp.task('bs-reload', function () {
  browserSync.reload();
});

gulp.task('default', ['browser-sync'], function () {
  gulp.watch("app/styles/**/*.scss", ['styles']);
  gulp.watch("app/js/**/*.js", ['js']);
  gulp.watch("*.html", ['bs-reload']);
});