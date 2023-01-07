const express = require('express');

const postRouter = express.Router();

const postController = require('./posts.controller');

function checkLoggedIn(req, res, next){
    console.log('Current user is: ', req.user);
    const loggedIn = req.isAuthenticated() && req.user;
    if(!loggedIn){
        return res.status(400).json({error: "Please log in first"});
    }
    next();
}

postRouter.get('/posts', postController.httpGetAllPosts);

postRouter.get('/authors/:id/posts', postController.httpGetPostsByAuthor);

postRouter.post('/posts', postController.httpCreatePost);
postRouter.patch('/posts/:id', postController.httpUpdatePost);
postRouter.delete('/posts/:id', postController.httpDeletePost);

module.exports = postRouter;