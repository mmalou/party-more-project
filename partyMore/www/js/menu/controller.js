angular.module('MenuController', [])
.controller('MenuActiveCtrl', function($scope, $location, $localStorage, $state) {
  $scope.disconnect = function(){
      delete $localStorage.user;
      $state.go('login');
  };
  
  $scope.user = $localStorage.user;
  
    $scope.isActive = function(route) {
        return route === $location.path();
    };
});