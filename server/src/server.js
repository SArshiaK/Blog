const http = require('http');

const express = require('express');

require('dotenv').config();

const cors = require("cors");

const PORT = process.env.PORT || 8000;

const { mongoConnect } = require('./services/mongo');

const authorsRouter = require('./routes/authors/authors.router');
const postRouter = require('./routes/posts/posts.router');
const commentRouter = require('./routes/comments/comments.router');

const app = express();

app.use(cors({
    origin: "http://localhost:8000"
})
);

app.use(express.json());

app.use('/', authorsRouter);
app.use('/', postRouter);
app.use('/', commentRouter);



const server = http.createServer(app);

async function startServer(){
    await mongoConnect();
    
    server.listen(PORT, () => {
        console.log(`Listening on PORT ${PORT}`);
    });
};

startServer();


