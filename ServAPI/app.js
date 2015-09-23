var http = require('http')
var url = require('url')
var querystring = require('querystring')
var express = require('express')
var bodyParser = require('body-parser')
var app = express();
var mongomodel = require(__dirname +"/models/mongomodel.js");

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

var path = "http://localhost:8081/";

app.get('/user/:iduser', function(req, res) {
	mongomodel.findById(req.params.iduser, function(resultFind){
		if(resultFind == "error" || resultFind == null){
			res.statusCode = 404;
			res.header("Cache-Control", "public, max-age=1209600");
			res.send("Not Found");
		}
		else {
		    var sortObject = {name: resultFind.name, password: resultFind.password};
			res.statusCode = 200;
			res.header("Cache-Control", "public, max-age=1209600");
			res.send(sortObject);
		}
	});
});

app.get('/user/:nameuser', function(req, res){
    mongomodel.findByName(req.params.nameuser, function(resultFind){
        if(resultFind == "error" || resultFind == null){
			res.statusCode = 404;
			res.header("Cache-Control", "public, max-age=1209600");
			res.send("Not Found");
		}
		else{
		    var sortObject = {name: resultFind.name, password: resultFind.password};
			res.statusCode = 200;
			res.header("Cache-Control", "public, max-age=1209600");
			res.send(sortObject);
		} 
    });
});

app.post('/user/', function(req, res) {
	var name = req.body.name;
	var password = req.body.password;
	mongomodel.add(name, password, function(resultAdd){
		if (resultAdd == "error") {
			res.statusCode = 500;
			res.header("Cache-Control", "public, max-age=1209600");
			res.send();
		}
		else {
			res.statusCode = 201;
			res.header("Cache-Control", "public, max-age=1209600");
			res.location(path+"user/"+resultAdd.id);
			res.send();
		}
	});
});

app.delete('/user/', function(req, res) {
	mongomodel.clean(function(resultFind){
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

app.use(function(req, res) {
	res.statusCode = 400;
	res.header("Cache-Control", "public, max-age=1209600");
	res.send("Bad Request");
});

module.exports = app;

//server.close();
