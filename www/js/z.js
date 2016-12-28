{
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
					"tempStubNum" : train.ticketInfo.tempStubNum,
					"paymentAmount" : train.ticketInfo.paymentCurrency,
					"surname" : null,
					"mobileNumber" : null,
					"certificateType" : null,
					"certificateNo" : null,
					"printTicketNo" : variables.nextRollerNo,
					"ticketNum" : (function(){
						var date = new Date();
						var s = (''+date.getFullYear()).substring(2) + (date.getMonth()+1) + date.getDate();
						return 'SBT01102' + s + variables.nextRollerNo
					})()
				} ]
			}