Gulpfile-Ninecms
================

Front-end package management.

The gulpfile can be used for any web site including but not limited to sites built with 
[NineCMS](https://github.com/Wtower/django-ninecms).

[![NPM version][npm-image]][npm-url] 
[![Dependency Status][daviddm-image]][daviddm-url] 
[![npm](https://img.shields.io/npm/dt/gulpfile-ninecms.svg?maxAge=2592000)](https://www.npmjs.com/package/gulpfile-ninecms)

[daviddm-image]: https://david-dm.org/Wtower/gulpfile-ninecms.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/Wtower/gulpfile-ninecms
[npm-image]: https://badge.fury.io/js/gulpfile-ninecms.svg
[npm-url]: https://npmjs.org/package/gulpfile-ninecms

Contents
--------

- [Objectives](#objectives)
- [Method](#method)
- [Installation](#installation)
- [How to use](#how-to-use)
- [Gulp tasks](#gulp-tasks)
- [Background](#background)
- [Browserify](#browserify)
- [Useful links](#useful-links)
- [NineCMS scripts](#ninecms-scripts)

Objectives
----------

- Package versioning
- Compress and minification of JS and CSS
- SASS, LESS

Method
------

Gulpfile-Ninecms offers a default `gulpfile.js` and related dependencies in a `package.json`.
It also offers some utility JS and CSS files.

Installation
------------

Install node.js. See [installation instructions](https://github.com/Wtower/express-experiment#install-node).

Also make install:

    $ sudo apt-get install imagemagick
    $ npm install -g gulp-cli

Then change to your project folder and then install Gulpfile-Ninecms:

    $ npm install gulpfile-ninecms

How to use
----------

You can use the gulpfile directly:

    $ gulp --gulpfile node_modules/gulpfile-ninecms/gulpfile.js

Or make a copy of the gulpfile to the project root to customize and run directly:

    $ cp node_modules/gulpfile-ninecms/gulpfile.js .
    $ gulp

To customize, edit the gulpfile and set the appropriate `paths` section at the beginning of the file.
For details on tasks, see [Gulp tasks](#gulp-tasks) below.
Specify the appropriate paths of the following:

- `assets`: any files that nned to be copied unchanged, such as fonts or images.
- `sass`: any SASS/SCSS files to be compiled.
- `less`: any LESS files to be compiled.
- `css`: any CSS files to be processed.
- `js`: the JS entry file for browserify to be processed.
- `js_watch`: any JS files to be watched.
- `mocha`: any JS files to be tested.
- `images`: any images to be processed.
- `build`: the output directory.
- `fonts`: the fonts output directory.

To build only once (no watch), run:

    $ gulp build

To build for production:

    $ gulp build --production

This can also be combined with `django-gulp`.

In case `gulp watch` [not working with `ENOSPC`](http://stackoverflow.com/questions/22475849/node-js-error-enospc), 
increase the [inotify watch limit](http://unix.stackexchange.com/questions/13751/kernel-inotify-watch-limit-reached):

    # echo fs.inotify.max_user_watches=16384 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p  # bash
    $ echo fs.inotify.max_user_watches=16384 | sudo tee -a /etc/sysctl.conf; and sudo sysctl -p  # fish

Last, regarding IDEs, PyCharm has a [gulp plugin](https://www.jetbrains.com/pycharm/help/gulp-tool-window.html).


Gulp tasks
----------

Build

- `clean`: delete `paths.build` (default `static/build`), runs before `build`.
- `less`: compile `paths.less` to `paths.build`.
- `sass`: compile `paths.sass` to `paths.build`.
  For both less/sass, use a single file with `include`s, keeps the same name as original with `.css` extension.
  Can include the output to the css files below.
- `css`: concatenate, minify (prod), autoprefix (prod), sourcemap `paths.css` to `paths.build/style.min.css`.
- `browserify`: compile `paths.js` to `paths.build` with same name. Use single file with all requires.
- `lintjs`: analyze `paths.js` and output report to stdout.
- `images`: create optimized image styles of `images` to `paths.images` (`media/ninecms`) base.
- `mocha`: run `paths.mocha` tests.
- `fonts`: Collect Google fonts from `fonts.list` to `paths.fonts` (`static/fonts`).

Watch: `css`, `less`, `sass`, `js`

Other individual tasks

- `clean_image_opts`: delete all image styles from `paths.images`. Be careful that paths are correct before run.

Background
----------

*Relevant issue [django-ninecms#56](https://github.com/Wtower/django-ninecms/issues/56)*

As of v0.6.0 the previous (totally basic) package management was removed.
Several other possibilities have been evaluated and rejected:

- `django-bower`: no compression etc.
- `django-pipeline`: not able to evaluate it
- `django-compressor`: not compressing to file
- `django-webpacks`: browserify in favor
- `django-require`: as above
- `django-grunt`: too complicated, gulp is superior

Browserify
----------

Quick reference to common packages:

### jQuery 
  
- npm: [`jquery`](https://www.npmjs.com/package/jquery)
- js: `$ = jQuery = require('jquery');`
- [jQuery](http://rkulla.blogspot.gr/2014/04/using-browserify-with-jquery-backbonejs.html)
- [jQuery plugins](http://blog.npmjs.org/post/112064849860/using-jquery-plugins-with-npm) (eg. scrollTo)

### Bootstrap

- [Bootstrap](http://stackoverflow.com/questions/24827964/browserify-with-twitter-bootstrap)
- npm package: [`bootstrap`](https://www.npmjs.com/package/bootstrap)
- index.js: `require('bootstrap');`
- gulpfile assets path: `'node_modules/bootstrap/dist/*fonts/*'`
- gulpfile css path: `'node_modules/bootstrap/dist/css/bootstrap*(|-theme).css'`
- html5shiv: either ignore or leave as is

### Angular

- npm package: [`angular`](https://www.npmjs.com/package/angular)
- index.js: `require('angular');`
- [Angular](http://omarfouad.com/blog/2015/03/21/advanced-angularjs-structure-with-gulp-node-and-browserify/) 
- Angular plugins: `angular-sanitize` (as Angular)

### Lightbox2

- npm package: [`lightbox2`](https://www.npmjs.com/package/lightbox2)
- index.js: `require('lightbox2');`
- gulpfile css path: `'node_modules/lightbox2/dist/css/lightbox.css'`

### animate.css

- npm package: [`animate.css`](https://www.npmjs.com/package/animate.css)
- gulpfile css path: `'node_modules/animate.css/animate.css'`

### wow.js

- dependencies: animate.css
- npm package: [`wow.js`](https://www.npmjs.com/package/wow.js)
- [browserify-shim](https://github.com/matthieua/WOW/issues/155#issuecomment-208875313)
  ([see below](#browserify-shim))

  - `package.json`
    
          "browserify": {"transform": [ "browserify-shim" ]},
          "browser": {
            "wow": "./node_modules/wow.js/dist/wow.js"
          },
          "browserify-shim": {
            "wow": {"exports": "WOW"}
          }
        
  - `index.js`
       
          var WOW = require('wow');
          new WOW().init();

### Owl carousel

- npm: [`owl.carousel`](https://www.npmjs.com/package/owl.carousel)
- gulpfile css path: `'node_modules/owl.carousel/dist/assets/owl.carousel.css'`
- provide any additional [plugins](https://owlcarousel2.github.io/OwlCarousel2/demos/demos.html) 
  css rules in main css file
- browserify-shim

  - `package.json`
    
          "browserify": {"transform": ["browserify-shim"]},
          "browser": {
            "owl.carousel": "./node_modules/owl.carousel/dist/owl.carousel.js"
          },
          "browserify-shim": {
            "owl.carousel": "$"
          }

  - `index.js`
       
          $.fn.owlCarousel = require('owl.carousel');

### Font awesome

- npm: [`font-awesome`](https://www.npmjs.com/package/font-awesome)
- gulpfile assets path: `'node_modules/font-awesome/*fonts/*'`
- gulpfile css path: `'node_modules/font-awesome/css/font-awesome.css'`

### Normalize.css

- npm: [`normalize.css`](https://www.npmjs.com/package/normalize.css)
- gulpfile css path: `'node_modules/normalize.css/normalize.css'`

### Swiper

- npm: [`swiper`](https://www.npmjs.com/package/swiper)
- js: `require('swiper');`
- gulpfile css path: `'node_modules/swiper/dist/css/swiper.css'`

### Puse icons

- npm: [`puse-icons-feather`](https://www.npmjs.com/package/puse-icons-feather)
- gulpfile asset path: `'node_modules/puse-icons-feather/*fonts/*'`

### Other modules to investigate

- masonry.pkdg
- video.js
- waypoints
- iosslider


Browserify-shim
---------------

Packages that are not CommonJS compatible require a relative entry in `package.json`, as described above.
The following entry is also required:

      "browserify": {
        "transform": ["browserify-shim"]
      },

Browserify-shim is already included in gulpfile-ninecms dependencies.

Useful links
------------

Useful links on setting up a gulpfile

- http://stackoverflow.com/questions/26273358/gulp-minify-all-css-files-to-a-single-file
- http://autoprefixer.github.io/
- https://github.com/gulpjs/gulp/blob/master/docs/recipes/using-multiple-sources-in-one-task.md
- https://github.com/isaacs/node-glob#glob-primer
- http://stackoverflow.com/questions/25038014/how-do-i-copy-directories-recursively-with-gulp
- https://scotch.io/tutorials/automate-your-tasks-easily-with-gulp-js
- http://stackoverflow.com/questions/27399596/how-to-combine-postcss-autoprefixer-with-less
- http://stackoverflow.com/questions/25713118/how-to-perform-multiple-gulp-commands-in-one-task
- https://www.npmjs.com/package/gulp-image-resize
- http://stackoverflow.com/questions/30372637/getting-started-with-browserify-import-local-files

NineCMS Scripts
---------------

Apart from the gulpfile, `index.js`is the main script for the package. It is the browserified version of the
[NineCMS `layout.js` file](https://github.com/Wtower/django-ninecms/blob/devel/ninecms/static/ninecms/layout.js).
To use:

    require('gulpfile-ninecms');
