(function() {
  'use strict';

  angular.module('app', [
      'ui.router',
      'ui.bootstrap',
      'ngMaterial',
      'templates',
      'upload',
      'tableView'
    ])
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

  function routeConfig($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/');
    $stateProvider
      .state('parent', {
        url: '',
        template: '<div ui-view></div>',
        abstract: true
      });
  }

})();