// get all xids from mongo db
var MongoClient = require('mongodb').MongoClient,
    host = process.env.HOST || '188.166.244.244',
    port = process.env.PORT || 27017,
    db = 'ero',
    url = 'mongodb://admin:A7059970599@{{host}}:{{port}}/{{db}}'.replace('{{host}}', host).replace('{{port}}', port).replace('{{db}}', db),
    fs = require('fs'),
    path = require('path');

(function dumpXidsToCSV() {
    'use strict';
    var pattern = /http:\/\/flashservice.xvideos.com\/embedframe\/(\d+)/;
    
    // weekly    
    MongoClient.connect(url, function(err, db) {
        if (!err) {
            var col = db.collection('weeklyPopularVideos');
            col.find({
                enabled: true
            }).toArray(function(err, docs) {
                if (!err) {
                    for (var i = 0; i < docs.length; i++) {
                        var link = docs[i].link;
                        if (!pattern.test(link)) {
                            throw ('data source seems to wierd, please have a check');
                        }

                        var id = docs[i]._id;
                        var meta = id + '|' + link.match(pattern)[1] + ',';
                        fs.appendFile(path.join(process.cwd(), 'meta', 'weekly', 'meta.csv'), meta, 'utf8');
                    }
                }
                db.close();
            });
        }
    });
    
    // monthly    
    MongoClient.connect(url, function(err, db) {
        if (!err) {
            var col = db.collection('monthlyPopularVideos');
            col.find({
                enabled: true
            }).toArray(function(err, docs) {
                if (!err) {
                    for (var i = 0; i < docs.length; i++) {
                        var link = docs[i].link;
                        if (!pattern.test(link)) {
                            throw ('data source seems to wierd, please have a check');
                        }

                        var id = docs[i]._id;
                        var meta = id + '|' + link.match(pattern)[1] + ',';
                        fs.appendFile(path.join(process.cwd(), 'meta', 'monthly', 'meta.csv'), meta, 'utf8');
                    }
                }
                db.close();
            });
        }
    });
    
    // fulltime    
    MongoClient.connect(url, function(err, db) {
        if (!err) {
            var col = db.collection('fulltimePopularVideos');
            col.find({
                enabled: true
            }).toArray(function(err, docs) {
                if (!err) {
                    for (var i = 0; i < docs.length; i++) {
                        var link = docs[i].link;
                        if (!pattern.test(link)) {
                            throw ('data source seems to wierd, please have a check');
                        }

                        var id = docs[i]._id;
                        var meta = id + '|' + link.match(pattern)[1] + ',';
                        fs.appendFile(path.join(process.cwd(), 'meta', 'fulltime', 'meta.csv'), meta, 'utf8');
                    }
                }
                db.close();
            });
        }
    });
    
})();