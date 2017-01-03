Assets
======

Syntax
------
::

    assets(paths)

Description
-----------

Copy the specified files or directories from ``paths.assets`` to ``paths.build``.

This is useful when the build path is the same path that offers static files as images,
and you wish to clean it entirely with clean.

This is also especially useful to copy static paths that are referred to by css files such as bootstrap.
Use the ``*`` gulp feature for paths accordingly (see examples).

Example
-------
::

    var paths = {
      assets: [
        'node_modules/bootstrap/dist/*fonts/*',
        'static/*images/*'
      ],
      build: 'build/'
    };

    var gulp = require('gulp');
    var taskMethods = require('gulpfile-ninecms');

    var tasks = {
      assets: function () { return taskMethods.assets(paths); }
    };

    gulp.task('assets', [], tasks.assets);

