app.controller('bodyCtrl',function ($scope){
	$scope.bodyBgColor={'background-color':'#ffffff'}
});

app.controller('restCallsCtrl',function($scope, $routeParams) {
		$scope.restID = $routeParams.restID;
});

app.controller('mainCtrl', function ($scope, configuration){

	$scope.time = new Date();
	$scope.numTotal = 0;
	$scope.gettysburg = 'Four score and seven years ago our fathers brought forth, upon this continent, a new nation, conceived in liberty, and dedicated to the proposition that /"all men are created equal./"';
	$scope.heroes = [
	{'name': 'Batman', 'publisher': 'DC Comics'},
	{'name': 'Green Lantern', 'publisher': 'DC Comics'},
	{'name': 'Cat Woman', 'publisher': 'DC Comics'},
	{'name': 'Hawkman', 'publisher': 'DC Comics'},
	{'name': 'Bizarro', 'publisher': 'DC Comics'},
	{'name': 'Iron Man', 'publisher': 'Marvel'},
	{'name': 'Captain America', 'publisher': 'Marvel'},
	{'name': 'Hulk', 'publisher': 'Marvel'},
	{'name': 'Spiderman', 'publisher': 'Marvel'},
	{'name': 'Storm', 'publisher': 'Marvel'}
	];

	$scope.orderProp = 'name';

	configuration.initialize();

	$scope.setCurBgColor = function() {
		$scope.bgColor = '#dddddd';
	};

});

