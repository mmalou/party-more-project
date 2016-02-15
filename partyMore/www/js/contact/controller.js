angular.module('ContactController', [])
.controller('ContactCtrl', function($scope, $localStorage, $ionicModal, ContactSrv) {
	$scope.contacts = $localStorage.user.contacts;

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

.controller('AddcontactCtrl', function($scope, ContactSrv, $localStorage) {


	/*ContactSrv.getContacts($localStorage.user.id).success(function(data){
		console.log(data.contacts);
	});*/
	
});