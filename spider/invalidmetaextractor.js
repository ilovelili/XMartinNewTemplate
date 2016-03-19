// filter out invalid xids
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

        meta.forEach(function(record, index) {
            var fragments = record.split('|'),
                id = fragments[0],
                xid = fragments[1];

            var url = config.sourceUrl.replace('{{xvideoId}}', xid);
            console.log('url is ' + url);

            casper
                .thenOpen(url, function(response) {
                    if (response['status'] === 404) {
                        xids.push(xid);
                        ids.push(id);
                    }
                })
        });
    })
    .run(function runCasper() {
        this.echo('----------- done ------------\n');
        this.echo('xids: ' + xids);
        this.overwritemeta();
        this.exit();
    });
