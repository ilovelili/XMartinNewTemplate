// get all xids from mongo db
var MongoClient = require('mongodb').MongoClient,
    host = process.env.HOST || '178.128.111.159',
    port = process.env.PORT || 27017,
    db = 'ero',
    url = 'mongodb://{{host}}:{{port}}/{{db}}'.replace('{{host}}', host).replace('{{port}}', port).replace('{{db}}', db),
    fs = require('fs'),
    path = require('path'),
    filePath = path.join(process.cwd(), 'meta', 'fulltime', 'meta.csv'),
    ObjectId = require('mongodb').ObjectID;

var shrinkVideo = function (db, id, callback) {
    db.collection('fulltimePopularVideos').updateOne({ _id: new ObjectId(id) }, {
        $set: { "enabled": false },
    },
        function (err, results) {
            if (err) {
                console.log(err);
            }
            if (callback) {
                callback();
            }
        });
};

var unlinkMeta = function () {
    fs.unlink(filePath, function (err) {
        if (err) {
            console.error(err);
        } else {
            console.log(filePath + ' unlinked');
        }
    });
};

function shrinkVideos() {
    'use strict';
    var ids = fs.readFileSync(filePath, 'utf8')
        .split(',')
        .filter(function (item) {
            return item.length > 0
        });

    ids.forEach(function (id) {
        MongoClient.connect(url, function (err, db) {
            shrinkVideo(db, id, function () {
                db.close();
            });
        });
    });
}

// go
shrinkVideos();
// unlink
// unlinkMeta();
