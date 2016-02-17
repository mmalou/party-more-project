// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers',
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
	'ngStorage',
	'ionic-datepicker',
	'ionic-timepicker'
])

.run(function($ionicPlatform) {
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
  	});
})

.filter('secondsToDateTime', [function() {
    return function(seconds) {
        return new Date(1970, 0, 1).setSeconds(seconds);
    };
}])

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
	$ionicConfigProvider.navBar.alignTitle('center');
  	$stateProvider

  	.state('login', {
	    url: '/login',
	    templateUrl: 'templates/login.html',
	    controller: 'LoginCtrl'
	})

  	.state('app', {
		url: "/app",
		abstract: true,
		templateUrl: "templates/menu.html",
		controller: 'AppCtrl'
  	})

  	.state('app.events', {
		url: "/events",
		views: {
			'menuContent': {
				templateUrl: "templates/news-feed.html",
				controller: 'EventsCtrl'
	  		}
		}
 	})

 	.state('app.event', {
	    url: '/events/:id',
	    views: {
	  		'menuContent': {
				controller: 'EventCtrl',
	    		templateUrl: 'templates/event.html',
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
				templateUrl: "templates/profile.html",
				controller: "ProfileCtrl"
	  		}
		}
  	})
	.state('app.followers', {
		url: "/followers",
	  	views: {
			'menuContent': {
		 		templateUrl: "templates/followers.html"
			}
	  	}
	})
	.state('app.contacts', {
		url: "/contacts",
	  	views: {
			'menuContent': {
		 		templateUrl: "templates/listUsers.html",
		 		controller: 'ContactCtrl'
			}
	  	}
	});

  	// if none of the above states are matched, use this as the fallback
  	$urlRouterProvider.otherwise('/login');

});
