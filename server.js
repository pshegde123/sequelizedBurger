// Global
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
const methodOverride = require('method-override');
const routes = require("./controllers/burgers_controller");
const app = express();
const PORT = process.env.PORT || 8080;
var db = require("./models");
// Config Settings
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine","handlebars");
app.use("/", routes);
app.use(express.static('public'));
// Listener
db.sequelize.sync({force:true}).then(function(){
    app.listen(PORT, function(){
        console.log("App listening on PORT " + PORT);
    });
});