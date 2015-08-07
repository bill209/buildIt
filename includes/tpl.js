var exports = module.exports = {};
var Q = require('q');
var swig  = require('swig');
var async = require('async');

/*
	input:  user input from prompt
	return filename, html
*/
exports.buildManyFiles = function(values){
	var deferred = Q.defer();

	var builds = [];
	var filesToBuild = [
		{'fname' : 'index.html', 'tplName' : 'index.html'},
		{'fname' : 'views/main.html', 'tplName' : 'main.html'},
		{'fname' : 'css/main.css', 'tplName' : 'main.css'},
		{'fname' : 'js/controllers.js', 'tplName' : 'controllers.js'},
		{'fname' : 'js/main.js', 'tplName' : 'main.js'}
	];
	if(values.configuration == 'y' || values.dataBinding == 'y' || values.fontawesome == 'y' || values.restCalls == 'y' || values.firebase == 'y'){
		filesToBuild.push({'fname' : 'js/svc.js', 'tplName' : 'svc.js'});
	}
	if(values.directives == 'y'){
		filesToBuild.push({'fname' : 'js/directives/myCustomer.js', 'tplName' : 'myCustomer.js'});
		filesToBuild.push({'fname' : 'js/directives/clock.js', 'tplName' : 'clock.js'});
	}
	if(values.directives == 'y' || values.filters == 'y'){
		filesToBuild.push({'fname' : 'js/filters.js', 'tplName' : 'filters.js'})
	}
	if(values.restCalls == 'y'){
		filesToBuild.push({'fname' : 'views/restCalls.html', 'tplName' : 'restCalls.html'})
	}
	var tplDir = 'tpl/';
	for (var i = 0; i < filesToBuild.length; i++) {
		/* call buildFile with:
				the files to generate: ie  index.html, main.css...,
				name of the template file: ie index.jade...,
				and the user input values from prompt
		*/
		builds.push(buildFile({
			'filename' : values.rootFolder + '/' + filesToBuild[i].fname,
			'tplName' : tplDir + filesToBuild[i].tplName,
			'values' : values
		} ));
	};

	async.series(builds,function(err, results){
		deferred.resolve(results);
	});

	return deferred.promise;
};

/*
	input:
		files to generate, name of the template file, user input values
	return:
		name of files to generate,
		and the content that will go inside those files
*/
function buildFile(data){
	return function(callback){
		var deferred = Q.defer();
		var template = swig.compileFile(data.tplName);
		var output = template(data);
		callback(null,{ 'html' : output, 'filename' : data.filename});
	}
}
