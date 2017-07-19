var mongoose = require('mongoose');

var userSchema = mongoose.Schema({

    question: { type: String },

    date: { type: Date, default: Date.now },

    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }



});


module.exports = mongoose.model('post', userSchema);