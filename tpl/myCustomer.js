(function() {
	'use strict';

	angular
		.module('{{ values.appName }}')
		.directive('myCustomer', function() {
			return {
{% raw %}		template: 'Name: {{mainCtrl.customer.name}} Address: {{mainCtrl.customer.address}}' {% endraw %}
			};
		});

})();
