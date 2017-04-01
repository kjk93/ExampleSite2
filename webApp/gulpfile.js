const gulp = require('gulp');
const sass = require('gulp-sass');

gulp.task('sass', function(){
  return gulp.src('src/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('src/.'));
});

gulp.task('sass:watch', ['sass'], function(){
  gulp.watch('src/**/*.scss', 'sass');
});