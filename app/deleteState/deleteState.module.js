(function() {
  'use strict';

  angular.module('deleteState', [
      'ui.router',
    ])
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('delete', {
        url: '/delete',
        template: '<delete-state></delete-state>',
        parent: 'parent'
      });
  }

})();