var casper = require('casper').create({
    verbose: true,
    logLevel: 'debug',
}),
    url = 'http://ero-hotel.jp/#!/link',
    getlinks = function () {
        return $('ol li a');
    };

//Crawl------------------------
casper.on("remote.message", function (msg) {
    this.echo("remote.msg: " + msg);
});

casper.start(url);

casper.then(function () {
    var links = this.evaluate(getlinks);
    debugger;
    console.log('links length: ' + links.length);    

    this.eachThen(links, function (link) {
        this.thenOpen(link);
    });
});

casper.run(function () {
    this.exit();
});