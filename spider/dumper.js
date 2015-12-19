/*
 * http://mongodb.github.io/node-mongodb-native/2.0/api/
 */
var MongoClient = require('mongodb').MongoClient,
    host = process.env.HOST || '127.0.0.1',
    port = process.env.PORT || 27017,
    db = 'ero',
    url = 'mongodb://{{host}}:{{port}}/{{db}}'.replace('{{host}}', host).replace('{{port}}', port).replace('{{db}}', db),
    fs = require('fs'),
    dataToBeDumped;

var resloveDate = function(rawDate) {
    'use strict';
    var fragments = rawDate.split('-'),
        year = fragments[0],
        month = fragments[1] - 1, // month from 0 to 11
        day = fragments[2];

    return new Date(year, month, day);
};

var readFile = function() {
    'use strict';
    // todo: change me when run cron
    var dir = './output/',
        files = fs.readdirSync(dir),
        data = [];
    for (var index in files) {
        data = data.concat((fs.readFileSync(dir + files[index], 'utf-8')).split('\r\n'));
    }
    var result = [];
    Array.prototype.map.call(data, function(record) {
        if (record.length) {
            var fragment = record.split(','),
                link = "<iframe src='" + fragment[0] + "' frameborder=0 width=510 height=400 scrolling=no></iframe>",
                category = fragment[1],
                thumbnail = fragment[3],
                title = fragment[4],
                duration = fragment[5],
                date = resloveDate(fragment[6]),
                enabled = true;

            result.push({
                "title": title,
                "link": link,
                "thumbnail": thumbnail,
                "category": category,
                "duration": duration,
                "date": date,
                "enabled": enabled
            });
        }
    });

    console.log(result);
    return result;
};

// dump
dataToBeDumped = readFile();
MongoClient.connect(url, function(err, db) {
    if (!err) {
        var col = db.collection('videos');
        col.insert(dataToBeDumped, function(err, result) {
            if (err) {
                console.error(err);
            }
            db.close();
        });
    }
});
