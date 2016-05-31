var gulp = require('gulp'),
    sass = require('gulp-sass'),
    prefix = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    livereload = require('gulp-livereload');
    
// ==================================================

gulp.task('style', function() {
    return gulp.src('./assets/src/scss/style.scss')
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(prefix({
            browsers: ['last 2 versions']
        }))
        .pipe(gulp.dest('./assets'))
        .pipe(livereload());
});

// ==================================================

gulp.task('scripts', function() {
    return gulp.src(['./assets/src/js/plugins/*.js', './assets/src/js/custom.js'])
        .pipe(concat('scripts.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./assets'))
        .pipe(livereload());
});

// ==================================================

gulp.task('imagemin', function() {
    return gulp.src('./assets/src/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./assets/img'));
});

// ==================================================

gulp.task('watch', function() {
    livereload.listen();
    gulp.watch('./assets/src/scss/**/*.scss', ['style']);
    gulp.watch('./assets/src/js/custom.js', ['scripts']);
});

// ==================================================

gulp.task('default', ['style', 'scripts', 'watch']);
