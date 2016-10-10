// get all xids from mongo db
var MongoClient = require('mongodb').MongoClient,
    host = process.env.HOST || '188.166.244.244',
    port = process.env.PORT || 27017,
    db = 'ero',
    url = 'mongodb://{{host}}:{{port}}/{{db}}'.replace('{{host}}', host).replace('{{port}}', port).replace('{{db}}', db),
    fs = require('fs'),
    path = require('path'),
    originMetaPath = path.join(process.cwd(), 'meta/meta.csv'),
    filePath = path.join(process.cwd(), 'meta/metaextracted.csv'),
    ObjectId = require('mongodb').ObjectID;

var unlinkMeta = function () {
    fs.unlink(filePath, function (err) {
        if (err) {
            console.error(err);
        } else {
            console.log(filePath + ' unlinked');
        }
    });

    fs.unlink(originMetaPath, function (err) {
        if (err) {
            console.error(err);
        } else {
            console.log(originMetaPath + ' unlinked');
        }
    });
};

function shrinkVideos() {
    'use strict';

    var ids = fs.readFileSync(filePath, 'utf8')
        .split('\n')
        .filter(function (item) {
            return item.length > 0
        })
        .map(function (id) {
            console.log('id is: ' + id);
            return new ObjectId(id);
        });

    ids.forEach(function (id) {
        MongoClient.connect(url, function (err, db) {
            var collection = db.collection('videos');
            collection.remove({ _id: id }, function (err, r) {
                if (err) {
                    console.error(err);
                }
                db.close();
            });
        });
    }, this);
}

// go
shrinkVideos();
// unlink
unlinkMeta();
