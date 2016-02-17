// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic',
	'Constants',
	'MenuController',
	'SignupController',
	'SignupService',
	'EventsController',
	'EventsService',
	'LoginController',
	'LoginService',
	'ContactController',
	'ContactService',
	'ProfileController',
	'ProfileService',
	'ngStorage',
	'ionic-datepicker',
	'ionic-timepicker'
])

.run(function($ionicPlatform, $rootScope, $ionicLoading, $ionicPopup) {
  	$ionicPlatform.ready(function() {
		// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
		// for form inputs)
		if (window.cordova && window.cordova.plugins.Keyboard) {
		  	cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
		}
		if (window.StatusBar) {
		  	// org.apache.cordova.statusbar required
		  	StatusBar.styleDefault();
		}

		$rootScope.$on("loading:show",function(){
	      $ionicLoading.show({
	          template: '<ion-spinner icon="crescent"></ion-spinner>'
	      });
	    });

	    $rootScope.$on("loading:hide",function(){
	      $ionicLoading.hide();
	    });

	    $rootScope.$on("connectionError",function(){
	      $ionicPopup.alert({
	        title: "Network error",
	        template: "Please check your network connection."
	      });
	    });
  	});
})

.filter('secondsToDateTime', [function() {
    return function(seconds) {
        return new Date(1970, 0, 1).setSeconds(seconds);
    };
}])

.config(function($stateProvider, $urlRouterProvider, $httpProvider, $ionicConfigProvider) {

	  $httpProvider.interceptors.push(['$q', '$rootScope', function($q, $rootScope) {
	    return {
	        'request': function (config) {

	          var isIonicUrl = config.url.indexOf("ionic") == -1 ? false : true;
	          if (!isIonicUrl) {
	          $rootScope.$broadcast("loading:show");
	          }
	          return config;
	        },
	        'response': function (response) {
	          $rootScope.$broadcast("loading:hide");
	          return response;
	        }
	    };
	  }]);
	$ionicConfigProvider.navBar.alignTitle('center');
  	$stateProvider

  	.state('login', {
	    url: '/login',
	    templateUrl: 'templates/login/login.html',
	    controller: 'LoginCtrl'
	})

  	.state('app', {
		url: "/app",
		abstract: true,
		templateUrl: "templates/menu/menu.html"
  	})

  	.state('app.events', {
		url: "/events",
		views: {
			'menuContent': {
				templateUrl: "templates/event/events.html",
				controller: 'EventsCtrl'
	  		}
		}
 	})

 	.state('app.event', {
	    url: '/events/:id',
	    views: {
	  		'menuContent': {
				controller: 'EventCtrl',
	    		templateUrl: 'templates/event/event.html',
	    		resolve: {
		        	event: function($stateParams, EventsSrv) {
		          		return EventsSrv.getEvent($stateParams.id);
		        	}
		        }
	  		}
		}
	})

  	.state('app.profile', {
		url: "/profile",
		views: {
	  		'menuContent': {
				templateUrl: "templates/profile/profile.html",
				controller: "ProfileCtrl"
	  		}
		}
  	})

	.state('app.contacts', {
		url: "/contacts",
	  	views: {
			'menuContent': {
		 		templateUrl: "templates/contact/contacts.html",
		 		controller: 'ContactCtrl'
			}
	  	}
	});

  	// if none of the above states are matched, use this as the fallback
  	$urlRouterProvider.otherwise('/login');

});
