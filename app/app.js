var app = angular.module('myApp', ['ngAnimate','ngRoute','ngResource','metrics'])
.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $routeProvider.
  when('/', {
    templateUrl: 'app/metrics/metrics.html',
    controller: 'metricsCtrl',
    controllerAs: 'metric'
  }).
  otherwise({
    redirectTo: '/'
  });
  $locationProvider.html5Mode(true);
}]);
