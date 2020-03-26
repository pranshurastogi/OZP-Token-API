// jshint maxstatements: false
// jscs:disable maximumLineLength, disallowMultipleVarDecl
'use strict';

var assert = require('proclaim');
var mockery = require('mockery');
var sinon = require('sinon');

describe('require-header', function () {
    var error400, httpError, requireHeader;

    beforeEach(function () {
        mockery.enable({
            useCleanCache: true,
            warnOnUnregistered: false,
            warnOnReplace: false
        });
        error400 = {status: 400};
        httpError = sinon.stub().returns(error400);
        mockery.registerMock('http-errors', httpError);
        requireHeader = require('../../lib/require-header');
    });

    afterEach(function () {
        mockery.deregisterAll();
        mockery.disable();
    });

    it('should be a function', function () {
        assert.isFunction(requireHeader);
    });

    it('should return a function', function () {
        assert.isFunction(requireHeader());
    });

    describe('returned function', function () {
        var request, response;

        beforeEach(function () {
            request = {
                headers: {}
            };
            response = {};
        });

        describe('when header is present', function () {

            it('should not pass an error', function (done) {
                request.headers.foo = 'bar';
                requireHeader('foo')(request, response, function (error) {
                    assert.isUndefined(error);
                    done();
                });
            });

            it('should ignore case in the required header', function (done) {
                request.headers.foo = 'bar';
                requireHeader('FOO')(request, response, function (error) {
                    assert.isUndefined(error);
                    done();
                });
            });

        });

        describe('when header is not present', function () {

            it('should pass a 400 error', function (done) {
                requireHeader('foo')(request, response, function (error) {
                    assert.strictEqual(error, error400);
                    assert.strictEqual(httpError.withArgs(400, 'foo header is required').callCount, 1);
                    done();
                });
            });

            it('should pass a 400 error with a custom message if specified', function (done) {
                requireHeader('foo', 'bar')(request, response, function (error) {
                    assert.strictEqual(error, error400);
                    assert.strictEqual(httpError.withArgs(400, 'bar').callCount, 1);
                    done();
                });
            });

        });

        describe('when header is present but empty', function () {

            it('should pass a 400 error', function (done) {
                request.headers.foo = '';
                requireHeader('foo')(request, response, function (error) {
                    assert.strictEqual(error, error400);
                    assert.strictEqual(httpError.withArgs(400, 'foo header is required').callCount, 1);
                    done();
                });
            });

        });

    });

});
