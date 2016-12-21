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