var mongoose = require('mongoose');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
    
var schema_event_location_suggestion_vote = Schema({ id : ObjectId, idEventLocationSuggestion : ObjectId, idUser : ObjectId}, { versionKey: false });
var EventLocationSuggestionVote = mongoose.model('event_location_suggestion_vote', schema_event_location_suggestion_vote, 'event_location_suggestion_vote');


module.exports = {
	add: function(p_idEventLocationSuggestion, p_idUser, callback) {
		var newEventLocationSuggestionVote = new EventLocationSuggestionVote({ idEventLocationSuggestion : p_idEventLocationSuggestion, idUser : p_idUser});
		newEventLocationSuggestionVote.save(function (err,doc) {
			if (err) 
				return callback("error");
			return callback(doc)
		});
	},
	remove: function(id, callback) {
		EventLocationSuggestionVote.remove({ _id: id }, function(err) {
			if (err) 
				return callback("error");
			return callback("ok")
		});
	},
	findByEventLocationSuggestionId: function(p_idEventLocationSuggestion, callback) {
		EventLocationSuggestionVote.find({ idEventLocationSuggestion : p_idEventLocationSuggestion }, function (err, doc){
			if (err) 
				return callback("error");
			return callback(doc);
		});
	},
	findById: function(id, callback) {
		EventLocationSuggestionVote.findById(id, function (err, doc){
			if (err) 
				return callback("error");
			return callback(doc);
		});
	}
};
