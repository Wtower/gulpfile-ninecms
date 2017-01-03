CSS concatenate
===============

Syntax
------
::

    css(paths)

Description
-----------

Concatenate CSS files from ``paths.css`` into ``paths.build`` ``/css/style.min.css``.

The concatenation procedure for ``--production``:

- Concatenate_ CSS
- `Auto-prefixes`_ styles
- Minifies_ compiled styles

The compilation procedure for non ``--production``:

- Concatenate_ CSS
- Builds `source maps`_

.. _Concatenate: https://www.npmjs.com/package/gulp-concat
.. _Auto-prefixes: https://www.npmjs.com/package/gulp-autoprefixer
.. _Minifies: https://www.npmjs.com/package/gulp-minify-css
.. _source maps: https://www.npmjs.com/package/gulp-sourcemaps

Dependencies
------------

The task should run after :doc:`less`/:doc:`sass` has finished,
if the output from them is included in the css task.

Example
-------
::

    var paths = {
      css: [
        'node_modules/animate.css/animate.css',
        'build/stylesheets/main.css' // this is the output from LESS/SASS
      ],
      ...
      build: 'build/'
    };

    var gulp = require('gulp');
    var taskMethods = require('gulpfile-ninecms');

    var tasks = {
      less: function () { return taskMethods.less(paths); }
      sass: function () { return taskMethods.sass(paths); }
      css: function () { return taskMethods.css(paths); }
    };

    gulp.task('less', [], tasks.less);
    gulp.task('sass', [], tasks.sass);
    gulp.task('css', ['less', 'sass'], tasks.css);

