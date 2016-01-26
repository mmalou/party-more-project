angular.module('MenuController', [])
.controller('MenuCtrl', function($scope, $ionicModal, $localStorage, $ionicPopup, EventsSrv) {
	
  //ADD EVENT
  $ionicModal.fromTemplateUrl('templates/eventAdd.html', {
      scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.formData = {
    name : "",
    description : "",
    category : "",
    date : "",
    location: "",
    status: ""
  };

  $scope.openEventAddModal = function(){
    $scope.modal.show();
  }

  $scope.closeEventAddModal = function() {
    $scope.formData = {
      name : "",
      description : "",
      category : "",
      date : "",
      location: "",
      status: ""
    };
    $scope.validationSignup = {
      /*usernameRequired : false,
      usernameInvalid : false,

      emailRequired : false,
      emailInvalid : false,

      passwordRequired : false,
      passwordShort : false,
      passwordDifferent : false,*/
    }
    $scope.modal.hide();
  };

  $scope.doAddEvent = function() {
    $scope.formData.creator = $localStorage.user._id;
      EventsSrv.add($scope.formData).success(function(data){

          var alertPopup = $ionicPopup.alert({
            title: 'Evenement ajouté !',
            //template: 'Go to login and sign in.',
            buttons: [
              {
                text: 'OK',
                type: 'button-balanced',
              }
          ]
          });

          alertPopup.then(function(res) {
            $scope.closeEventAddModal();
          });

      });
  };
})