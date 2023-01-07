const commentModel = require('../../models/comments.model');

async function httpGetAllComments(req, res){
    const allComments = await commentModel.getAllComment();

    res.status(200).json({comments: allComments});
};

async function httpGetCommentsByPost(req, res){
    const postid = Number(req.params.id);

    const postComments = await commentModel.getCommentsByPost(postid);

    res.status(200).json({comments: postComments});
};

async function httpCreateComment(req, res){
    const postid = req.params.id;
    const newComment = req.body;

    if(!newComment.content || !newComment.authorID){
        return res.status(400).json({error: "Missing required property!"});
    };

    const done = await commentModel.createNewComment(newComment, postid);
    if(!done){
        return res.status(404).json('Post or Author not found!');
    }
    return res.status(200).json(newComment)
};

async function httpUpdateComment(req, res){
    const commentid = Number(req.params.id);
    
    const commentToUpdate = await commentModel.findCommetnByID(commentid);
    if(!commentToUpdate){
        res.status(404).json({error: "comment not found"});
    };

    const changes = req.body;

    await commentModel.updateComment(changes, commentid);

    const updatedComment = await commentModel.findCommetnByID(commentid);
    res.status(200).json(updatedComment);
};

async function httpDeleteComment(req, res){
    const commentid = Number(req.params.id);

    const commentToDelete = await commentModel.findCommetnByID(commentid);
    if(!commentToDelete){
        return res.status(404).json({error: "comment not found"});
    };

    await commentModel.deleteComment(commentid);
    res.status(200).json({status: "Comment deleted successfully"});
};

module.exports = {
    httpGetAllComments,
    httpGetCommentsByPost,
    httpCreateComment,
    httpUpdateComment,
    httpDeleteComment
}