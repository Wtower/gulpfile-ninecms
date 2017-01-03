How to use
==========

A sample `gulpfile.js`_ is included in the project.

.. _gulpfile.js: https://github.com/Wtower/gulpfile-ninecms/blob/master/gulpfile.js

You can create new gulpfile or adapt this sample to your needs::

    $ cp node_modules/gulpfile-ninecms/gulpfile.js .

Path configuration
------------------

The first section of the provided gulpfile is an example of a path configuration object.
To customize, edit the gulpfile and the appropriate paths.

There can be multiple path configurations for multiple builds.
For instance, the sample gulpfile provides a default path config for the main site
and an ``admin`` path config for the administration interface.
These two have separate builds so that the main site is not getting bloated with
scripts and styles that are only needed for another part of the site.

For details on tasks, see :doc:`tasks`.
Specify the appropriate paths of the following:

- ``assets``: any :doc:`tasks/assets` files that need to be copied unchanged, such as fonts or images.
- ``less``: any :doc:`tasks/less` files to be compiled.
- ``sass``: any :doc:`tasks/sass` files to be compiled.
- ``css``: any CSS files to be processed.
- ``js``: the JS entry file for browserify to be processed.
- ``js_watch``: any JS files to be watched.
- ``mocha``: any JS files to be tested.
- ``images``: any images to be processed.
- ``build``: the output directory. This is used in most task methods.
- ``fonts``: the fonts output directory.

For example::

    var paths = {
      assets: [],
      ...
    };

Requirements
------------

Include in your gulpfile::

    var taskMethods = require('gulpfile-ninecms');

This deals with gulp requirements regarding the tasks themselves.
Also include any additional requirements such as ``gulp`` and ``argv`` that gulpfile itself may use.

Alternatively, you can copy/paste the task methods from `index.js`_ into the gulpfile.

.. _index.js: https://github.com/Wtower/gulpfile-ninecms/blob/master/index.js

Task wire-up
------------

Multiple tasks may run many times, each for every path configuration set.
Gulp does not provide a way to provide a path parameter to task (`relevant issue`_).
Therefore, we need to 'wire-up' the task methods we use with the appropriate path
into gulp tasks::

    var tasks = {
      clean: function () { return taskMethods.clean(paths); },
      ...
    };

    gulp.task('clean', tasks.clean);

.. _relevant issue: https://github.com/gulpjs/gulp/issues/1225

Execute
-------

To build and watch::

    $ gulp

To build only once (no watch), run::

    $ gulp build

To build for production::

    $ gulp build --production

