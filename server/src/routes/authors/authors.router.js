const express = require('express');

authorsRouter = express.Router();

const authorsController = require('./authors.controller');

function checkLoggedIn(req, res, next){
    console.log('Current user is: ', req.user);
    const loggedIn = req.isAuthenticated() && req.user;
    if(!loggedIn){
        return res.status(400).json({error: "Please log in first"});
    }
    next();
}

authorsRouter.get('/authors', checkLoggedIn, authorsController.httpGetAllAuthors); // It has Session log in check

authorsRouter.post('/authors', authorsController.httpCreateAuthor);
authorsRouter.delete('/authors/:id', authorsController.httpDeleteAuthor);
authorsRouter.patch('/authors/:id', authorsController.httpUpdateAuthor);

module.exports = authorsRouter;