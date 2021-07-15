var express = require('express');
var router = express.Router();
let admin = require('firebase-admin');
let bodyParser = require('body-parser');
require("dotenv/config");
const path = require('path');
const serviceAccount = require('../key_1.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();
const storage = admin.storage();
router.use(bodyParser.urlencoded({extended: false}));
router.use(express.static(path.join(__dirname,'./')));

var filter;
router.post('/filter_value', async(req, res)=>{
    filter = req.body.filter;
    res.redirect('/verification');
});

router.get('/data', async(req, res)=> {
    console.log("fetching data");
    var all;
    if(filter === "all"){
        all = db.collection('users');
    }
    else if(filter === "yes"){
        all = db.collection('users').where("Verify", "==", "Yes");
    }
    else{
        all = db.collection('users').where("Verify", "==", "No");
    }
    const snapshot1 = await all.orderBy("timestamp", "desc").get().then((querySnapshot) => {
        var docs = querySnapshot.docs.map(doc => doc.data());
        res.json(docs);
    });
});

router.get('/id',async(req,res)=>{
    var all;
    if(filter === "all"){
        all = db.collection('users');
    }
    else if(filter === "yes"){
        all = db.collection('users').where("Verify", "==", "Yes");
    }
    else{
        all = db.collection('users').where("Verify", "==", "No");
    }
    const snapshot1 = await all.orderBy("timestamp", "desc").get().then((querySnapshot) => {
        var docs = querySnapshot.docs.map(doc => doc.id);
        res.json(docs);
    });
});

router.post('/change',async(req,res)=>{
    var ad_num= req.body.ad_num;
    var ad_url= req.body.ad_url;
    var clicked_id= req.body.changed;
    // console.log(ad_num);
    // console.log(ad_url);
    // console.log(clicked_id);
    db.collection('users').doc(clicked_id).update({ aadharNumber: ad_num });
    db.collection('users').doc(clicked_id).update({ Verify: "Yes" });
    if(typeof ad_url != "undefined"){
        await storage.bucket("krib2downgrade-1.appspot.com").file("AADHAR CARD/"+clicked_id+".jpg").delete();
        db.collection('users').doc(clicked_id).update({ aadharUrl: null });
    }
    res.redirect("/verification");
});

router.post("/signin", async(req,res)=>{
    console.log("POST signin");
    const user = req.body.username;
    const pass = req.body.password;
    var x=0;
    const snapshot = await db.collection("admin").where("username", "==", user).get();
    snapshot.forEach((doc) => {
        // console.log(doc.data().username);
        if(doc.data().password == pass && doc.data().username == user){
            req.session.currentUser = user;
            res.redirect("/");
            x = 1;
        }
    });
    if(x === 0){
        res.render('err',{msg: 'WRONG USERNAME OR PASSWORD',path:'/signin'});
    }
});

router.get("/allid",async (req,res)=>{
    await db.collection('users').get().then((querySnapshot) => {
        var docs = querySnapshot.docs.map(doc => doc.id);
        res.json(docs);
    });
});

router.get("/feeds",async(req,res)=>{

    var ids=[],c=0;
    await db.collection('users').get().then((querySnapshot) => {
        var docs = querySnapshot.docs.map(doc => doc.id);
        ids.push(docs);
        c=docs.length;
    });
    // console.log(ids);
    // console.log(c);

    var data11={};
    for (let i=0;i<c;i++){
        var all = await db.collection("feedback").doc(ids[0][i]).listCollections()
            .then((subCollections)=>{
                subCollections.forEach((subCollections)=>{
                    subCollections.orderBy("timestamp", "desc").get().then((querySnapshot) => {
                        // console.log(docs);
                        data11[ids[0][i]] = querySnapshot.docs.map(doc => doc.data());
                    });
                })
            });
    }
    res.json(data11);
    // console.log(data11);
});

router.get("/supps",async(req,res)=>{

    var ids=[],c=0;
    await db.collection('users').get().then((querySnapshot) => {
        var docs = querySnapshot.docs.map(doc => doc.id);
        ids.push(docs);
        c=docs.length;
    });
    // console.log(ids);
    // console.log(c);

    var data21={};
    for (let i=0;i<c;i++){
        var all = await db.collection("supportRequests").doc(ids[0][i]).listCollections()
            .then((subCollections)=>{
                subCollections.forEach((subCollections)=>{
                    subCollections.orderBy("timestamp", "desc").get().then((querySnapshot) => {
                        // console.log(docs);
                        data21[ids[0][i]] = querySnapshot.docs.map(doc => doc.data());
                    });
                })
            });
    }
    res.json(data21);
    // console.log(data21);

});

module.exports = router;
