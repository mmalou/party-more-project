var mongoose = require('mongoose');
var uriUtil = require('mongodb-uri');
var mongodbUri = 'mongodb://admin:jujutropbeau123@ds055862.mongolab.com:55862/party-more-db';
var mongooseUri = uriUtil.formatMongoose(mongodbUri);
var mongoose = require('mongoose');
var db = mongoose.connection;
mongoose.connect(mongooseUri);

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
	console.log("Connection ok");
});

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
    
var schema_user = Schema({ id : ObjectId, mail : String, password : String});
var User = mongoose.model('user', schema_user, 'user');

module.exports = {
	add: function(p_mail, p_password, p_firstname, p_lastname, callback) {
		var newUser = new User({ mail : p_mail , password : p_password});
		newUser.save(function (err,doc) {
			if (err) 
				return callback("error");
			return callback(doc)
		});
	},
	clean: function(callback) {
		User.remove(function(err) {
			if (err) 
				return callback("error");
			return callback("ok")
		});
	},
	remove: function(id, callback) {
		User.remove({ _id: id }, function(err) {
			if (err) 
				return callback("error");
			return callback("ok")
		});
	},
	findByMail: function(p_mail, callback) {
		User.find({ mail : p_mail }, function (err, doc){
		    console.log("erreur : " + err);
			if (err) 
				return callback("error");
			return callback(doc[0]);
		});
	},
	findById: function(id, callback) {
		User.findById(id, function (err, doc){
			if (err) 
				return callback("error");
			return callback(doc);
		});
	}
};
