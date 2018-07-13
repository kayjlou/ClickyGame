	// Dependencies
  var express = require("express");
  var router = express.Router();
  var bodyParser = require("body-parser");
  var path = require("path");
  var PORT = process.env.PORT || 8080;
  var app = express();
  
  // Use body-parser for handling form submissions
  app.use(bodyParser.urlencoded({ extended: false }));
  // Use express.static to serve the public folder as a static directory
  app.use(express.static("public"));
  
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });