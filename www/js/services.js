angular.module('starter.services', [])

.factory('CommonService', function($http) {
	var variables = {
		dict : {},
		URLs : {
			health : 'http://' + window.variables.server + '/core-main/health',
			getNextRollerNo : 'http://' + window.variables.server + "/core-main/api/v1/transaction/post/volume/sysqueryticketno",
			dict : 'http://' + window.variables.server + '/core-main/api/v1/transaction/post/auth/sysNormalMor',
			login : 'http://' + window.variables.server + '/core-main/api/v1/transaction/post/auth/syswindowlogin',
			getDeparture : 'http://' + window.variables.server + '/core-main/api/v1/transaction/post/traininfo/sysgetboardstation',
			getArrived : 'http://' + window.variables.server + '/core-main/api/v1/transaction/post/traininfo/sysgetarivstation',
			queryTrain : 'http://' + window.variables.server + '/core-main/api/v1/transaction/post/traininfo/sysfdzquery',
			getTickets : 'http://' + window.variables.server + '/core-main/api/v1/transaction/post/transaction/sysseatapply',
			buyTicket : 'http://' + window.variables.server + '/core-main/api/v1/transaction/post/transaction/sysrecordsalestub'
		},
		nowRollerNo : '',
		nextRollerNo : '',
		index : {
			seatType : {

			}
		},
		obj : {}
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

			if (window.localStorage.obj) {
				variables.obj = JSON.parse(window.localStorage.obj);
			}

			var reference = this;
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
					reference._indexData(response.data);
					reference._getNextRollerNo();
					if (callback) {
						callback();
					}
				}
			}, function(response) {
				console.error(response);
			});
		},
		_getNextRollerNo : function() {
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
				"windowTicketNo" : null,
				"systemTime" : null
			};
			$http.post(variables.URLs.getNextRollerNo, data).then(function(response) {
				variables.nowRollerNo = response.data.nowRollerNo;
				variables.nextRollerNo = response.data.nextRollerNo;
			}, function(response) {
				console.error(response);
			});
		},
		_indexData : function(data) {
			console.log('<indexdata>');
			// index seat type
			var seatTypeList = data.seatTypeList;
			for (var i = 0; i < seatTypeList.length; i++) {
				variables.index.seatType[seatTypeList[i].seatTypeCode] = seatTypeList[i];
			}
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
		queryTrain : function(obj) {
			var _data = {
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
				"travelDate" : 1482422400000,
				"boardStationCode" : "SBT",
				"arrivalStationCode" : "MJO",
				"purposeCode" : "A1"
			};

			console.log('CommonService query train ', obj);
			$http.post(variables.URLs.queryTrain, obj.data).then(function(response) {
				if (obj.callback) {
					obj.callback(response);
				}
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
		queryTrain : function(obj) {
			service.queryTrain(obj);
		},
		getStations : function() {
			return variables.dict.stationList;
		},
		getTicketTypes : function() {
			return variables.dict.ticketTypeList;
		},
		getSeatTypes : function() {
			return variables.dict.seatTypeList;
		},
		translateTrainInfo : function(trainInfo) {
			var seatInfos = trainInfo.seatInfo;
			var avaliableSeats = 0;
			// var css = '';
			for (var i = 0; i < seatInfos.length; i++) {
				seatInfos[i].seatTypeNameEn = variables.index.seatType[seatInfos[i].seatType].seatTypeEn;
				avaliableSeats += seatInfos[i].seatAvaliableCount;
				// if (css.length === 0){
				// css += 'seat-type-'+seatInfos[i].seatType
				// }else{
				// css += ' seat-type-'+seatInfos[i].seatType
				// }
			}
			seatInfos.avaliableSeats = avaliableSeats;
			// seatInfos.css = css;

		},
		queryTrainPrice : function() {
			/*
			 * String trainCode = request.getTrainCode(); Date businessDate =
			 * request.getBusinessDate(); String stationCode =
			 * request.getBelongStationCode();
			 */
			var data = {
				trainCode : 'G1214',
				businessDate : new Date(),
				belongStationCode : 'SBT'
			};
			// $http.post('http://127.0.0.1/core-main/api/v1/transaction/post/transaction/sysqueryprice',
			// JSON.stringify(data)).then(function(response) {
			// console.log(response);
			// }, function(response) {
			// console.error(response);
			// });

			$http.get('http://127.0.0.1/core-main/api/v1/transaction/post/transaction/sysqueryprice/G1214/SBT').then(function(response) {
				console.log(response);
			}, function(response) {
				console.error(response);
			});
		},
		getTickets : function(obj) {
			console.log('CommonService.getTickets', obj);
			var reference = this;
			var data = {
				// "sessionId" : null,
				// "serviceName" : null,
				"channelCode" : "1",
				// "ticketStationCode" : "SBT",
				"officeNo" : "SBT01",
				"windowNo" : "102",
				"operatorNo" : "sbts01",
				"shiftCode" : "A",
				"innerCode" : "SBT01",
				// "belongStationCode" : "SBT",
				// "money" : null,
				// "runMode" : null,
				// "ipAddress" : "192.168.94.2",
				// "systemCode" : null,
				// "deviceIdentity" : null,
				// "licenceCode" : null,
				// "applyCode" : null,
				// "agentRepeater" : null,
				// "encryptFlag" : false,
				"applyType" : "1",
				"bookDate" : new Date().getTime(),
				"transactionType" : "1",
				"paymentCurrency" : "Br",
				"transactionNum" : "",
				"trainId" : obj.order.trainDirDay.trainId,
				"trainCode" : obj.order.trainDirDay.trainCode,
				"stationTrainCode" : obj.order.trainDirDay.trainCode,
				"startTrainDate" : new Date(obj.departureDate.getTime()).setHours(0, 0, 0, 0),
				"travelDate" : new Date(obj.departureDate.getTime()).setHours(0, 0, 0, 0),
				"trainTypeCode" : obj.order.trainDirDay.trainType.trainTypeCode,
				"trainClassCode" : obj.order.trainDirDay.trainClass.trainClassCode,
				"boardStationCode" : obj.order.boardStation.station.stationCode,
				"boardStationName" : obj.order.boardStation.station.stationNameEn,
				// "boardStationSeq" : 2,
				"boardTime" : obj.order.boardStation.boardTime,
				"arrivalStationCode" : obj.order.arrivalStation.station.stationCode,
				"arrivalStationSeq" : obj.order.arrivalStation.stationNo,
				"arrivalStationName" : obj.order.arrivalStation.station.stationNameEn,
				"arrivalTime" : obj.order.arrivalStation.arrivalTime,
				"ticketKind" : obj.order.ticketKind.ticketKindCode,
				"seatTypeCode" : obj.order.seat.seatType,
				"ticketInfo" : [ {
					"ticketType" : "10",
					"count" : obj.order.quantity
				} ],
				"seatFlag" : obj.order.seat.seatFlag,
				"purposeCode" : "A1"
			// ,"coachNo" : "",
			// "seatNo" : "",
			// "bedLevel" : "",
			// "differentDay" : "0",
			// "distance" : 777.0
			};

			$http.post(variables.URLs.getTickets, data).then(function(response) {
				console.log(response);
				if (!response.data.success) {
					return;
				}
				reference._doBuyTicket(response.data.trainInfo[0]);
			}, function(response) {
				console.error(response);
			});
		},
		_doBuyTicket : function(train) {
			var data = {
				"sessionId" : null,
				"serviceName" : null,
				"channelCode" : "1",
				"ticketStationCode" : "SBT",
				"officeNo" : "SBT01",
				"windowNo" : "102",
				"operatorNo" : "sbts01",
				"shiftCode" : "A",
				"innerCode" : null,
				"belongStationCode" : null,
				"money" : null,
				"runMode" : "",
				"ipAddress" : null,
				"systemCode" : null,
				"deviceIdentity" : null,
				"licenceCode" : null,
				"applyCode" : null,
				"agentRepeater" : null,
				"encryptFlag" : false,
				"transactionNum" : train.transactionNum,
				"transactionType" : train.transactionType,
				"paymentCode" : "1",
				"paymentType" : "1",
				"paymentCur" : "Br",
				"shiftNum" : "100080",
				"shiftTypeId" : 100003,
				"tempStubs" : [ {
					"tempStubNum" : train.ticketInfo[0].tempStubNum,
					"paymentAmount" : train.ticketInfo[0].printPriceOrig,
					"surname" : null,
					"mobileNumber" : null,
					"certificateType" : null,
					"certificateNo" : null,
					"printTicketNo" : variables.nextRollerNo,
					"ticketNum" : (function() {
						var date = new Date();
						var s = ('' + date.getFullYear()).substring(2) + (date.getMonth() + 1) + date.getDate();
						return 'SBT01102' + s + variables.nextRollerNo
					})()
				} ]
			};
			console.log('BUY', data);
			$http.post(variables.URLs.buyTicket, data).then(function(response) {
				console.log(response);
			}, function(response) {
				console.error(response);
			});

		},
		buyTickets : function(obj) {
			console.log('CommonService.buyTickets', obj);
			this.getTickets(obj);
		}
	};
});
