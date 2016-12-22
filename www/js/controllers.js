angular.module('starter.controllers', [])

.controller('BookingController', function($scope, $ionicModal, CommonService, ionicDatePicker) {
	var reference = this, MODAL_TITLE_DEPARTURE = 'Departure Station', MODAL_TITLE_ARRIVED = 'Arrived Station';
	$scope.departureDate = new Date();

	$ionicModal.fromTemplateUrl('modal-loading.html', {
		scope : $scope,
		animation : 'slide-in-up'
	}).then(function(modal) {
		$scope.loadingModal = modal;
		$scope.loadingModal.show();
	});

	$ionicModal.fromTemplateUrl('modal-stations.html', {
		scope : $scope,
		animation : 'slide-in-up'
	}).then(function(modal) {
		$scope.modal = modal;
	});

	this.openDepartureDatePicker = function() {
		ionicDatePicker.openDatePicker({
			callback : function(val) {
				console.log('You choise\'s ', val);
				$scope.departureDate = new Date(val);
			},
			inputDate: $scope.departureDate
		});
	};

	CommonService.loadData(function() {
		$scope.stations = CommonService.getStations();
		$scope.ticketTypes = CommonService.getTicketTypes();
		$scope.departureStation = $scope.stations[0];
		$scope.arrivedStation = $scope.stations[$scope.stations.length - 1];
		$scope.loadingModal.hide();
		reference.showStations = function(title) {
			console.log('ShowDepartureStations');
			$scope.modalStationTitle = title;
			$scope.openModal();
		};

		reference.exchangeStation = function() {
			var tmp = $scope.departureStation;
			$scope.departureStation = $scope.arrivedStation;
			$scope.arrivedStation = tmp;
		};
	});

	this.selectStation = function(station) {
		console.log(station, $scope.modalStationTitle);
		switch ($scope.modalStationTitle) {
		case MODAL_TITLE_DEPARTURE:
			console.log('Departure');
			$scope.departureStation = station;
			$scope.closeModal();
			break;
		case MODAL_TITLE_ARRIVED:
			console.log('Arrived');
			$scope.arrivedStation = station;
			$scope.closeModal();
			break;

		default:
			break;
		}
	};

	$scope.openModal = function() {
		console.log('open');
		$scope.modal.show();
	};
	$scope.closeModal = function() {
		console.log('close');
		$scope.modal.hide();
	};
	// Cleanup the modal when we're done with it!
	$scope.$on('$destroy', function() {
		console.log('destroy');
		$scope.modal.remove();
	});
	// Execute action on hide modal
	$scope.$on('modal.hidden', function() {
		console.log('hidden');
		// Execute action
	});
	// Execute action on remove modal
	$scope.$on('modal.removed', function() {
		console.log('removed');
		// Execute action
	});
}).controller('InquireController', function($scope) {
}).controller('AccountController', function($scope, CommonService) {
	this.login = function() {
		console.log('trige login');
		CommonService.login();
	};

	this.getDeparture = function() {
		console.log('trige departure');
		CommonService.getDeparture();
	};

	this.getArrived = function() {
		console.log('trige arrived');
		CommonService.getArrived();
	};

	this.queryTrain = function() {
		console.log('trige queryTrain');
		CommonService.queryTrain();
	};
})
