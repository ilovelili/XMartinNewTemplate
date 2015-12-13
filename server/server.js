var express = require('express'),
    path = require('path'),
    videos = require('./routes/videos'),
    host = '127.0.0.1',
    port = 3000;

var app = express();
// about body parser // http://code.runnable.com/U0sU598vXio2uD-1/example-reading-form-input-with-express-4-0-and-body-parser-for-node-js
// app.use(express.bodyParser()); 
app.use(express.static(path.join(__dirname, '../client')));

app.use(function (req, res, next) {
    'use strict';
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent to the API (e.g. in case you use sessionsb)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

app.get('/videos/:id', videos.findById);
app.get('/videos/:cat', videos.findByCat);
app.get('/videos/:name', videos.findByName);
app.get('/videos', videos.findAll);

// change me when release
app.listen(host, port);
console.log('Listening on port 3000...');