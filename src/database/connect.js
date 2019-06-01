/*jshint esversion: 6 */

var dbConfig = require('../../database.json');
var mongo = require('mongodb');
var MongoClient = mongo.MongoClient;

function mongoConnection(cb) {
    MongoClient.connect(dbConfig.url, {useNewUrlParser: true}, function(err,db) {
        if (err) {
            cb("Unable to Connect to Server" +err);
        } else {
            console.log("Connected to mongo");
            cb(null, db);
        }
    });
}

module.exports = {
    mongoConnection
};