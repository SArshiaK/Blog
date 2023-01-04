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
    publishedDate: {
        type: String,
        require: true
    },
    postID: {type: Number,require: true},
    post: {type: mongoose.Schema.Types.ObjectId, ref:'posts'},
    authorID: {type: Number, require: true },
    author: {type: mongoose.Schema.Types.ObjectId, ref:'authors', require: true},
    deleted: {
        type: Boolean,
        require: true,
        default: false
    }
});

// const comments = mongoose.model('comments', commnetsSchema);

// module.exports = comments;

module.exports = mongoose.model('comments', commnetsSchema);