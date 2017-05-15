const gulp = require('gulp');
const gutil = require('gulp-util');
const cssmin = require('gulp-cssmin')
const rename = require('gulp-rename');

gulp.task('default', ()=>{
    gulp.src('public/stylesheets/*.css')
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('public/stylesheets'));
});