angular.module('starter.services', [])

.factory('CommonService', function($http) {
	var variables = {
		dict : {},
		URLs : {
			health : 'http://' + window.variables.server + '/core-main/health',
			dict : 'http://' + window.variables.server + '/core-main/api/v1/transaction/post/auth/sysNormalMor',
			login : 'http://' + window.variables.server + '/core-main/api/v1/transaction/post/auth/syswindowlogin',
			departure : 'http://' + window.variables.server + '/core-main/api/v1/transaction/post/traininfo/sysgetboardstation'
		}
	}, service = {
		init : function() {
			console.log('<Init>');
			this._loadData();
		},
		checkHealth : function() {
			console.log('<CheckHealth>');
			$http.get(variables.URLs.health).then(function(response) {
				console.log(response.data.message);
			}, function(response) {
				console.error(response);
			});
		},
		_loadData : function() {
			console.log('<LoadStation>');
			$http.post(variables.URLs.dict, window.variables.postInfo).then(function(response) {
				if (response.data) {
					variables.dict = response.data;
				}
			}, function(response) {
				console.error(response);
			});
		},
		login : function() {
			console.log('<Login>');
			var data = angular.copy(window.variables.postInfo);
			data.operatorNo = 'sbts01';
			data.operatorPwd = 'admin';
			data.ipAddress = "*";
			data.hdNo = "S4Y3B3KS";
			data.windowTimestamp = new Date().getTime();
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
				"ipAddress" : "*",
				"systemCode" : null,
				"deviceIdentity" : null,
				"licenceCode" : null,
				"applyCode" : null,
				"agentRepeater" : null,
				"encryptFlag" : false,
				"travelDate" : 1482163200000,
				"stationTrainCode" : "G1214"
			}
			$http.post(variables.URLs.departure, data).then(function(response) {
				console.log(response);
			}, function(response) {
				console.error(response);
			});
		}

	};

	service.checkHealth();
	service.init();
	console.log('CommonService.variables', variables);

	return {
		login : function() {
			service.login();
		},
		getDeparture : function() {
			service.getDeparture();
		}
	};
});
