Inline CSS in HTML
==================

Syntax
------
::

    inlineCss(paths)

Description
-----------

Convert all css styles of an HTML file specified in ``paths.inlineCss.html`` into inline styles.
Outputs to ``paths.inlineCss.build``. Useful for emails.

Uses `gulp-inline-css`_.

.. _gulp-inline-css: https://www.npmjs.com/package/gulp-inline-css

Example
-------
::

    var paths = {
      inlineCss: {
        html: 'private/html/email_body.html',
        build: 'templates/envelope/'
      }
    };

    var gulp = require('gulp');
    var taskMethods = require('gulpfile-ninecms');

    var tasks = {
      inlineCss: function () { return taskMethods.inlineCss(paths); }
    };

    gulp.task('inlineCss', req.concat(['sass']), tasks.inlineCss);

