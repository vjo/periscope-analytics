'use strict';

var gulp = require('gulp');
var webserver = require('gulp-webserver');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-ruby-sass');
var autoprefixer = require('gulp-autoprefixer');
var jscs = require('gulp-jscs');

gulp.task('webserver', function() {
    gulp.src('./')
        .pipe(webserver({
            livereload: true,
            host: '0.0.0.0',
            port: 12345,
            directoryListing: false,
            open: false
        }));
});

gulp.task('jscs', function() {
    gulp.src('src/app.js')
        .pipe(jscs({
            fix: true
        }))
        .pipe(gulp.dest('./build'));
});

gulp.task('sass', function() {
    return sass('./assets/sass/main.scss', {sourcemap: true, style: 'compressed'})
        .on('error', function (err) {
            console.error('Error!', err.message);
        })
        .pipe(autoprefixer('last 3 version'))
        .pipe(gulp.dest('./build'));
});

gulp.task('sass:watch', function() {
    gulp.watch('./assets/sass/*.scss', ['sass']);
});

gulp.task('dev', ['sass:watch', 'jscs', 'webserver']);
gulp.task('build', []);
