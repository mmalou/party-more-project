var mongoose = require('mongoose');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
    
var schema_user_contact = Schema({ mailUser : String, mailContact : String, status : String});
var UserContact = mongoose.model('user_contact', schema_user_contact, 'user_contact');

module.exports = {
	add: function(p_mailUser, p_mailContact, callback) {
		var newUserContact = new UserContact({ mailUser : p_mailUser , mailContact : p_mailContact,
		                    status: "pending"});
		newUserContact.save(function (err,doc) {
			if (err) 
				return callback("error");
			return callback(doc)
		});
	},
	clean: function(callback) {
		UserContact.remove(function(err) {
			if (err) 
				return callback("error");
			return callback("ok")
		});
	},
	remove: function(id, callback) {
		UserContact.remove({ _id: id }, function(err) {
			if (err) 
				return callback("error");
			return callback("ok")
		});
	},
	findAllContactsByMail: function(p_mail, callback) {
		UserContact.find({ mailUser : p_mail }, function (err, doc){
			if (err) 
				return callback("error");
			return callback(doc);
		});
	}
};
