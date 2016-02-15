angular.module('MenuController', [])
.controller('MenuCtrl', function($scope, $ionicModal, $localStorage, $ionicPopup, EventsSrv, ContactSrv) {
	
  $scope.disconnect = function(){
    console.log("coucou");
  };

  
})