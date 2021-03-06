angular.module('MenuController', [])
.controller('MenuCtrl', function($scope, $ionicModal, $timeout, $http) {
	
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
    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    //$timeout(function() {
    //  $scope.closeLogin();
    //}, 1000);
  };
})