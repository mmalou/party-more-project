var mongoose = require('mongoose');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
    
var schema_event = Schema({ id : ObjectId, name : String, category : String, dateStart: String, description: String, location: String, mailUser: String}, { versionKey: false });
var Event = mongoose.model('event', schema_event, 'event');

module.exports = {
	add: function(p_name, p_category, p_dateStart, p_description, p_location, p_mailUser, callback) {
		var newEvent = new Event({ name : p_name, category : p_category, dateStart : p_dateStart, description : p_description, location : p_location, mailUser : p_mailUser});
		newEvent.save(function (err,doc) {
			if (err) 
				return callback("error");
			return callback(doc)
		});
	},
	remove: function(id, callback) {
		Event.remove({ _id: id }, function(err) {
			if (err) 
				return callback("error");
			return callback("ok")
		});
	},
	findByMail: function(p_mail, callback) {
		Event.find({ mailUser : p_mail }, function (err, doc){
			if (err) 
				return callback("error");
			return callback(doc);
		});
	},
	findById: function(id, callback) {
		Event.findById(id, function (err, doc){
			if (err) 
				return callback("error");
			return callback(doc);
		});
	},
	getEventsbyIds: function(ids, callback) {
		var events = [];
		for(index in ids){
			Event.findById(ids[index], function (err, doc){
				if (err) 
					return callback("error");
				events.push(doc);
				if(events.length == ids.length) {
					return callback(events);
				}
			});
		}
	}
};
