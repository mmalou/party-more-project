var express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')
var app = express();

var mongoose = require('mongoose');
var db = mongoose.connection;
mongoose.connect('mongodb://admin:jujutropbeau123@ds055862.mongolab.com:55862/party-more-db');

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
	console.log("Connection ok");
});

var usermodel = require(__dirname +"/models/usermodel.js");
var usercontactmodel = require(__dirname +"/models/usercontactmodel.js");
var eventmodel = require(__dirname +"/models/eventmodel.js");
var eventlocationsuggestionmodel = require(__dirname +"/models/eventlocationsuggestionmodel.js");
var eventlocationsuggestionvotemodel = require(__dirname +"/models/eventlocationsuggestionvotemodel.js");
var eventusermodel = require(__dirname +"/models/eventusermodel.js");
var eventstuffmodel = require(__dirname +"/models/eventstuffmodel.js");
var eventcategorymodel = require(__dirname +"/models/eventcategorymodel.js");

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
    next();
});

/****** API USER ******/

//retourne l'utilisateur dont l'id est passé en paramètre
app.get('/user/:iduser', function(req, res){
	console.log("2");
    usermodel.findById(req.params.iduser, function(resultFind){
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

//retourne l'utilisateur d'après son username
app.get('/user/username/:username', function(req, res){
    usermodel.findByUsername(req.params.username, function(resultFind){
        if(resultFind == "error" || resultFind == null){
			res.statusCode = 404;
			res.header("Cache-Control", "public, max-age=1209600");
			res.send("Not Found");
		}
		else {
			var sortArray = [];
			for (var i in resultFind){
				sortArray.push({mail: resultFind[i].mail, password: resultFind[i].password,
		                    username: resultFind[i].username, id:resultFind[i]._id});
			}
			res.statusCode = 200;
			res.header("Cache-Control", "public, max-age=1209600");
			res.send(sortArray);
		} 
    });
});

//retourne l'utilisateur d'après son mail
app.get('/user/mail/:mailuser', function(req, res){
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
		                    username: resultFind[i].username});
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
	var username = req.body.username;

	usermodel.findByMailOrUsername(mail, username, function(users){
		if (users == "error") {
			res.statusCode = 500;
			res.header("Cache-Control", "public, max-age=1209600");
			res.send();
		} else if(users.length == 0){
			usermodel.add(mail, password, username, function(resultAdd){
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
		} else {
			res.statusCode = 409;
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

//retourne un contact d'après son mail
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
	usermodel.add(mailUser, mailContact, function(resultAdd){
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

//retourne un event d'après son id
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

//retourne une suggestion de localisation d'après son id
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

//retourne toutes les suggestions de l'event dont l'id est passé en paramètre
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

/****** API EVENT LOCATION SUGGESTION VOTE ******/

//retourne le vote dont l'id est passé en paramètre
app.get('/eventlocationsuggestionvote/:ideventlocationsuggestionvote', function(req, res){
    eventlocationsuggestionvotemodel.findById(req.params.ideventlocationsuggestionvote, function(resultFind){
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

//retourne tous les votes associés à la suggestion passé en paramètre
app.get('/eventlocationsuggestionvote/eventlocationsuggestion/:ideventlocationsuggestion', function(req, res){
    eventlocationsuggestionvotemodel.findByEventLocationSuggestionId(req.params.ideventlocationsuggestion, function(resultFind){
        if(resultFind == "error" || resultFind == null){
			res.statusCode = 404;
			res.header("Cache-Control", "public, max-age=1209600");
			res.send("Not Found");
		}
		else{
			var sortArray = [];
			for (var i in resultFind){
				sortArray.push({idEventLocationSuggestion: resultFind[i].idEventLocationSuggestion, idUser: resultFind[i].idUser});
			}
			res.statusCode = 200;
			res.header("Cache-Control", "public, max-age=1209600");
			res.send(sortArray);
		} 
    });
});

app.post('/eventlocationsuggestionvote/', function(req, res) {
	var idEventLocationSuggestion = req.body.idEventLocationSuggestion;
	var idUser = req.body.idUser;
	eventlocationsuggestionvotemodel.add(idEventLocationSuggestion, idUser, function(resultAdd){
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

app.delete('/eventlocationsuggestionvote/:ideventlocationsuggestionvote', function(req, res) {
	eventlocationsuggestionvotemodel.remove(req.params.ideventlocationsuggestionvote, function(resultFind){
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


/****** API EVENT USER ******/

//retourne les events associés à l'user dont l'id est passé en paramètre
app.get('/eventuser/:idUser', function(req, res){
	console.log("/eventuser/"+req.params.idUser);
    eventusermodel.findByUser(req.params.idUser, function(resultFindEventsIds){		
		var eventsId = [];
		for(event in resultFindEventsIds) {
			eventsId.push(resultFindEventsIds[event].idEvent);
		}
		
		eventmodel.getEventsbyIds(eventsId, function(resultFindEvents){
			if(resultFindEvents != "error" || resultFindEvents != null){
				res.statusCode = 200;
				res.header("Cache-Control", "public, max-age=1209600");
				res.send(resultFindEvents);
			}
		});
    });
});

app.post('/eventuser/:idEventUser/:status', function(req, res) {
    eventusermodel.updateStatus(req.params.idEventUser, req.params.status, function(resultAdd){
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

app.post('/eventuser/', function(req, res) {
	var idEvent = req.body.idEvent;
	var idUser = req.body.idUser;
	eventusermodel.add(idEvent, idUser, function(resultAdd){
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

app.delete('/eventuser/:ideventuser', function(req, res) {
	eventusermodel.remove(req.params.ideventuser, function(resultFind){
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


/****** API EVENT STUFF ******/

//retourne l'event stuff d'après son id
app.get('/eventstuff/:ideventstuff', function(req, res){
    eventstuffmodel.findById(req.params.ideventstuff, function(resultFind){
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

//retourne les event stuff d'après l'id de l'event associé
app.get('/eventstuff/event/:idevent', function(req, res){
    eventstuffmodel.findByEvent(req.params.idevent, function(resultFind){
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

app.post('/eventstuff/', function(req, res) {
	var idEvent = req.body.idEvent;
	var idUser = req.body.idUser;
	var content = req.body.content;
	eventstuffmodel.add(idEvent, idUser, content, function(resultAdd){
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

app.post('/eventstuff/:idEventStuff/:content', function(req, res) {
    eventstuffmodel.updateContent(req.params.idEventStuff, req.params.content, function(resultAdd){
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

app.delete('/eventstuff/:ideventstuff', function(req, res) {
	eventstuffmodel.remove(req.params.ideventstuff, function(resultFind){
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


/****** API EVENT CATEGORY ******/

app.get('/eventcategory/:name', function(req, res){
    eventcategorymodel.findByName(req.params.name, function(resultFind){
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

app.get('/eventcategory/:id', function(req, res){
    eventcategorymodel.findById(req.params.id, function(resultFind){
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

app.get('/eventcategory/', function(req, res){
    eventcategorymodel.findAll(function(resultFind){
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
