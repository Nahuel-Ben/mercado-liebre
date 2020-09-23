const express = require('express');
const path = require ('path');

const app = express();

app.get('/', function (req, res){
    let file = path.resolve ('index.html');

    res.sendFile(file);
})

app.get ('/register', function(req, res){
    let file = path.resolve('register.html');

    res.sendFile(file);
})


app.get('*',function(req, res){
    if(req.url.includes('.')){
        let file = path.resolve('public' + req.url);
        return res.sendFile(file);
    }
    res.send('Not found');
})



app.listen(5000);