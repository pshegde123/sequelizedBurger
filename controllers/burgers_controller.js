var express = require("express");

var router = express.Router();

//import data model 
var db = require("../models");

router.get("/", function (req, res) {
    //console.log("************ Here ************");
    //console.log("req=",req.body);
    db.Burger.findAll({}).then(function (data) {
        res.render("index", { burgers: data });
    });
});

router.post("/burgers", function (req, res) {
    db.Burger.create(req.body).then(function(result){
    res.json(result);
    });
});

router.put("/burger:id", function (req, res) {
    db.Burger.update({devoured:true},{
        where:{
            id:req.params.id.slice(1)
        }
    }).then(function(result){
        res.json(result);
    });
})

// Export routes for server.js to use.
module.exports = router;