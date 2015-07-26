(function() {
	'use strict';

	angular
		.module('Appology')
		.directive('myCustomer', function() {
			return {
				template: 'Name: {{mainCtrl.customer.name}} Address: {{mainCtrl.customer.address}}'
			};
		});

})();
