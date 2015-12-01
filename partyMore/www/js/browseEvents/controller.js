angular.module('BrowseEventsController', [])
.controller('BrowseEventsCtrl', function($scope, BrowseEventsSrv) {
	
	var scope = $scope;
	var idUser;
	var events = [];

	// Get username
	BrowseEventsSrv.getUserByUsername("quentin").success(function(resultGetUser){
		if(resultGetUser.length == 0) 
			console.log("Error username don't exists");
		else {
			console.log(resultGetUser[0].id);
			idUser = resultGetUser[0].id;
			// get user events
			BrowseEventsSrv.getUserEvents(idUser).success(function(resultGetUserEvents){
				if(resultGetUserEvents.length == 0)
					console.log("no events");
				else {
					console.log(resultGetUserEvents);
					for(index in resultGetUserEvents) {
						events.push(resultGetUserEvents[index]);
					}
					scope.items = events;
				}
			})
			.error(function() {
				console.log("Error retrieving events");
			});
		}
	})
	.error(function() {
		console.log("Error checking username");
	});
});