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