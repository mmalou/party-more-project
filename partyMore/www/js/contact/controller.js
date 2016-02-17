angular.module('ContactController', [])
.controller('ContactCtrl', function($scope, $localStorage, $ionicModal, $ionicPopup, $rootScope, ContactSrv, ProfileSrv) {
	$scope.contacts = $localStorage.user.contacts;

  $scope.doRefresh = function(){
    ProfileSrv.getUserById($localStorage.user._id).success(function(user){
      $scope.contacts = user.contacts;
      $scope.$broadcast('scroll.refreshComplete');
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
          $scope.contacts.push({user: {username: $scope.formDataAddContact.username}, status: "pending"});

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
        $rootScope.$broadcast("loading:hide");

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
            $scope.formDataAddContact.username = "";
          });

      });
  };
  $scope.deleteContact = function(contactId){
    ContactSrv.removeContactById($localStorage.user._id, contactId).success(function(data){
      ProfileSrv.getUserById($localStorage.user._id).success(function(user){
        $scope.contacts = user.contacts;
      });
    });
  };
})

.controller('AddcontactCtrl', function($scope, ContactSrv, $localStorage) {


	/*ContactSrv.getContacts($localStorage.user.id).success(function(data){
		console.log(data.contacts);
	});*/
	
});
