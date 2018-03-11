'use strict';
var supertest = require('supertest');
var app = require('../app.js');
var request = supertest(app.listen(3000));

describe('api测试', function () {
    describe('api测试', function () {
        it('测试/index返回', function (done) {
            request.get('/index')
                .expect(200)
                .end(function (err, res) {
                    if (res.body == "Hello Koa2.0!") {
                        done();
                    } else {
                        done(err)
                    }
                });
        });
    });
});