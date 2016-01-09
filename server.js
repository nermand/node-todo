var http = require('http');
var mongoose = require('mongoose');                 // mongoose for mongodb
var express = require("express");
var morgan = require('morgan');						// log requests to the console (express4)
var bodyParser = require('body-parser');			// parse request body

var config = require('./config');
var controllers = require("./controllers");

var app = express();

mongoose.connect(config.mongodb.url);

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// Set the public static resource folder
app.use(express.static(__dirname + "/public"));

app.use(morgan('dev'));

// Map the Routes
controllers.init(app);

var port = process.env.PORT || '3000';
http.createServer(app).listen(port);

console.log('Server started on port: ', port);

module.exports.getApp = app;
