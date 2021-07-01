let express = require('express');
// const redis = require('redis');
// let session = require('express-session');
let path = require('path');
let app = express();

// let RedisStore = require('connect-redis')(session);
// let redisClient = redis.createClient();
//
// app.use(session({
//     store: new RedisStore({
//         client: redisClient
//     }),
//     saveUninitialized: false,
//     secret: 'super secret',
//     resave: false,
// }));
let users = require ('./routes/users');

app.use('/',users);
app.use("/public", express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname,'./')));

app.get('/', function(req,res){
    console.log('GET signin');
    res.sendFile(path.join(__dirname, '/views/signin.html'));
});
app.get("/signin", function(req,res){
    console.log("GET signin");
    res.sendFile(path.join(__dirname,'/views/signin.html'))
});
app.get('/home', function(req,res){
    console.log('GET home');
    res.sendFile(path.join(__dirname, '/views/home.html'));
});
// app.post("/signin", function(req,res){
//     console.log("POST signin");
//     firebase.database().ref("users/"+req.body.username).once('value')
//         .then(function(snapshot){
//             console.log(snapshot.val());
//             if(snapshot.val()==null){
//                 res.send("check username/password")
//             }
//             else if(snapshot.val().password != req.body.password){
//                 res.send("check username/password")
//             }
//             else if((snapshot.val().password == req.body.password) && (snapshot.val().username == req.body.username)){
//                 res.sendFile((path.join(__dirname,'./templates/about.html')))
//             }
//         })
// });



app.listen(1234,()=>{
    console.log("http://localhost:1234");
});