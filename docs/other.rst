Other information
=================

Background
----------

Initially developed for sites built with NineCMS_.
As of v0.6.0 the previous (totally basic) package management was removed.
Relevant issue: `django-ninecms#56`_.

.. _NineCMS: https://github.com/Wtower/django-ninecms
.. _django-ninecms#56: https://github.com/Wtower/django-ninecms/issues/56

Several other possibilities have been evaluated and rejected:

- django-bower
- django-pipeline
- django-compressor
- django-webpacks
- django-require
- django-grunt

Useful links
------------

Useful links on setting up a gulpfile

- http://stackoverflow.com/questions/26273358/gulp-minify-all-css-files-to-a-single-file
- http://autoprefixer.github.io/
- https://github.com/gulpjs/gulp/blob/master/docs/recipes/using-multiple-sources-in-one-task.md
- https://github.com/isaacs/node-glob#glob-primer
- http://stackoverflow.com/questions/25038014/how-do-i-copy-directories-recursively-with-gulp
- https://scotch.io/tutorials/automate-your-tasks-easily-with-gulp-js
- http://stackoverflow.com/questions/27399596/how-to-combine-postcss-autoprefixer-with-less
- http://stackoverflow.com/questions/25713118/how-to-perform-multiple-gulp-commands-in-one-task
- https://www.npmjs.com/package/gulp-image-resize
- http://stackoverflow.com/questions/30372637/getting-started-with-browserify-import-local-files

ENOSPC
------

In case that ``gulp watch`` fails with ENOSPC_, increase the `inotify watch limit`_::

    $ echo fs.inotify.max_user_watches=16384 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p  # bash
    > echo fs.inotify.max_user_watches=16384 | sudo tee -a /etc/sysctl.conf; and sudo sysctl -p  # fish

.. _ENOSPC: http://stackoverflow.com/questions/22475849/node-js-error-enospc
.. _inotify watch limit: http://unix.stackexchange.com/questions/13751/kernel-inotify-watch-limit-reached

IDEs
----

PyCharm has a `gulp plugin`_.

.. _gulp plugin: https://www.jetbrains.com/pycharm/help/gulp-tool-window.html
