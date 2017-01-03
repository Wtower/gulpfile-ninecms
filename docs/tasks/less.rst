LESS
====

Syntax
------
::

    less(paths)

Description
-----------

Compile LESS files from ``paths.less`` to ``paths.build``.
Maintains the same file names, but replacing the extention ``.less`` to ``.css``.

The compilation procedure for ``--production``:

- `Compiles LESS`_
- `Auto-prefixes`_ styles
- Minifies_ compiled styles

The compilation procedure for non ``--production``:

- `Compiles LESS`_
- Builds `source maps`_

.. _Compiles LESS: https://www.npmjs.com/package/gulp-less
.. _Auto-prefixes: https://www.npmjs.com/package/gulp-autoprefixer
.. _Minifies: https://www.npmjs.com/package/gulp-minify-css
.. _source maps: https://www.npmjs.com/package/gulp-sourcemaps

Dependencies
------------

The :doc:`css` task should run after less has finished, if the output from less is included in the css task.

Example
-------
::

    var paths = {
      less: [
        'private/stylesheets/*.less'
      ],
      build: 'build/'
    };

    var gulp = require('gulp');
    var taskMethods = require('gulpfile-ninecms');

    var tasks = {
      less: function () { return taskMethods.less(paths); }
    };

    gulp.task('less', [], tasks.less);

