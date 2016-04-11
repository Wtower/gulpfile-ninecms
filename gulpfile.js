/**
 * gulpfile-ninecms
 */

// -------------
// Configuration
// -------------
// Specify paths
var paths = {
  assets: [
    'node_modules/bootstrap/dist/*fonts/*',
    'node_modules/font-awesome/*fonts/*',
    'node_modules/puse-icons-feather/*fonts/*'
    //'static/myproject/css/*fonts/*/*'
    //'static/myproject/*images/*'
  ],
  sass: [
    //'static/myproject/*.s?ss'
  ],
  less: [
      //'static/myproject/*.less'
  ],
  css: [
    'node_modules/normalize.css/normalize.css',
    'node_modules/bootstrap/dist/css/bootstrap*(|-theme).css',
    'node_modules/font-awesome/css/font-awesome.css',
    'node_modules/gulpfile-ninecms/style.css'
    //'static/myproject/extend.css'
  ],
  js: [
      //'static/myproject/index.js'
  ],
  mocha: ['static/**/*test.js'],
  build: 'static/build/',
  images: 'media/ninecms'
};
var config = {
  autoprefixer_versions: ['last 2 version', 'safari 5', 'ie 8', 'ie 9']
};
var images = [
  {
    build: '/thumbnail',
    src: ['media/ninecms/*/image/*.+(jpg|png)'],
    width: 150
  }, {
    build: '/thumbnail_crop',
    src: [],
    width: 150,
    height: 150,
    crop: true
  }, {
    build: '/thumbnail_upscale',
    src: [],
    width: 150,
    height: 150,
    upscale: true
  }, {
    build: '/gallery_style',
    src: [],
    width: 400,
    height: 1000
  }, {
    build: '/blog_style',
    src: [],
    width: 350,
    height: 226,
    crop: true
  }, {
    build: '/large',
    src: ['media/ninecms/basic/image/*.+(jpg|png)'],
    width: 1280,
    height: 1280
  }
];

// ---------------
// Include section
//----------------
'use strict';
var gulp = require('gulp');
var gutil = require('gulp-util');
var del = require('del');
var gulpif = require('gulp-if');
var notify = require('gulp-notify');
//noinspection JSUnresolvedVariable
var argv = require('yargs').argv;
// css
var concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');
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
// linting
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
// image optimization
var imageResize = require('gulp-image-resize');
var es = require('event-stream');
var rename = require('gulp-rename');
var parallel  = require('concurrent-transform');
var os = require('os');
var changed = require('gulp-changed');
// google fonts
var googleWebFonts = require('gulp-google-webfonts');
// testing/mocha
var mocha = require('gulp-mocha');

// -------
// Prepare
// -------
// gulp build --production
//noinspection JSUnresolvedVariable
var production = !!argv.production;
// determine if we're doing a build
// and if so, bypass the livereload
var build = argv._.length ? argv._[0] === 'build' : false;
var watch = argv._.length ? argv._[0] === 'watch' : true;

// ----------------------------
// Error notification methods
// ----------------------------
var handleError = function(task) {
  return function(err) {
      notify.onError({
        message: task + ' failed, check the logs',
        sound: false
      })(err);
    //noinspection JSUnresolvedFunction
    gutil.log(gutil.colors.bgRed(task + ' error:'), gutil.colors.red(err));
  };
};

