const express = require('express');

const commentController = require('./comments.controller');

const commentRouter = express.Router();

function checkLoggedIn(req, res, next){
    console.log('Current user is: ', req.user);
    const loggedIn = req.isAuthenticated() && req.user;
    if(!loggedIn){
        return res.status(400).json({error: "Please log in first"});
    }
    next();
}

commentRouter.get('/comments', commentController.httpGetAllComments);
commentRouter.get('/posts/:id/comments/', commentController.httpGetCommentsByPost);
commentRouter.post('/posts/:id/comments', commentController.httpCreateComment);
commentRouter.patch('/comments/:id', commentController.httpUpdateComment);
commentRouter.delete('/comments/:id', commentController.httpDeleteComment);

module.exports = commentRouter;