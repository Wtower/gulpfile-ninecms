Clean
=====

Syntax
------
::

    clean(paths)

Description
-----------

Delete the output path ``paths.build``.

Dependencies
------------

Should runs before all `build` tasks.

Example
-------
::

    var paths = {
      build: 'build/'
    };

    var gulp = require('gulp');
    var argv = require('yargs').argv;
    var taskMethods = require('gulpfile-ninecms');

    var tasks = {
      clean: function () { return taskMethods.clean(paths); }
    };

    gulp.task('clean', tasks.clean);

    // for production we require the clean method on every individual task
    var build = argv._.length ? argv._[0] === 'build' : false;
    var req = build ? ['clean'] : [];

    // individual tasks
    gulp.task('...', req, ...);

