angular.module('SignupController', [])
.controller('SignupCtrl', function($scope, SignupSrv) {
	$scope.inscriptionData = {
		username : "",
		mail : "",
		password1 : "",
		password2 : ""
	};
		
	$scope.doInscription = function() {
			
		$scope.validation = {
			usernameRequired : false,
			emailRequired : false,
			passwordRequired : false,
			
			usernameInvalid : false,
			emailInvalid : false,
			passwordShort : false,
			passwordDifferent : false,
			
			usernameExists : false,
			emailExists : false,
		}
	
		var username = $scope.inscriptionData.username;
		var mail = $scope.inscriptionData.mail;
		var pass1 = $scope.inscriptionData.password1;
		var pass2 = $scope.inscriptionData.password2;
		
		/** USERNAME **/
		
		var usernameOK = false;
		// Username empty ?
		if(username.length == 0)
			$scope.validation.usernameRequired = true;
		else {
			// Username valid ?
			var regexMail =  /^[-\w\.\$@\*\!]{4,30}$/i;
			if(!regexMail.test(username)) {
				console.log("username failed");
				$scope.validation.usernameInvalid = true;
			}
			else {
				console.log("username success");
				// Username exist?
				SignupSrv.getUserByUsername(username).success(function(result){
					if(result.length == 0) {
						console.log("username exist 0");
						usernameOK = true;
					}
					else {
						console.log("username exist 1");
						$scope.validation.usernameExists = true;
					}
				})
				.error(function() {
					console.log("Error checking username");
				});
			}
		}

		/** EMAIL **/
		
		var mailOK = false;
		if(mail.length == 0)
			$scope.validation.emailRequired = true;
		else {
			// Mail verif
			var regexMail =  /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
			if(!regexMail.test(mail)) 
				$scope.validation.emailInvalid = true;
			else {
				// Mail exists ?
				SignupSrv.getUserByMail(mail).success(function(result){
					if(result.length == 0)
						mailOK = true;
					else 
						$scope.validation.emailExists = true;
				})
				.error(function() {
					console.log("Error checking mail");
				});
			}
		}
			
		/** PASSWORD **/
		
		var passwordOK = false;
		if(pass1.length == 0 || pass2.length == 0)
			$scope.validation.passwordRequired = true;
		else {
			if(pass1 != pass2) 
				$scope.validation.passwordDifferent = true;
			else {
				if(pass1.length < 6) 
					$scope.validation.passwordShort = true;
				else
					passwordOK = true;
			}
		}
		
	 	var user = { username: $scope.inscriptionData.username, mail: $scope.inscriptionData.mail , password: $scope.inscriptionData.password1};

		/*
	 	SignupSrv.signupUser(user).success(function(){

	 	});*/
	};
});