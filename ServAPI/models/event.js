var mongoose = require('mongoose');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
    
var schema_event = Schema({
	name: 			{type: String, 		default: null},
	creator: 		{type: String, 		default: null},
	category: 		{type: String, 		default: null},
	date: 			{type: Number, 		default: null},
	description: 	{type: String, 		default: null},
	location: 		{type: String, 		default: null},
	image: 			{type: String, 		default: null},
	status: 		{type: String, 		default: "private"},
	users: 			{type: [],  		default: [] },
	comments: 		{type: [],			default: [] }}, 
	{ versionKey: false }
);

var Event = mongoose.model('event', schema_event, 'event');

module.exports = {
	add: function(p_name, p_category, p_image, p_creator, p_date, p_description, p_location, p_status, callback) {
		var newEvent = new Event({ name : p_name, category : p_category, image : p_image, creator : p_creator, date : p_date, description : p_description, location : p_location, status : p_status});
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
	},
	findByStatus: function(status, callback) {
		Event.find({status: status}, function(err, doc){
			if(err)
				return callback("error");
			return callback(doc);
		});
	},
	findByUserId: function(userId, callback) {
		Event.find({ users: { "$in" : [userId]} }, function(err, doc){
			if(err)
				return callback("error");
			return callback(doc);
		});
	},
	addCommentById: function(p_id, p_userId, p_comment, callback) {
		Event.update(
			{_id : mongoose.Types.ObjectId(p_id)},
			{ $push: {comments : {_id: mongoose.Types.ObjectId(), text: p_comment, userId: p_userId}}},
			function(err, doc) {
				
			if (err) 
				return callback("error");

			return callback(doc);
		});
	},
	addUserById: function(p_id, p_userId, callback) {
		Event.update(
			{_id : mongoose.Types.ObjectId(p_id)},
			{ $addToSet: {users : p_userId}},
			function(err, doc) {
				
			if (err) 
				return callback("error");

			return callback(doc);
		});
	}
};
