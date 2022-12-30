const express = require('express');

authorsRouter = express.Router();

const authorsController = require('./authors.controller');

authorsRouter.post('/authors', authorsController.httpCreateAuthor);
authorsRouter.delete('/authors/:id', authorsController.httpDeleteAuthor);
authorsRouter.patch('/authors/:id', authorsController.httpUpdateAuthor);

module.exports = authorsRouter;