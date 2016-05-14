var fs = require('fs');

var casper = require('casper').create({
        verbose: true,
        logLevel: 'error'        
    });

casper.start('http://www.google.com/', function() {
    this.capture(fs.pathJoin(fs.workingDirectory, 'test', 'google.png'), {
        top: 100,
        left: 100,
        width: 500,
        height: 400
    });
});

casper.run();