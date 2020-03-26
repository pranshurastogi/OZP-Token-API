'use strict';

var httpError = require('http-errors');

module.exports = requireHeader;

function requireHeader (header, message) {
    message = message || header + ' header is required';
    return function (request, response, next) {
        if (!request.headers[header.toLowerCase()]) {
            return next(httpError(400, message));
        }
        next();
    };
}
