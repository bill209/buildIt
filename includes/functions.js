var exports = module.exports = {};
var Q = require('q');
var prompt = require('prompt');
var request = require("request");
var FS = require('fs');
 var path = require('path');
var jade = require('jade');

exports.buildManyFiles = function(values){
	var deferred = Q.defer();

	var builds = [];
	var filesToBuild = ['test.jade', 'test.jade'];
	var dir = 'views/';
	for (var i = 0; i < filesToBuild.length; i++) {
		builds.push(this.buildFile(dir + filesToBuild[i], values));
	};

	var bunchOPromises = Q.all(builds);

	bunchOPromises
	.then(function (results) {
		deferred.resolve(results);
	}).fail(function(e){
		deferred.reject('buildManyFiles error: ', e);
	});
	return deferred.promise;
};

exports.buildFile = function(file, values){
	var deferred = Q.defer();

	FS.readFile(file, 'utf8', function (err, data) {
		if (err){
			deferred.reject('buildFile error: ' + err);
		} else {
			var options = { 'filename': path.join(__dirname, 'layout.jade'), 'pretty': '\t'}
			var fn = jade.compile(data,options);
			var html = fn(values);
			deferred.resolve(html + 'XXXX:' + file);
		}
	});
	return deferred.promise;
}


exports.getJson = function (fname){
	var deferred = Q.defer();
	request({url: fname}, function (err, response, result) {
		if (!err && response.statusCode == 200) {
			deferred.resolve(result);
		} else {
			deferred.reject('getJson error: ',response.statusCode);
		}
	});
	return deferred.promise;
};

exports.getUserInput = function(schema){
	var deferred = Q.defer();

	prompt.delimiter = ":  ".green;
	prompt.start();

	prompt.get(schema, function (err, result) {
		if (!err) {
			deferred.resolve(result);
		} else {
			deferred.reject('getUserInput error: ',response.statusCode);
		}
	});
	return deferred.promise;
}

exports.writeFile = function(html){
	var deferred = Q.defer();
	fname = 'test2.html';
	FS.writeFile(fname, html, function (err) {
		if (err) {
			deferred.reject('writeFile error: ' + err)
		} else {
			deferred.resolve('\r\n\r\nfile ' + fname + ' has been successfully written')
		}
	});
	return deferred.promise;
}

exports.exit = function(msg){
	console.log('\r\n', msg, '\r\n\r\n');
	process.exit(code=0);
}

exports.readFile = function(fname){
	var deferred = Q.defer();

	FS.readFile(fname, 'utf8', function (err, contents) {
		if (err){
			deferred.reject('readFile error: ' + err);
		} else {
			deferred.resolve(eval(contents));
		}
	});
	return deferred.promise;
}
