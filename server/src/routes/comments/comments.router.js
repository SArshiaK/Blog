const express = require('express');

const commentController = require('./comments.controller');

const commentRouter = express.Router();

commentRouter.get('/comments', commentController.httpGetAllComments);
commentRouter.get('/posts/comments/:id', commentController.httpGetCommentsByPost);
commentRouter.post('/comments', commentController.httpCreatComment);
commentRouter.patch('/comments/:id', commentController.httpUpdateComment);
commentRouter.delete('/comments/:id', commentController.httpDeleteComment);

module.exports = commentRouter;