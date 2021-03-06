// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', [ 'ionic', 'ionic-datepicker', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
	$ionicPlatform.ready(function() {
		if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
			cordova.plugins.Keyboard.disableScroll(true);

		}
		if (window.StatusBar) {
			StatusBar.styleDefault();
		}

	});
})

.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
	$httpProvider.defaults.withCredentials = true;
	$stateProvider
	.state('tab', {
		url : '/tab',
		abstract : true,
		templateUrl : 'templates/tabs.html'
	})

	.state('tab.booking', {
		url : '/booking',
		views : {
			'tab-booking' : {
				templateUrl : 'templates/tab-booking.html',
				controller : 'BookingController',
				controllerAs : 'bookingController'
			}
		}
	})

	.state('tab.inquire', {
		url : '/inquire',
		views : {
			'tab-inquire' : {
				templateUrl : 'templates/tab-inquire.html',
				controller : 'InquireController',
				controllerAs : 'inquireController'
			}
		}
	})

	.state('tab.account', {
		url : '/account',
		views : {
			'tab-account' : {
				templateUrl : 'templates/tab-account.html',
				controller : 'AccountController',
				controllerAs : 'accountController'
			}
		}
	});

	$urlRouterProvider.otherwise('/tab/booking');

});
