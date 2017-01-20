Base64 images
=============

Syntax
------
::

    base64(paths)

Description
-----------

Convert all files in ``url()`` in provided stylesheets from ``paths.base64`` into base64-encoded data URI strings.
The output is concatenated into a ``paths.build``/``css/base64.css`` file.

Uses `gulp-base64`_.

Please note that this is useful only for minor performance gains.
Not useful for `embedding images into emails`_ as most clients do not accept data uri.

.. _gulp-base64: https://www.npmjs.com/package/gulp-base64
.. _embedding images into emails: http://stackoverflow.com/questions/9110091/base64-encoded-images-in-email-signatures

Example
-------
::

    var paths = {
      base64: ['build/css/built_from_sass.css'],
      build: 'build/'
    };

    var gulp = require('gulp');
    var taskMethods = require('gulpfile-ninecms');

    var tasks = {
      base64: function () { return taskMethods.base64(paths); },
    };

    gulp.task('base64', req.concat(['sass']), tasks.base64);

