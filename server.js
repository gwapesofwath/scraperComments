var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var path = require("path");

// Our scraping tools
var request = require("request");
var cheerio = require("cheerio");
var port = process.env.PORT || 3000;

// Initialize Express
var app = express();

//set up an Express Router
var router = express.Router();

//require our route files
require("./config/routes")(router);
// require("./scripts/scrape")(app);

// Configure middleware
app.use(router);

// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: false }));
// Use express.static to serve the public folder as a static directory
app.use(express.static(__dirname + "/public"));

//Set up handlebars
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({
    defaultLayout: "main",
}));
app.set("view engine", "handlebars");



// Connect to the Mongo DB
var db = process.env.MONGODB_URI || "mongodb://localhost/news";

// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;

// Connect mongoose to our Mongo DB
mongoose.connect(db, function(error) {
    if (error) {
        console.log(error);
    }
    else {
        console.log("mongoose connection is succesful");
    }
});

// Start the server
app.listen(port, function() {
    console.log("App running on port " + port + "!");
  });




