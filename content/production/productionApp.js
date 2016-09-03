(function() {
  'use strict';

  angular.module('app', [
      'ui.router',
      'upload'
    ])
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

  function routeConfig($stateProvider, $urlRouterProvider, $locationProvider) {

    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/');
    $stateProvider
      .state('parent', {
        url: '',
        template: '<div ui-view></div>',
        abstract: true
      });
  }

})();
(function() {
    'use strict';

    angular.module('upload', [
            'ngFileUpload'
        ])
        .config(routeConfig);

    routeConfig.$inject = ['$stateProvider'];

    function routeConfig($stateProvider) {
        $stateProvider
            .state('parent.upload', {
                url: '/',
                templateUrl: 'upload/upload.html',
                controller: 'UploadController',
                controllerAs: 'upload'
            });
    }
}());
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