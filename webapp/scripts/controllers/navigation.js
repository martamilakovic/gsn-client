'use strict';

angular.module('gsnClientApp')
  .controller('NavigationController', function ($scope, NavigationService) {
		
		$scope.pages = NavigationService.pages;   

  });
