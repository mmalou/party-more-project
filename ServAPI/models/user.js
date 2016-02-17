var mongoose 	= require('mongoose');
var async 		= require('async');
var Schema 		= mongoose.Schema;
    
var schema_user = Schema({
	username 	: {type: String, 	default: null					},
	mail 		: {type: String, 	default: null					},
	password 	: {type: String, 	default: null					},
	firstname	: {type: String, 	default: null					},
	lastname	: {type: String, 	default: null					},
	createdOn 	: {type: Number, 	default: new Date().getTime()	},
	contacts	: {type: Array,  	default: []						}},
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
	removeById: function(id, callback) {
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
	findByUsernameAndPassword: function(p_username, p_password, callback) {
		User.find({ username : p_username, password : p_password }, function (err, doc){
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
	findByMailOrUsername : function(p_mail, p_username, callback){
		User.find( { $or:[ {username:p_username}, {mail:p_mail}]}, function(err,doc){
			if (err) 
				return callback("error");
			return callback(doc);
		});
	},
	findContactById : function(p_id, p_contactId, callback){
		User.find( {_id : mongoose.Types.ObjectId(p_id), 'contacts._id': p_contactId}, function(err,doc){
			if (err) 
				return callback("error");

			var result = null;
			if(doc.length){
				async.each(doc[0].contacts, function(contact, callback){
					if(contact._id == p_contactId){
						result = contact._id;
					}
					callback();
				}, function(err){
					return callback(result);
				});
			} else {
				return callback(result);
			}
		});
	},
	addContactById: function(p_id, p_contactId, callback){
		User.update(
			{_id : mongoose.Types.ObjectId(p_id), 'contacts._id': {$ne: p_contactId}},
			{ $push: {contacts : {_id: p_contactId, status: "pending"}}},
			function(err, doc) {
				
			if (err) 
				return callback("error");

			return callback(doc);
		});
	},
	getContactsByIds: function(p_contacts, callback){
		var _this = this;
		if(p_contacts.length){
			var result = [];
			async.each(p_contacts, function(contact, callback){
				_this.findById(contact._id, function(user){
					result.push({user: user, status: contact.status});
					callback();
				});
			}, function(err){
				return callback(result);
			});
		} else {
			return callback(p_contacts);
		}
	},
	removeContactById : function(p_userId, p_contactId, callback){
	    User.update(
	        {_id : mongoose.Types.ObjectId(p_userId)},
	        {$pull: {contacts : {_id : p_contactId}}},
	        function(err, doc){
	            if (err) 
			        return callback("error");
			    return callback("done");
	        }
	    ); 
	}
};
