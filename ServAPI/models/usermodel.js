var mongoose = require('mongoose');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
    
var schema_user = Schema({ id : ObjectId, mail : String, password : String, firstname: String, lastname: String});
var User = mongoose.model('user', schema_user, 'user');

module.exports = {
	add: function(p_mail, p_password, p_firstname, p_lastname, callback) {
		var newUser = new User({ mail : p_mail , password : p_password, firstname : p_firstname, lastname : p_lastname});
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
	}
};
