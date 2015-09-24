var http = require('http')
var url = require('url')
var querystring = require('querystring')
var express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')
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
var eventmodel = require(__dirname +"/models/eventmodel.js");
var eventlocationsuggestionmodel = require(__dirname +"/models/eventlocationsuggestionmodel.js");

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
    next();
});

/****** API USER ******/

app.get('/user/:mailuser', function(req, res){
    usermodel.findByMail(req.params.mailuser, function(resultFind){
        if(resultFind == "error" || resultFind == null){
			res.statusCode = 404;
			res.header("Cache-Control", "public, max-age=1209600");
			res.send("Not Found");
		}
		else {
			var sortArray = [];
			for (var i in resultFind){
				sortArray.push({mail: resultFind[i].mail, password: resultFind[i].password,
		                    firstname: resultFind[i].firstname, lastname: resultFind[i].lastname});
			}
			res.statusCode = 200;
			res.header("Cache-Control", "public, max-age=1209600");
			res.send(sortArray);
		} 
    });
});

app.post('/user/', function(req, res) {
	var mail = req.body.mail;
	var password = req.body.password;
	usermodel.add(mail, password, '', '', function(resultAdd){
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

app.delete('/user/:iduser', function(req, res) {
	usermodel.remove(req.params.iduser, function(resultFind){
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
    usercontactmodel.findAllContactsByMail(req.params.mailuser, function(resultFind){
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

app.post('/usercontact/', function(req, res) {
	var mailUser = req.body.mailUser;
	var mailContact = req.body.mailContact;
	usercontactmodel.add(mailUser, mailContact, function(resultAdd){
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

app.delete('/usercontact/:idusercontact', function(req, res) {
	usercontactmodel.remove(req.params.idusercontact, function(resultFind){
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

/****** API EVENT ******/

app.get('/event/:idevent', function(req, res){
    eventmodel.findById(req.params.idevent, function(resultFind){
        if(resultFind == "error" || resultFind == null){
			res.statusCode = 404;
			res.header("Cache-Control", "public, max-age=1209600");
			res.send("Not Found");
		}
		else{
			var sortObject = {name: resultFind.name, category: resultFind.category,
		                    dateStart: resultFind.dateStart, description: resultFind.description, location: resultFind.location, mailUser: resultFind.mailUser};
			res.statusCode = 200;
			res.header("Cache-Control", "public, max-age=1209600");
			res.send(sortObject);
		} 
    });
});

app.post('/event/', function(req, res) {
	var name = req.body.name;
	var category = req.body.category;
	var dateStart = req.body.dateStart;
	var description = req.body.description;
	var location = req.body.location;
	var mailUser = req.body.mailUser;
	eventmodel.add(name, category, dateStart, description, location, mailUser, function(resultAdd){
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

app.delete('/event/:idevent', function(req, res) {
	eventmodel.remove(req.params.idevent, function(resultFind){
		if(resultFind == "error" || resultFind == null){
			res.statusCode = 400;
			res.header("Cache-Control", "public, max-age=1209600");
			res.send(resultFind);
		}
		else {
			res.statusCode = 200;
			res.header("Cache-Control", "public, max-age=1209600");
			res.send(resultFind);
		}
	});
});

/****** API EVENT LOCATION SUGGESTION ******/

app.get('/eventlocationsuggestion/:ideventlocationsuggestion', function(req, res){
    eventlocationsuggestionmodel.findById(req.params.ideventlocationsuggestion, function(resultFind){
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

app.get('/eventlocationsuggestion/event/:idevent', function(req, res){
    eventlocationsuggestionmodel.findByEventId(req.params.idevent, function(resultFind){
        if(resultFind == "error" || resultFind == null){
			res.statusCode = 404;
			res.header("Cache-Control", "public, max-age=1209600");
			res.send("Not Found");
		}
		else{
			var sortArray = [];
			for (var i in resultFind){
				sortArray.push({category: resultFind[i].category, location: resultFind[i].location,
		                    voteCount: resultFind[i].voteCount});
			}
			res.statusCode = 200;
			res.header("Cache-Control", "public, max-age=1209600");
			res.send(sortArray);
		} 
    });
});

app.post('/eventlocationsuggestion/', function(req, res) {
	var idEvent = req.body.idEvent;
	var category = req.body.category;
	var location = req.body.location;
	var voteCount = req.body.voteCount;
	eventlocationsuggestionmodel.add(idEvent, category, location, voteCount, function(resultAdd){
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

app.delete('/eventlocationsuggestion/:ideventlocationsuggestion', function(req, res) {
	eventlocationsuggestionmodel.remove(req.params.ideventlocationsuggestion, function(resultFind){
		if(resultFind == "error" || resultFind == null){
			res.statusCode = 400;
			res.header("Cache-Control", "public, max-age=1209600");
			res.send(resultFind);
		}
		else {
			res.statusCode = 200;
			res.header("Cache-Control", "public, max-age=1209600");
			res.send(resultFind);
		}
	});
});

/****** API REPONSE DE BASE ******/

app.use(function(req, res) {
	res.statusCode = 400;
	res.header("Cache-Control", "public, max-age=1209600");
	res.send("Bad Request");
});

module.exports = app;

//server.close();
