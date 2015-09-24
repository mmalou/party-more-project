var http = require('http')
var url = require('url')
var querystring = require('querystring')
var express = require('express')
var bodyParser = require('body-parser')
var app = express();

var mongoose = require('mongoose');
var uriUtil = require('mongodb-uri');
var mongodbUri = 'mongodb://admin:jujutropbeau123@ds055862.mongolab.com:55862/party-more-db';
var mongooseUri = uriUtil.formatMongoose(mongodbUri);
var db = mongoose.connection;
mongoose.connect(mongooseUri);

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
	console.log("Connection ok");
});

var usermodel = require(__dirname +"/models/usermodel.js");
var usercontactmodel = require(__dirname +"/models/usercontactmodel.js");

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

var path = "http://localhost:8081/";

/****** API USER ******/

app.get('/user/:mailuser', function(req, res){
    usermodel.findByMail(req.params.mailuser, function(resultFind){
        if(resultFind == "error" || resultFind == null){
			res.statusCode = 404;
			res.header("Cache-Control", "public, max-age=1209600");
			res.send("Not Found");
		}
		else{
		    var sortObject = {mail: resultFind.mail, password: resultFind.password,
		                    firstname: resultFind.firstname, lastname: resultFind.lastname};
			res.statusCode = 200;
			res.header("Cache-Control", "public, max-age=1209600");
			res.send(sortObject);
		} 
    });
});

app.post('/user/', function(req, res) {
	var mail = req.body.mail;
	var password = req.body.password;
	usermodel.add(mail, password, function(resultAdd){
		if (resultAdd == "error") {
			res.statusCode = 500;
			res.header("Cache-Control", "public, max-age=1209600");
			res.send();
		}
		else {
			res.statusCode = 201;
			res.header("Cache-Control", "public, max-age=1209600");
			res.send();
		}
	});
});

app.delete('/user/', function(req, res) {
	usermodel.clean(function(resultFind){
		if(resultFind == "error" || resultFind == null){
			res.statusCode = 400;
			res.header("Cache-Control", "public, max-age=1209600");
			res.send(resultFind);
		}
		else{
			res.statusCode = 200;
			res.header("Cache-Control", "public, max-age=1209600");
			res.send(resultFind);
		}
	});
});


/****** API USER CONTACT ******/

app.get('/usercontact/:mailuser', function(req, res){
    usercontactmodel.findContactByMail(req.params.mailuser, function(resultFind){
        if(resultFind == "error" || resultFind == null){
			res.statusCode = 404;
			res.header("Cache-Control", "public, max-age=1209600");
			res.send("Not Found");
		}
		else{
			res.statusCode = 200;
			res.header("Cache-Control", "public, max-age=1209600");
			res.send(resultFind);
		} 
    });
});

app.use(function(req, res) {
	res.statusCode = 400;
	res.header("Cache-Control", "public, max-age=1209600");
	res.send("Bad Request");
});

module.exports = app;

//server.close();
