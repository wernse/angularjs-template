(function () {
    "use strict";

    angular.module("upload", [])
        .config(routeConfig);

    routeConfig.$inject = ["$stateProvider"];

    function routeConfig($stateProvider) {
        $stateProvider
            .state("parent.upload", {
                url: "/",
                templateUrl: "upload/upload.html",
                controller: "UploadController",
                controllerAs: "upload"
            });
    }
} ());