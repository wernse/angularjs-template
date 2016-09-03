(function() {
	'use strict';

	angular.module('upload')
		.controller('UploadController', UploadController);

	UploadController.$inject = ['uploadFactory'];

	function UploadController(uploadFactory) {
		var ctrl = this;
		console.log("hello this is me");
		///--Functions--///
		ctrl.uploadFile = uploadFile;
		///--Variables--///

		///--Function Definitions--///


		function uploadFile(file) {
			if (file == null)
				return;
			console.log("hellos", file)
			uploadFactory.uploadFile(file).then(function(resp) {
				console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
			}, function(resp) {
				console.log('Error status: ' + resp.status);
			}, function(evt) {
				ctrl.progress = parseInt(100.0 * evt.loaded / evt.total);
				console.log('progress: ' + ctrl.progress + '% ' + evt.config.data.file.name);
			});
		}
	}

}());