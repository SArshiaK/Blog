const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
    authorID: {
        type: Number,
        require: true,
    },
    firstName: {
        type: String,
        require: true,
    },
    lastName: {
        type: String,
        require: true
    },
    gmail: {
        type: String,
        require: true,
    },
    age: {
        type: Number,
        require: true,
    },
    deleted: {
        type:Boolean,
        require: true,
        default: false,
    },
    posts: [ {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'posts'
    } ],
    comments: [ {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'comments'
    }],
});

module.exports = mongoose.model('authors', authorSchema);