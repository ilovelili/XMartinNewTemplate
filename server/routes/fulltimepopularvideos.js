/*
 * API layer
 */
var MongoClient = require('mongodb').MongoClient,
    host = process.env.MongoHost || '188.166.244.244',
    port = process.env.MongoPort || 27017,
    db = 'ero',
    url = 'mongodb://{{host}}:{{port}}/{{db}}'.replace('{{host}}', host).replace('{{port}}', port).replace('{{db}}', db),
    ObjectId = require('mongodb').ObjectID,
    startDate = new Date();

// get last year
startDate.setFullYear(startDate.getFullYear() - 1);

exports.findById = function(req, res) {
    'use strict';
    var id = req.params.id;
    console.log('findById: ' + id);
    MongoClient.connect(url, function(err, db) {
        if (!err) {
            var col = db.collection('monthlyPopularVideos');
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

exports.findByCat = function(req, res) {
    'use strict';
    var cat = req.params.cat;
    console.log('findByCat: ' + cat);

    MongoClient.connect(url, function(err, db) {
        if (!err) {
            var col = db.collection('monthlyPopularVideos');
            col.find({
                category: cat,
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

exports.findAll = function(req, res) {
    'use strict';
    MongoClient.connect(url, function(err, db) {
        if (!err) {
            var col = db.collection('monthlyPopularVideos');
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