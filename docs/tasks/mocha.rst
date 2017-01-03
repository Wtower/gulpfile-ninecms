Mocha tests
===========

Syntax
------
::

    preTest(paths)
    mocha(paths)

Description
-----------

Run mocha_ tests for the files specified in ``paths.mocha``.

Optionally run ``preTest`` before ``mocha`` to add istanbul_ coverage to the files specified in ``paths.js_cover``.

This is mostly useful for Node.js projects and can be otherwise ignored.

The task outputs the results on stdout and also creates a coverage directory with HTML report.

.. _mocha: https://github.com/sindresorhus/gulp-mocha
.. _istanbul: https://github.com/SBoudrias/gulp-istanbul

Dependencies
------------

``preTest`` should have finished before ``mocha`` is run.

Example
-------
::

    var paths = {
      js_cover: [
        'models/*.js',
        'routes/**/*.js',
        'app.js'
      ],
      mocha: [
        'spec/*.js',
        'spec/api/contact.stub.js',
        'spec/api/dashboard.js'
      ],
    };

    var gulp = require('gulp');
    var taskMethods = require('gulpfile-ninecms');

    var tasks = {
      preTest: function () { return taskMethods.preTest(paths); },
      mocha: function () { return taskMethods.mocha(paths); }
    };

    gulp.task('preTest', tasks.preTest);
    gulp.task('mocha', tasks.mocha);
    gulp.task('test', ['preTest'], tasks.mocha);

