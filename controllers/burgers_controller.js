// Global
const express = require("express");
const router = express.Router();
const db = require("../models");
// Default the route to /burgers (Main Home Page)
router.get('/',function(req,res){
    res.redirect("/burgers");
});
// Get Burgers 
router.get('/burgers',function(req,res){
    db.Burger.findAll({ include:[{model: db.Customer}],order: [ ['Name']]}).then(function(dbBurger){
        var hbsObject = { burgers: dbBurger };
        res.render('index',hbsObject);
    });
});
// Create Burger
router.post("/burgers/create",function(req,res){
    db.Burger.create({Name: req.body.burger_name}).then(function(dbBurger){
        res.redirect('/burgers');
    });
});
// Update Burger
router.put('/burgers/update/:burger_id',function(req,res){
    db.Customer.findOrCreate({where: {Name: req.body.customer_name}}).spread((customer) => {
        customer.get({ plain: true});
        db.Burger.update({Devoured: 1, CustomerId: customer.id},{where: {id: req.params.burger_id}}).then(function(dbBurger){
            res.redirect('/burgers');
        })
    })
});
// Export Router
module.exports = router;