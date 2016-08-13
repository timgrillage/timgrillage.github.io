var gulp = require('gulp');
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var livereload = require('gulp-livereload');
    

/*==================================================*
  Stylesheet
 *==================================================*/

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


/*==================================================*
  Scripts
 *==================================================*/

gulp.task('scripts', function() {
    return gulp.src(['./assets/src/js/plugins/*.js', './assets/src/js/custom.js'])
        .pipe(concat('scripts.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./assets'))
        .pipe(livereload());
});


/*==================================================*
  Images
 *==================================================*/

gulp.task('imagemin', function() {
    return gulp.src('./assets/src/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./assets/img'));
});


/*==================================================*
  Watch
 *==================================================*/

gulp.task('watch', function() {
    livereload.listen();
    gulp.watch('./assets/src/scss/**/*.scss', ['style']);
    gulp.watch('./assets/src/js/custom.js', ['scripts']);
});


/*==================================================*
  Default
 *==================================================*/

gulp.task('default', ['style', 'scripts', 'watch']);
