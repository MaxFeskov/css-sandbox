const {
  $, taskPath: path, errorHandler,
} = global;

const gulp = require('gulp');
const del = require('del');
const cssnano = require('cssnano');

gulp.task('clean:style', () => del(path.build.style));

gulp.task('build:style', () =>
  gulp
    .src(path.src.style)
    .pipe($.plumber({ errorHandler }))
    .pipe($.sass_glob())
    .pipe($.sass())
    .on('error', (err) => {
      $.sass.logError.bind(this)(err);
    })
    .pipe($.postcss())
    .pipe($.postcss([cssnano]))
    .pipe(gulp.dest(path.build.style)));

gulp.task('dev:style', () =>
  gulp
    .src(path.src.style)
    .pipe($.plumber({ errorHandler }))
    .pipe($.sourcemaps.init())
    .pipe($.sass_glob())
    .pipe($.sass({
      outputStyle: 'expanded',
      indentWidth: 2,
    }))
    .on('error', () => {
      this.emit('end');
    })
    .pipe($.postcss())
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest(path.build.style)));

gulp.task('watch:style', () =>
  gulp.watch(path.watch.style, gulp.series('dev:style', 'server:reload')));
