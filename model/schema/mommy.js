const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let MommySchema = new Schema({
    name  : {type: String, required: true},
    description : {type: String, required: true},
    age_group   : {type: String, required: true},
    location    : {type: String, required: true},
    price       : {type: String, required: true},
    link		: {type: String, required: true},
    event_link  : {type: String, required: true},
    date        : {type: String, required: true},

}, {collection: 'crawl'});


module.exports = mongoose.model('Mommy', MommySchema);