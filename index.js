/**
 * TASK METHODS
 */
'use strict';
var gulp = require('gulp');
var gutil = require('gulp-util');
var del = require('del');
var notify = require('gulp-notify');
var gulpif = require('gulp-if');
var argv = require('yargs').argv;
var path = require('path');
var fs = require('fs');
// css
var concat = require('gulp-concat');
var minifyCSS = require('gulp-clean-css');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
// sass/less
var less = require('gulp-less');
var sass = require('gulp-sass');
// js
var watchify = require('watchify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
// partials
var minifyHtml = require('gulp-minify-html');
var ngHtml2Js = require('gulp-ng-html2js');
// linting
var eslint = require('gulp-eslint');
var excludeGitignore = require('gulp-exclude-gitignore');
// image optimization
var imageResize = require('gulp-image-resize');
var es = require('event-stream');
var rename = require('gulp-rename');
var parallel = require('concurrent-transform');
var os = require('os');
var changed = require('gulp-changed');
// google fonts
var googleWebFonts = require('gulp-google-webfonts');
// testing
var mocha = require('gulp-mocha');
var istanbul = require('gulp-istanbul');
var plumber = require('gulp-plumber');
var nsp = require('gulp-nsp');
var karmaServer = require('karma').Server;
// inline css & base64
var base64 = require('gulp-base64');
var inlineCss = require('gulp-inline-css');

// gulp build --production
var production = !!argv.production;
// determine if we're doing a build
// and if so, bypass the livereload
var build = argv._.length ? argv._[0] === 'build' : false;
var watch = argv._.length ? argv._[0] === 'watch' : true;

var config = {
  autoprefixer_versions: ['last 2 version', 'safari 5', 'ie 8', 'ie 9']
};

var handleError = function (task) {
  return function (err) {
    notify.onError({
      message: task + ' failed, check the logs',
      sound: false
    })(err);
    gutil.log(gutil.colors.bgRed(task + ' error:'), gutil.colors.red(err));
  };
};

var taskMethods = {
  /*
   * Delete build folder
   */
  clean: function (paths) {
    return del([paths.build]);
  },

  /*
   * Copy static assets
   */
  assets: function (paths) {
    return gulp.src(paths.assets)
      .on('error', handleError('Assets'))
      .pipe(gulp.dest(paths.build));
  },

  /*
   * CSS
   */
  css: function (paths) {
    return gulp.src(paths.css)
      .pipe(gulpif(!production, sourcemaps.init()))
      .on('error', handleError('CSS'))
      .pipe(concat('style.min.css'))
      .pipe(gulpif(production, autoprefixer(config.autoprefixer_versions)))
      .pipe(gulpif(production, minifyCSS()))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(paths.build + 'css/'));
  },

  /*
   * LESS
   */
  less: function (paths) {
    return gulp.src(paths.less)
      .pipe(gulpif(!production, sourcemaps.init()))
      .on('error', handleError('LESS'))
      .pipe(less())
      .pipe(gulpif(production, autoprefixer(config.autoprefixer_versions)))
      .pipe(gulpif(production, minifyCSS()))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(paths.build + 'css/'));
  },

  /*
   * SASS
   */
  sass: function (paths) {
    return gulp.src(paths.sass)
    // sourcemaps + sass + error handling
      .pipe(gulpif(!production, sourcemaps.init()))
      .pipe(sass({
        sourceComments: !production,
        outputStyle: production ? 'compressed' : 'nested'
      }))
      .on('error', handleError('SASS'))
      // generate .maps
      .pipe(gulpif(!production, sourcemaps.write({
        'includeContent': false,
        'sourceRoot': '.'
      })))
      .pipe(gulpif(!production, sourcemaps.init({'loadMaps': true})))
      .pipe(gulpif(production, autoprefixer(config.autoprefixer_versions)))
      // we don't serve the source files so include scss content inside the sourcemaps
      .pipe(sourcemaps.write({'includeContent': true}))
      .pipe(gulp.dest(paths.build + 'css/'));
  },

  /*
   * Browserify
   */
  browserify: function (paths) {
    var bundler = browserify(paths.js, {
      debug: !production,
      cache: {}
    });
    if (watch) {
      bundler = watchify(bundler);
    }
    var rebundle = function () {
      return bundler.bundle()
        .on('error', handleError('Browserify'))
        .pipe(source('build.js'))
        .pipe(gulpif(production, buffer()))
        .pipe(gulpif(production, uglify()))
        .pipe(gulp.dest(paths.build + 'js/'));
    };
    bundler.on('update', rebundle);
    return rebundle();
  },

  /*
   * linting
   */
  lintJs: function (paths) {
    return gulp.src(paths.js_lint)
      .pipe(excludeGitignore())
      .pipe(eslint({
        rules: {
          // control characters eg `\n` are required for file appends
          'no-control-regex': 'off',
          // allow double quotes to avoid escaping single
          'quotes': ['error', 'single', {avoidEscape: true}],
          // relax curly
          'curly': ['error', 'multi-line']
        }
      }))
      .pipe(eslint.format())
      .pipe(eslint.failAfterError())
      .on('error', handleError('LINT'));
  },

  /*
   * Concatenate js
   */
  concatJs: function (paths) {
    return gulp.src(paths.js_watch)
      .pipe(gulpif(!production, sourcemaps.init()))
      .on('error', handleError('JS'))
      .pipe(concat('index.min.js'))
      .pipe(gulpif(production, uglify({preserveComments: 'license', mangle: false})))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(paths.build + 'js/'));
  },

  /*
   * Optimize asset images
   */
  images: function (paths, images) {
    var streams = [];
    for (var i = 0; i < images.length; i++) {
      var img = images[i];
      img['imageMagick'] = true; // better quality
      streams.push(gulp.src(img.src, {base: paths.images})
        .pipe(parallel(
          imageResize(img),
          os.cpus().length
        ))
        // http://stackoverflow.com/questions/16724620/mutable-variable-is-accessible-from-closure-how-can-i-fix-this
        .pipe(rename((function (img_path) {
          return function (path) {
            path.dirname += img_path;
          }
        })(img.build))));
    }
    return es.merge(streams)
      .pipe(gulp.dest(paths.images));
  },

  /*
   * Delete optimized image styles
   * ATTENTION: make sure the path form pagetype/field/style/img is used
   */
  clean_image_opts: function (paths) {
    return del([paths.images + '/*/image/*/*']);
  },

  /*
   * Google web fonts
   */
  fonts: function (paths) {
    return gulp.src(paths.fonts + './fonts.list')
      .pipe(googleWebFonts())
      .pipe(gulp.dest(paths.build + 'fonts/'));
  },

  /*
   * Testing security exploits with NSP
   */
  nsp: function (cb) {
    if (!cb) cb = function() {};
    nsp({package: path.resolve('package.json')}, cb);
  },

  /*
   * Pre-Testing
   */
  preTest: function (paths) {
    return gulp.src(paths.js_cover)
      .pipe(excludeGitignore())
      .pipe(istanbul({
        includeUntested: true
      }))
      .pipe(istanbul.hookRequire());
  },

  /*
   * Testing with mocha
   * https://github.com/sindresorhus/gulp-mocha/issues/54#issuecomment-240666300
   */
  mocha: function (paths) {
    gulp.doneCallback = function (err) {
      process.exit(err ? 1 : 0);
    };
    return gulp.src(paths.mocha)
      .pipe(plumber())
      .pipe(mocha({reporter: 'spec', colors: true}))
      .on('error', handleError('Mocha'))
      .pipe(istanbul.writeReports());
  },

  /*
   * Testing with karma
   */
  karma: function (done) {
    new karmaServer({
      configFile: path.join(__dirname, '/karma.conf.js'),
      singleRun: true
    }, function () {
      done();
    }).start();
  },

  /*
   * Pre-load angular templates
   */
  preloadNgHtml: function (paths) {
    return gulp.src(paths.partials)
      .on('error', handleError('preloadNgHtml'))
      .pipe(minifyHtml({
        empty: true,
        spare: true,
        quotes: true
      }))
      .pipe(ngHtml2Js({
        moduleName: function (file) {
          var pathParts = file.path.split(path.sep);
          var folder = pathParts[pathParts.length - 2];
          return folder.replace(/-[a-z]/g, function (match) {
            return match.substr(1).toUpperCase();
          });
        }
      }))
      .pipe(concat('partials.js'))
      .pipe(gulp.dest(paths.build));
  },

  /*
   * base64 images into css
   */
  base64: function (paths) {
    return gulp.src(paths.base64)
      .on('error', handleError('base64'))
      .pipe(base64({
        extensions: ['svg', 'png', 'jpg'],
        maxImageSize: 14*1024, // bytes
        debug: !production
      }))
      .pipe(concat('base64.css'))
      .pipe(gulp.dest(paths.build + 'css/'));
  },

  /*
   * inline css into html, suitable for emails
   */
  inlineCss: function (paths) {
    return gulp.src(paths.inlineCss.html)
      .on('error', handleError('inlineCss'))
      .pipe(inlineCss({
        preserveMediaQueries: true,
        applyTableAttributes: true
      }))
      .pipe(gulp.dest(paths.inlineCss.build))
  }
};

module.exports = taskMethods;
