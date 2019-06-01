var express = require('express');
var router = express.Router();
var order = require('../../src/orderdetails/orderdetails');

router.get('/api/orders', function(req, res) {
    order.getOrder(function(typeError, typeResult) {
        if (typeError) {
            res.send({status: false, error: "No Data Found"});
        } else {
            res.send({status: false, result: typeResult});
        }
    });
});

router.post('/api/orders', function (req, res, next) {
    order.addOrder(req, function (typeError, typeResult) {
        if (typeError) {
            res.send({
                status: false,
                error: "No data found"
            });
        } else {
            res.send({
                status: false,
                result: typeResult
            });
        }
    });
});


router.put('/api/orders', function (req, res, next) {
    order.updateOrder(req, function (typeError, typeResult) {
        if (typeError) {
            res.send({
                status: false,
                error: "No data found"
            });
        } else {
            res.send({
                status: false,
                result: typeResult
            });
        }
    });
});


router.delete('/api/orders', function (req, res, next) {
    order.deleteOrder(req, function (typeError, typeResult) {
        if (typeError) {
            res.send({
                status: false,
                error: "No data found"
            });
        } else {
            res.send({
                status: false,
                result: typeResult
            });
        }
    });
    console.log(req,res);
});

module.exports = router;