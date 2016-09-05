(function() {
	'use strict';

	angular.module('upload')
		.controller('uploadController', uploadController);

	uploadController.$inject = ['$state', 'uploadFactory', 'tableViewFactory'];

	function uploadController($state, uploadFactory, tableViewFactory) {
		var ctrl = this;
		console.log('hello this is me uploadController');
		///--Functions--///
		ctrl.uploadFile = uploadFile;
		///--Variables--///
		ctrl.max = 100;
		ctrl.progress = 0;
		///--Function Definitions--///
		function uploadFile(file) {
			if (file === null) {
				return;
			}
			console.log('hellos', file);
			uploadFactory.uploadFile(file).then(function(resp) {
				console.log('Success ', resp.config.data.file.name, 'uploaded. Response: ', resp.data);
				tableViewFactory.setTable(resp.data);
				$state.go('parent.tableView', {
					fileName: resp.config.data.file.name
				});
			}, function(resp) {
				console.log('Error status: ' + resp.status);
			}, function(evt) {
				ctrl.progress = parseInt(100.0 * evt.loaded / evt.total);
				console.log('progress: ' + ctrl.progress + '% ' + evt.config.data.file.name);
			});
		}
	}

}());