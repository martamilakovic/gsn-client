'use strict';

angular.module('gsnClientApp')
  .controller('MapController', function ($scope, VirtualSensorService, $timeout) {
  		
  		$scope.map = {
    		center: {
        		latitude: geoip_latitude(),
        		longitude: geoip_longitude()
    		},
    		zoom: 9,
    		sensors : []
      };

		  VirtualSensorService.get(function(sensors){
  			sensors.sensors.forEach( function (sensor) {
					if(sensor.fields["latitude"] !== undefined && sensor.fields["longitude"] !== undefined)
						$scope.map.sensors
                    .push({   
                            "latitude": sensor.fields["latitude"].value, 
												    "longitude": sensor.fields["longitude"].value,
												    "showWindow" : false,
												    "title" : sensor.name,
                            "selected" : true
                          });
			   });
  		});


    // selected sensors
    $scope.selection = [];

    // helper method
    $scope.selectedSensors = function selectedSensors() {
       //return filterFilter($scope.map.sensors, { selected: true });

       console.log('ssssshuhu');
    };

    // watch sensors for changes
    $scope.$watch('map.sensors|filter:{selected:true}', function (nv) {
      $scope.selection = nv.map(function (sensor) {
        return sensor.name;
      });
    }, true);

});



