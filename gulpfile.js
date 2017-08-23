/*
 *
 * Определяем переменные
 *
 */

var gulp = require('gulp'), // Сообственно Gulp JS
    uglify = require('gulp-uglify'), // Минификация JS
    concat = require('gulp-concat'), // Склейка файлов
    imagemin = require('gulp-imagemin'), // Минификация изображений
    csso = require('gulp-csso'), // Минификация CSS
    sass = require('gulp-sass'); // Конверстация SASS (SCSS) в CSS
connect = require('gulp-connect');// локальный веб сервер //


/*
 *
 * Создаем задачи (таски)
 *
 */

// Задача "styles". Запускается командой "gulp styles"
gulp.task('sass', function () {
    gulp.src('./app/styles/*.scss') // файл, который обрабатываем
        .pipe(sass().on('error', sass.logError)) // конвертируем styles в css
        .pipe(csso()) // минифицируем css, полученный на предыдущем шаге
        .pipe(gulp.dest('dist/css')) // результат пишем по указанному адресу
        .pipe(connect.reload());

});


// Задача "assets". Запускается командой "gulp assets"
gulp.task('assets', function() {
    return gulp.src('./app/assets/**/*')
        .pipe(gulp.dest('dist/assets'))
        .pipe(connect.reload());

});
// Задача "css".
gulp.task('css', function () {
    return gulp.src('./app/css/*.сss')
        .pipe(gulp.dest('dist/css'))
        .pipe(connect.reload());

});

// Задача "js". Запускается командой "gulp js"
gulp.task('js', function() {
    // return gulp.src('dist/assets/js/**/*')
    //     .pipe(gulp.dest('app/js'))
    //     .pipe(connect.reload());

    return gulp.src('./app/js/*.js')
        .pipe(gulp.dest('dist/js'))
        .pipe(connect.reload());

});
// Задача "img". Запускается командой "gulp img"
gulp.task('images', function() {
    gulp.src('./app/img/**/*') // берем любые файлы в папке и ее подпапках
        .pipe(imagemin()) // оптимизируем изображения для веба
        .pipe(gulp.dest('./dist/img/')) // результат пишем по указанному адресу
        .pipe(connect.reload());
});

gulp.task('html', function () {
    gulp.src('app/**/*.html')
        .pipe(connect.reload());
});
gulp.task('connect', function() {
    connect.server({
        root: "dist",
        port: 8888,
        livereload: true
    });
});

gulp.task('templates', function() {
    return gulp
        .src('app/**/*.html')
        .pipe(gulp.dest('dist'));
});

gulp.task('fonts', function() {
    return gulp
        .src('app/fonts/**/*')
        .pipe(gulp.dest('./dist/fonts/'));
});

gulp.task('json', function() {
    return gulp
        .src('app/json/*')
        .pipe(gulp.dest('dist/json'))
        .pipe(connect.reload());
});

// Задача "watch". Запускается командой "gulp watch"
// Она следит за изменениями файлов и автоматически запускает другие задачи
gulp.task('watch', function () {

    // При изменении assets и подпапках запускаем задачу assets
    gulp.watch('./app/assets', ['assets']);

    // При изменение файлов *.scss в папке "styles" и подпапках запускаем задачу styles
    gulp.watch('./app/styles/**/*.scss', ['sass']);

    // При изменение файлов *.css папке "css" и подпапках запускаем задачу js
    gulp.watch('./app/css/**/*.css', ['css']);

    // При изменение файлов *.js папке "js" и подпапках запускаем задачу js
    gulp.watch('./app/js/**/*.js', ['js']);
    // При изменение любых файлов в папке "img" и подпапках запускаем задачу img
    gulp.watch('./app/img/**/*', ['images']);
    // Отслеживаем изменения страниц
    gulp.watch(['./app/**/*.html'], ['html']);
    gulp.watch(['./app/**/*.html'], ['templates']);
    gulp.watch(['./app/json/**/*.json'], ['json']);

});



gulp.task('default', ['connect', 'watch', 'images', 'assets', 'css', 'js', 'templates', 'fonts', 'sass', 'html', 'json']);
