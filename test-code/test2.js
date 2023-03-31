const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs")
scrapingResult = {
    'date': '',
    'the_basic_rate': '',
    'buy': '',
    'sell': ''
}

function getData() {
    request("https://www.namechart.kr/en", function (err, res, body) {
        //const $ = cheerio.load(body);

        fs.writeFile(__dirname + '/entire-page2.html', body, function(err){
            console.log('entire-page2.html successfully written to HTML folder');
        })
        // const bodyList = $("table tbody tr").map(function (i, element) {
        //     scrapingResult['date'] = String($(element).find('td:nth-of-type(1)').text());
        //     scrapingResult['the_basic_rate'] =  String($(element).find('td:nth-of-type(2)').text());
        //     scrapingResult['buy'] =  String($(element).find('td:nth-of-type(4)').text());
        //     scrapingResult['sell'] =  String($(element).find('td:nth-of-type(5)').text());

        //     console.log(scrapingResult)
        // });
    });
}

getData();
