const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const accountSchema = new Schema({
    accountname: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 2
    },
}, {
    timestamps: true,
});

const Account = mongoose.model('Account', accountSchema);

module.exports = Account;