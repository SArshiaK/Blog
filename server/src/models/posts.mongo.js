const mongoose = require('mongoose');
// const commentsDataBase = require('./comments.mongo');

const postsSchema = new mongoose.Schema({
    postID: {
        type: Number,
        require: true
    },
    title: {
        type: String,
        require: true
    },
    content: {
        type: String,
        require: true
    },
    authorID: {
        type: Number,
        require: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'authors'
    },
    comments: [ { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'comments'
    } ],
    deleted: {
        type: Boolean,
        require: true,
        default: false
    }
});

module.exports = mongoose.model('posts', postsSchema);