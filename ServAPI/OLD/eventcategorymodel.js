var mongoose = require('mongoose');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
    
var schema_event_category = Schema({ id : ObjectId, name : String}, { versionKey: false });
var EventCategory = mongoose.model('event_category', schema_event_category, 'event_category');

module.exports = {
	findByName: function(p_name, callback) {
		EventCategory.find({ name : p_name }, function (err, doc){
			if (err) 
				return callback("error");
			return callback(doc);
		});
	},
	findById: function(id, callback) {
		EventCategory.findById(id, function (err, doc){
			if (err) 
				return callback("error");
			return callback(doc);
		});
	},
	findAll: function(callback) {
		EventCategory.find({}, function (err, doc){
			if (err) 
				return callback("error");
			return callback(doc);
		});
	}
};
