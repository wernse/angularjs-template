(function() {
  'use strict';

  angular.module('app', [
      'ui.router',
      'ui.bootstrap',
      'ngMaterial',
      'templates',
      'upload',
      'tableView'
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
angular.module('templates', []).run(['$templateCache', function($templateCache) {$templateCache.put('/tableView/tableView.html','<section>\r\n    <aside>\r\n        <db-nav data="table.data.colMap"></db-nav>\r\n    </aside>\r\n    <main></main>\r\n    Table view {{table.fileName}}\r\n    <table>\r\n        <thead></thead>\r\n        <tbody>\r\n            <tr ng-repeat="row in table.data">\r\n                <td>\r\n                    <div></div>\r\n                </td>\r\n            </tr>\r\n        </tbody>\r\n    </table>\r\n</section>');
$templateCache.put('/upload/upload.html','<div class=\'background\'>\r\n    <div id=\'upload_container\'>\r\n        <h4>UPLOAD A ZIP FILE</h4>\r\n        <div>\r\n            <uib-progressbar max=\'upload.max\' value=\'upload.progress\'>\r\n                <span style=\'color:white; white-space:nowrap;\'>\r\n                    {{upload.progress}} / {{upload.max}}\r\n                    </span>\r\n            </uib-progressbar>\r\n\r\n            <label class=\'upload_button\'>\r\n            <input type=\'file\' class=\'file\' \r\n            ngf-select="upload.uploadFile($file)"\r\n            required/>\r\n            \r\n            <span>Upload a Zip File</span>\r\n        </label>\r\n        </div>\r\n    </div>');
$templateCache.put('/tableView/components/dbNav/dbNav.html','<section>\r\n    HELLO SIDE NAVsss\r\n    <table>\r\n        <thead>\r\n            <tr>\r\n                <th></th>\r\n                <th></th>\r\n                <th></th>\r\n            </tr>\r\n        </thead>\r\n        <tbody>\r\n            <tr ng-repeat="table in $ctrl.data">\r\n                {{table.name}}\r\n            </tr>\r\n        </tbody>\r\n    </table>\r\n</section>');}]);
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
                templateUrl: '/upload/upload.html',
                controller: 'uploadController',
                controllerAs: 'upload'
            });
    }
}());
(function() {
	'use strict';

	angular.module('tableView')
		.controller('tableViewController', tableViewController);

	tableViewController.$inject = ['$state', '$stateParams', 'tableViewFactory'];

	function tableViewController($state, $stateParams, tableViewFactory) {
		var ctrl = this;
		console.log('hello this is tableViewControllers', $stateParams);
		///--Functions--///
		///--Variables--///
		ctrl.fileName = $stateParams.fileName;
		ctrl.data = tableViewFactory.getTable();
		if (angular.isUndefined(ctrl.data)) {
			$state.go('parent.upload');
		}
		///--Function Definitions--///
	}

}());
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
(function() {
	'use strict';

	angular.module('tableView')
		.factory('tableViewFactory', tableViewFactory);


	function tableViewFactory() {
		var tableViewFactory = {
			setTable: setTable,
			getTable: getTable
		};

		return tableViewFactory;

		function setTable(table) {
			console.log('setting table', table);
			this.table = table;
		}

		function getTable() {
			console.log('getting table', this.table);
			return this.table;
		}
	}
})();
(function() {
	'use strict';

	angular.module('upload')
		.factory('uploadFactory', uploadFactory);

	uploadFactory.$inject = ['Upload'];

	function uploadFactory(Upload) {
		var baseUrl = 'api/upload';
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
(function() {
	'use strict';

	angular.module('tableView')
		.component('dbNav', {
			templateUrl: '/tableView/components/dbNav/dbNav.html',
			controller: dbNavController,
			bindings: {
				data: '<'
			}
		});

	dbNavController.$inject = [];

	function dbNavController() {
		var ctrl = this;
		console.log('hello this is dbNavControllerss', ctrl);
		///--Functions--///
		///--Variables--///
		///--Function Definitions--///
	}

}());