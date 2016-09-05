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