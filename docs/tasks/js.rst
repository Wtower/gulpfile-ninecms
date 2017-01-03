JS concatenate
==============

Syntax
------
::

    concatJs(paths)

Description
-----------

Concatenate JS files from ``paths.js_watch`` into ``paths.build`` ``/js/index.min.js``.

The concatenation procedure for ``--production``:

- Concatenate_ JS
- Uglifies_ the output script

The concatenation procedure for non ``--production``:

- Concatenate_ JS
- Builds `source maps`_

.. _Concatenate: https://www.npmjs.com/package/gulp-concat
.. _uglifies: https://www.npmjs.com/package/gulp-uglify
.. _source maps: https://www.npmjs.com/package/gulp-sourcemaps

Dependencies
------------

The task should run after :doc:`ng_html` has finished,
if the output from it is included in the js task.

Example
-------
::

    var paths = {
      js_watch: [
        'node_modules/jquery/dist/jquery.js',
        'node_modules/bootstrap/dist/js/bootstrap.js',
        // angular
        'node_modules/angular/angular.js',
        'node_modules/angular-resource/angular-resource.js',
        'node_modules/angular-animate/angular-animate.js',
        'node_modules/angular-sanitize/angular-sanitize.js',
        // angular app
        'private/javascripts/my-angular-app/*.module.js',
        'private/javascripts/my-angular-app/*.animations.js',
        'private/javascripts/my-angular-app/core/*.module.js',
        'private/javascripts/my-angular-app/core/*.filter.js',
        'private/javascripts/my-angular-app/core/**/*.module.js',
        'private/javascripts/my-angular-app/core/**/*.service.js',
        'private/javascripts/my-angular-app/my-angular-app*/*.module.js',
        'private/javascripts/my-angular-app/my-angular-app*/*.component.js',
        // other
        'private/javascripts/jquery.main.js',
        'build/partials.js'
      ],
      partials: [
        'private/*javascripts/my-angular-app/**/*.html'
      ],
      build: 'build/'
    };

    var gulp = require('gulp');
    var taskMethods = require('gulpfile-ninecms');

    var tasks = {
      concatJs: function () { return taskMethods.concatJs(paths); },
      preloadNgHtml: function () { return taskMethods.preloadNgHtml(paths); }
    };

    gulp.task('preloadNgHtml', req, tasks.preloadNgHtml);
    gulp.task('concatJs', req.concat(['preloadNgHtml']), tasks.concatJs);

