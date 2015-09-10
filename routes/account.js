'use strict';

var joi = require('joi');

var AccountCont     = require('../controllers/account');

//입력값 오류시 결과 처리
var ValidationError = function (request, reply, source, error) {
    var path;

    error = error.data.details[0];
    if (error) {
        if (error.hasOwnProperty('message')) {
            console.log(error.message, 'VALIDATION');
        }

        if (error.hasOwnProperty('path')) {
            path = error.path;
        }
    }

    reply(error);
};


module.exports = function (server) {
    server.route({
        method: 'POST',
        path: '/account',
        config: {
            tags: ['api'],
            notes: '회원 가입',
            handler: function(req, reply) {
                var params = req.payload;

                AccountCont.createAccount(params)
                    .then(function(account) {
                        reply(null, account);
                    })
                    .catch(function(err) {
                        reply(err)
                    });
            },
            validate: {
                payload: {
                    email: joi.string().email().required(),
                    password: joi.string().alphanum().min(4).max(10).required(),
                    name: joi.string().min(4).max(10).required()
                },
                failAction: ValidationError
            }
        }
    });

    server.route({
        method: 'PUT',
        path: '/account',
        config: {
            tags: ['api'],
            notes: '회원 수정',
            handler: function(req, reply) {
                var account_id = req.payload;
                var params = req.payload;

                AccountCont.updateAccount(account_id, params)
                    .then(function(account) {
                        reply(null, account);
                    })
                    .catch(function(err) {
                        reply(err);
                    });
            },
            validate: {
                payload: {
                    email: joi.string().email(),
                    password: joi.string().alphanum().min(4).max(10),
                    name: joi.string().min(4).max(10)
                },
                failAction: ValidationError
            }
        }
    });

    server.route({
        method: 'DELETE',
        path: '/account/{account_id}',
        config: {
            notes: '회원 탈퇴',
            tags: ['api'],
            handler: function(req, reply) {
                var account_id = req.params.account_id;

                AccountCont.deleteAccount(account_id)
                    .then(reply())
                    .catch(function(err) {
                        reply(err);
                    });
            },
            validate: {
                params: {
                    account_id: joi.string().required()
                },
                failAction: ValidationError
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/account/{account_id}',
        config: {
            tags: ['api'],
            notes: '회원 조회',
            handler: function(req, reply) {
                var account_id = req.params.account_id;

                AccountCont.findAccount(account_id)
                    .then(function(account) {
                        reply(null, account);
                    })
                    .catch(function(err) {
                        reply(err);
                    });
            },
            validate: {
                params: {
                    account_id: joi.string().required()
                },
                failAction: ValidationError
            }
        }
    });
};