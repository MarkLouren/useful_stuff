**cheatsheet**
https://devhints.io/sass

**instalation**
in your local directory:
 npm init
 npm i --save-dev gulp gulp-sass
 
-create file:
gulpfile.js  
add code (For version gulp 4)
```
let gulp = require('gulp'), // Подключаем Gulp
    sass = require('gulp-sass'); // Подключаем Sass пакет

gulp.task('sass', function() { // Создаем таск "sass"
    return gulp.src(['sass/**/*.sass', 'sass/**/*.scss']) // Берем источник
        .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError)) // Преобразуем Sass в CSS посредством gulp-sass
        .pipe(gulp.dest('css')) // Выгружаем результата в папку css
});

gulp.task('watch', function() {
    gulp.watch(['sass/**/*.sass', 'sass/**/*.scss'], gulp.parallel('sass')); // Наблюдение за sass файлами в папке sass
});

gulp.task('default', gulp.parallel('watch'));

```
 
import
```
@import "media.sass";
@import "media.scss";
@import "meida"; // import css
@import "foo" screen;
@import "https//foo.com/bar";
```
