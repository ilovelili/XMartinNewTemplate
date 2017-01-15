// rss 1.0 http://www.tutorialspoint.com/rss/rss1.0-tag-syntax.htm

var fs = require('fs'),
    path = require('path'),
    dir = path.join(process.cwd(), 'output/'),
    MongoClient = require('mongodb').MongoClient,
    host = process.env.MongoHost || '188.166.244.244',
    port = process.env.MongoPort || 27017,
    db = 'ero',
    url = 'mongodb://admin:A7059970599@{{host}}:{{port}}/{{db}}'.replace('{{host}}', host).replace('{{port}}', port).replace('{{db}}', db),
    ObjectId = require('mongodb').ObjectID,
    RDFChannelItemTemplate = '<rdf:li rdf:resource="{{link}}"/>',
    RDFItemTemplate = `
    <item rdf:about="{{link}}">
        <title>{{title}}</title>
        <link>{{link}}</link>
        <description>{{description}}</description>
    </item>
    `,
    RDFTemplate = `<?xml version= "1.0" encoding="UTF-8"?>
<rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns="http://purl.org/rss/1.0/">
    <channel rdf:about="http://ero-hotel.jp/rdf.xml">
        <title>エロホテル</title>
        <link>http://ero-hotel.jp</link>
        <description>XVIDEOSを日本人向けに見やすくまとめました。もちろん無料！</description>
        <items>
            <rdf:Seq>
                {{channelitemrepeater}}
            </rdf:Seq>
        </items>
        <image rdf:resource="http://ero-hotel.jp/img/title_logo.png" />
    </channel>
    <image rdf:about="http://ero-hotel.jp/img/title_logo.png">
        <title>エロホテル</title>
        <link>http://ero-hotel.jp</link>
        <url>http://ero-hotel.jp/img/title_logo.png</url>
    </image>
    {{itemrepeater}}    
</rdf:RDF>    
    `;

var resolveUrl = function (item) {
    return 'http://ero-hotel.jp/#!/video/' + item._id;
};

var resloveItems = function (items) {
    var result = '';

    items.forEach(function (item, index) {
        var compiledItem = RDFItemTemplate
            .replace(/{{link}}/g, resolveUrl(item))
            .replace(/{{title}}/g, item.title)
            .replace(/{{description}}/g, item.title);

        result += compiledItem;
    });

    return result;
};

var resolveChannelItems = function (items) {
    var result = '';

    items.forEach(function (item, index) {
        var compiledItem = RDFChannelItemTemplate.replace(/{{link}}/g, resolveUrl(item));
        result += compiledItem;
    });

    return result;
};

var generateRDF = function (docs) {
    var items = resloveItems(docs),
        channelItems = resolveChannelItems(docs),
        rdf = RDFTemplate
            .replace(/{{channelitemrepeater}}/g, channelItems)
            .replace(/{{itemrepeater}}/g, items);

    fs.writeFile(path.join(process.cwd(), '../', 'client', 'rdf.xml'), rdf, function (err) {
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
                    generateRDF(docs);
                }

                db.close();
            });
    }
});