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

