var mongoose = require('mongoose');

var userSchema = mongoose.Schema({

    answer: { type: String, },
    question: { type: String },
    date: { type: Date, default: Date.now },

    answeredBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },


    upvotedBy: [{ type: String }],
    count: { type: Number, default: 0 },

    comment: [{ type: String }],
    commentedBy: [{ type: String }]


});


module.exports = mongoose.model('answer', userSchema);