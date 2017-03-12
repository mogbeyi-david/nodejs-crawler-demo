/**
 * Module dependencies.
 */

require('../lib/db')();

const config      = require('../config/config');
const request     = require('request');
const chalk       = require('chalk');
const xpath       = require('xpath');
const dom         = require('xmldom').DOMParser;
const mommy_model = require('../model/mommy');
const async       = require('async');

const BASE_CRAWL_URL = config.CRAWL_BASE_URL;

/**
 * Create a request to url
 *
 * @return {Function}
 * @api public
 */

let mRequest = function(url, callback){
    request(url, function(error, response, html){
        if(error) {
            return callback(error, null);
        }
        return callback(null, html);
    });
};

/**
 * Crawls the specified url
 *
 * @return Links to be parse
 * @param url
 * @param callback
 * @public
 *
 */

let crawl = function(url, callback){
    mRequest(url,(error , html) => {

        if(error) {
            console.log(chalk.red('✗') + "Error parsing "+url);
            return;
        }

        let doc = new dom().parseFromString(html);

        let links = xpath.select('//span/a/@href', doc);
        let new_links = [];
        links.forEach((link) => {
            new_links.push(BASE_CRAWL_URL+link.value);
        });
        console.log(new_links);
        async.each(new_links, parse_item,callback());
    })
};

/**
 * Crawls the specified url for data
 *
 * @return
 * @param url
 * @private
 *
 */

let parse_item = function(url){
    mRequest(url,(error, html) => {
        if(error) {
            console.log(chalk.red('✗') + "Error parsing "+url);
            return;
        }

        let doc = new dom().parseFromString(html);
        try{
            extract(url, doc)
        } catch (err) {
            console.log(chalk.red('✗') + "Error parsing "+url);
        }
    });
};

/**
 * Extract data from html document using xpath
 *
 * @return
 * @param url
 * @param doc
 * @private
 *
 */
let extract = function(url, doc){

    const EVENT_NAME_XPATH          = "//h1[@id='page-title']/text()";
    const EVENT_DESCRIPTION_XPATH   = '//div[contains(@class,"field-type-text-with-summary")]//div[contains(@class,"field-items")]//div[contains(@class, "field-item even")]/p/text()'
    const EVENT_LOCATION_XPATH      = '//span[contains(@class, "fn")]/text()';
    const EVENT_LINK_XPATH          = '//div[contains(@class,"field-name-field-website")]//div[contains(@class, "field-item even")]/a/@href'
    const EVENTAGE_GROUP_XPATH      = '//div[contains(@class, "field-name-field-age")]//div[contains(@class,"field-items")]//div[contains(@class,"field-item")]/text()'
    const EVENT_PRICE_XPATH         = '//div[contains(@class, "field-name-field-price")]//div[contains(@class,"field-items")]//div[contains(@class,"field-item")]/text()'
    const EVENT_DATE_XPATH          = '//span[contains(@class, "date-display-single")]/text()';

    let event_name        = xpath.select('string('+EVENT_NAME_XPATH+')', doc);
    let event_description = xpath.select('string('+EVENT_DESCRIPTION_XPATH+')', doc);
    let event_location    = xpath.select('string('+EVENT_LOCATION_XPATH+')', doc);
    let event_link        = xpath.select('string('+EVENT_LINK_XPATH+')', doc);
    let event_age_group   = xpath.select('string('+EVENTAGE_GROUP_XPATH+')', doc);
    let event_price       = xpath.select('string('+EVENT_PRICE_XPATH+')', doc);
    let event_date        = xpath.select('string('+EVENT_DATE_XPATH+')', doc);

    let data = {
        "link": url,
        "event_link" : event_link,
        "name": event_name,
        "description": event_description,
        "location": event_location,
        "age_group": event_age_group,
        "price" : event_price,
        'date' : event_date
    };

    mommy_model.create(data, function(err, response){});
};

module.exports = {
    "crawl": crawl
};

