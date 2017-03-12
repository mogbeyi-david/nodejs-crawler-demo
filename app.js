const express = require('express');
const mommy_model = require('./model/mommy');

let app     = express();
require('./lib/db')();

app.get('/crawl', function(req,res){
    mommy_model.get_bulk(function(err,data){
        let response = {
            'status' : true,
            'total': data.length,
            'data' : data,
        };
        return res.json(response);
    });
});

// app.listen('8081');

module.exports = app;
