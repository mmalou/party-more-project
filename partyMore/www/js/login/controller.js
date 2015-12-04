angular.module('LoginController', [])
.controller('LoginCtrl', function($scope, LoginSrv) {
	
	$scope.loginData = {
		username : "",
		password : ""
	};
	
	$scope.doLogin = function() {
		
		$scope.validation = {
			usernameRequired : false,
			passwordRequired : false,
			usernameNoExist : false,
			passwordIncorrect : false
		}
		
	 	var user = { username: $scope.loginData.username , password: $scope.loginData.password };
		
		if (user.username.length == 0) {
			$scope.validation.usernameRequired = true;
		}
		
		if (user.password.length == 0) {
			$scope.validation.passwordRequired = true;
		}
		
		
		if (!$scope.validation.passwordRequired && !$scope.validation.usernameRequired) {
			LoginSrv.getUserByUsername(user.username).success(function(result) {
				if (result.length == 0) {
					$scope.validation.usernameNoExist = true;
				}
				else {
					if (result[0].password == $scope.loginData.password) {
						console.log('login true');
					}
					else {
						$scope.validation.passwordIncorrect = true;
					}
				}
			});
		}
	};
});