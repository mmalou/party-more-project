angular.module('EventsController', [])
.controller('EventsCtrl', function($scope, $localStorage, $ionicModal, $ionicPopup, $state, EventsSrv) {
	
	$scope.events = [];

	$scope.doRefresh = function(){
		EventsSrv.listPublic().success(function(events){
			$scope.events = events;
			EventsSrv.setCachedEvents(events);
			$scope.$broadcast('scroll.refreshComplete');
		});
	};

	EventsSrv.listPublic().success(function(events){
		$scope.events = events;
		EventsSrv.setCachedEvents(events);
	});

	$scope.showDetails = function(id) {
		$state.go('app.event', {id: id});
	};

	$scope.userIsParticipate = function(users){
		return (users.indexOf($localStorage.user.username) !== -1);
	}


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
	    dateFormat: 'MM-dd-yyyy', //Optional
	    closeOnSelect: false, //Optional
	  };

	  $scope.timePickerObject = {
	    inputEpochTime: ((new Date()).getHours() * 60 * 60),  //Optional
	    step: 15,  //Optional
	    format: 12,  //Optional
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
	            title: 'Event added !',
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

.controller('EventCtrl', function(event, $scope, $localStorage, $ionicModal, $ionicPopup, EventsSrv) {
	$scope.event = event;
	console.log(event);

	$scope.participate = ($scope.event.users.indexOf($localStorage.user.username) == -1) ? false : true;

	$scope.formData = {
		userId: $localStorage.user._id,
		comment: ""
	}

	$scope.doAddComment = function() {
		EventsSrv.addComment($scope.event._id, $scope.formData).success(function(data){
			$scope.event.comments.push({userId: $localStorage.user, text: $scope.formData.comment});
			$scope.formData = {
				userId: $localStorage.user._id,
				comment: ""
			}
		});
	};

	$scope.addUserToEvent = function(){
		EventsSrv.addUserToEvent($scope.event._id, $localStorage.user._id).success(function(data){
			$scope.participate = true;
			$scope.event.users.push($localStorage.user.username);
		});
	}
});