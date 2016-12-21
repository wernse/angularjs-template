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