var express 	= require('express')
var bodyParser 	= require('body-parser')
var cors 		= require('cors')
var app 		= express();
var mongoose 	= require('mongoose');

var router      = require('./routes/index'); 
var config 		= require('./config/config');

// A ENLEVER APRES REFACTO DE LA BDD
var model 		= require('./models/index');

var db 			= mongoose.connection;
mongoose.connect(config.db.url);

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
	console.log("Connection db OK");
});

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
    next();
});


app.use('/users', router.users);
app.use('/events', router.events);


app.use(function(req, res) {
	res.statusCode = 400;
	res.header("Cache-Control", "public, max-age=1209600");
	res.send("Bad Request");
});

module.exports = app;
