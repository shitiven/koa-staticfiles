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

    });

    it('post 404', function(done) {

        const app = new Koa();
        app.use(serve('.'));

        request(app.listen())
        .post('/package.json')
        .expect(404, done);

    });

    it('have body sent', function(done) {

        const app = new Koa();
        app.use(serve("."));
        app.use(function(ctx, next){
            ctx.body = "hey"
        });

        request(app.listen())
        .get("/package.json")
        .expect("hey", done);

    });

    it("non-slashed request redirect", function(done) {

        const app = new Koa();
        app.use(serve(".", {
            prefix: "/doc"
        }));

        request(app.listen())
        .get("/doc")
        .expect(302, done);

    });

});