let express = require('express');
let path = require('path');
let app = express();

app.use("/public", express.static(path.join(__dirname, 'public')));
let route = require ('./routes/route');
let users = require ('./routes/users');
app.use('/' , route);
app.use('/',users);

app.listen(1234,()=>{
    console.log("http://localhost:1234");
});