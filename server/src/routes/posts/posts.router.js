const express = require('express');

const postRouter = express.Router();

const postController = require('./posts.controller');

postRouter.get('/posts', postController.httpGetAllPosts);

postRouter.get('/authors/:id/posts', postController.httpGetPostsByAuthor);

postRouter.post('/posts', postController.httpCreatePost);
postRouter.patch('/posts/:id', postController.httpUpdatePost);
postRouter.delete('/posts/:id', postController.httpDeletePost);

module.exports = postRouter;