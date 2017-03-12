const Mommy = require('./schema/mommy');
const config = require('../config/config');

const MommyModel = {
    create : function(data, callback){
        let new_mommy = new Mommy(data);
        new_mommy.save(function(err, response){
            callback(err, response);
        });
    },
    get_bulk : function(callback){
        Mommy.find({}, function(err, response){
            callback(err, response);
        });
    }
};

module.exports = MommyModel;