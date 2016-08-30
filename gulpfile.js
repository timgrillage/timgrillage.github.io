var gulp       = require('gulp');
var prefix     = require('gulp-autoprefixer');
var concat     = require('gulp-concat');
var imagemin   = require('gulp-imagemin');
var livereload = require('gulp-livereload');
var sass       = require('gulp-sass');
var uglify     = require('gulp-uglify');
    

// ============================================================
// Styles
// ============================================================

gulp.task('styles', function() {
    return gulp.src('./assets/src/scss/main.scss')
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(prefix({
            browsers: ['last 2 versions', 'ie 9']
        }))
        .pipe(gulp.dest('./assets/css'))
        .pipe(livereload());
});


// ============================================================
// Scripts
// ============================================================

gulp.task('scripts', function() {
    return gulp.src(['./assets/src/js/plugins/*.js', './assets/src/js/custom.js'])
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./assets/js'))
        .pipe(livereload());
});


// ============================================================
// Images
// ============================================================

gulp.task('imagemin', function() {
    return gulp.src('./assets/src/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./assets/img'));
});


// ============================================================
// Watch
// ============================================================

gulp.task('watch', function() {
    livereload.listen();
    gulp.watch('./assets/src/scss/**/*.scss', ['styles']);
    gulp.watch('./assets/src/js/custom.js', ['scripts']);
});


// ============================================================
// Default
// ============================================================

gulp.task('default', ['styles', 'scripts', 'watch']);
