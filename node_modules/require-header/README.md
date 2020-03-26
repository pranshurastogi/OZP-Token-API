
Require-Header
=============

Express middleware to handle errors where an expected header is missing.

[![NPM version][shield-npm]][info-npm]
[![Node.js version support][shield-node]][info-node]
[![Build status][shield-build]][info-build]
[![Code coverage][shield-coverage]][info-coverage]
[![Dependencies][shield-dependencies]][info-dependencies]
[![MIT licensed][shield-license]][info-license]


Install
-------

Install Require-Header with [npm][npm]:

```sh
npm install require-header
```


Usage
-----

```js
var requireHeader = require('require-header');
```

`requireHeader` will return a middleware function that will error if the request does not set the given header. The error will have `message` and `status` properties which you can use.

It accepts two arguments. Firstly, the name of a header which is required:

```js
requireHeader('User-Agent');
```

Secondly (optionally) a message which will be used in the error if the request message does not match:

```js
requireHeader('User-Agent', 'User-Agent header is required');
```

### Route-level

```js
var express = require('express');
var app = express();

// Only requests with a User-Agent header will continue
app.get(requireHeader('User-Agent'), function () { ... });
```

If you want to do something useful with the error, for example output a sensible JSON response, you will need to define an error handler for your application (*after* the route definition):

```js
app.use(function (err, req, res, next) {
    res.status(err.status || 500).send({
        message: err.message
    });
});
```

### Application-level

```js
var express = require('express');
var app = express();

// Require a User-Agent header across the entire application
app.use(requireHeader('User-Agent'));
```


Contributing
------------

To contribute to Require-Header, clone this repo locally and commit your code on a separate branch.

Please write unit tests for your code, and check that everything works by running the following before opening a pull-request:

```sh
make ci
```


License
-------

Require-Header is licensed under the [MIT][info-license] license.  
Copyright &copy; 2015, Rowan Manning



[npm]: https://npmjs.org/

[info-coverage]: https://coveralls.io/github/rowanmanning/require-header
[info-dependencies]: https://gemnasium.com/rowanmanning/require-header
[info-license]: LICENSE
[info-node]: package.json
[info-npm]: https://www.npmjs.com/package/require-header
[info-build]: https://travis-ci.org/rowanmanning/require-header
[shield-coverage]: https://img.shields.io/coveralls/rowanmanning/require-header.svg
[shield-dependencies]: https://img.shields.io/gemnasium/rowanmanning/require-header.svg
[shield-license]: https://img.shields.io/badge/license-MIT-blue.svg
[shield-node]: https://img.shields.io/badge/node.js%20support-0.10–7-brightgreen.svg
[shield-npm]: https://img.shields.io/npm/v/require-header.svg
[shield-build]: https://img.shields.io/travis/rowanmanning/require-header/master.svg
