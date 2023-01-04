const express = require('express');

const commentController = require('./comments.controller');

const commentRouter = express.Router();

commentRouter.get('/comments', commentController.httpGetAllComments);
commentRouter.get('/posts/:id/comments/', commentController.httpGetCommentsByPost);
commentRouter.post('/posts/:id/comments', commentController.httpCreateComment);
commentRouter.patch('/comments/:id', commentController.httpUpdateComment);
commentRouter.delete('/comments/:id', commentController.httpDeleteComment);

module.exports = commentRouter;