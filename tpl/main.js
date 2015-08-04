(function() {
	'use strict';

	angular
		.module('{{ values.appName}}',['ngRoute'
{% if values.firebase == 'y' %}
			,'firebase'
{% endif %}
			]);

	// routing
	angular
		.module('{{ values.appName}}')
		.config(['$routeProvider',
			function($routeProvider) {
				$routeProvider.
				when('/main', {
					templateUrl: 'views/main.html'
				}).
{% if values.restCalls == 'y' %}
				when('/restCalls', {
					templateUrl: 'views/restCalls.html'
				}).
{% endif %}
				when('/about', {
					templateUrl: 'views/about.html'
				}).
{% if values.fontawesome == 'y' %}
				when('/colors', {
					templateUrl: 'views/colors.html'
				}).
{% endif %}
				when('/test', {
					templateUrl: 'views/test.html'
				}).
				otherwise({
					redirectTo: '/main'
				});
			}
		]);

})();
