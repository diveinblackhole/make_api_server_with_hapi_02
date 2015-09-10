'use strict';

var bcrypt          = require('bcryptjs');
var _               = require('underscore');
var mongoose        = require('mongoose');
var Model           = require('../models');

// 계정 생성
exports.createAccount = function(params) {
    return new Promise(function(resolve, reject) {
        //비밀번호 암호화
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(params.password, salt);

        var account = {
            email   : params.email,
            password: hash,
            name    : params.name
        };

        Model.Account.create(account, function (err, account) {
            if (err) {
                return reject(err)
            }

            account.password = undefined; //비밀번호는 숨겨서 보내기
            resolve(account)
        });
    });
};

// 계정 수정
exports.updateAccount = function(account_id, params) {
    return new Promise(function(resolve, reject) {
        _.each(Object.keys(params), function (key) {
            if (key === 'password') {
                //비밀번호 암호화
                var salt = bcrypt.genSaltSync(10);
                var hash = bcrypt.hashSync(params.password, salt);
                account['password'] = hash;
            } else {
                account[key] = params[key];
            }
        });

        account.save(function (err) {
            if (err) {
                return reject(err);
            }
            resolve(account);
        });
    });
};

// 계좌 조회
exports.findAccount = function(account_id) {
    return new Promise(function(resolve, reject) {
        Model.Account.findById(account_id)
            .exec(function (err, account) {
                if (err) return reject(err);
                resolve(account);
            });
    });
};

// 계정 삭제
exports.deleteAccount = function(account_id) {
    return new Promise(function(resolve, reject) {
        Model.Account.findByIdAndRemove(account_id)
            .exec(function (err) {
                if (err) return reject(err);
                resolve();
            });
    });
};
