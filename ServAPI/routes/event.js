var express 		= require('express');
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
	});

router.route('/')
	.post(function(req, res) {
		var name = req.body.name;
		var category = req.body.category;
		var dateStart = req.body.dateStart;
		var description = req.body.description;
		var location = req.body.location;
		var mailUser = req.body.mailUser;
		model.event.add(name, category, dateStart, description, location, mailUser, function(resultAdd){
			if (resultAdd == "error") {
				res.statusCode = 500;
				res.header("Cache-Control", "public, max-age=1209600");
				res.send();
			}
			else {
				res.statusCode = 201;
				res.header("Cache-Control", "public, max-age=1209600");
				res.send();
			}
		});
	});

module.exports = router;