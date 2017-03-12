const config  = require('./config/config');
const mommy_scraper = require('./scraper/mommy');
const async = require('async');

const CRAWL_URL = config.CRAWL_URL;

// let page = 1;
const MAX_PAGES = 20;
let url = [];

(function(){
    for(let page = 1; page <= MAX_PAGES; page++){
       url.push(CRAWL_URL+page);
    }
}());

async.each(url, mommy_scraper.crawl, function(){
    console.log("ending process");
    process.exit();

});
