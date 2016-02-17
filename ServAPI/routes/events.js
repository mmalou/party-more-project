var express 		= require('express');
var async 			= require('async');
var router 			= express.Router();

var model 		= require(__dirname +"/../models/index.js");

//retourne un event d'après son id
router.route('/:idevent')
	.get(function(req, res){
	    model.event.findById(req.params.idevent, function(resultFind){
	        if(resultFind == "error" || resultFind == null){
				res.statusCode = 404;
				res.header("Cache-Control", "public, max-age=1209600");
				res.send("Not Found");
			}
			else{
				var sortObject = {name: resultFind.name, category: resultFind.category,
			                    dateStart: resultFind.dateStart, description: resultFind.description, location: resultFind.location, mailUser: resultFind.mailUser};
				res.statusCode = 200;
				res.header("Cache-Control", "public, max-age=1209600");
				res.send(sortObject);
			} 
	    });
	})

	.delete(function(req, res) {
		model.event.remove(req.params.idevent, function(resultFind){
			if(resultFind == "error" || resultFind == null){
				res.statusCode = 400;
				res.header("Cache-Control", "public, max-age=1209600");
				res.send(resultFind);
			}
			else {
				res.statusCode = 200;
				res.header("Cache-Control", "public, max-age=1209600");
				res.send(resultFind);
			}
		});
	})

	.put(function(req, res){
		var idEvent = req.params.idevent;
		var comment = req.body.comment;
		var userId = req.body.userId;

		console.log(comment);
		console.log(userId);

		model.event.addCommentById(idEvent, userId, comment, function(resultAdd){
			res.status(201).json({message: "Comment added"});
		});
	});

router.route('/')
	.post(function(req, res) {

		var name 		= req.body.name;
		var category 	= req.body.category;
		var creator 	= req.body.creator;
		var date 		= req.body.date;
		var description = req.body.description;
		var location 	= req.body.location;
		var status 		= req.body.status;

		model.event.add(name, category, creator, date, description, location, status, function(resultAdd){
			if (resultAdd == "error") {
				res.statusCode = 500;
				res.send();
			}
			else {
				res.status(201).json(resultAdd);
			}
		});
	})

	.get(function(req, res){

		if("userId" in req.query){
			var userId = req.query.userId;
			model.event.findByUserId(userId, function(resultFind){
				res.json(resultFind);
			});
		} else if ("status" in req.query){
			var status = req.query.status;
			model.event.findByStatus(status, function(resultFind){
				res.json(resultFind);
			});
		} else {
			model.event.findByStatus("public", function(resultFind){
				async.each(resultFind, function(event, callback){
					model.user.findById(event.creator, function(user){
						event.creator = user.username;
						async.each(event.comments, function(comment, callback){
							model.user.findById(comment.userId, function(user){
								comment.userId = user;
								callback();
							});
						},function(err){
							callback();
						});
					});
				},function(err){
					res.json(resultFind);
				});
			});
		}
	});

module.exports = router;