(function(){
  "use strict";

  angular.module("app", [
  "ui.router",
  "upload"
  ])
  .config(routeConfig);

  routeConfig.$inject = ["$stateProvider", "$urlRouterProvider", "$locationProvider"];

  function routeConfig ($stateProvider, $urlRouterProvider, $locationProvider){

    $locationProvider.html5Mode(true);
      $urlRouterProvider.otherwise("/");
      $stateProvider
        .state("parent", {
            url: "",
            template: "<div ui-view></div>",
            abstract: true
        });
  }

})();

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
(function () {
    "use strict";

    angular.module("upload")
		.controller("UploadController", UploadController);

	//UploadController.$inject = ["$scope"];

	function UploadController() {
		var ctrl = this;
		console.log("hello from UploadController")
		ctrl.test = "Hellossss";
	}
	
} ());


(function(){
	"use strict";

	angular.module("upload")
	.factory("UploadFactory",UploadFactory);

	function UploadFactory (){
		var UploadFactory = {

		};

		return UploadFactory;
	} 
})();
