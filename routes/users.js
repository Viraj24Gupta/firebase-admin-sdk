var express = require('express');
var router = express.Router();
let admin = require('firebase-admin');
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



router.get('/data', async(req, res)=> {
    var x;
    const doc = await db.collection("users").orderBy("timestamp", "desc");
    const observer = doc.onSnapshot(docSnapshot => {
        console.log(`Received doc snapshot: ${docSnapshot}`);
        console.log("reached x");
        for(i in docSnapshot){
            res.json(docSnapshot[i]);
        }
        }, err => {
        console.log(`Encountered error: ${err}`);
    });


});

module.exports = router;
