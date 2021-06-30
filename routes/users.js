var express = require('express');
var router = express.Router();
let admin = require('firebase-admin');
let bodyParser = require('body-parser');
const path = require('path');

router.use(express.static(path.join(__dirname,'./')));
// let dotenv = require('dotenv').config();
// let FirebaseConfig = {
//     type: process.env.type,
//     project_id: process.env.project_id,
//     private_key_id: process.env.private_key_id,
//     private_key: process.env.private_key,
//     client_email: process.env.client_email,
//     client_id: process.env.client_id,
//     auth_uri: process.env.auth_uri,
//     token_uri: process.env.token_uri,
//     auth_provider_x509_cert_url: process.env.auth_provider_x509_cert_url,
//     client_x509_cert_url: process.env.client_x509_cert_url
// };
// admin.initializeApp(FirebaseConfig);

const serviceAccount = require('../key.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
router.use(bodyParser.urlencoded({extended: false}));


router.get('/data', async(req, res)=> {
    console.log("fetching data");
    const all = await db.collection('users').orderBy("timestamp", "desc");
    // const observer = doc.onSnapshot(docSnapshot => {
    //     console.log(`Received doc snapshot: ${docSnapshot}`);
    //     console.log("reached x");
    //     for(i in docSnapshot){
    //         res.json(docSnapshot[i]);
    //     }
    //     }, err => {
    //     console.log(`Encountered error: ${err}`);
    // });
    const snapshot1 = await all.get().then((querySnapshot) => {
        var docs = querySnapshot.docs.map(doc => doc.data());
        res.json(docs);
    });

    // let response=[];
    // snapshot.forEach(doc => {
    //     response.push(doc.data());
    //     // console.log(doc.id, '=>', doc.data());
    // });
    // res.json(response);


});


router.get('/id',async(req,res)=>{
    const all = await db.collection('users').orderBy("timestamp", "desc");
    const snapshot1 = await all.get().then((querySnapshot) => {
        var docs = querySnapshot.docs.map(doc => doc.id);
        res.json(docs);
    });
});

router.post('/change',async(req,res)=>{
    var ad_num= req.body.ad_num;
    var clicked_id= req.body.changed;
    console.log(ad_num);
    console.log(clicked_id);
    db.collection('users').doc(clicked_id).update({ aadharNumber: ad_num });
    db.collection('users').doc(clicked_id).update({ Verify: "Yes" });
    res.sendFile(path.join(__dirname, '../views/home.html'));
});

// router.get('/storage', async(req,res)=>{
//     const storageBucket = admin.storage().bucket( 'gs://krib2downgrade-1.appspot.com' );
//     const getRemoteImages = async() => {
//         const imagePromises = posts.map( (item, index) => admin
//             .firestore().collection('AADHAR CARD').get().then(querySnapshot => {
//                 // querySnapshot is an array but I only want the first instance in this case
//                 const docRef = querySnapshot.docs[0];
//                 // the property "url" was what I called the property that holds the name of the file in the "posts" database
//                 const fileName = docRef.data().url;
//                 return storageBucket.file( fileName ).getSignedUrl({
//                     action: "read",
//                     expires: '03-17-2025' // this is an arbitrary date
//                 })
//             })
//             // chained promise because "getSignedUrl()" returns a promise
//             .then((data) => data[0])
//             .catch(err => console.log('Error getting document', err))
//         )
//         // returns an array of remote image paths
//         const imagePaths = await Promise.all(imagePromises);
//         return imagePaths
//     }
// });

module.exports = router;
