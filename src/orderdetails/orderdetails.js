/*jshint esversion: 6 */

var connection = require("../database/connect");
var ObjectId = require('mongodb').ObjectID;
function getOrder(cb) {
    connection.mongoConnection(function(err,db) {
        if (err) {
            console.log("error in connecting mongo", +err);
        } else {
                var db = db.db('orderdetails');
                db.collection("orders").find({}).toArray(function(err,result) {
                    if (result) {
                        cb(null,result);
                    } else {
                        cb("Error in Retriving Data");
                    }
                });
            }
    });
}

function addOrder(req,cb) {
    var data = {
        orderNumber: req.body.orderNumber,
        orderDueDate: req.body.orderDueDate,
        customerName: req.body.customerName,
        customerAddress: req.body.customerAddress,
        customerPhone: req.body.customerPhone,
        orderTotal: req.body.orderTotal
    };
    connection.mongoConnection(function(err,db) {
        if (err) {
            console.log("error in connecting mongo", +err);
        } else {
            var db = db.db('orderdetails');
            db.collection("orders").insertOne(data, function(err,result) {
                if (result) {
                    cb(null,result);
                } else {
                    cb("error in inserting data");
                }
            });
        }
    });
}

function updateOrder(req,cb) {  
    connection.mongoConnection(function(err,db) {
            // console.log(err);
    var data = {
        orderNumber: req.body.orderNumber,
        orderDueDate: req.body.orderDueDate,
        customerName: req.body.customerName,
        customerAddress: req.body.customerAddress,
        customerPhone: req.body.customerPhone,
        orderTotal: req.body.orderTotal
    };

    var db = db.db('orderdetails');
    db.collection("orders").updateMany({_id: ObjectId(req.body._id)},{ $set: data },{upsert: false}, function(err,result) {
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


function deleteOrder(req,cb) {
    connection.mongoConnection(function(err,db) {
        console.log(err);
        console.log(req.query.id);
        var db = db.db('orderdetails');
        db.collection("orders").deleteOne({_id:ObjectId(req.query.id)},function(err,result) {
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
    getOrder,
    addOrder,
    updateOrder,
    deleteOrder
};