const {
  $, taskPath: path, errorHandler,
} = global;

const gulp = require('gulp');

gulp.task('imagehelper', () =>
  gulp
    .src(`${path.build.image}**/*.*`)
    .pipe($.plumber({ errorHandler }))
    .pipe($.compass_imagehelper({
      targetFile: compassImagehelper.targetFile,
      template: compassImagehelper.template,
      images_path: path.build.image,
      css_path: path.build.style,
    }))
    .pipe(gulp.dest(compassImagehelper.buildPath)));
