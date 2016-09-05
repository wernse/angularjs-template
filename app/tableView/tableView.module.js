(function() {
    'use strict';

    angular.module('tableView', [])
        .config(routeConfig);

    routeConfig.$inject = ['$stateProvider'];

    function routeConfig($stateProvider) {
        $stateProvider
            .state('parent.tableView', {
                url: '/table/:fileName',
                templateUrl: '/tableView/tableView.html',
                controller: 'tableViewController',
                controllerAs: 'table'
            });
    }
}());