const http = require('http');

const express = require('express');

require('dotenv').config();

const cors = require("cors");

const PORT = process.env.PORT || 8000;

const { mongoConnect } = require('./services/mongo');

const authorsRouter = require('./routes/authors/authors.router');
const postRouter = require('./routes/posts/posts.router');

const app = express();

app.use(cors({
    origin: "http://localhost:8000"
})
);

app.use(express.json());

app.use('/', authorsRouter);
app.use('/', postRouter);

app.get('/what', (req, res) => {
    res.status(200).json({lieeee: "nooooo"});
});



const server = http.createServer(app);

async function startServer(){
    await mongoConnect();
    
    server.listen(PORT, () => {
        console.log(`Listening on PORT ${PORT}`);
    });
};

startServer();


