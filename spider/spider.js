var links = [],
    infos = [],
    maxLinks = 30,
    fs = require('fs'),
    casper = require('casper').create({
        verbose: true,
        logLevel: 'debug',
        pageSettings: {
            loadImages: false,
            loadPlugins: false
        }
    }),
    options = casper.cli.options,
    destination = options.dest || 'j-xvideos',
    config = require('config.json')[destination],
    filename = (options.name === undefined ?
        new Date().toLocaleDateString().replace(/\//g, '-').replace('年', '-').replace('月', '-').replace('日', '') + '.csv' :
        options.name + '.csv');

// when run by batch
// require.paths.push("config.json path")

function getThumbnailInfo() {
    'use strict';
    var thumbnails = $('.thumbnails .thumbnail');
    console.log('thumbnail length: ' + thumbnails.length);

    return Array.prototype.map.call(thumbnails, function(thumbnail) {
        var category = $(thumbnail).find('.caption .tags').text().trim();

        var info = $(thumbnail).children('a'),
            link = 'http://j-xvideos.com' + info.attr('href'),
            thumbnailimg = info.children('img').attr('src'),
            description = info.children('img').attr('alt'),
            duration = info.children('.thumbnail-infos').children('.duration').children('.text').text();

        return {
            category: category,
            link: link,
            thumbnail: thumbnailimg,
            description: description,
            duration: duration
        };
    });
}

casper.saveToCSV = function() {
    'use strict';
    var result = '',
        source = [];

    Array.prototype.map.call(infos, function(info, index) {
        if (info) {
            source.push(info + ',' + links[index].category + ',' + links[index].link + ',' + links[index].thumbnail + ',' + links[index].description + ',' + links[index].duration + ',' + filename.split('.csv')[0]);
        }
    });

    for (var index in source) {
        var line = source[index];
        console.log(line);

        if (result.indexOf(line) === -1 && line != null)
            result += line + (index === source.length - 1 ? '' : '\r\n');
    }
    if (result.length > 0) {
        fs.write(fs.pathJoin(fs.workingDirectory, 'output', filename), result, 'w');
    }
};

//Crawl------------------------
casper.on("remote.message", function(msg) {
    this.echo("remote.msg: " + msg);
});

console.log('sourceUrl is: ' + config.sourceUrl);
casper.start(config.sourceUrl);

casper.then(function() {
    links = this.evaluate(getThumbnailInfo);
    console.log('links length: ' + links.length);

    var j = 0;
    this.eachThen(links, function(response) {
        if (response.data == null) return;
        j++;
        if (j > maxLinks) return;

        this.thenOpen(response.data.link, function writeToCSV() {
            var embed = this.evaluate(function() {
                return __utils__.findOne('.iframe iframe').getAttribute('src');
            });

            console.log('embed: ' + embed);
            infos.push(embed);
        });
    });
});

casper.run(function() {
    this.saveToCSV(infos);
    this.echo('infos length :' + infos.length);
    this.exit();
});
