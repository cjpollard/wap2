var gulp = require('gulp');
var concat = require('gulp-concat');
var del = require('del');
var ts = require('gulp-typescript');
var tsConfig = require('./tsconfig.json');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');


var paths = {
    app: ['app/**/*.ts', '!app/**/*.spec*'],
    appScss: ['app/theme/app.main.scss']
}

gulp.task('clean.www', function() {
    return del('www/**/*');
});

gulp.task('clean.app', function() {
    return del('app/**/*.js*');
})

gulp.task('clean', ['clean.www', 'clean.app']);

gulp.task('ts', function() {
    return gulp
        .src(paths.app)
        .pipe(sourcemaps.init())
        .pipe(ts(tsConfig.compilerOptions))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('app/'));
});

gulp.task('sass', function() {
    gulp.src(paths.appScss)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('www/app/theme'));
});

gulp.task('watch', ['copy.assets'], function() {
    gulp.watch(paths.app, ['ts']);
    gulp.watch(paths.appScss, ['sass']);
});

gulp.task('copy.libs', function() {
    return gulp.src([
        "node_modules/es6-shim/es6-shim.min.js",
        "node_modules/es6-shim/es6-shim.map",
        "node_modules/systemjs/dist/system-polyfills.js",
        "node_modules/systemjs/dist/system-polyfills.js.map",
        "node_modules/angular2/es6/dev/src/testing/shims_for_IE.js",
        "node_modules/angular2/bundles/angular2-polyfills.js",
        "node_modules/systemjs/dist/system.src.js",
        "node_modules/rxjs/bundles/Rx.js",
        "node_modules/angular2/bundles/angular2.dev.js",
        "node_modules/angular2/bundles/http.dev.js",
        "node_modules/angular2/bundles/router.dev.js"
    ]).pipe(gulp.dest('www/lib'));
});

gulp.task('copy.assets', ['sass', 'ts'], function() {
  return gulp.src(['app/**/*.html', 'index.html', 'app/app.bundle.js', '!app/**/*.scss'], { base : './' })
    .pipe(gulp.dest('www'))
});

gulp.task('build', ['copy.libs', 'copy.assets']);