var exports = module.exports = {};
var Q = require('q');
var prompt = require('prompt');
var request = require("request");
var FS = require('fs');
 var path = require('path');
var jade = require('jade');

/*
	input:  user input from prompt
	return filename, html
*/
exports.buildManyFiles = function(values){
	var deferred = Q.defer();

	var builds = [];
	var filesToBuild = [{ 'fname' : 'TEST.html', 'tplName' : 'test.jade'},{ 'fname' : 'TEST2.html', 'tplName' : 'test.jade'}];

	var dir = 'views/';
	for (var i = 0; i < filesToBuild.length; i++) {
		/* call buildFile with:
				the files to generate: ie  index.html, main.css...,
				name of the template file: ie index.jade...,
				and the user input values from prompt
		*/
		builds.push(this.buildFile( { 'filename' : filesToBuild[i].fname, 'tplName' : dir + filesToBuild[i].tplName, 'values' : values } ));
	};

	var bunchOPromises = Q.all(builds);

	bunchOPromises
	.then(function (results) {
		// this contains an array of the
		deferred.resolve(results);
	}).fail(function(e){
		deferred.reject('buildManyFiles error: ', e);
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
	var deferred = Q.defer();
	FS.readFile(data.tplName, 'utf8', function (err, tplFile) {
		if (err){
			deferred.reject('buildFile error: ' + err);
		} else {
			var fn = CURDIR + '/' + data.tplName;
			var options = { 'filename': fn, 'pretty': '\t'}
			var fn = jade.compile(tplFile, options);
			var html = fn(data.values);
			deferred.resolve({ 'html' : html, 'filename' : data.filename});
		}
	});
	return deferred.promise;
}

/*
	note: using prompt to get data from user
	input: the filename of the schema holding the prompt data
	return: an object holding the input values
*/
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

/*
	input: an array of
		 the filenames to write,
		and the content that goes in the files
	output: an array of success messages - one  for each file written
*/
exports.writeManyFiles = function(data){
	var deferred = Q.defer();

	var builds = [];
	var dir = 'views/';
	for (var i = 0; i < data.length; i++) {
		var fn = __dirname + '/' + data[i].filename;
		builds.push(this.writeFile({ 'filename' : fn, 'html' : data[i].html }));
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

/*
	input: filename of file to write, and the content that goes into it
	data obj = { filename , html }
*/
exports.writeFile = function(data){
	var deferred = Q.defer();
	FS.writeFile(data.filename, data.html, function (err) {
		if (err) {
			deferred.reject('writeFile error: ' + err)
		} else {
			deferred.resolve('file ' + data.filename + ' has been successfully written')
		}
	});
	return deferred.promise;
}

exports.exit = function(msg){
	console.log('\r\n', msg, '\r\n\r\n');
	process.exit(code=0);
}

/*
	input: name of file to read
	output: file contents
*/
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

/*
	not currently in use
*/
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
