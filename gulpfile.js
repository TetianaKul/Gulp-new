var gulp = require('gulp');
var csso = require('gulp-csso'),
    includer = require('gulp-htmlincluder'),
    connect = require('gulp-connect');

//создаю задачу по запуску сервера
gulp.task('connect', function() {
  connect.server({
    root: 'build',
    livereload: true
  });
});

gulp.task('htmlIncluder', function() {
    gulp.src('dev/**/*.html')
    	.pipe(includer())
        .pipe(gulp.dest('build/'))
        .pipe(connect.reload()); //после выполнения задачи перезапустить сервер
});


gulp.task('mincss', function () {
    return gulp.src('dev/css/*.css')
        .pipe(csso())
        .pipe(gulp.dest('build/css/'))
        .pipe(connect.reload()); //после выполнения задачи перезапустить сервер
});

var htmlmin = require('gulp-html-minifier2');
 
gulp.task('minhtml', function() {
  gulp.src('dev/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('build/'))
    .pipe(connect.reload());
});

gulp.task('move', function() {
  gulp.src('dev/img/**/*.*')
    .pipe(gulp.dest('build/img/'))
    .pipe(connect.reload()); //после выполнения задачи перезапустить сервер
   gulp.src('dev/js/**/*.*')
    .pipe(gulp.dest('build/js/'))
    .pipe(connect.reload()); //после выполнения задачи перезапустить сервер
});

//добавляю наблюдателя за файлами
gulp.task('watch', function () {
  gulp.watch(['dev/**/*.html'], ['htmlIncluder']);
  gulp.watch(['dev/img/**/*.*'], ['move']);
  gulp.watch(['dev/js/**/*.*'], ['move']);
}); //при изменении html запускаю htmlIncluder

gulp.task('default', ['connect', 'watch', 'htmlIncluder', 'mincss', 'move']);  //задача для команды "gulp", которая запустит сервер и запустит наблюдателя