(function() {
	'use strict';

// test view controller
	angular
		.module('Appology')
		.controller('test', function($scope){
			$scope.testClass1 = false;
			$scope.testClass2 = false;

			$scope.applyClass2 = function(){
				if($scope.testClass2){
					$scope.testClass2 = false;
				} else {
					$scope.testClass2 = true;
				}
			}
			$scope.applyClass3 = function(){
				if($scope.testClass3){
					$scope.testClass3 = false;
				} else {
					$scope.testClass3 = true;
				}
			}
		});

// about view controller
	angular
		.module('Appology')
		.controller('aboutCtrl',function($scope){

		});

//  body controller
	angular
		.module('Appology')
		.controller('BodyCtrl',function ($scope, $location){
			this.bodyBgColor={'background-color':'#ffffff'}

			// nav bar functions
			// adds the active class to the chosen nav item
			this.isActive = function (viewLocation) {
					return viewLocation === $location.path();
			};
			// this lightens the nav items on the dark background of the about page
			this.isAbout = function(bmd){
				return $location.path() === '/about';
			}

		});

// main view controller
	angular
		.module('Appology')
		.controller('MainCtrl', function ($scope, configuration, heroesFactory){
			this.heroes = {};
			this.readMe = false;
			this.orderProp = 'name';
			this.customer = {
				name: 'Naomi',
				address: '1600 Amphitheatre'
			};
			this.gettysburg = 'Four score and seven years ago our fathers brought forth, upon this continent, a new nation, conceived in liberty, and dedicated to the proposition that /"all men are created equal./"';

			var promise = heroesFactory.getHeroes();
			promise.then(function(heroData){
				$scope.heroes = heroData;
			});

			configuration.initialize();

			this.toggleReadme = function(){
				this.readMe = !this.readMe;
			}
		});

// restCalls view controller
	angular
		.module('Appology')
		.controller('restCallsCtrl',function($scope, $routeParams, restCallsFactory) {

			$scope.artist = 'jack johnson';
			var promise = restCallsFactory.getItunesMusic($scope.artist.replace(/ /g, '+'));
			promise.then(function(musicData){
				$scope.iTunes = musicData;
			});

			var promise = restCallsFactory.getOpenNotifySpacePeople();
			promise.then(function(spaceData){
				$scope.spacePeeps = spaceData;
			});

			$scope.author = 'terry pratchett';
			var promise = restCallsFactory.getGoogleBooks($scope.author.replace(/ /g, '+'));
			promise.then(function(bookData){
				$scope.books = bookData;
			});
		});

// colors view controller
	angular
		.module('Appology')
		.controller('colorsCtrl', function ($scope, colorTilesFactory){
			$scope.icons = {};
			var promise = colorTilesFactory.getColors();
			// retrieve a list of potential colors to use for the tiles
			promise.then(function(colorData){
				var colors = colorData;
				var promise = colorTilesFactory.getIcons();
				// retrieve a list of potential icons to use for the tiles
				promise.then(function(iconData){
					var icons = iconData;
					for(var i=0;i<icons.length;i++){
						$scope.icons[i] = {'faName':icons[i].faName,'color':colors[i].color};
					}
				});
			});
		});

	angular
		.module('Appology')
		.controller('FirebaseCtrl', fbCtrl );

		function fbCtrl(firebaseFactory, $firebaseArray){
			var vm = this;
			vm.hoverDelete = -1;
//			vm.recordsExists = true;
			vm.thoughts = {};
			vm.addThought = addThought;
			vm.getThoughts = getThoughts;

			function getThoughts(){
				vm.thoughts = firebaseFactory.getThoughts();
				console.log('vm.thoughts',vm.thoughts);
			}
			function addThought(d){
				var id = firebaseFactory.addThought(d);
//				checkIfRecordsExists();
			}
			vm.getThoughts();
		}

})();
