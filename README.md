## This is a component that can import into any html file
###
```
--/dist
--/components
  --components1.html
--index.html
  gulpfile.js

```
```
gulpfile.js

var gulpHtmlImport = require('gulp-text-include')

gulp.task('include',function(){
    return gulp.src('index.html')
    .pipe(include())
    .pipe(gulp.dest('dist'));
});
```
```
index.html

<include src="components/components1.html">
<include src="components/components1.html"></include>
```
