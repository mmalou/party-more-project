angular.module('MenuController', [])
.controller('MenuCtrl', function($scope, $ionicModal, $localStorage, $ionicPopup, EventsSrv, ContactSrv) {
	
  $scope.disconnect = function(){
    console.log("coucou");
  };

  //ADD EVENT
  $ionicModal.fromTemplateUrl('templates/eventAdd.html', {
      scope: $scope
  }).then(function(modal) {
    $scope.modalEventAdd = modal;
  });

  var yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  $scope.datepickerObject = {
    titleLabel: 'Select a date',  //Optional
    todayLabel: 'Today',  //Optional
    closeLabel: 'Close',  //Optional
    setLabel: 'Set',  //Optional
    setButtonType : 'button-balanced',  //Optional
    todayButtonType : 'button-positive',  //Optional
    closeButtonType : 'button-assertive',  //Optional
    inputDate: new Date(),  //Optional
    mondayFirst: true,  //Optional
    //disabledDates: disabledDates, //Optional
    //weekDaysList: weekDaysList, //Optional
    //monthList: monthList, //Optional
    templateType: 'popup', //Optional
    showTodayButton: 'true', //Optional
    modalHeaderColor: 'bar-positive', //Optional
    modalFooterColor: 'bar-positive', //Optional
    from: yesterday, //Optional
    //to: new Date(2018, 8, 25),  //Optional
    callback: function (val) {  //Mandatory
      if (typeof(val) !== 'undefined') {
        $scope.formData.date = Math.floor(val.getTime() / 1000);
      }
    },
    dateFormat: 'dd-MM-yyyy', //Optional
    closeOnSelect: false, //Optional
  };

  $scope.timePickerObject = {
    inputEpochTime: ((new Date()).getHours() * 60 * 60),  //Optional
    step: 15,  //Optional
    format: 24,  //Optional
    titleLabel: 'Select an hour',  //Optional
    setLabel: 'Set',  //Optional
    closeLabel: 'Close',  //Optional
    setButtonType: 'button-balanced',  //Optional
    closeButtonType: 'button-assertive',  //Optional
    callback: function (val) {    //Mandatory
      if (typeof(val) !== 'undefined') {
        $scope.formData.hour = val;
      }
    }
  };

  $scope.formData = {
    name : "",
    description : "",
    category : "",
    date : "",
    hour : "",
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
      hour : "",
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
    $scope.formData.date = $scope.formData.date + $scope.formData.hour;
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