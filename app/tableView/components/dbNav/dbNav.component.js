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