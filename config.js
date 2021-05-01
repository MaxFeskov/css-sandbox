const srcPath = {
  html: ['src/pug/*.pug', '!src/pug/_*.pug'],
  style: './src/styles/*.scss',
  image: './src/img/**/*.*',
};

const buildPath = {
  html: './build/',
  style: './build/css/',
  image: './build/img/',
};

let watchPath = {
  html: ['./src/pug/**/*.pug', './src/data/**/*.json'],
  style: './src/styles/**/*.scss',
};

// src path is default watch path
watchPath = Object.assign({}, srcPath, watchPath);

module.exports = {
  lineending: '\n',
  compassImagehelper: {
    targetFile: '_imagehelper.scss',
    template: './gulp-tasks/scss-imagehelper.mustache',
    buildPath: './src/styles/base/',
  },
  path: {
    build: buildPath,
    src: srcPath,
    watch: watchPath,
  }
};
