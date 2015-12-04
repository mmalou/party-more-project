angular.module('AddcontactController', [])
.controller('AddcontactCtrl', function($scope, AddcontactSrv) {
	
	// Session
	id_user = '564b0b10b7d5b8382bc6f45b';
	
	$scope.contactData = {
		username : ""
	};
	
	
	
	$scope.addcontact = function() {
		
		$scope.validation = {
			usernameRequired : false,
			usernameNoExist : false,
		}
		
	 	var user = { username: $scope.contactData.username };
		
		if (user.username.length == 0) {
			$scope.validation.usernameRequired = true;
		}
		
		if (!$scope.validation.usernameRequired) {
			AddcontactSrv.getUserByUsername(user.username).success(function(result) {
				if (result.length == 0) {
					$scope.validation.usernameNoExist = true;
				}
				else {
					// On ajoute une entrée dans user_contact
				}
			});
		}
	};
	
});