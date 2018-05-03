var gulp = require('gulp');
var include = require('gulp-html-include');

gulp.task('include',function(){
    return gulp.src('index.html')
    .pipe(include())
    .pipe(gulp.dest('dist'));
});