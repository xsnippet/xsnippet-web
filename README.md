XSnippet Web
============

XSnippet is a simple web-service for sharing code snippets on the Internet.
XSnippet Web is a single page application (SPA) for the XSnippet API service.

Years ago it was started as educational project, and nothing changed since
then. That's why the fourth reincarnation is written in JavaScript using
React, Redux, Webpack and other modern technologies.

The source code is distributed under MIT license. Feel free to contribute by
any means. Your feedback is welcome as well!


Develompent
-----------

By default, the source code points to a production instance of XSnippet API.
In order to avoid spamming production database, one can easily setup a local
devenv using `docker-compose`, e.g.

```bash
$ npm run devenv-up
```

and starting XSnippet Web configured to use this local version, e.g.

```bash
$ npm run devenv-start
```


Links
-----

* Source: <https://github.com/xsnippet/xsnippet-web>
* Bugs: <https://github.com/xsnippet/xsnippet-web/issues>
