angular.module('ProfileController', [])
.controller('ProfileCtrl', function($scope, $localStorage) {
	$scope.user = $localStorage.user;
});