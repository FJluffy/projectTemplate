const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
        maxlength: 10
    },
    password: {
        type: String,
        require: true,
        minlength: 6,
        maxlength: 12
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        required : true
    }
}, {
    //todos : [{type : mongoose.Schema.Types.ObjectId,Ref:'Todo'}]
});

userSchema.pre('save', function (next) {
    if (!this.isModified('password'))
        return next();
    bcrypt.hash(this.password, 10, (err, passwordHash) => {
        if (err)
            return next(err);
        this.password = passwordHash;
        next();
    });
});

userSchema.methods.comparePassword = function (password,cb) {
    bcrypt.compare(password, this.password, (err, isMatch) => {
        if (err)
            return cb(err);
        else {
            if (!isMatch)
                return cb(null, isMatch);
            return cb(null, this);
        }
    })
}

const User = mongoose.model('User', userSchema);

module.exports = User;