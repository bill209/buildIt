var exports = module.exports = {};
var Q = require('q');
var swig  = require('swig');

/*
	input:  user input from prompt
	return filename, html
*/
exports.buildManyFiles = function(values){
	var deferred = Q.defer();

	var builds = [];
	var filesToBuild = [
		{'fname' : 'index.html', 'tplName' : 'index.html'},
		{'fname' : 'css/main.css', 'tplName' : 'main.css'}
	];
	var tplDir = 'tpl/';
	for (var i = 0; i < filesToBuild.length; i++) {
		switch(filesToBuild[i]) {
		case 'main.css':
				break;
		case 'n':
				console.log('ugh');
				break;
		default:
			//console.log('default code block');
		}
		/* call buildFile with:
				the files to generate: ie  index.html, main.css...,
				name of the template file: ie index.jade...,
				and the user input values from prompt
		*/
		builds.push(this.buildFile( { 'filename' : values.rootFolder + '/' + filesToBuild[i].fname, 'tplName' : tplDir + filesToBuild[i].tplName, 'values' : values } ));
	};
	var bunchOPromises = Q.all(builds);
	bunchOPromises
	.then(function (results) {
		// this contains an array of the
		deferred.resolve(results);
	}).fail(function(e){
		deferred.reject('buildManyFiles error: ' + e);
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
exports.buildFile = function(data){
console.log('data',data);	
	var deferred = Q.defer();
	var template = swig.compileFile(data.tplName);
	var output = template(data);
	deferred.resolve({ 'html' : output, 'filename' : data.filename});
	return deferred.promise;
}