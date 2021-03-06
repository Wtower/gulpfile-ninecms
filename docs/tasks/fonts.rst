Google web fonts
================

Syntax
------
::

    fonts(paths)

Description
-----------

Download Google fonts specified in ``paths.fonts`` ``/fonts.list`` to ``paths.build`` ``/fonts`` and generate a
stylesheet for them.

Uses `gulp-google-webfonts`_.

.. _gulp-google-webfonts: https://www.npmjs.com/package/gulp-google-webfonts

**New in v0.4.0**: Now the ``fonts.list`` location needs to be specified in ``paths.fonts``.

Example
-------

In ``gulpile.js``::

    var paths = {
      build: 'build/'
    };

    var gulp = require('gulp');
    var taskMethods = require('gulpfile-ninecms');

    var tasks = {
      fonts: function () { return taskMethods.fonts(paths); }
    };

    gulp.task('fonts', [], tasks.fonts);


In ``index.html``::

    <link rel="stylesheet" href="/build/fonts/fonts.css">

