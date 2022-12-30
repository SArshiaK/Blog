const mongoose = require('mongoose');

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
    authorName: {
        type: String,
        require: true
    },
    authorID: {
        type: Number,
        require: true
    },
    comments: [ String ],
    deleted: {
        type: Boolean,
        require: true,
        default: false
    }
});

module.exports = mongoose.model('posts', postsSchema);