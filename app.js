let express = require('express');
let path = require('path');
// let session = require('express-session');
// let redis = require('redis');
// let RedisStore = require('connect-redis')(session);
// let redisClient = redis.createClient();

let app = express();
let users = require ('./routes/users');


// app.use(session({
//     name: "user_id",
//     store: new RedisStore({
//         client: redisClient,
//         disableTouch: true
//     }),
//     cookie:{
//         maxAge: 1000 * 60 * 60 * 24 * 365 * 10, //10years
//         httpOnly: true,
//         sameSite: 'lax'
//     },
//     saveUninitialized: false,
//     secret: 'super secret',
//     resave: false,
// }));


app.use('/',users);
app.use("/public", express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname,'./')));

app.get("/", function(req,res){
    console.log('GET signin');
    res.sendFile(path.join(__dirname, '/views/signin.html'));
});

// app.post("/", function(req,res){
//     console.log("POST signin");
//     const user = req.body.username;
//     const pass = req.body.password;
//
//     firebase.database().ref("users/"+user).once('value').then(function(snapshot){
//             // console.log(snapshot.val());
//             if(snapshot.val()==null){
//                 alert("null");
//             }
//             else if(snapshot.val().password != pass){
//                 alert("check password");
//             }
//             else if((snapshot.val().password == pass) && (snapshot.val().username == user)){
//                 req.session.currentUser = user;
//                 res.redirect("/home");
//             }
//         })
// });

app.get('/home', function(req,res){
    console.log('GET home');
    res.sendFile(path.join(__dirname, '/views/home.html'));
});

app.get("/logout", (req, res) => {
    // req.session.destroy();
    res.redirect("/");
});

app.listen(1234,()=>{
    console.log("http://localhost:1234");
});