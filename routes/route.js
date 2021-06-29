var express = require('express');
var router = express.Router();
const path = require('path');

router.use(express.static(path.join(__dirname,'./')));


router.get('/', function(req,res){
    console.log('GET signin');
    res.sendFile(path.join(__dirname, '../views/signin.html'));
});
router.get("/signin", function(req,res){
    console.log("GET signin");
    res.sendFile(path.join(__dirname,'../views/signin.html'))
});
router.get('/home', function(req,res){
    console.log('GET home');
    res.sendFile(path.join(__dirname, '../views/home.html'));
});
// router.post("/signin", function(req,res){
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

module.exports = router;
