var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var plumber = require('gulp-plumber');


var IMG_ENTRY_POINT = './assets/images/**/*';
var IMG_OUT_POINT = './build/images/';
var STYLE_ENTRY_POINT = './assets/styles/*.scss';
var STYLE_OUT_POINT = './build/styles/';
var SCRIPT_ENTRY_POINT = './assets/scripts/*.js';
var SCRIPT_OUT_POINT = './build/scripts';

gulp.task('img', function() {
  gulp.src(IMG_ENTRY_POINT)
  .pipe(imagemin())
  .pipe(gulp.dest(IMG_OUT_POINT));
});

gulp.task('init-theme-css', function(){
  gulp.src('./assets/styles/style.scss')
  .pipe(sass())
  .pipe(gulp.dest('./'));
});

gulp.task('sass', function() {
  gulp.src([STYLE_ENTRY_POINT,'!./assets/styles/style.scss'])
  .pipe(plumber())
  .pipe(sass({outputStyle: 'expanded'}))
  .pipe(gulp.dest(STYLE_OUT_POINT));
});

gulp.task('js', function() {
  gulp.src(SCRIPT_ENTRY_POINT)
  .pipe(plumber())
  .pipe(concat('script.min.js'))
  .pipe(uglify())
  .pipe(gulp.dest(SCRIPT_OUT_POINT));
});

gulp.task('watch', function() {
  gulp.watch(SCRIPT_ENTRY_POINT, ['js']);
  gulp.watch(STYLE_ENTRY_POINT, ['sass']);
  gulp.watch(IMG_ENTRY_POINT, ['img']);
});

gulp.task('start', ['img', 'sass', 'js', 'watch', 'init-theme-css']);
