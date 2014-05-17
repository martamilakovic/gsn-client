angular.module('gsnClientApp')
	.service("FilterService", function ($http){
		
		var sName = "";

		this.setSensorName = function(sensorName) {
			sName = sensorName;
		};

		this.getAllDataBySensorName = function(callback) {
			var httpRequest = "/multidata?vs[0]=" + sName + "&download_format=xml&field[0]=All";

			$http.get(httpRequest).success(function (data) {
				//$http.get("/multidata?vs[0]=temprabbit&field[0]=All").success(function (data) {
				//$scope = parseVSensorDataXML(data);
				callback(parseVSensorDataXML(data));
			}).error(function () {
				alert("an unexpcted error ocurred!");
			});
		}
	});

	function parseVSensorDataXML (xml) {
		var nodes = $(xml);
		var allData = [];
		var dataName = [];

        $(nodes).find('header').each(function() {
        	var currentData = $(this);
        	
        	currentData.children().each( function () {
            	var currentField = $(this);
            	dataName.push(currentField.text());
        	})
        });

		
		$(nodes).find('tuple').each(function() {

            var currentData = $(this);
            var i = 0;
			var field = {};

			currentData.children().each( function () {
            	var currentField = $(this);
            	
            	field[dataName[i]] = currentField.text();
            	i++;
            })

            allData.push(field);
		});

		return allData;
	}