/*
 * http://mongodb.github.io/node-mongodb-native/2.0/api/
 */
var MongoClient = require('mongodb').MongoClient,
    host = process.env.HOST || '178.128.111.159',
    port = process.env.PORT || 27017,
    db = 'ero',
    url = 'mongodb://{{host}}:{{port}}/{{db}}'.replace('{{host}}', host).replace('{{port}}', port).replace('{{db}}', db),
    fs = require('fs'),
    path = require('path'),
    dataToBeDumped,
    dir = path.join(process.cwd(), 'output/');

var resloveDate = function(rawDate) {
    'use strict';
    var fragments = rawDate.split('-'),
        year = fragments[0],
        month = fragments[1] - 1, // month from 0 to 11
        day = fragments[2];

    return new Date(year, month, day);
};

var resloveCats = function(rawCats) {
    console.log('rawCats:' + rawCats);

    return rawCats
        // replace '\n' in raw data
        .replace('\n', '')
        // convert to array
        .split(' ')
        // filter empty
        .filter(function(cat) {
            return cat.length != 0;
        })
};

var readFile = function() {
    'use strict';

    var files = fs.readdirSync(dir),
        data = [];
    for (var index in files) {
        data = data.concat((fs.readFileSync(dir + files[index], 'utf-8')).split('\r\n'));
    }
    var result = [];
    Array.prototype.map.call(data, function(record) {
        if (record.length) {
            var fragment = record.split(','),
                link = "<iframe src='" + fragment[0] + "' frameborder=0 width={{width}} height={{height}} scrolling=no></iframe>",
                category = resloveCats(fragment[1]),
                thumbnail = fragment[3],
                title = fragment[4],
                duration = fragment[5],
                date = new Date(),
                click = 0,
                enabled = true;

            result.push({
                "title": title,
                "link": link,
                "thumbnail": thumbnail,
                "category": category,
                "duration": duration,
                "date": date,
                "click": click,
                "enabled": enabled
            });
        }
    });

    console.log(result);
    return result;
};

var unlinkFiles = function() {
    var files = fs.readdirSync(dir);

    for (var index in files) {
        fs.unlink((dir + files[index]), function(err) {
            if (err) {
                console.error(err);
            } else {
                console.log(files[index] + ' unlinked');
            }
        });
    }
};

dataToBeDumped = readFile();

MongoClient.connect(url, function(err, db) {
    if (!err) {
        var col = db.collection('videos');

        col.insert(dataToBeDumped, {
                continueOnError: true,
                keepGoing: true,
                safe: false,
            },
            function(err, result) {
                if (err) {
                    console.error(err);
                }
                db.close();
                unlinkFiles();
            });
    }
});

// 20161112 -- bulk insert seems to be wierd
/*dataToBeDumped.forEach(function (data) {
    MongoClient.connect(url, function (err, db) {
        var collection = db.collection('videos');
        collection.insert(data, function (err, r) {
            if (err) {
                console.error(data.title);
                // console.error(err);
            }
            db.close();
        });
    });
}, this);*/