var mongoose = require('mongoose');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
    
var schema_event_location_suggestion = Schema({ id : ObjectId, idEvent : ObjectId, category : String, location: String, voteCount: Number});
var EventLocationSuggestion = mongoose.model('event_location_suggestion', schema_event_location_suggestion, 'event_location_suggestion');

module.exports = {
	add: function(p_idEvent, p_category, p_location, p_voteCount, callback) {
		var newEventLocationSuggestion = new EventLocationSuggestion({ idEvent : p_idEvent, category : p_category, location : p_location, voteCount : p_voteCount});
		newEventLocationSuggestion.save(function (err,doc) {
			if (err) 
				return callback("error");
			return callback(doc)
		});
	},
	clean: function(callback) {
		EventLocationSuggestion.remove(function(err) {
			if (err) 
				return callback("error");
			return callback("ok")
		});
	},
	remove: function(id, callback) {
		EventLocationSuggestion.remove({ _id: id }, function(err) {
			if (err) 
				return callback("error");
			return callback("ok")
		});
	},
	findByEventId: function(p_idEvent, callback) {
		EventLocationSuggestion.find({ idEvent : p_idEvent }, function (err, doc){
			if (err) 
				return callback("error");
			return callback(doc);
		});
	},
	findById: function(id, callback) {
		EventLocationSuggestion.findById(id, function (err, doc){
			if (err) 
				return callback("error");
			return callback(doc);
		});
	}
};