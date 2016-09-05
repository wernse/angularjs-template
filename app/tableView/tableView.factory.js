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