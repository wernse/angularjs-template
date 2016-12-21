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