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

    try {        
        MongoClient.connect(url, function(err, db) {
            if (!err) {
                var col = db.collection('videos');
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
    } catch (ex) {
        console.log(ex);
        return null;
    }    
};

exports.findByCat = function(req, res) {
    'use strict';
    var cat = req.params.cat;
    console.log('findByCat: ' + cat);

    try {
        MongoClient.connect(url, function(err, db) {
            if (!err) {
                var col = db.collection('videos');
                col.find({
                    category: cat,
                    enabled: true,
                    date: { $gte: startDate },
                }).sort({
                    'category': 1,
                    'date': -1,
                }).toArray(function(err, docs) {
                    if (!err) {
                        res.jsonp(docs);
                    }
                    db.close();
                });
            }
        });
    } catch (ex) {
        console.log(ex);
        return null;
    }    
};

// todo: check query by date
exports.findByDate = function(req, res) {
    'use strict';
    var date = req.params.date;
    console.log('findByDate: ' + date);

    try {
        MongoClient.connect(url, function(err, db) {
            if (!err) {
                var col = db.collection('videos');
                col.find({
                    enabled: true,
                    date: { $gte: date },
                }).sort({
                    'date': -1,
                }).toArray(function(err, docs) {
                    if (!err) {
                        res.jsonp(docs);
                    }
                    db.close();
                });
            }
        });
    } catch (ex) {
        console.log(ex);
        return null;
    }    
};

exports.findAll = function(req, res) {
    'use strict';

    try {
        MongoClient.connect(url, function(err, db) {
            if (!err) {
                var col = db.collection('videos');
                // find created in one year
                col.find({
                    enabled: true,
                    date: { $gte: startDate },
                }).sort({
                    'date': -1,
                }).toArray(function(err, docs) {
                    if (!err) {
                        res.jsonp(docs);
                    }
                    db.close();
                });
            }
        });
    } catch (ex) {
        console.log(ex);
        return null;
    }    
};

// aggregate by category
exports.aggregateCat = function(req, res) {
    'use strict';
    console.log('aggregateCat');

    try {
        MongoClient.connect(url, function(err, db) {
            if (!err) {
                var col = db.collection('videos');
                col.aggregate([
                    { $unwind: "$category" }, 
                    {
                        $group: {
                            _id: {
                                cat: "$category",
                                enabled: "$enabled",
                            },
                            count: {
                                $sum: 1
                            },
                        },
                        
                    },
                    {
                        $sort: {
                            count: -1
                        },
                    },
                    {
                        $match: {
                            "_id.enabled": true,
                        }
                    }
                ]).toArray(function(err, docs) {
                    if (!err) {
                        res.jsonp(docs);
                    }
                    db.close();
                });
            }
        });
    } catch (ex) {
        console.log(ex);
        return null;
    }    
};
