'use strict';

angular.module('gsnClientApp')
  .controller('DataController', function ($scope,VirtualSensorService) {

  	VirtualSensorService.get(function (data) {
  		var allSensors = {name: "All virtual sensors"};
  		data.sensors.splice(0,0,allSensors);
  		$scope.sensors = data.sensors;
  		$scope.selectedSensor = allSensors;
  	});


  	$scope.sensorSelected = function() {
  		if ($scope.selectedSensor.structureFields[0] !== "All fields")
  			$scope.selectedSensor.structureFields.splice(0,0,"All fields");
  		$scope.selectedField = $scope.selectedSensor.structureFields[0];
  	};

    
  	$scope.accordionClicked = function(accordionId) {

  		if ($scope.selectedAccordion === accordionId) {
  			$scope.selectedAccordion = !$scope.selectedAccordion;
  		}
  		else
  			$scope.selectedAccordion = accordionId;
  	};
  });
