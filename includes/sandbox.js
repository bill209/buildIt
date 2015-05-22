var exports = module.exports = {};
var Q = require('q');
var FS = require('fs');
var mkdirp = Q.denodeify(require('mkdirp'));

var createRootFolder = function(values){
	var deferred = Q.defer();
	// mkdirp will create all parent folders necessary
	mkdirp(values.rootFolder)
	.then(function(err){
		deferred.resolve( { 'success' : true } )
	}).fail(function(err){
		deferred.reject( { 'err' : err} );
	})
	return deferred.promise;
}

/*	deprecated for readline in input.js
	input:  user input from prompt
	return filename, html
*/
exports.processInput = function(values){
	var deferred = Q.defer();

	var promiseArr = [];
	promiseArr.push(createRootFolder(values));

	Q.all(promiseArr)
	.then(function(z){
		deferred.resolve(z);
	}).fail(function(e){
		console.log('error: ',e);
	})
	return deferred.promise;
};


