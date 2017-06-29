var request = require('request');
var cheerio = require('cheerio');

let founders = [];
var csvContent = "";

var express = require('express');

/*
process.argv.forEach(function (val, index, array) {
    console.log(index + ': ' + val);
});
*/

if (process.argv[2] == '--page' && process.argv[3] != undefined) {
    let pages = Number(process.argv[3]);
    if (!Number.isNaN(pages)) {
        console.log("Querying Gründerszene for pages...");
        reqFounders(pages);
    }
    else {
        console.log("wrong type: " + process.argv[3] + " should be a number.");
    }
}
else {
    console.log("Valid format is:");
    console.log("node index.js --page [pageNum]");
}

function reqFounders(page) {
    var promise = new Promise((resolve, reject) => {

        request('https://www.gruenderszene.de/suche/personen?seite=' + page, function (error, response, html) {
            if (!error && response.statusCode == 200) {
                let res = response.body;
                let i = 1;
                $ = cheerio.load(res);
                while ($('#titlelink' + i).html() != undefined) {
                    let founder = $('#titlelink' + i).html();
                    console.log(i + ": " + founder);
                    let concat = founder + '\n';
                    csvContent = csvContent.concat(concat);
                    i++;
                }
                console.log("Loading new page (" + page + ")...");
                if (i == 1) {
                    console.log("finished scraping.");
                    resolve(csvContent);
                } else {
                    reqFounders(page + 1);
                }
            } else {
                console.log(error);
                return false;
            }
        });
    });
    promise.then((val) => {
        var app = express();
        console.log(val);
        app.get('/', function (req, res) {
            res.send('Hello World!');
        });

        app.get('/csv', function (req, res) {
            res.send(val);
        });


        app.listen(3000, function () {
            console.log('Example app listening on port 3000!');
        });

    });
}

