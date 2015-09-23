var mongoose = require('mongoose');
var uriUtil = require('mongodb-uri');
var mongodbUri = 'mongodb://party-more-user:jujutropbeau123@ds055862.mongolab.com:55862/party-more-db';
var mongooseUri = uriUtil.formatMongoose(mongodbUri);
var mongoose = require('mongoose');
var db = mongoose.connection;
mongoose.connect(mongooseUri);

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
	//console.log("Connection ok");
});

var schema = mongoose.Schema({ name : 'String', password : 'String'});
var User = mongoose.model('user', schema);

module.exports = {
	add: function(p_name, p_password, callback) {
		var newUser = new User({ name : p_name , password : p_password});
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
	findByName: function(p_name, callback) {
		User.find({ name : p_name }, function (err, doc){
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
