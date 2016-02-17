var express 		= require('express');
var router 			= express.Router();

var model 			= require(__dirname +"/../models/index.js");

//retourne l'utilisateur dont l'id est passé en paramètre
router.route('/:iduser')
	.get(function(req, res){
	    model.user.findById(req.params.iduser, function(resultFind){
	        if(resultFind == "error" || resultFind == null){
				res.statusCode = 404;
				res.header("Cache-Control", "public, max-age=1209600");
				res.send("Not Found");
			}
			else{
				res.statusCode = 200;
				res.header("Cache-Control", "public, max-age=1209600");
				model.user.getContactsByIds(resultFind.contacts, function(contacts){
					resultFind.contacts = contacts;
					res.json(resultFind);
				});
			} 
	    });
	})

	.put(function(req, res){
		var id = req.params.iduser;

	    if(req.query.action == "addContact"){
	    	var username = req.body.username;
			model.user.findByUsername(username, function(resultFind){
				if(resultFind.length && resultFind[0].id != id){
					var contactId = resultFind[0].id;
					model.user.findContactById(id, contactId, function(resultFind){
						if(!resultFind){
					    	model.user.addContactById(id, contactId, function(resultAdd){
					    		model.user.addContactById(contactId, id, function(resultAdd){
					    			res.json({message: "Contact added"});
					    		});
					    	});
					    } else {
					    	res.status(409).json({message: "Contact already added"});
					    }
				    });
			    } else {
			    	res.status(404).json({message: "User not found"});
			    }
	    	});
	    } else if (req.query.action == "removeContact"){
	        var contactId = req.body.contactId;
	        model.user.removeContactById(id, contactId, function(result){
	            if (result == "error"){
	                console.log("error when removing contact");
	                res.status(501).json({message: "An unexpected error has occured"});
	            } else{
	                console.log("contact removed");
	                res.status(204).json({message: "Contact removed successfully"});
	            }
	        });
	    } else {
	    	res.json({control:true});
	    }
	})

	.delete(function(req, res) {
		model.user.removeById(req.params.iduser, function(resultFind){
			if(resultFind == "error" || resultFind == null){
				res.statusCode = 400;
				res.header("Cache-Control", "public, max-age=1209600");
				res.send(resultFind);
			}
			else{
				res.statusCode = 200;
				res.header("Cache-Control", "public, max-age=1209600");
				res.send(resultFind);
			}
		});
	});

router.route('/login')
	.post(function(req, res){

		var username = req.body.username;
		var password = req.body.password;

	    model.user.findByUsernameAndPassword(username, password, function(resultFind){
	        if(resultFind == "error" || resultFind == null){
				res.statusCode = 204;
				res.header("Cache-Control", "public, max-age=1209600");
				res.send("Not Found");
			}
			else{
				if(resultFind.length == 1){
					model.user.getContactsByIds(resultFind[0].contacts, function(contacts){
						resultFind[0].contacts = contacts;
						res.json(resultFind[0]);
					});
				} else {
					res.status(401).json({message: "Username and/or password incorrect"});
				}
			} 
	    });
	});

//retourne l'utilisateur d'après son username
router.route('/username/:username')
	.get(function(req, res){
	    model.user.findByUsername(req.params.username, function(resultFind){
	        if(resultFind == "error" || resultFind == null){
				res.statusCode = 404;
				res.header("Cache-Control", "public, max-age=1209600");
				res.send("Not Found");
			}
			else {
				var sortArray = [];
				for (var i in resultFind){
					sortArray.push({mail: resultFind[i].mail, password: resultFind[i].password,
			                    username: resultFind[i].username, id:resultFind[i]._id});
				}
				res.statusCode = 200;
				res.header("Cache-Control", "public, max-age=1209600");
				res.send(sortArray);
			} 
	    });
	});

//retourne l'utilisateur d'après son mail
router.route('/mail/:mailuser')
	.get(function(req, res){
	    model.user.findByMail(req.params.mailuser, function(resultFind){
	        if(resultFind == "error" || resultFind == null){
				res.statusCode = 404;
				res.header("Cache-Control", "public, max-age=1209600");
				res.send("Not Found");
			}
			else {
				var sortArray = [];
				for (var i in resultFind){
					sortArray.push({mail: resultFind[i].mail, password: resultFind[i].password,
			                    username: resultFind[i].username});
				}
				res.statusCode = 200;
				res.header("Cache-Control", "public, max-age=1209600");
				res.send(sortArray);
			} 
	    });
	});

router.route('/')
	.post(function(req, res) {
		var mail = req.body.mail;
		var password = req.body.password;
		var username = req.body.username;

		model.user.findByMailOrUsername(mail, username, function(users){
			if (users == "error") {
				res.statusCode = 500;
				res.header("Cache-Control", "public, max-age=1209600");
				res.send();
			} else if(users.length == 0){
				model.user.add(mail, password, username, function(resultAdd){
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
			} else {
				res.header("Cache-Control", "public, max-age=1209600");
				res.status(409).json({message:"Username or mail already used, please choose another one"});
			}
		});
	});

module.exports = router;