// --------------------------
// CUSTOM TASK METHODS
// --------------------------
var tasks = {
  // --------------------------
  // Delete build folder
  // --------------------------
  clean: function() {
    return del([paths.build]);
  },
  // --------------------------
  // Copy static assets
  // --------------------------
  assets: function() {
    return gulp.src(paths.assets)
        .on('error', handleError('Assets'))
        .pipe(gulp.dest(paths.build));
  },
  // --------------------------
  // CSS
  // --------------------------
  css: function() {
    return gulp.src(paths.css)
        .pipe(gulpif(!production, sourcemaps.init()))
        .on('error', handleError('CSS'))
        .pipe(concat('style.min.css'))
        .pipe(gulpif(production, autoprefixer(config.autoprefixer_versions)))
        .pipe(gulpif(production, minifyCSS()))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.build + 'css/'));
  },
  // --------------------------
  // LESS
  // --------------------------
  less: function() {
    return gulp.src(paths.less)
        .pipe(gulpif(!production, sourcemaps.init()))
        .on('error', handleError('LESS'))
        .pipe(less())
        .pipe(gulpif(production, autoprefixer(config.autoprefixer_versions)))
        .pipe(gulpif(production, minifyCSS()))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.build + 'css/'));
  },
  // --------------------------
  // SASS (libsass)
  // --------------------------
  sass: function() {
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
  // --------------------------
  // Browserify
  // --------------------------
  browserify: function() {
    var bundler = browserify(paths.js, {
      debug: !production,
      cache: {}
    });
    if (watch) {
      bundler = watchify(bundler);
    }
    var rebundle = function() {
      //noinspection JSUnresolvedFunction
      return bundler.bundle()
        .on('error', handleError('Browserify'))
        .pipe(source('build.js'))
        .pipe(gulpif(production, buffer()))
        .pipe(gulpif(production, uglify()))
        .pipe(gulp.dest(paths.build + 'js/'));
    };
    //noinspection JSUnresolvedFunction
    bundler.on('update', rebundle);
    return rebundle();
  },
  // --------------------------
  // linting
  // --------------------------
  lintjs: function() {
    return gulp.src(paths.js/*.concat(['gulpfile.js'])*/)
      // gulpfile lint returns many false errors for `require()`
      .pipe(jshint())
      .pipe(jshint.reporter(stylish))
      .on('error', handleError('LINT'));
  },
  // --------------------------
  // Optimize asset images
  // --------------------------
  images: function() {
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
        .pipe(rename((function(img_path) {
              return function (path) {
                path.dirname += img_path;
              }
            })(img.build))));
    }
    return es.merge(streams)
      .pipe(gulp.dest(paths.images));
  },
  // -----------------------------
  // Delete optimized image styles
  // -----------------------------
  clean_image_opts: function() {
    // ATTENTION: make sure the path form pagetype/field/style/img is used
    return del([paths.images + '/*/image/*/*']);
  },
  // ----------------
  // Google web fonts
  // ----------------
  fonts: function() {
    return gulp.src('./fonts.list')
      .pipe(googleWebFonts())
      .pipe(gulp.dest(paths.build + 'fonts/'));
  },
  // --------------------------
  // Testing with mocha
  // --------------------------
  mocha: function() {
    return gulp.src(paths.mocha, {read: false})
      .pipe(mocha({
        'ui': 'bdd',
        'reporter': 'spec'
      })
    );
  }
};

// --------------------------
// CUSTOMS TASKS
// --------------------------
gulp.task('clean', tasks.clean);
// for production we require the clean method on every individual task
var req = build ? ['clean'] : [];
// individual tasks
gulp.task('assets', req, tasks.assets);
gulp.task('css', req, tasks.css);
gulp.task('less', req, tasks.less);
gulp.task('sass', req, tasks.sass);
gulp.task('browserify', req, tasks.browserify);
gulp.task('lintjs', tasks.lintjs);
gulp.task('images', tasks.images);
gulp.task('clean_image_opts', tasks.clean_image_opts);
gulp.task('fonts', tasks.fonts);
gulp.task('mocha', tasks.mocha);

// build task
gulp.task('build', [
  'assets',
  'css',
  'less',
  'sass',
  'browserify',
  'lintjs',
  'images',
  'fonts',
  'mocha'
]);

// --------------------------
// DEV/WATCH TASK
// --------------------------
gulp.task('watch', ['build'], function() {
  gulp.watch(paths.css, ['css']);
  gulp.watch(paths.less, ['less']);
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.js.concat(['gulpfile.js']), ['lintjs', 'browserify']);
  gulp.watch('./fonts.list', ['fonts']);
  //noinspection JSUnresolvedFunction
  gutil.log(gutil.colors.bgGreen('Watching for changes...'));
});

gulp.task('default', ['watch']);

// gulp (watch) : for development and livereload
// gulp build : for a one off development build
// gulp build --production : for a minified production build
