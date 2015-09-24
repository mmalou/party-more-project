var mongoose = require('mongoose');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
    
var schema_event_user = Schema({ idEvent : ObjectId, idUser : ObjectId, status : String}, { versionKey: false });
var EventUser = mongoose.model('event_user', schema_event_user, 'event_user');

module.exports = {
	add: function(p_idEvent, p_idUser, callback) {
		var newEventUser = new EventUser({ idEvent : p_idEvent , idUser : p_idUser, status: "pending"});
		newEventUser.save(function (err,doc) {
			if (err) 
				return callback("error");
			return callback(doc)
		});
	},
	updateStatus: function(p_id, p_status, callback) {
	    EventUser.update({ _id: p_id }, { $set: { status: p_status }}, function(err) {
			if (err) 
				return callback("error");
			return callback("ok")
		});
	},
	findByUser: function(p_idUser, callback) {
		EventUser.find({ idUser : p_idUser }, function (err, doc){
			if (err) 
				return callback("error");
			return callback(doc);
		});
	},
	findById: function(id, callback) {
		EventUser.findById(id, function (err, doc){
			if (err) 
				return callback("error");
			return callback(doc);
		});
	}
};
