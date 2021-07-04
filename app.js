let express = require('express');
let path = require('path');
let session = require('express-session');
let redis = require('redis');
let RedisStore = require('connect-redis')(session);
let redisClient = redis.createClient();
require("dotenv/config");
let app = express();
let users = require ('./routes/users');

app.set('view engine', 'ejs');
app.use(session({
    name: "user_id",
    store: new RedisStore({
        client: redisClient,
        disableTouch: true
    }),
    cookie:{
        maxAge: 1000 * 60 * 10, //10min
        httpOnly: true,
        sameSite: 'lax'
    },
    saveUninitialized: false,
    secret: process.env.secret,
    resave: false,
}));

app.use('/',users);
app.use("/public", express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname,'./')));

app.get("/", function(req,res){
    if (!req.session.currentUser){
        res.render('err',{msg: 'LOGIN TOH KARLE',path:'/signin'});
    }
    else {
        console.log('GET');
        res.sendFile(path.join(__dirname, '/views/directories.html'));
    }
});

app.get('/signin', function(req,res){
    console.log('GET signin');
    res.sendFile(path.join(__dirname, '/views/signin.html'));
});

app.get('/verification', function(req,res){
    if (!req.session.currentUser){
        res.render('err',{msg: 'LOGIN TOH KARLE', path: '/signin'});
    }
    else {
        console.log('GET home');
        res.sendFile(path.join(__dirname, '/views/verification.html'));
    }
});

app.get('/feedback', function(req,res){
    if (!req.session.currentUser){
        res.render('err',{msg: 'LOGIN TOH KARLE', path: '/signin'});
    }
    else {
        console.log('GET home');
        res.sendFile(path.join(__dirname, '/views/feedback.html'));
    }
});

app.get("/logout", (req, res) => {
    req.session.destroy();
    console.log("logout");
    res.redirect("/signin");
});

app.all('*', function (req,res) {
   res.render('err',{msg: 'ACCESS DENIED',path: '/'});
});

app.listen(1234,()=>{
    console.log("http://localhost:1234/signin");
});