angular.module('SignupController', [])
.controller('SignupCtrl', function($scope, SignupSrv) {
	$scope.inscriptionData = {};
	  
	$scope.doInscription = function() {
	 
	 	var user = { mail: $scope.inscriptionData.mail , password: $scope.inscriptionData.password};
	 
	 	SignupSrv.signupUser(user).success(function(){

	 	});
	};
});