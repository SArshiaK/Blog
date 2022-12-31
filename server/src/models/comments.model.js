const commentsDataBase = require('./comments.mongo');
const postsDatabase = require('./posts.mongo');

const DEFAULT_COMMENT_ID = 1;

async function findCommetnByID(commentid){
    return await commentsDataBase.findOne({commentID: commentid});
}

async function getLastCommentID(){
    const lastComment = await commentsDataBase.findOne({}).sort({commentID: -1});
    if(!lastComment){
        return DEFAULT_COMMENT_ID;
    }
    return lastComment.commentID;
}

async function getAllComment(){
    return await commentsDataBase.find({}).sort({commentID: -1})
};

async function getCommentsByPost(postid){
    const post = await postsDatabase.findOne({postID: postid});
    return post.comments;
};

async function addComment(comment){
    await commentsDataBase.findOneAndUpdate({commentID: comment.commentID}, comment, {upsert: true});
};

async function createNewComment(comment){
    const lastCommentID = await getLastCommentID(); 
    const newComment = Object.assign(comment, {deleted: false, commentID: Number(lastCommentID + 1)});

    await addComment(newComment);
};

async function updateComment(changedComment, commentid){
    await commentsDataBase.updateOne({commentID: commentid}, changedComment);
};

async function deleteComment(commentid){
    await commentsDataBase.updateOne({commentID: commentid}, {deleted: true});
};

module.exports = {
    findCommetnByID,
    getAllComment,
    getCommentsByPost,
    createNewComment,
    updateComment,
    deleteComment
}