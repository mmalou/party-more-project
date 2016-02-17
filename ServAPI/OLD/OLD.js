/****** API USER CONTACT ******/

//retourne un contact d'après son mail
app.get('/usercontact/:mailuser', function(req, res){
    model.usercontact.findAllContactsByMail(req.params.mailuser, function(resultFind){
        if(resultFind == "error" || resultFind == null){
			res.statusCode = 404;
			res.header("Cache-Control", "public, max-age=1209600");
			res.send("Not Found");
		}
		else{
			res.statusCode = 200;
			res.header("Cache-Control", "public, max-age=1209600");
			res.send(resultFind);
		} 
    });
});

app.post('/usercontact/', function(req, res) {
	var mailUser = req.body.mailUser;
	var mailContact = req.body.mailContact;
	model.user.add(mailUser, mailContact, function(resultAdd){
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

app.delete('/usercontact/:idusercontact', function(req, res) {
	model.usercontact.remove(req.params.idusercontact, function(resultFind){
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

/****** API EVENT ******/

/****** API EVENT LOCATION SUGGESTION ******/

//retourne une suggestion de localisation d'après son id
app.get('/eventlocationsuggestion/:ideventlocationsuggestion', function(req, res){
    model.eventlocationsuggestion.findById(req.params.ideventlocationsuggestion, function(resultFind){
        if(resultFind == "error" || resultFind == null){
			res.statusCode = 404;
			res.header("Cache-Control", "public, max-age=1209600");
			res.send("Not Found");
		}
		else{
			res.statusCode = 200;
			res.header("Cache-Control", "public, max-age=1209600");
			res.send(resultFind);
		} 
    });
});

//retourne toutes les suggestions de l'event dont l'id est passé en paramètre
app.get('/eventlocationsuggestion/event/:idevent', function(req, res){
    model.eventlocationsuggestion.findByEventId(req.params.idevent, function(resultFind){
        if(resultFind == "error" || resultFind == null){
			res.statusCode = 404;
			res.header("Cache-Control", "public, max-age=1209600");
			res.send("Not Found");
		}
		else{
			var sortArray = [];
			for (var i in resultFind){
				sortArray.push({category: resultFind[i].category, location: resultFind[i].location,
		                    voteCount: resultFind[i].voteCount});
			}
			res.statusCode = 200;
			res.header("Cache-Control", "public, max-age=1209600");
			res.send(sortArray);
		} 
    });
});

app.post('/eventlocationsuggestion/', function(req, res) {
	var idEvent = req.body.idEvent;
	var category = req.body.category;
	var location = req.body.location;
	var voteCount = req.body.voteCount;
	model.eventlocationsuggestion.add(idEvent, category, location, voteCount, function(resultAdd){
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

app.delete('/eventlocationsuggestion/:ideventlocationsuggestion', function(req, res) {
	model.eventlocationsuggestion.remove(req.params.ideventlocationsuggestion, function(resultFind){
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

/****** API EVENT LOCATION SUGGESTION VOTE ******/

//retourne le vote dont l'id est passé en paramètre
app.get('/eventlocationsuggestionvote/:ideventlocationsuggestionvote', function(req, res){
    model.eventlocationsuggestionvote.findById(req.params.ideventlocationsuggestionvote, function(resultFind){
        if(resultFind == "error" || resultFind == null){
			res.statusCode = 404;
			res.header("Cache-Control", "public, max-age=1209600");
			res.send("Not Found");
		}
		else{
			res.statusCode = 200;
			res.header("Cache-Control", "public, max-age=1209600");
			res.send(resultFind);
		} 
    });
});

//retourne tous les votes associés à la suggestion passé en paramètre
app.get('/eventlocationsuggestionvote/eventlocationsuggestion/:ideventlocationsuggestion', function(req, res){
    model.eventlocationsuggestionvote.findByEventLocationSuggestionId(req.params.ideventlocationsuggestion, function(resultFind){
        if(resultFind == "error" || resultFind == null){
			res.statusCode = 404;
			res.header("Cache-Control", "public, max-age=1209600");
			res.send("Not Found");
		}
		else{
			var sortArray = [];
			for (var i in resultFind){
				sortArray.push({idEventLocationSuggestion: resultFind[i].idEventLocationSuggestion, idUser: resultFind[i].idUser});
			}
			res.statusCode = 200;
			res.header("Cache-Control", "public, max-age=1209600");
			res.send(sortArray);
		} 
    });
});

app.post('/eventlocationsuggestionvote/', function(req, res) {
	var idEventLocationSuggestion = req.body.idEventLocationSuggestion;
	var idUser = req.body.idUser;
	model.eventlocationsuggestionvote.add(idEventLocationSuggestion, idUser, function(resultAdd){
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

app.delete('/eventlocationsuggestionvote/:ideventlocationsuggestionvote', function(req, res) {
	model.eventlocationsuggestionvote.remove(req.params.ideventlocationsuggestionvote, function(resultFind){
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


/****** API EVENT USER ******/

//retourne les events associés à l'user dont l'id est passé en paramètre
app.get('/eventuser/:idUser', function(req, res){
    model.eventuser.findByUser(req.params.idUser, function(resultFindEventsIds){		
		var eventsId = [];
		for(event in resultFindEventsIds) {
			eventsId.push(resultFindEventsIds[event].idEvent);
		}
		
		eventmodel.getEventsbyIds(eventsId, function(resultFindEvents){
			if(resultFindEvents != "error" || resultFindEvents != null){
				res.statusCode = 200;
				res.header("Cache-Control", "public, max-age=1209600");
				res.send(resultFindEvents);
			}
		});
    });
});

app.post('/eventuser/:idEventUser/:status', function(req, res) {
    model.eventuser.updateStatus(req.params.idEventUser, req.params.status, function(resultAdd){
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

app.post('/eventuser/', function(req, res) {
	var idEvent = req.body.idEvent;
	var idUser = req.body.idUser;
	model.eventuser.add(idEvent, idUser, function(resultAdd){
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

app.delete('/eventuser/:ideventuser', function(req, res) {
	model.eventuser.remove(req.params.ideventuser, function(resultFind){
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


/****** API EVENT STUFF ******/

//retourne l'event stuff d'après son id
app.get('/eventstuff/:ideventstuff', function(req, res){
    model.eventstuff.findById(req.params.ideventstuff, function(resultFind){
        if(resultFind == "error" || resultFind == null){
			res.statusCode = 404;
			res.header("Cache-Control", "public, max-age=1209600");
			res.send("Not Found");
		}
		else{
			res.statusCode = 200;
			res.header("Cache-Control", "public, max-age=1209600");
			res.send(resultFind);
		} 
    });
});

//retourne les event stuff d'après l'id de l'event associé
app.get('/eventstuff/event/:idevent', function(req, res){
    model.eventstuff.findByEvent(req.params.idevent, function(resultFind){
        if(resultFind == "error" || resultFind == null){
			res.statusCode = 404;
			res.header("Cache-Control", "public, max-age=1209600");
			res.send("Not Found");
		}
		else{
			res.statusCode = 200;
			res.header("Cache-Control", "public, max-age=1209600");
			res.send(resultFind);
		} 
    });
});

app.post('/eventstuff/', function(req, res) {
	var idEvent = req.body.idEvent;
	var idUser = req.body.idUser;
	var content = req.body.content;
	model.eventstuff.add(idEvent, idUser, content, function(resultAdd){
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

app.post('/eventstuff/:idEventStuff/:content', function(req, res) {
    model.eventstuff.updateContent(req.params.idEventStuff, req.params.content, function(resultAdd){
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

app.delete('/eventstuff/:ideventstuff', function(req, res) {
	model.eventstuff.remove(req.params.ideventstuff, function(resultFind){
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


/****** API EVENT CATEGORY ******/

app.get('/eventcategory/:name', function(req, res){
    model.eventcategory.findByName(req.params.name, function(resultFind){
        if(resultFind == "error" || resultFind == null){
			res.statusCode = 404;
			res.header("Cache-Control", "public, max-age=1209600");
			res.send("Not Found");
		}
		else{
			res.statusCode = 200;
			res.header("Cache-Control", "public, max-age=1209600");
			res.send(resultFind);
		} 
    });
});

app.get('/eventcategory/:id', function(req, res){
    model.eventcategory.findById(req.params.id, function(resultFind){
        if(resultFind == "error" || resultFind == null){
			res.statusCode = 404;
			res.header("Cache-Control", "public, max-age=1209600");
			res.send("Not Found");
		}
		else{
			res.statusCode = 200;
			res.header("Cache-Control", "public, max-age=1209600");
			res.send(resultFind);
		} 
    });
});

app.get('/eventcategory/', function(req, res){
    model.eventcategory.findAll(function(resultFind){
        if(resultFind == "error" || resultFind == null){
			res.statusCode = 404;
			res.header("Cache-Control", "public, max-age=1209600");
			res.send("Not Found");
		}
		else{
			res.statusCode = 200;
			res.header("Cache-Control", "public, max-age=1209600");
			res.send(resultFind);
		} 
    });
});