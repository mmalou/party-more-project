var mongoose = require('mongoose');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
    
var schema_event_stuff = Schema({ idEvent : ObjectId, idUser : ObjectId, content : String}, { versionKey: false });
var EventStuff = mongoose.model('event_stuff', schema_event_stuff, 'event_stuff');

module.exports = {
	add: function(p_idEvent, p_idUser, p_content,callback) {
		var newEventStuff = new EventStuff({ idEvent : p_idEvent , idUser : p_idUser, content: p_content});
		newEventStuff.save(function (err,doc) {
			if (err) 
				return callback("error");
			return callback(doc)
		});
	},
	remove: function(id, callback) {
		EventStuff.remove({ _id: id }, function(err) {
			if (err) 
				return callback("error");
			return callback("ok")
		});
	},
	updateContent: function(p_id, p_content, callback) {
	    EventStuff.update({ _id: p_id }, { $set: { content: p_content }}, function(err) {
			if (err) 
				return callback("error");
			return callback("ok")
		});
	},
	findByEvent: function(p_idEvent, callback) {
		EventStuff.find({ idEvent : p_idEvent }, function (err, doc){
			if (err) 
				return callback("error");
			return callback(doc);
		});
	},
	findById: function(id, callback) {
		EventStuff.findById(id, function (err, doc){
			if (err) 
				return callback("error");
			return callback(doc);
		});
	}
};
