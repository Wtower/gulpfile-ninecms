Lint JS
=======

Syntax
------
::

    lintJs(paths)

Description
-----------

Analyze ``paths.js_lint`` and output report to stdout.

Uses the ESlint_ library:

    Code linting is a type of static analysis that is frequently used to find problematic patterns or code that
    doesn’t adhere to certain style guidelines.

.. _ESlint: https://www.npmjs.com/package/gulp-eslint

It uses the default rules except:

- control characters (eg ``\n``) are *not* required for file appends::

        'no-control-regex': 'off'

- allow double quotes to avoid escaping single::

        'quotes': ['error', 'single', {avoidEscape: true}]

- relax curly braces::

        'curly': ['error', 'multi-line']

Dependencies
------------

The task should run after :doc:`ng_html` has finished,
if the output from it is included in the js task.

Example
-------
::

    var paths = {
      js_lint: [
        'private/javascripts/*.js',
        '*.js'
      ],
      build: 'build/'
    };

    var gulp = require('gulp');
    var taskMethods = require('gulpfile-ninecms');

    var tasks = {
      lintJs: function () { return taskMethods.lintJs(paths); },
    };

    gulp.task('lintjs', tasks.lintjs);

