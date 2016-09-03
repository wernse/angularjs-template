(function() {
	'use strict';

	angular.module('upload')
		.factory('uploadFactory', uploadFactory);

	uploadFactory.$inject = ['Upload'];

	function uploadFactory(Upload) {
		var baseUrl = "api/upload"
		var uploadFactory = {
			uploadFile: uploadFile
		};

		return uploadFactory;

		function uploadFile(file) {
			// upload on file select or drop
			return Upload.upload({
				url: baseUrl,
				data: {
					file: file
				}
			});
		}
	}
})();