const config        = require('./config/config');
const mommy_scraper = require('./scraper/mommy');
const async         = require('async');
const chalk         = require('chalk');

// crawl url
const CRAWL_URL = config.CRAWL_URL;

const MAX_PAGES = 20;

let url = [];

// generate links of pages to be crawled
(function(){
    for(let page = 1; page <= MAX_PAGES; page++){
       url.push(CRAWL_URL+page);
    }
}());

console.log(chalk.blue('✓ Start crawl'));

// create async process for each page
async.each(url, mommy_scraper.crawl, function(){
    console.log(chalk.blue('✓  End crawl'));
    process.exit();
});
