// get all xids from mongo db
var MongoClient = require('mongodb').MongoClient,
    host = process.env.HOST || '188.166.244.244',
    port = process.env.PORT || 27017,
    db = 'ero',
    url = 'mongodb://{{host}}:{{port}}/{{db}}'.replace('{{host}}', host).replace('{{port}}', port).replace('{{db}}', db),
    fs = require('fs'),
    path = require('path'),
    filePath = path.join(process.cwd(), 'meta/meta.csv');

console.log('filepath is ' + filePath);    

(function dumpXidsToCSV() {
    'use strict';
    var pattern = /(http|https):\/\/flashservice.xvideos.com\/embedframe\/(\d+)/;
    MongoClient.connect(url, function(err, db) {
        if (!err) {
            var col = db.collection('videos');
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
                        var meta = id + '|' + link.match(pattern)[2] + '\n';
                        fs.appendFile(filePath, meta, 'utf8');
                    }
                }
                db.close();
            });
        }
    });
})();