'use strict';

var app = angular.module('gsnClientApp', [
  'ngAnimate',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'google-maps'
]);

app.config(function ($routeProvider) {
   $routeProvider.
      when ('/', {
          templateUrl: 'views/home.html',
          controller: 'HomeController'
      })
      .when ('/home', {
          templateUrl: 'views/home.html',
          controller: 'HomeController'
      })
      .when('/data', {
        templateUrl: 'views/data.html',
        controller: 'DataController'
      })
      .when ( '/map', {
          templateUrl: 'views/map.html',
          controller: 'MapController'
      })
      .otherwise({
        redirectTo: '/'
      });
  });


app.run(function($rootScope, $location, NavigationService) {

    $rootScope.$on('$routeChangeStart', function(next, current) { 

         NavigationService.pageChanged($location.path());
    
    });
});

$(document).foundation();