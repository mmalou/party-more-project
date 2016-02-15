angular.module('MenuController', [])
.controller('MenuCtrl', function($scope, $ionicModal, $localStorage, $ionicPopup, EventsSrv, ContactSrv) {
	
  //ADD EVENT
  $ionicModal.fromTemplateUrl('templates/eventAdd.html', {
      scope: $scope
  }).then(function(modal) {
    $scope.modalEventAdd = modal;
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
    $scope.modalEventAdd.show();
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
    $scope.modalEventAdd.hide();
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

  //ADD CONTACT
  $ionicModal.fromTemplateUrl('templates/contactAdd.html', {
      scope: $scope
  }).then(function(modal) {
    $scope.modalContactAdd = modal;
  });

  $scope.formDataAddContact = {
    username : ""
  };

  $scope.openContactAddModal = function(){
    $scope.modalContactAdd.show();
  }

  $scope.closeContactAddModal = function() {
    $scope.formDataAddContact = {
      username : ""
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
    $scope.modalContactAdd.hide();
  };

  $scope.doAddContact = function() {
      ContactSrv.addContactByUsername($localStorage.user._id, $scope.formDataAddContact).success(function(data){

          var alertPopup = $ionicPopup.alert({
            title: data.message,
            //template: 'Go to login and sign in.',
            buttons: [
              {
                text: 'OK',
                type: 'button-balanced',
              }
          ]
          });

          alertPopup.then(function(res) {
            $scope.closeContactAddModal();
          });

      }).error(function(data){

          var alertPopup = $ionicPopup.alert({
            title: data.message,
            //template: 'Go to login and sign in.',
            buttons: [
              {
                text: 'OK',
                type: 'button-assertive',
              }
          ]
          });

          alertPopup.then(function(res) {
            $scope.closeContactAddModal();
          });

      });;
  };
})