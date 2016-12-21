angular.module('starter.controllers', [])

.controller('BookingController', function($scope) {
}).controller('InquireController', function($scope) {
}).controller('AccountController', function($scope, CommonService) {
	this.login = function(){
		console.log('trige login');
		CommonService.login();
	};
	
	this.getDeparture = function(){
		console.log('trige departure');
		CommonService.getDeparture();
	};
})
