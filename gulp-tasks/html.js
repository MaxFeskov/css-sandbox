const {
  $, taskPath: path, errorHandler, lineending,
} = global;

const gulp = require('gulp');
const del = require('del');
const filePath = require('path');
const fs = require('fs');
const yargs = require('yargs');

const { argv } = yargs;
const { existsSync: existsFile, readFileSync: readFile } = fs;
const locale = argv.locale || global.locale;

gulp.task('clean:html', () => del(`${path.build.html}*.html`));

gulp.task('build:html', () =>
  gulp
    .src(path.src.html)
    .pipe($.plumber({ errorHandler }))
    .pipe($.pug({ basedir: '.' }))
    .pipe($.jsbeautifier({
      indent_size: 2,
      indent_char: " ",
      indent_with_tabs: false,
      eol: lineending,
      end_with_newline: true,
      inline: [],
    }))
    .pipe($.htmllint())
    .pipe(gulp.dest(path.build.html)));

gulp.task('dev:html', gulp.series('build:html'));

gulp.task('watch:html', () => gulp.watch(path.watch.html, gulp.series('dev:html', 'server:reload')));
