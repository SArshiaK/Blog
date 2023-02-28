const fs = require('fs');
const http = require('http');
const https = require('https');
const helmet = require('helmet');


const express = require('express');
const path = require('path');
const passport = require('passport');
const { Strategy } = require('passport-google-oauth20');
const cookieSession = require('cookie-session')

require('dotenv').config();

const cors = require("cors");

const PORT = process.env.PORT || 8000;

const config = {
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET,
    COOKIE_KEY_1: process.env.COOKIE_KEY_1,
    COOKIE_KEY_2: process.env.COOKIE_KEY_2
}

const { mongoConnect } = require('./services/mongo');

const authorsRouter = require('./routes/authors/authors.router');
const postRouter = require('./routes/posts/posts.router');
const commentRouter = require('./routes/comments/comments.router');

const AUTH_OPTIONS = {
    callbackURL: '/auth/google/callback',
    clientID: config.CLIENT_ID,
    clientSecret: config.CLIENT_SECRET
}

function verufyCallback(accessToken, refreshToken, profile, done){
    console.log('Google Profile', profile);
    // const authorid = profile['id'];
    // const gmail = profile['_json']['email'];
    // console.log(authorid + ' ' + gmail);
    console.log(accessToken);
    done(null, profile);
}

passport.use(new Strategy(AUTH_OPTIONS, verufyCallback));
// Save Session to cookie
passport.serializeUser((user, done) => {
    done(null, user.id);
});
// Read session from the cookie
passport.deserializeUser((id, done) => {
    done(null, id);
});

const app = express();


app.use(cookieSession({
    name: 'session',
    maxAge: 1000 * 60 * 60 * 24,// ms
    keys: [ config.COOKIE_KEY_1, config.COOKIE_KEY_2 ]
}))
app.use(passport.initialize());
app.use(passport.session());

// app.use(helmet()); ?????? I cant use oauth while i using helmet

// app.use(cors({
//     origin: "https://localhost:8000"
// })
// );
app.use(cors());

app.use(express.json());

app.get('/auth/google', passport.authenticate('google', {
    scope: ['email',]
}));
app.get('/auth/google/callback', passport.authenticate('google', {
    failureRedirect: '/failure',
    successRedirect: '/',
    session: true,
}), (req, res) => {
    console.log('Google called us back');
});
app.get('/auth/logout', (req, res) => {
    req.logOut();
    return res.redirect('/');
});

app.get('/failure', (req, res) => {
    return res.send('Failed to log in');
})

app.get('/',function(req,res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use('/', authorsRouter);
app.use('/', postRouter);
app.use('/', commentRouter);

//https
const server = https.createServer({
    key: fs.readFileSync('src/key.pem'),
    cert:fs.readFileSync('src/cert.pem'),
}, app)

// http
// const server = http.createServer(app);

async function startServer(){
    await mongoConnect();
    
    server.listen(PORT, () => {
        console.log(`Listening on PORT ${PORT} (https://localhost:${PORT}/)`);
    });
};

startServer();


