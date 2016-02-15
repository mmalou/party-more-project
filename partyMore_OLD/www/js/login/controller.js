angular.module('LoginController', [])
.controller('LoginCtrl', function($scope, $localStorage, $ionicModal, $ionicPopup, $state, SignupSrv, LoginSrv) {
	
	$scope.loginData = {
		username : "julien",
		password : "azerty"
	};

	
	$scope.doLogin = function() {
		
		$scope.validationSignin = {
			usernameRequired : false,
			passwordRequired : false,
			usernameNoExist : false,
			passwordIncorrect : false
		}
		
		$scope.validationSignin.usernameRequired = ($scope.loginData.username.length == 0);
		$scope.validationSignin.passwordRequired = ($scope.loginData.password.length == 0);

		
		if (isValidForm($scope.validationSignin)) {
			LoginSrv.isAuthenticate($scope.loginData).success(function(data) {
				$localStorage.user = data;
				$state.go('app.events');
			}).error(function(data){
				var alertPopup = $ionicPopup.alert({
			     	title: 'Error !',
			     	template: data.message,
			     	buttons: [
					   	{
					     	text: 'OK',
					    	type: 'button-assertive',
					   	}
					]
			   	});
			});
		}
	};

	//SIGNUP

	$ionicModal.fromTemplateUrl('templates/signup.html', {
	    scope: $scope
	}).then(function(modal) {
		$scope.modal = modal;
	});

	$scope.openSignupModal = function(){
		$scope.modal.show();
	}

	$scope.closeSignupModal = function() {
	    $scope.inscriptionData = {
			username : "",
			mail : "",
			password : "",
			passwordVerification : ""
		};
	    $scope.validationSignup = {
			usernameRequired : false,
			usernameInvalid : false,

			emailRequired : false,
			emailInvalid : false,

			passwordRequired : false,
			passwordShort : false,
			passwordDifferent : false,
		}
	    $scope.modal.hide();
  	};

	$scope.inscriptionData = {
		username : "",
		mail : "",
		password : "",
		passwordVerification : ""
	};
		
	$scope.doInscription = function() {
			
		$scope.validationSignup = {
			usernameRequired : false,
			usernameInvalid : false,

			emailRequired : false,
			emailInvalid : false,

			passwordRequired : false,
			passwordShort : false,
			passwordDifferent : false,
		}
		
		// USERNAME
		$scope.validationSignup.usernameRequired = ($scope.inscriptionData.username.length == 0);
		var regexMail =  /^[-\w\.\$@\*\!]{4,30}$/i;
		$scope.validationSignup.usernameInvalid = (!regexMail.test($scope.inscriptionData.username));


		// MAIL
		$scope.validationSignup.emailRequired = ($scope.inscriptionData.mail.length == 0);
		var regexMail =  /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
		$scope.validationSignup.emailInvalid = !regexMail.test($scope.inscriptionData.mail);


		// PASSWORD
		$scope.validationSignup.passwordRequired = ($scope.inscriptionData.password.length == 0 || $scope.inscriptionData.passwordVerification.length == 0);
		$scope.validationSignup.passwordDifferent = ($scope.inscriptionData.password != $scope.inscriptionData.passwordVerification);
		$scope.validationSignup.passwordShort = ($scope.inscriptionData.password.length < 6);

		
		if(isValidForm($scope.validation)) {
			delete($scope.inscriptionData.passwordVerification);
			SignupSrv.signupUser($scope.inscriptionData).success(function(data){

			   	var alertPopup = $ionicPopup.alert({
			     	title: 'Welcome !',
			     	template: 'Go to login and sign in.',
			     	buttons: [
					   	{
					     	text: 'OK',
					    	type: 'button-balanced',
					   	}
					]
			   	});

			   	alertPopup.then(function(res) {
			     	$scope.closeSignupModal();
			   	});

			}).error(function(data){
				$scope.inscriptionData.passwordVerification = $scope.inscriptionData.password;
				var alertPopup = $ionicPopup.alert({
			     	title: 'Error !',
			     	template: data.message,
			     	buttons: [
					   	{
					     	text: 'OK',
					    	type: 'button-assertive',
					   	}
					]
			   	});

			});
		}
	};

	function isValidForm(validation){
		for(var index in validation) {
			if (validation.hasOwnProperty(index) && validation[index]) {
				return false;
			}
		}
		return true;
	}
});