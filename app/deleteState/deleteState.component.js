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