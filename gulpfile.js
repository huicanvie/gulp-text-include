var gulp = require('gulp');
var include = require('gulp-html-include');

gulp.task('include',function(){
    return gulp.src('demo/index.html')
    .pipe(include())
    .pipe(gulp.dest('demo/dist'));
});