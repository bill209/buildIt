(function() {
	'use strict';
//  body controller
	angular
		.module('{{ values.appName}}')
		.controller('BodyCtrl',bodyCtrl);

{% if values.constant == 'y' %}
	angular
		.module('{{ values.appName}}')
		.constant('QUOTE',{ 'quote': 'The only thing that is constant is change.', 'author': 'Heraclitus'});
{% endif %}


	function bodyCtrl ($scope, $location){
		var vm = this;
		vm.bodyBgColor={'background-color':'#ffffff'}
		vm.isActive = isActive;
		vm.isAbout = isAbout;
		// nav bar functions
		// adds the active class to the chosen nav item
		function isActive(viewLocation) {
				return viewLocation === $location.path();
		};
		// this lightens the nav items on the dark background of the about page
		function isAbout(bmd){
			return $location.path() === '/about';
		}
	};

// main view controller
	angular
		.module('{{ values.appName}}')
		.controller('MainCtrl', mainCtrl);

	function mainCtrl($scope{% if values.constant == 'y' %}, QUOTE {% endif%}{% if values.configuration == 'y' %}, configuration {% endif%}{% if values.dataBinding == 'y' %}, heroesFactory {% endif%}){
		var vm = this;
		// readme content
		vm.readMe = false;
		vm.toggleReadme = toggleReadme;

		function toggleReadme(){
			this.readMe = !this.readMe;
		}
{% if values.dataBinding == 'y' %}
			// data binding
			vm.orderProp = 'name';
			vm.heroes = {};
			var promise = heroesFactory.getHeroes();
			promise.then(function(heroData){
				vm.heroes = heroData;
			});
{% endif %}
{% if values.filters == 'y' %}
			// filters
			vm.gettysburg = 'Four score and seven years ago our fathers brought forth, upon this continent, a new nation, conceived in liberty, and dedicated to the proposition that /"all men are created equal./"';
{% endif %}
{% if values.directives == 'y' %}
			// directives
			vm.customer = {
				name: 'Naomi',
				address: '1600 Amphitheatre'
			};
{% endif %}
{% if values.configuration == 'y' %}
			vm.message = configuration.initialize();
{% endif %}

{% if values.constant == 'y' %}
			vm.quote = {};
			vm.quote = QUOTE;
{% endif %}

	};

{% if values.restCalls == 'y' %}
// restCalls view controller
	angular
		.module('{{ values.appName}}')
		.controller('RestCallsCtrl', restCallsCtrl);

	function restCallsCtrl($scope, $routeParams, restCallsFactory) {
		var vm = this;
		vm.artist = 'jack johnson';
		var promise = restCallsFactory.getItunesMusic(vm.artist.replace(/ /g, '+'));
		promise.then(function(musicData){
			vm.iTunes = musicData;
		});

		var promise = restCallsFactory.getOpenNotifySpacePeople();
		promise.then(function(spaceData){
			vm.spacePeeps = spaceData;
		});

		vm.author = 'terry pratchett';
		var promise = restCallsFactory.getGoogleBooks(vm.author.replace(/ /g, '+'));
		promise.then(function(bookData){
			vm.books = bookData;
		});
	};
{% endif %}

{% if values.fontawesome == 'y' %}
// colors view controller
	angular
		.module('{{ values.appName}}')
		.controller('ColorsCtrl', colorsCtrl);

	function colorsCtrl($scope, colorTilesFactory){
		var vm = this;

		vm.icons = {};
		var promise = colorTilesFactory.getColors();
		// retrieve a list of potential colors to use for the tiles
		promise.then(function(colorData){
			var colors = colorData;
			var promise = colorTilesFactory.getIcons();
			// retrieve a list of potential icons to use for the tiles
			promise.then(function(iconData){
				var icons = iconData;
				for(var i=0;i<icons.length;i++){
					vm.icons[i] = {'faName':icons[i].faName,'color':colors[i].color};
				}
			});
		});
	};
{% endif %}

{% if values.firebase == 'y' %}
	// firebase controller
	angular
		.module('{{ values.appName}}')
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
{% endif %}
})();
