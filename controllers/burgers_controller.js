var express = require("express");

var router = express.Router();

//import data model 
var db = require("../models");

router.get("/", function (req, res) {
    db.Burger.findAll({
        include: [{ model: db.Customer }],
        order: [['Name']]
    }).then(function (data) {
        res.render("index", { burgers: data });
    });
});

router.post("/burgers", function (req, res) {
    db.Burger.create(req.body).then(function (result) {
        res.json(result);
    });
});

router.put("/burger:id", function (req, res) {
    console.log("controller:req.body=", req.body);
    db.Customer.findOrCreate({
        where: { Name: req.body.customer_name }
    }).spread((customer) => {
        customer.get({ plain: true });
        db.Burger.update(
            {
                Devoured: true,
                CustomerId: customer.id
            }, 
            { 
                where: { id: req.params.id.slice(1) } 
            }).then(function (dbBurger) {
                res.json(dbBurger);
            })
    })
});

// Export routes for server.js to use.
module.exports = router;