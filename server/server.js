var express = require('express'),
    path = require('path'),
    videos = require('./routes/videos'),
    weeklypopularvideos = require('./routes/weeklypopularvideos'),
    monthlypopularvideos = require('./routes/monthlypopularvideos'),
    fulltimepopularvideos = require('./routes/fulltimepopularvideos'),
    host = process.env.HOST || '178.128.111.159',    
    port = process.env.PORT || 3000;

var app = express();
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
app.get('/videos/cat/:cat', videos.findByCat);
app.get('/aggregateCat/', videos.aggregateCat);
// app.get('/videos/date/:date', videos.findByDate);
app.get('/videos', videos.findAll);

// popular videos
app.get('/weeklypopularvideos/:id', weeklypopularvideos.findById);
app.get('/weeklypopularvideos', weeklypopularvideos.findAll);

app.get('/monthlypopularvideos/:id', monthlypopularvideos.findById);
app.get('/monthlypopularvideos', monthlypopularvideos.findAll);

app.get('/fulltimepopularvideos/:id', fulltimepopularvideos.findById);
app.get('/fulltimepopularvideos', fulltimepopularvideos.findAll);

app.listen(port, host);
console.log('Listening on {0}:{1}'.replace('{0}', host).replace('{1}', port));
