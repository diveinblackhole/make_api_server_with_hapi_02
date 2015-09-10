var mongoose        = require('mongoose');
var Schema          = mongoose.Schema;

exports.AccountSchema = new Schema({
    email               : {type: String, index: {unique: true}, required: true},
    password            : {type: String, required: true, select: false},
    name                : {type: String, required: true}
});
