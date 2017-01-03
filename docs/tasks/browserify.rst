Browserify
==========

Syntax
------
::

    browserify(paths)

Description
-----------

Browserifies_ the specified ``paths.js`` file and outputs to ``paths.build``.

If ``--production`` is specified it also uglifies_ the output script.

Use a single js entry point with all requires.

If ``gulp watch`` then the task also watches changes in the bundled requires.

.. _Browserifies: http://browserify.org/
.. _uglifies: https://www.npmjs.com/package/gulp-uglify

Quick reference
---------------

Quick reference to browserifying common front-end packages.

Alternatively use the :doc:`js` task.

Notation used below:

- npm package: Install the npm package
- index.js: Require the package in the entry js using the provided code
- gulpfile path: Additional paths to include in gulpfile build

jQuery
^^^^^^

- npm package: jquery_
- index.js: ``$ = jQuery = require('jquery');``
- `Using browserify with jquery`_
- `jQuery plugins`_ (eg. scrollTo)

.. _jquery: https://www.npmjs.com/package/jquery
.. _Using browserify with jquery: http://rkulla.blogspot.gr/2014/04/using-browserify-with-jquery-backbonejs.html
.. _jQuery plugins: http://blog.npmjs.org/post/112064849860/using-jquery-plugins-with-npm

Bootstrap
^^^^^^^^^

- npm package: bootstrap_
- index.js: ``require('bootstrap');``
- gulpfile assets path: ``'node_modules/bootstrap/dist/*fonts/*'``
- gulpfile css path: ``'node_modules/bootstrap/dist/css/bootstrap*(|-theme).css'``
- html5shiv: either ignore or leave as is
- `Browserify with Bootstrap`_

.. _bootstrap: https://www.npmjs.com/package/bootstrap
.. _Browserify with Bootstrap: http://stackoverflow.com/questions/24827964/browserify-with-twitter-bootstrap

Angular
^^^^^^^

- npm package: angular_
- index.js: ``require('angular');``
- `Angular with browserify`_
- Any angular plugins such as angular-sanitize: the same as Angular.

.. _angular: https://www.npmjs.com/package/angular
.. _Angular with browserify: http://omarfouad.com/blog/2015/03/21/advanced-angularjs-structure-with-gulp-node-and-browserify/

Lightbox2
^^^^^^^^^

- npm package: lightbox2_
- index.js: ``require('lightbox2');``
- gulpfile css path: ``'node_modules/lightbox2/dist/css/lightbox.css'``

.. _lightbox2: https://www.npmjs.com/package/lightbox2

animate.css
^^^^^^^^^^^

- npm package: `animate.css`_
- gulpfile css path: ``'node_modules/animate.css/animate.css'``
- No js file

.. _animate.css: https://www.npmjs.com/package/animate.css

wow.js
^^^^^^

- dependencies: animate.css
- npm package: `wow.js`_
- :ref:`browserify-shim`

  - ``package.json``::

        "browserify": {"transform": [ "browserify-shim" ]},
        "browser": {
          "wow": "./node_modules/wow.js/dist/wow.js"
        },
        "browserify-shim": {
          "wow": {"exports": "WOW"}
        }

  - ``index.js``::

        var WOW = require('wow');
        new WOW().init();

.. _wow.js: https://www.npmjs.com/package/wow.js

Owl carousel
^^^^^^^^^^^^

- npm: `owl.carousel`_
- gulpfile css path: ``'node_modules/owl.carousel/dist/assets/owl.carousel.css'``
- provide any additional `owl plugins`_ css rules
- :ref:`browserify-shim`

  - ``package.json``::

        "browserify": {"transform": ["browserify-shim"]},
        "browser": {
          "owl.carousel": "./node_modules/owl.carousel/dist/owl.carousel.js"
        },
        "browserify-shim": {
          "owl.carousel": "$"
        }

  - ``index.js``::

        $.fn.owlCarousel = require('owl.carousel');

.. _owl.carousel: https://www.npmjs.com/package/owl.carousel
.. _owl plugins: https://owlcarousel2.github.io/OwlCarousel2/demos/demos.html

Font awesome
^^^^^^^^^^^^

- npm: `font-awesome`_
- gulpfile assets path: ``'node_modules/font-awesome/*fonts/*'``
- gulpfile css path: ``'node_modules/font-awesome/css/font-awesome.css'``
- No js file

.. _font-awesome: https://www.npmjs.com/package/font-awesome

Normalize.css
^^^^^^^^^^^^^

- npm: `normalize.css`_
- gulpfile css path: ``'node_modules/normalize.css/normalize.css'``
- No js file

.. _normalize.css: https://www.npmjs.com/package/normalize.css

Swiper
^^^^^^

- npm: swiper_
- js: ``require('swiper');``
- gulpfile css path: ``'node_modules/swiper/dist/css/swiper.css'``

.. _swiper: https://www.npmjs.com/package/swiper

Puse icons
^^^^^^^^^^

- npm: `puse-icons-feather`_
- gulpfile asset path: ``'node_modules/puse-icons-feather/*fonts/*'``
- No js file

.. _puse-icons-feather: https://www.npmjs.com/package/puse-icons-feather

.. _browserify-shim:

Browserify-shim
---------------

Packages that are not CommonJS compatible require a relative entry in ``package.json``, as described above.
The following entry is also required::

    "browserify": {
      "transform": ["browserify-shim"]
    },

The `browserify-shim package`_ is already included in gulpfile-ninecms dependencies.

.. _browserify-shim package: https://github.com/matthieua/WOW/issues/155#issuecomment-208875313

Example
-------
::

    var paths = {
      js: 'private/javascripts/index.js',
      build: 'build/'
    };

    var gulp = require('gulp');
    var taskMethods = require('gulpfile-ninecms');

    var tasks = {
      browserify: function () { return taskMethods.browserify(paths); }
    };

    gulp.task('browserify', [], tasks.browserify);

