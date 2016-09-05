(function() {
    'use strict';

    angular.module('tableViewer', [])
        .config(routeConfig);

    routeConfig.$inject = ['$stateProvider'];

    function routeConfig($stateProvider) {
        $stateProvider
            .state('parent.table', {
                url: '/',
                templateUrl: 'upload/upload.html',
                controller: 'UploadController',
                controllerAs: 'upload'
            });
    }
}());