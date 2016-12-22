angular.module('starter.services', [])

.factory('CommonService', function($http) {
	var variables = {
		dict : {},
		URLs : {
			health : 'http://' + window.variables.server + '/core-main/health',
			dict : 'http://' + window.variables.server + '/core-main/api/v1/transaction/post/auth/sysNormalMor',
			login : 'http://' + window.variables.server + '/core-main/api/v1/transaction/post/auth/syswindowlogin',
			getDeparture : 'http://' + window.variables.server + '/core-main/api/v1/transaction/post/traininfo/sysgetboardstation',
			getArrived : 'http://' + window.variables.server + '/core-main/api/v1/transaction/post/traininfo/sysgetarivstation',
			queryTrain : 'http://' + window.variables.server + '/core-main/api/v1/transaction/post/traininfo/sysfdzquery'
		}
	}, service = {
		checkHealth : function() {
			console.log('<CheckHealth>');
			$http.get(variables.URLs.health).then(function(response) {
				console.log(response.data.message);
			}, function(response) {
				console.error(response);
			});
		},
		loadData : function(callback) {
			console.log('<LoadStation>');
			var data = {
				"sessionId" : null,
				"serviceName" : null,
				"channelCode" : null,
				"ticketStationCode" : "SBT",
				"officeNo" : "SBT01",
				"windowNo" : "102",
				"operatorNo" : null,
				"shiftCode" : null,
				"innerCode" : null,
				"belongStationCode" : "SBT",
				"money" : null,
				"runMode" : null,
				"ipAddress" : null,
				"systemCode" : null,
				"deviceIdentity" : null,
				"licenceCode" : null,
				"applyCode" : null,
				"agentRepeater" : null,
				"encryptFlag" : false
			};
			$http.post(variables.URLs.dict, data).then(function(response) {
				if (response.data) {
					variables.dict = response.data;
					if (callback) {
						callback();
					}
				}
			}, function(response) {
				console.error(response);
			});
		},
		login : function() {
			console.log('<Login>');
			var data = {
				"sessionId" : null,
				"serviceName" : null,
				"channelCode" : null,
				"ticketStationCode" : "SBT",
				"officeNo" : "SBT01",
				"windowNo" : "102",
				"operatorNo" : "sbts01",
				"shiftCode" : null,
				"innerCode" : "000",
				"belongStationCode" : "SBT",
				"money" : null,
				"runMode" : null,
				"ipAddress" : "192.168.78.2",
				"systemCode" : null,
				"deviceIdentity" : null,
				"licenceCode" : null,
				"applyCode" : null,
				"agentRepeater" : null,
				"encryptFlag" : false,
				"hdNo" : "S4Y3B3KS",
				"operatorPwd" : "admin",
				"windowTimestamp" : new Date().getTime()
			};
			$http.post(variables.URLs.login, data).then(function(response) {
				console.log(response);
			}, function(response) {
				console.error(response);
			});
		},
		// 通过发车日期、车次号获得乘坐站
		getDeparture : function() {
			var data = {
				"sessionId" : null,
				"serviceName" : null,
				"channelCode" : null,
				"ticketStationCode" : "SBT",
				"officeNo" : "SBT01",
				"windowNo" : "102",
				"operatorNo" : "sbts01",
				"shiftCode" : null,
				"innerCode" : "SBT01",
				"belongStationCode" : null,
				"money" : null,
				"runMode" : null,
				"ipAddress" : "192.168.78.2",
				"systemCode" : null,
				"deviceIdentity" : null,
				"licenceCode" : null,
				"applyCode" : null,
				"agentRepeater" : null,
				"encryptFlag" : false,
				"travelDate" : 1482249600000,
				"stationTrainCode" : "G1214"
			};
			$http.post(variables.URLs.getDeparture, data).then(function(response) {
				console.log(response);
			}, function(response) {
				console.error(response);
			});
		},
		getArrived : function() {
			var data = {
				"sessionId" : null,
				"serviceName" : null,
				"channelCode" : null,
				"ticketStationCode" : "SBT",
				"officeNo" : "SBT01",
				"windowNo" : "102",
				"operatorNo" : "sbts01",
				"shiftCode" : null,
				"innerCode" : "SBT01",
				"belongStationCode" : "SBT",
				"money" : null,
				"runMode" : null,
				"ipAddress" : "192.168.78.2",
				"systemCode" : null,
				"deviceIdentity" : null,
				"licenceCode" : null,
				"applyCode" : null,
				"agentRepeater" : null,
				"encryptFlag" : false,
				"travelDate" : 1482249600000,
				"startTrainDate" : 1482249600000,
				"stationTrainCode" : "G1214",
				"boardStationCode" : "SBT",
				"boardStationSeq" : 1,
				"purposeCode" : "A1"
			};

			$http.post(variables.URLs.getArrived, data).then(function(response) {
				console.log(response);
			}, function(response) {
				console.error(response);
			});

		},
		queryTrain : function() {
			var data = {
				"sessionId" : null,
				"serviceName" : null,
				"channelCode" : null,
				"ticketStationCode" : "SBT",
				"officeNo" : "SBT01",
				"windowNo" : "102",
				"operatorNo" : null,
				"shiftCode" : null,
				"innerCode" : "SBT01",
				"belongStationCode" : null,
				"money" : null,
				"runMode" : null,
				"ipAddress" : null,
				"systemCode" : null,
				"deviceIdentity" : null,
				"licenceCode" : null,
				"applyCode" : null,
				"agentRepeater" : null,
				"encryptFlag" : false,
				"travelDate" : 1482249600000,
				"boardStationCode" : "SBT",
				"arrivalStationCode" : "BKE",
				"purposeCode" : "A1"
			};

			$http.post(variables.URLs.queryTrain, data).then(function(response) {
				console.log(response);
			}, function(response) {
				console.error(response);
			});

		}

	};

	service.checkHealth();
	console.log('CommonService.variables', variables);

	return {
		loadData : function(callback) {
			service.loadData(callback);
		},
		login : function() {
			service.login();
		},
		getDeparture : function() {
			service.getDeparture();
		},
		getArrived : function() {
			service.getArrived();
		},
		queryTrain : function() {
			service.queryTrain();
		},
		getStations : function() {
			return variables.dict.stationList;
		},
		getTicketTypes : function() {
			return variables.dict.ticketTypeList;
		}
	};
});
