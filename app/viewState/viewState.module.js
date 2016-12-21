(function() {
  'use strict';

  angular.module('viewState', [
      'ui.router',
    ])
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('view', {
        url: '/',
        template: '<view-state></view-state>',
        parent: 'parent'
      });
  }

})();