angular.module('EventsController', [])
.controller('EventsCtrl', function($scope, $localStorage, EventsSrv) {
	
	$scope.events = [];

	/*EventsSrv.listByUserId($localStorage.user._id).success(function(events){
		$scope.events = events;
	});*/

	EventsSrv.listPublic().success(function(events){
		$scope.events = events;
	});

});