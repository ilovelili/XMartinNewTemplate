// filter out valid xids
var xids = [],
    ids = [],
    fs = require('fs'),
    casper = require('casper').create({
        verbose: true,
        logLevel: 'error',
        pageSettings: {
            loadImages: false,
            loadPlugins: false
        }
    }),
    config = require('config.json')['xvideos'],
    filePath = fs.pathJoin(fs.workingDirectory, 'meta', 'meta.csv');

casper.overwritemeta = function() {
    'use strict';
    fs.write(filePath, ids, 'w');
};

casper
    .start()
    .then(function validateXid() {
        'use strict';
        var meta = fs.read(filePath)
            .split(',')
            .filter(function(item) {
                return item.length > 0;
            });

        xids = meta.map(function(record) {
            return record.split('|')[1];
        });
        ids = meta.map(function(record) {
            return record.split('|')[0];
        });

        console.log('xids length: ' + xids.length);

        xids.forEach(function(xid, index) {
            var url = config.sourceUrl.replace('{{xvideoId}}', xid)
            console.log('url is ' + url);
            casper
                .thenOpen(url)
                .waitForUrl(url)
                .waitForText("We received a request to have this video deleted",
                    function invalid() {
                        // do nothing
                    },
                    function valid() {
                        // remove valid xids 
                        xids.splice(index, 1);
                        ids.splice(index, 1);
                    }, 3000 /*timeout*/ );
        });
    })
    .run(function runCasper() {
        this.echo('----------- done ------------\n');
        this.echo('xids: ' + xids);
        this.overwritemeta();
        this.exit();
    });
