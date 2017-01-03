Preload Angular HTML
====================

Syntax
------
::

    preloadNgHtml(paths)

Description
-----------

Preloads Angular HTML templates specified in ``paths.partials`` into a generated partial JS file
``paths.build`` ``/partials.js``.

Procedure:

- `Minifies HTML`_ templates
- Uses the `ng-html2js`_ module to generate ``partials.js``.

Please note that the task extracts the Angular module name from the template directory name.
Eg. for a template file::

    private/javascripts/my-admin-app/my-admin-module/my-admin-module.template.html

the module name will be parsed as ``myAdminModule``.

.. _Minifies HTML: https://www.npmjs.com/package/gulp-minify-html
.. _ng-html2js: https://www.npmjs.com/package/gulp-ng-html2js

Dependencies
------------

Run the task :doc:`js` after this task has finished.

Example
-------
::

    var paths = {
      js_watch: [
        ...
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
      preloadNgHtml: function () { return taskMethods.preloadNgHtml(paths); },
    };

    gulp.task('preloadNgHtml', req, tasks.preloadNgHtml);
    gulp.task('concatJs', req.concat(['preloadNgHtml']), tasks.concatJs);

