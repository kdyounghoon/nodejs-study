const axios = require("axios");
const cheerio = require("cheerio");
const pretty = require("pretty");
const fs = require("fs")
const path = require("path")

async function main(maxPages = 50) {
    // initialized with the first webpage to visit
    const paginationURLsToVisit = ["https://www.namechart.kr/en"];
    const visitedURLs = [];

    const KoreanNames = new Set();

    // iterating until the queue is empty
    // or the iteration limit is hit
    while (
        paginationURLsToVisit.length !== 0 &&
        visitedURLs.length <= maxPages
        ) {
        // the current webpage to crawl
        const paginationURL = paginationURLsToVisit.pop();
        console.log("Pagination URL --> " + paginationURL)

        // retrieving the HTML content from paginationURL
        const pageHTML = await axios.get(paginationURL);

        // adding the current webpage to the
        // web pages already crawled
        visitedURLs.push(paginationURL);

        // initializing cheerio on the current webpage
        const $ = cheerio.load(pageHTML.data);

        const table = $("table")
        //console.log(table)
        table.map(function(i, element) {
            // Initialize an empty object to store the row data
            console.log(String($(element).find('tr:nth-of-type(1)').text()))




        });

        // console.log([...tableData])

        // $(".ant-table-tbody__tr").map((i, element) => {
        //     console.log("Element--> " + $(element))
        //     //console.log("Element--> " + String($(element).find('td:nth-of-type(1)').text()))
        //     // const name = $(element).attr("href");
        //     // console.log("Korean Name: " + name)
        //     // KoreanNames.add(name);
        // });
    }

    // logging the crawling results
    //console.log([...productURLs]);

    // use productURLs for scraping purposes...
}

main()
    .then(() => {
        process.exit(0);
    })
    .catch((e) => {
        // logging the error message
        console.error(e);

        process.exit(1);
    });
