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

postRouter.get('/posts', checkLoggedIn, postController.httpGetAllPosts);

postRouter.get('/authors/:id/posts', checkLoggedIn, postController.httpGetPostsByAuthor);

postRouter.post('/posts', checkLoggedIn, postController.httpCreatePost);
postRouter.patch('/posts/:id', checkLoggedIn, postController.httpUpdatePost);
postRouter.delete('/posts/:id', checkLoggedIn, postController.httpDeletePost);

module.exports = postRouter;