'use strict';

angular.module('gsnClientApp')
  .service('SettingsService', function () {

  		this.intervalOptions = [
	  		{name:"1hour" , value: 3600000},
	  		{name:"10min", value: 600000},
	  		{name:"1min", value: 60000},
	  		{name:"5sec", value: 5000},
	  		{name:"1sec", value: 1000},
	  		{name:"disable", value: 0},
  		];

		
		this.refreshInterval = 	this.intervalOptions[2] ; // default value


		this.setRefreshInterval = function(newRefreshInterval) {
				this.refreshInterval = newRefreshInterval;
		};
  });
