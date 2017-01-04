angular.module('starter.controllers', [])

.controller('BookingController', function($scope, $ionicModal, CommonService, ionicDatePicker, $location) {
	var reference = this, MODAL_TITLE_DEPARTURE = 'Departure Station', MODAL_TITLE_ARRIVED = 'Arrived Station';
	$scope.departureDate = new Date();
	$scope.selectedTicketTypes = [];
	$scope.selectedSeatTypes = [];
	$scope.order = {};

	/*
	 * 根据条件检索出来的结果 \ 检索条件为 乘坐日期、乘坐站、到达站 \ 其它条件在检索出来后，通过样式控制是否可见
	 */
	$scope.trainList = [];

	this.seatTypeTrigged = function() {
		dofilter($scope.trainList);
	};

	$ionicModal.fromTemplateUrl('modal-login.html', {
		scope : $scope,
		animation : 'slide-in-up'
	}).then(function(modal) {
		$scope.loginModal = modal;
		// if(!window.login){
		// $scope.loginModal.show();
		// }
	});

	this.login = function() {
		CommonService.login();
		$scope.loginModal.hide();
		window.login = true;
	};

	$ionicModal.fromTemplateUrl('modal-loading.html', {
		scope : $scope,
		animation : 'slide-in-up'
	}).then(function(modal) {
		$scope.loadingModal = modal;
		$scope.loadingModal.show();
	});

	$ionicModal.fromTemplateUrl('modal-order.html', {
		scope : $scope,
		animation : 'slide-in-up'
	}).then(function(modal) {
		$scope.orderModal = modal;
	});

	$ionicModal.fromTemplateUrl('modal-stations.html', {
		scope : $scope,
		animation : 'slide-in-up'
	}).then(function(modal) {
		$scope.modal = modal;
	});

	this.popOrder = function(train) {
		$scope.order = train;
		$scope.orderModal.show();
	};

	this.confirm = function() {
		if (!window.login) {
			$scope.loginModal.show();
			return;
		}

		CommonService.buyTickets({
			order : $scope.order,
			departureDate : $scope.departureDate
		}).then(function(){
			$scope.orderModal.hide();
		});
	};

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
					for (var i = 0; i < response.data.trainInfo.length; i++) {
						if (response.data.trainInfo[i].seatInfo && response.data.trainInfo[i].seatInfo.length !== 0) {
							CommonService.translateTrainInfo(response.data.trainInfo[i]);
							trainList.push(response.data.trainInfo[i]);
						}
					}
				}
				dofilter(trainList);
				$scope.trainList = trainList;
			}
		});
	};

	function dofilter(trainList) {
		if (!trainList || trainList.length === 0) {
			return;
		}
		if ($scope.selectedSeatTypes.length === 0) {
			console.log('None SeatTyp filter');
			return;
		}
		var typeCodes = [];
		var codeIndex = {};
		for (var i = 0; i < $scope.selectedSeatTypes.length; i++) {
			console.log($scope.selectedSeatTypes[i]);
			if ($scope.selectedSeatTypes[i]) {
				var type = $scope.seatTypes[i];
				console.log(type);
				typeCodes.push(type.seatTypeCode);
				codeIndex[type.seatTypeCode] = type.seatTypeEn;
			}
		}
		if (typeCodes.length === 0) {
			trainList.forEach(function(train) {
				train.visible = true;
			});
			return;
		}

		console.log(codeIndex);

		trainList.forEach(function(train) {
			train.visible = false;
			train.seatInfo.forEach(function(seat) {
				if (codeIndex[seat.seatType]) {
					train.visible = true;
				}
			});
		});
	}

	this.show = function() {
		console.log($scope.trainList);
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
}).controller("TrainListController", function($location) {
	console.log('PARAMS', $location.search());

}).controller('InquireController', function($scope, $rootScope) {
	function init() {
		console.log('~~~~~~~~~~~~~~');
		var orderstr = window.localStorage.getItem('orders');
		$scope.orders = [];
		if (orderstr != '') {
			$scope.orders = JSON.parse(orderstr);
		}
	}

	init();

	$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
		if (toState.name === 'tab.inquire') {
			init();
		}
	});

}).controller('AccountController', function($scope, CommonService) {

	this.clearOrders = function() {
		window.localStorage.setItem('orders', '');
	};

	$scope.server = window.variables.server;

//	$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
//
//	});
})
