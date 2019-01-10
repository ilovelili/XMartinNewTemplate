/*
 * API layer
 */
var MongoClient = require('mongodb').MongoClient,
    host = process.env.MongoHost || '178.128.111.159',
    port = process.env.MongoPort || 27017,
    db = 'ero',
    url = 'mongodb://{{host}}:{{port}}/{{db}}'.replace('{{host}}', host).replace('{{port}}', port).replace('{{db}}', db),
    ObjectId = require('mongodb').ObjectID,
    startDate = new Date();

// get last week
startDate.setDate(startDate.getDate() - 7);

exports.findById = function(req, res) {
    'use strict';
    var id = req.params.id;
    console.log('findById: ' + id);
    if (id.length != 12 && id.length != 24) return null;
    
    MongoClient.connect(url, function(err, db) {
        if (!err) {
            var col = db.collection('weeklyPopularVideos');
            col.findOne({
                _id: new ObjectId(id),
                enabled: true,
            }, function(err, doc) {
                if (!err) {
                    res.jsonp(doc);
                }
                db.close();
            });
        }
    });
};

exports.findAll = function(req, res) {
    'use strict';
    MongoClient.connect(url, function(err, db) {
        if (!err) {
            var col = db.collection('weeklyPopularVideos');
            // find created in one year
            col.find({
                enabled: true,
                date: { $gte: startDate },
            }).toArray(function(err, docs) {
                if (!err) {
                    res.jsonp(docs);
                }
                db.close();
            });
        }
    });
};