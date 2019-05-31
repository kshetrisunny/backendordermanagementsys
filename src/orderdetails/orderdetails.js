/*jshint esversion: 6 */

var connection = require("../database/connect");
var ObjectId = require('mongodb').ObjectID;
function getPerson(cb) {
    connection.mongoConnection(function(err,db) {
        if (err) {
            console.log("error in connecting mongo", +err);
        } else {
                var db = db.db('userdetails');
                db.collection("persons").find({}).toArray(function(err,result) {
                    if (result) {
                        cb(null,result);
                    } else {
                        cb("Error in Retriving Data");
                    }
                });
            }
    });
}

function addPerson(req,cb) {
    var data = {
        Name: req.body.Name,
        Gender: req.body.Gender,
        Age: req.body.Age,
        Mobile: req.body.Mobile
    };
    connection.mongoConnection(function(err,db) {
        if (err) {
            console.log("error in connecting mongo", +err);
        } else {
            var db = db.db('userdetails');
            db.collection("persons").insertOne(data, function(err,result) {
                if (result) {
                    cb(null,result);
                } else {
                    cb("error in inserting data");
                }
            });
        }
    });
}

function updatePerson(req,cb) {  
    connection.mongoConnection(function(err,db) {
            // console.log(err);
    var data = {
        Name: req.body.Name,
        Gender: req.body.Gender,
        Age: req.body.Age,
        Mobile: req.body.Mobile
    };

    var db = db.db('userdetails');
    db.collection("persons").updateMany({_id: ObjectId(req.body._id)},{ $set: data },{upsert: false}, function(err,result) {
        if (result) {
            cb(null,result);
            console.log(result);
        } else {
            cb("error in updating data" +err);
            // console.log(err);
        }
    });

    });

}


function deletePerson(req,cb) {
    connection.mongoConnection(function(err,db) {
        console.log(err);
        console.log(req.query.id);
        var db = db.db('userdetails');
        db.collection("persons").deleteOne({_id:ObjectId(req.query.id)},function(err,result) {
            if (result) {
                cb(null,result);
                console.log(result);
            } else {
                cb("error in deleting data" +err);
                console.log(err);
            }
                console.log(err);
                console.log(result);

        });
    });
    console.log(req,cb);
}


module.exports = {
    getPerson,
    addPerson,
    updatePerson,
    deletePerson
};