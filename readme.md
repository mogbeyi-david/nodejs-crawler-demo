## Simple Web Crawler
-----------------

This is a simple web crawler that crawls
[link](https://mommypoppins.com/events?area%5B%5D=118&field_event_date_value%5B%5D=03-04-2017&event_end=2017-04-07). Parses through the results page. It works based on the (Scrapy)[https://scrapy.org/] crawling engine. Its uses Extruct to parse application/ld+json content of the pages to retrieve basic content and Xpath to query the

### To start
------------
```sh

..$ npm install

````

### To run the crawler
To start the crawler
```sh
 cd <directory>
 npm run crawl

````

### MongoDB

The mongodb collection schema is as follows

```js
    {
      "_id": "58c4f2882b8daa24cd185054",
      "link": "https://mommypoppins.com/new-york-city-kids/event/indoor/treehouse-shakers-olive-pearl-a-magical-story-of-home-family-show",
      "event_link": "http://www.flushingtownhall.org/event/c17de736955ca330f80eb072a5aefefe",
      "name": "Treehouse Shakers' Olive & Pearl",
      "description": "Shows at 11:00 am and 2:15 pm",
      "location": "Flushing Town Hall",
      "age_group": "2-5",
      "price": " $13 for adults, $8 for children ",
      "date": "Saturday, March 18, 2017 ",
      "__v": 0
    }
```

The mongodb database is `mommy` and the collection is `crawl`
To view the crawled data run the below commands at the mongo shell

```sh
 > use mommy
 > db.crawl.find()

```

The application also exposes an http interface to access the crawled contents

```sh
..$ npm start

```
Then access `http://localhost:3000/crawl` either in your browser or postman. It returns a json response of the crawled
contents.

