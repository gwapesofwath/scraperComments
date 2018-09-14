//Scrape Script

// Our scraping tools
var request = require("request");
var cheerio = require("cheerio");

var scrape = function (cb) {

    request("https://www.npr.org/", function(err, res, body) {


        var $ = cheerio.load(body);

        var articles = [];

        var story = $(".story-wrap");
       
        // console.log($(story[0]).children(".story-text").children("a").text());

        $(".story-wrap").each(function(i, element) {

            //var head = $(this).children(".story-text").children("a h3.title").text().trim();
            var head = $(this).children(".story-text").children("a").text().trim();
            var sum = $(this).children(".story-text").children("p.teaser").text().trim();
            
            console.log(head + sum);
            // if(head && sum) {
            //     var headNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
            //     var sumNeat = sum.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();

                var dataToAdd = {
                    headline: head,
                    summary: sum
                };
            
                articles.push(dataToAdd);
                
        });
        cb(articles);
    });
}


module.exports = scrape;