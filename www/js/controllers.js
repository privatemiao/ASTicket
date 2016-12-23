angular.module('starter.controllers', [])

.controller('BookingController', function($scope, $ionicModal, CommonService, ionicDatePicker) {
	var reference = this, MODAL_TITLE_DEPARTURE = 'Departure Station', MODAL_TITLE_ARRIVED = 'Arrived Station';
	$scope.departureDate = new Date();
	$scope.selectedTicketTypes = [];
	$scope.selectedSeatTypes = [];
	/*
	 * 根据条件检索出来的结果 \ 检索条件为 乘坐日期、乘坐站、到达站 \ 其它条件在检索出来后，通过样式控制是否可见
	 */
	$scope.trainList = [];

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
			inputDate : $scope.departureDate
		});
	};

	CommonService.loadData(function() {
		$scope.stations = CommonService.getStations();
		$scope.ticketTypes = CommonService.getTicketTypes();
		$scope.seatTypes = CommonService.getSeatTypes();
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

	this.query = function() {
		var data = {
			departureStation : $scope.departureStation,
			arrivedStation : $scope.arrivedStation,
			departureDate : $scope.departureDate,
			ticketTypes : [],
			seatTypes : []
		};

		if ($scope.selectedTicketTypes.length !== 0) {
			for (var i = 0; i < $scope.selectedTicketTypes.length; i++) {
				if ($scope.selectedTicketTypes[i]) {
					data.ticketTypes.push($scope.ticketTypes[i]);
				}
			}
		}
		if ($scope.selectedSeatTypes.length !== 0) {
			for (var i = 0; i < $scope.selectedSeatTypes.length; i++) {
				if ($scope.selectedSeatTypes[i]) {
					data.seatTypes.push($scope.seatTypes[i]);
				}
			}
		}

		CommonService.queryTrain({
			data : {
				"ticketStationCode" : "SBT",
				"officeNo" : "SBT01",
				"windowNo" : "102",
				"innerCode" : "SBT01",
				"travelDate" : data.departureDate.getTime(),
				"boardStationCode" : data.departureStation.stationCode,
				"arrivalStationCode" : data.arrivedStation.stationCode,
				"purposeCode" : "A1"
			},
			callback : function(response) {
				console.log('Query train ', response);
				var trainList = [];
				if (response && response.data && response.data.success) {
					trainList = response.data.trainInfo;
				}
				
				for (var i = trainList.length - 1; i >= 0; i --){
					if (trainList[i].seatInfo.length == 0){
						trainList.pop();
						continue;
					}
					
					//TODO translate seattype
				}
				
				
				$scope.trainList = trainList;
			}
		});
	};

	this.checkTicketType = function(type) {
		console.log(type);
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
