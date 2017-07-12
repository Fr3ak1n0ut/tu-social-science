var request = require('request');
var cheerio = require('cheerio');
var express = require('express');

let founders = "";
request("http://localhost:3000/csv", (error, response, html) => {
    if (error) {
        console.error("error");
    }
    founders = response.body;
    //console.log(response.body);

    let jsonFounders = csvToJSON(founders);
    //console.log(jsonFounders[0])
    for (let i = 0; i < 1; i++) {
        let url = 'https://www.xing.com/profile/' + jsonFounders[i]
            .firstname
            .trim() + "_" + jsonFounders[i]
            .lastname
            .trim();
        request("https://www.xing.com/profile/Mario_Grobholz", (error, response, html) => {
            if (error) {
                console.error("error");
            }
            //console.log(test);
            let $ = cheerio.load(html);
            console.log($.html());
            console.log($('#cv-tab').html());
            let row = $("#haves")
                .children("ul")
                .html();
            console.log(row);

            let profileDetails = $("h2:contains('Ich biete')").next();
            //console.log("Details:" + profileDetails);
            /*var app = express();
            app.get('/', function (req, res) {
                res.send(profileDetails);
            });

            app.listen(3001, function () {
                console.log('Example app listening on port 3001!');
            });
            */
        });
    }
});

function csvToJSON(csv) {
    var lines = csv.split("\n");
    var result = [];
    var headers = lines[0].split(",");
    for (var i = 1; i < lines.length; i++) {
        var obj = {};
        var currentline = lines[i].split(",");
        for (var j = 0; j < headers.length; j++) {
            obj[headers[j]] = currentline[j];
        }
        result.push(obj);
    }
    //return result; //JavaScript object
    return result; //JSON
}