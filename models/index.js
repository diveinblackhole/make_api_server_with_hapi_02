var mongoose        = require('mongoose');

exports.Account   = mongoose.model('Account', require('./account').AccountSchema, 'Account');