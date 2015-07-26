(function() {
	'use strict';

	angular
		.module('Appology',['ngRoute','firebase']);

	// routing
	angular
		.module('Appology')
		.config(['$routeProvider',
			function($routeProvider) {
				$routeProvider.
				when('/main', {
					templateUrl: 'views/main.html'
				}).
				when('/restCalls', {
					templateUrl: 'views/restCalls.html'
				}).
				when('/about', {
					templateUrl: 'views/about.html'
				}).
				when('/colors', {
					templateUrl: 'views/colors.html'
				}).
				when('/test', {
					templateUrl: 'views/test.html'
				}).
				otherwise({
					redirectTo: '/main'
				});
			}
		]);

})();
