const mongoose = require('mongoose');

const commnetsSchema = new mongoose.Schema({
    commentID: {
        type: Number,
        require: true
    },
    content: {
        type: String,
        require: true
    },
    postID: {
        type: Number,
        require: true
    },
    authorID: {
        type: Number,
        require: true
    },
    deleted: {
        type: Boolean,
        require: true,
        default: false
    }
});

module.exports = mongoose.model('comments', commnetsSchema);