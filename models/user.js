var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var userSchema = mongoose.Schema({
    fullname: { type: String, required: true },
    img: { type: String },

    bio: { type: String },
    email: { type: String, required: true, index: { unique: true } },
    password: { type: String, default: '' },
    followers: [{ type: String }],
    following: [{ type: String }],


    passwordResetToken: { type: String, default: '' },
    passwordResetExpires: { type: Date, default: Date.now }
});

userSchema.methods.encryptPassword = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
}

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('User', userSchema);