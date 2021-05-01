const config = require('./config');
const { path, ...options } = config;

Object.assign(global, options, { taskPath: path });

global.$ = require('gulp-load-plugins')({
  renameFn(name) {
    return name.replace('gulp-', '').replace(/-/g, '_');
  }
});

global.errorHandler = (err) => {
  const { $ } = global;

  $.notify.onError({
    title: `Gulp error in ${err.plugin}`,
    message: err.toString(),
  })(err);
};

const gulp = require('gulp');
const requireDir = require('require-dir');

requireDir('./gulp-tasks', { recurse: true });

gulp.task(
  'clean',
  gulp.parallel('clean:style', 'clean:html'),
);

gulp.task(
  'build',
  gulp.series(
    'clean',
    'build:style',
    'build:html',
  ),
);

gulp.task(
  'watch',
  gulp.parallel('watch:style', 'watch:html'),
);

gulp.task(
  'dev',
  gulp.series(
    'dev:style',
    'dev:html',
  ),
);

gulp.task('default', gulp.series('dev', gulp.parallel('server:init', 'watch')));
