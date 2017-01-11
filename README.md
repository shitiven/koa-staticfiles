# koa-staticfiles

[![Build Status](https://travis-ci.org/EasingLab/koa-staticfiles.svg?branch=master)](https://travis-ci.org/EasingLab/koa-staticfiles)
[![Coverage Status](https://coveralls.io/repos/github/koajs/static/badge.svg?branch=master)](https://coveralls.io/github/koajs/static?branch=master)

Static file serving middleware for koa 2.x with directory, rewrite and index support

## Installation

```bash
$ npm install koa-staticfiles
```

## API

```js
var koa = require('koa');
var app = koa();
app.use(require('koa-staticfiles')(rootDir, opts));
```

* `rootDir` root directory string. nothing above this root directory can be served
* `opts` options object.

### Options

- `prefx` rewrite path
 - `maxage` Browser cache max-age in milliseconds. defaults to 0
 - `hidden` Allow transfer of hidden files. defaults to false
 - `index` Default file name, defaults to 'index.html'
 - `gzip`  Try to serve the gzipped version of a file automatically when gzip is supported by a client and if the requested file with .gz extension exists. defaults to true.

## Example

```js
var serve = require('koa-static');
var koa = require('koa');
var app = koa();

//GET /package.json
app.use(serve('.'));

// or use absolute paths
app.use(serve(path.join(__dirname, ".")));

// or use optx.prefix rewrite support
// GET /static/package.json
app.use(serve('.', {
    prefix: "static"
}));

app.listen(3000);

console.log('listening on port 3000');
```

### See also

- [koajs/koa-send](https://github.com/koajs/send)
- [koajs/koa-static](https://github.com/koajs/static)
