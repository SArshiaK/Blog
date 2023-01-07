const commentsDataBase = require('./comments.mongo');
const postsDatabase = require('./posts.mongo');
const authorDatabase = require('./author.mongo');
// const mongoose = require('mongoose');
// const toObjID = mongoose.Types.ObjectId

const DEFAULT_COMMENT_ID = 1;

async function findCommetnByID(commentid){
    return await commentsDataBase.findOne({commentID: commentid});
}

async function getCommentID(){
    const lastComment = await commentsDataBase.findOne({}).sort({commentID: -1});
    if(!lastComment){
        return DEFAULT_COMMENT_ID;
    }
    return lastComment.commentID + 1;
}

async function getAllComment(){
    return await commentsDataBase.find({})
    .sort({commentID: -1})
    .populate('author', {
        firstName:1,
        lastName:1,
        gmail:1,
        authorID:1,
        _id:0
    })
    .populate('post', {
        postID: 1,
        title: 1,
        _id: 0,
    })
    .select({
        authorID:0,
        postID:0,
        _id:0,
        __v:0
    })
};

async function getCommentsByPost(postid){
    // const post = await postsDatabase.findOne({postID: postid}).populate('comments', {content: 1, author: 1, _id: 0, deleted: 1},);
    const post = await postsDatabase.findOne({postID: postid}).populate({
        path: 'comments',
        select: {content: 1, deleted:1, _id:0},
        populate:[
          {
            path: 'author',
            model: 'authors',
            select: {firstName: 1, lastName:1, gmail:1, _id:0},
          },
          {
              path: 'post',
              model: 'posts',
              select: {
                postID: 1,
                title: 1,
                _id: 0
              }
          }
        ]
      })
    return post.comments;
};

async function addComment(comment){
    await commentsDataBase.findOneAndUpdate({commentID: comment.commentID}, comment, {upsert: true});
    const postid = comment.postID;
    const authorid = comment.authorID;

    const addedComment = await commentsDataBase.findOne({commentID: comment.commentID});
    
    // Add Comment to Post
    const post = await postsDatabase.findOne({postID: postid});
    post.comments.push(addedComment._id);
    await postsDatabase.updateOne({postID: postid}, post);
    
    // Add Comment to Author
    const author = await authorDatabase.findOne({authorID: authorid});
    author.comments.push(addedComment._id);
    await authorDatabase.updateOne({authorID: authorid}, author);
};    

async function createNewComment(comment, postid){
    const CommentID = await getCommentID(); 
    
    // Add Comment to Post and Author
    const author = await authorDatabase.findOne({authorID: comment.authorID});
    if(!author){
        return false;
    }
    const post = await postsDatabase.findOne({postID: postid});
    if(!post){
        return false;
    }
    const date = new Date().toLocaleString('fa-IR');

    const newComment = Object.assign(
        comment, 
        {
            commentID: Number(CommentID),
            publishedDate: date, 
            postID: postid,
            author: author._id, 
            post: post._id,
            deleted: false, 
        });

    await addComment(newComment);
    return true;
};

async function updateComment(changedComment, commentid){
    await commentsDataBase.updateOne({commentID: commentid}, changedComment);
};

async function deleteComment(commentid){
    // await commentsDataBase.updateOne({commentID: commentid}, {deleted: true});

    const comment = await commentsDataBase.findOne({commentID: commentid});
    await postsDatabase.findOneAndUpdate(
        { postID: comment.postID },
        {
            $pull: { comments: comment._id },
        },
        { new: true }
    );
    
    await authorDatabase.findOneAndUpdate(
        { authorID: comment.authorID},
        {
            $pull: {comments: comment._id},
        },
        { new: true },
    )

    await commentsDataBase.deleteOne({commentID: commentid});
};

module.exports = {
    findCommetnByID,
    getAllComment,
    getCommentsByPost,
    createNewComment,
    updateComment,
    deleteComment
}