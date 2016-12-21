(function() {
  'use strict';

  angular.module('app', [
      'ui.router',
      'ui.bootstrap',
      'templates',
      'deleteState',
      'viewState'
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
angular.module('templates', []).run(['$templateCache', function($templateCache) {$templateCache.put('/deleteState/deleteState.html','<section>\r\n    <nav class="navbar navbar-inverse">\r\n         <div class="container">\r\n             <ul class="nav navbar-nav">\r\n                <li><a ui-sref="view">View</a></li>\r\n                <li><a ui-sref="delete">Delete</a></li>\r\n            </ul>\r\n        </div>\r\n    </nav>\r\n    <h2>Hello delete state</h2>\r\n    <display-list data="$ctrl.users"\r\n        button-name="Delete"\r\n        button-pressed="$ctrl.deleteUser">\r\n    </display-list>\r\n    <h4>User to Delete: {{$ctrl.usertoDelete}}</h4>\r\n</section>');
$templateCache.put('/displayList/displayList.html','<ul style="list-style-type: none;">\r\n    <li ng-repeat="item in $ctrl.data">\r\n        <div class="col-md-8">\r\n            {{item.first_name}}\r\n        </div>\r\n        <div class="col-md-4">\r\n            <button class="btn btn-priamry" ng-click="$ctrl.buttonPressed(item)">\r\n                {{$ctrl.buttonName}}\r\n                </button>\r\n        </div>\r\n        <div class="clear-fix"></div>\r\n    </li>\r\n</ul>');
$templateCache.put('/viewState/viewState.html','<section>\r\n    <nav class="navbar navbar-inverse">\r\n         <div class="container">\r\n             <ul class="nav navbar-nav">\r\n                <li><a ui-sref="view">View</a></li>\r\n                <li><a ui-sref="delete">Delete</a></li>\r\n            </ul>\r\n        </div>\r\n    </nav>\r\n    <h2>Hello view state</h2>\r\n    <display-list data="$ctrl.users"\r\n        button-name="View"\r\n        button-pressed="$ctrl.viewUser">\r\n    </display-list>\r\n    <h4>User to View: {{$ctrl.userToView}}</h4>\r\n</section>.');}]);
(function() {
  'use strict';

  angular.module('deleteState', [
      'ui.router',
    ])
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('delete', {
        url: '/delete',
        template: '<delete-state></delete-state>',
        parent: 'parent'
      });
  }

})();
(function() {
  'use strict';

  angular.module('viewState', [
      'ui.router',
    ])
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('view', {
        url: '/',
        template: '<view-state></view-state>',
        parent: 'parent'
      });
  }

})();
(function() {
	'use strict';

	angular.module('app')
		.factory('userFactory', userFactory);


	function userFactory() {
		var userFactory = {
			get: get,
		};

		return userFactory;

		function get() {
			return [{
				"first_name": "Nicholas",
				"last_name": "Brown",
				"email": "nbrown0@ox.ac.uk",
				"gender": "Male"
				}, {
				"first_name": "Keith",
				"last_name": "Sanders",
				"email": "ksanders1@webeden.co.uk",
				"gender": "Male"
				}, {
				"first_name": "Susan",
				"last_name": "Turner",
				"email": "sturner2@csmonitor.com",
				"gender": "Female"
				}, {
				"first_name": "Angela",
				"last_name": "Gutierrez",
				"email": "agutierrez3@howstuffworks.com",
				"gender": "Female"
				}, {
				"first_name": "Angela",
				"last_name": "Bailey",
				"email": "abailey4@jalbum.net",
				"gender": "Female"
				}, {
				"first_name": "Timothy",
				"last_name": "Nguyen",
				"email": "tnguyen5@ning.com",
				"gender": "Male"
				}, {
				"first_name": "Maria",
				"last_name": "Morgan",
				"email": "mmorgan6@simplemachines.org",
				"gender": "Female"
				}, {
				"first_name": "Aaron",
				"last_name": "Greene",
				"email": "agreene7@unblog.fr",
				"gender": "Male"
				}, {
				"first_name": "Janet",
				"last_name": "Ray",
				"email": "jray8@theguardian.com",
				"gender": "Female"
				}, {
				"first_name": "Charles",
				"last_name": "Lopez",
				"email": "clopez9@is.gd",
				"gender": "Male"
				}]
		}
	}
})();
(function() {
	'use strict';

	angular.module('app')
		.component('deleteState', {
			templateUrl: '/deleteState/deleteState.html',
			controller: deleteStateController,
		});

	deleteStateController.$inject = ['userFactory'];

	function deleteStateController(userFactory) {
		var ctrl = this;
		
		ctrl.$onInit = init;

		function init(){
			ctrl.users = userFactory.get();
			console.log(ctrl.users)
			ctrl.deleteUser = deleteUser;
		}

		function deleteUser(user){
			console.log(user);
			ctrl.usertoDelete = user;
		}
	}

}());
(function() {
	'use strict';

	angular.module('app')
		.component('displayList', {
			templateUrl: '/displayList/displayList.html',
			controller: displayListController,
			bindings: {
				data: '<',
				buttonName: '@',
				buttonPressed: '&',
			}
		});

	displayListController.$inject = [];

	function displayListController() {
		var ctrl = this;
		console.log('hello this is displayListController', ctrl);

		ctrl.$onInit = init;

		function init(){
			ctrl.buttonPressed = ctrl.buttonPressed();
		}
	}

}());
(function() {
	'use strict';

	angular.module('app')
		.component('viewState', {
			templateUrl: '/viewState/viewState.html',
			controller: viewStateController,
		});

	viewStateController.$inject = ['userFactory'];

	function viewStateController(userFactory) {
		var ctrl = this;
		
		ctrl.$onInit = init;

		function init(){
			ctrl.users = userFactory.get();
			ctrl.viewUser = viewUser;
		}

		function viewUser(user){
			console.log(user);
			ctrl.userToView = user;
		}
	}

}());
(function() {
	'use strict';

	angular.module('app')
		.component('navbar', {
			templateUrl: '/navbar/navbar.html',
			controller: navbarController,
			bindings: {
			}
		});

	navbarController.$inject = [];

	function navbarController() {
		var ctrl = this;
		console.log('hello this is navbarController', ctrl);

		ctrl.$onInit = init;

		function init(){
			ctrl.buttonPressed = ctrl.buttonPressed();
		}
	}

}());