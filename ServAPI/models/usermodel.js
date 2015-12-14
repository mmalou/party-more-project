var mongoose = require('mongoose');
var Schema = mongoose.Schema;
    
var schema_user = Schema({
	username 	: String,
	mail 		: String,
	password 	: String,
	firstname	: String,
	lastname	: String,
	contacts	: Array},
	{ versionKey: false });

var User = mongoose.model('user', schema_user, 'user');

module.exports = {
	add: function(p_mail, p_password, p_username, callback) {
		var newUser = new User({username : p_username, mail : p_mail , password : p_password});
		newUser.save(function (err,doc) {
			if (err) 
				return callback("error");
			return callback(doc)
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
			if (err) 
				return callback("error");
			return callback(doc);
		});
	},
	findByUsername: function(p_username, callback) {
		User.find({ username : p_username }, function (err, doc){
			if (err) 
				return callback("error");
			return callback(doc);
		});
	},
	findById: function(id, callback) {
		User.findById(id, function (err, doc){
			if (err) 
				return callback("error");
			return callback(doc);
		});
	},
	findByMailOrUsername : function(mail, username, callback){
		User.find( { $or:[ {username:username}, {mail:mail}]}, function(err,doc){
			if (err) 
				return callback("error");
			return callback(doc);
		});
	}
};
