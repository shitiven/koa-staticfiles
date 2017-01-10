'use strict';

const request = require('supertest');
const serve = require('..');
const Koa = require('koa');

describe('wht path is not rewrite', function() {

    it('get 200', function(done) {
        const app = new Koa();
        app.use(serve('.'));

        request(app.listen())
        .get('/package.json')
        .expect(200, done)
    });

    it('prefix rewrite 200', function(done) {
        const app = new Koa();
        app.use(serve('.', {
            prefix: "/static"
        }));

         request(app.listen())
        .get('/static/package.json')
        .expect(200, done)
    });

    it('get 404', function(done) {

        const app = new Koa();
        app.use(serve('.'));

         request(app.listen())
        .get('/static/package.json')
        .expect(404, done)

    })

});