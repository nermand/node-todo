var http = require('http');
var express = require("express");
var morgan = require('morgan');
var app = express();
var controllers = require("./controllers");

// parse request body
var bodyParser = require('body-parser');

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
