angular.module('starter.controllers', [])
.controller('AppCtrl', function($scope, $ionicModal, $timeout, $http) {
	
  // delete $http.defaults.headers.common['X-Requested-With'];
  
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing loginn', $scope.loginData);
	
	$http.get("http://www.localhost:8081/user/project.partymore@gmail.com").success(function(data){
		console.log('get ok', '');
	});
	/*.error(function(data){
		console.log('get ko', '');
	});*/
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('ContactsCtrl', function($scope, $http) {
	/*$http.get("http://www.localhost:8081/user/project.partymore@gmail.com").success(function(data){
		console.debug(data);
	});*/
	$scope.contacts = [
		{ mailContact: 'maximemeri@gmail.com', idContact: 1 },
		{ mailContact: 'rabinovitchlouis@gmail.com', idContact: 2 }
	];
	
	$scope.addContact = function() {
		console.log('Add contact', $scope.loginData);
		
		/*$http.get("http://www.localhost:8081/user/project.partymore@gmail.com").success(function(data){
			console.log('get ok', '');
		});*/
		/*.error(function(data){
			console.log('get ko', '');
		});*/
	    // Simulate a login delay. Remove this and replace with your login
	    // code if using a login system
	    //$timeout(function() {
	    //  $scope.closeLogin();
	    //}, 1000);
	};
})

.controller('ContactCtrl', function($scope, $http) {
	$scope.contact = 'test';
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})


.controller('inscription', function($scope, $ionicModal, $http) {
  console.log('controller inscription');
  $scope.inscriptionData = {};

  
  $scope.doInscription = function() {
    console.log('Doing inscription', $scope.inscriptionData);
	console.log('mail', $scope.inscriptionData.mail);
	console.log('mail', $scope.inscriptionData.password);
	
	var user = { mail: $scope.inscriptionData.mail , password: $scope.inscriptionData.password};
	console.log('bonjour', user);
	$http.post("http://www.localhost:8081/user/", user).success(function(){
		console.log('get ok', '');
		// Inscription réussite
	})
	.error(function(){
		console.log('get ko', '');
		// Erreur inscription
	});
  };
})
