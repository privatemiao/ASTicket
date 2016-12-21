// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', [ 'ionic', 'starter.controllers', 'starter.services' ])

.run(function($ionicPlatform) {
	$ionicPlatform.ready(function() {
		if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
			cordova.plugins.Keyboard.disableScroll(true);

		}
		if (window.StatusBar) {
			StatusBar.styleDefault();
		}

		// WINDOW.VARIABLES
		if (!window.variables) {
			window.variables = {};
		}

		if (!window.variables.server) {
			window.variables.server = '127.0.0.1';
		}
		// {"sessionId":null,"serviceName":null,"channelCode":null,
		// "ticketStationCode":"SBT",
		// "officeNo":"SBT01",
		// "windowNo":"102","operatorNo":null,"shiftCode":null,"innerCode":null,"belongStationCode":null,"money":null,"runMode":null,"ipAddress":null,"systemCode":null,"deviceIdentity":null,"licenceCode":null,"applyCode":null,"agentRepeater":null,"encryptFlag":false,"windowTicketNo":null,"systemTime":null}

		if (!window.variables.postInfo) {
			window.variables.postInfo = {
				"ticketStationCode" : "SBT",
				"officeNo" : "SBT01",
				"windowNo" : "102",
				innerCode : '000'
			};
		}

		console.log('window.variables', window.variables);

	});
})

.config(function($stateProvider, $urlRouterProvider) {

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
