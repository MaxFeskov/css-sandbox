const {
  $, taskPath: path, errorHandler,
} = global;

const gulp = require('gulp');
const del = require('del');
const pngquant = require('imagemin-pngquant');

gulp.task('clean:image', () => del(path.build.image));

gulp.task('build:image', () =>
  gulp
    .src(path.src.image)
    .pipe($.plumber({ errorHandler }))
    .pipe($.cached('images'))
    .pipe(
      $.imagemin({
        progressive: true,
        svgoPlugins: [{ removeViewBox: false }],
        use: [pngquant()],
        interlaced: true
      })
    )
    .pipe(gulp.dest(path.build.image))
    .pipe($.remember('images'))
    .pipe(
      $.compass_imagehelper({
        targetFile: compassImagehelper.targetFile,
        template: compassImagehelper.template,
        images_path: path.build.image,
        css_path: path.build.style,
      })
    )
    .pipe(gulp.dest(compassImagehelper.buildPath))
);

gulp.task('dev:image', gulp.series('build:image'));

gulp.task('watch:image', () =>
  gulp.watch(path.watch.image, gulp.series('dev:image', 'server:reload'))
);
