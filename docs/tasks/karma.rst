Karma tests
===========

Syntax
------
::

    karma()

Description
-----------

Run karma_ tests based on a ``/karma.conf.js`` file.

This is mostly useful for front-end JS such as Angular apps.

The output is configured in the above conf file.

.. _karma: https://github.com/karma-runner/karma

Example
-------
::

    var gulp = require('gulp');
    var taskMethods = require('gulpfile-ninecms');
    gulp.task('karma', tasksMethods.karma);

