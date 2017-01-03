SASS/SCSS
=========

Syntax
------
::

    sass(paths)

Description
-----------

Compile SASS and SCSS files from ``paths.sass`` to ``paths.build``.
Maintains the same file names, but replacing the extention ``.s?ss`` to ``.css``.

The compilation procedure for ``--production``:

- `Compiles SASS`_
- `Auto-prefixes`_ styles
- Minifies_ compiled styles

The compilation procedure for non ``--production``:

- `Compiles SASS`_
- Maintains comments
- Builds `source maps`_

.. _Compiles SASS: https://www.npmjs.com/package/gulp-sass
.. _Auto-prefixes: https://www.npmjs.com/package/gulp-autoprefixer
.. _Minifies: https://www.npmjs.com/package/gulp-minify-css
.. _source maps: https://www.npmjs.com/package/gulp-sourcemaps

Dependencies
------------

The :doc:`css` task should run after sass has finished, if the output from sass is included in the css task.

Example
-------
::

    var paths = {
      sass: [
        'private/stylesheets/*.s?ss',
        'private/javascripts/my-angular-app/**/*.s?ss'
      ],
      build: 'build/'
    };

    var gulp = require('gulp');
    var taskMethods = require('gulpfile-ninecms');

    var tasks = {
      sass: function () { return taskMethods.sass(paths); }
    };

    gulp.task('sass', [], tasks.sass);

