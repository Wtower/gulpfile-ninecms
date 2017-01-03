Image optimisation
==================

Syntax
------
::

    images(paths, images)
    clean_image_opts(paths)

Description
-----------

Create optimized images as specified in ``images`` object into ``paths.images``.

Use ``clean_image_opts`` to delete previously created image styles in ``paths.images``.
Be careful that paths specified are correct before running.

Uses `gulp_image_resize`_ to create the images into a specified sub-directory of the original path.

.. _gulp_image_resize: https://www.npmjs.com/package/gulp-image-resize

Example
-------
::

    var paths = {
      images: 'media/'
    };
    var images = [
      {
        build: '/thumbnail',
        src: ['media/*/image/*.+(jpg|png)'],
        width: 150
      }, {
        build: '/thumbnail_crop',
        src: ['media/*/image/*.+(jpg|png)'],
        width: 150,
        height: 150,
        crop: true
      }, {
        build: '/thumbnail_upscale',
        src: ['media/*/image/*.+(jpg|png)'],
        width: 150,
        height: 150,
        upscale: true
      }, {
        build: '/gallery_style',
        src: ['media/*/image/*.+(jpg|png)'],
        width: 400,
        height: 1000
      }, {
        build: '/blog_style',
        src: ['media/*/image/*.+(jpg|png)'],
        width: 350,
        height: 226,
        crop: true
      }, {
        build: '/large',
        src: ['media/*/image/*.+(jpg|png)'],
        width: 1280,
        height: 1280
      }
    ];

    var gulp = require('gulp');
    var taskMethods = require('gulpfile-ninecms');

    var tasks = {
      images: function () { return taskMethods.images(paths, images); },
    };

    gulp.task('images', [], tasks.images);

