var RSS = require('rss'),
    fs = require('fs'),
    path = require('path'),
    dir = path.join(process.cwd(), 'output/'),
    MongoClient = require('mongodb').MongoClient,
    host = process.env.MongoHost || '188.166.244.244',
    port = process.env.MongoPort || 27017,
    db = 'ero',
    url = 'mongodb://{{host}}:{{port}}/{{db}}'.replace('{{host}}', host).replace('{{port}}', port).replace('{{db}}', db),
    ObjectId = require('mongodb').ObjectID;

var resloveItemDesciption = function (item) {
    return '<img width="218.83" height="164.11" src="' + item.thumbnail + '" />' +
        '<p>' + item.title + '</p>';
};

var resolveUrl = function (item) {
    return 'http://ero-hotel.jp/#!/video/' + item._id;
};

var generateRSS = function (docs) {
    var feed = new RSS({
        title: 'エロホテル',
        description: 'XVIDEOSを日本人向けに見やすくまとめました。もちろん無料！',
        feed_url: 'http://ero-hotel.jp/rss.xml',
        site_url: 'http://ero-hotel.jp',
        image_url: 'http://ero-hotel.jp/img/title_logo.png',
        managingEditor: 'route666@live.cn (Min Ju)',
        webMaster: 'route666@live.cn (Min Ju)',
        copyright: '2016 ero-hotel.jp',
        language: 'ja',
        categories: ['videos', 'porn'],
        pubDate: new Date().toUTCString(),
        ttl: '60'
    });

    docs.forEach(function (item, index) {
        feed.item({
            title: item.title,
            description: resloveItemDesciption(item),
            url: resolveUrl(item), // link to the item 
            guid: resolveUrl(item), // optional - defaults to url 
            categories: item.category, // optional - array of item categories 
            author: 'route666@live.cn (Min Ju)', // optional - defaults to feed author property 
            date: new Date().toUTCString() // any format that js Date can parse.
        });
    });

    var xml = feed.xml();

    fs.writeFile(path.join(process.cwd(), '../', 'client', 'rss.xml'), xml, function (err) {
        if (err) throw err;
    });
};

MongoClient.connect(url, function (err, db) {
    if (!err) {
        var col = db.collection('videos');
        col.find(
            {
                enabled: true,
            })
            .limit(10)
            .sort({ 'date': -1 })
            .toArray(function (err, docs) {
                if (err) {
                    throw err;
                }
                else if (docs.length) {
                    generateRSS(docs);
                }

                db.close();
            });
    }
});