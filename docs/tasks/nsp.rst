Nsp security
============

Syntax
------
::

    nsp()

Description
-----------

Run Node Security (nsp_) to help identify known vulnerabilities
by npm packages that are used in the project's ``package.json``.
Outputs to stdout.

.. _nsp: https://www.npmjs.com/package/nsp

Example
-------
::

    var gulp = require('gulp');
    var taskMethods = require('gulpfile-ninecms');
    gulp.task('nsp', tasksMethods.nsp);

