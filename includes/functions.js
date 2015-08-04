var exports = module.exports = {};
var Q = require('q');
var prompt = require('prompt');  //  deprecated by readline
var request = require("request");
var FS = require('fs');
var ncp = require('ncp').ncp;
var async = require('async');
var mkdirp = require('mkdirp');

/*
	this copies over all files of a certain type (eg css)
	to a folder
	input: regex for fileset, and destination folder
	output: msg
*/
function copyBaseFileSet(fileSet){
	return function(callback){
		options = { limit : 32, filter : fileSet.regx };
		createPath(fileSet.toFolder)
			.then(function(res){
				ncp('baseFiles/' + fileSet.fromFolder, fileSet.toFolder, options, function (err) {
					var res = null;
					 if (err) {
						console.log('+++ copyBaseFileSet error/r/n', err);
						res = err;
					 }
					callback(res,'successful copyBaseFileSet: ' + fileSet);
				});

			})
	}
}

/*
	this function is used to copy all of the files that
	do not require any templating
	input:  app root folder location
	calls: copyBaseFileSet
	output: array of messages from copyBaseFileSet
*/

exports.copyBaseFiles = function(values){
	var deferred = Q.defer();
	var p = [];

	var fileSets = prepareFileSet(values);

	for (var i = fileSets.length - 1; i >= 0; i--) {
		p.push(copyBaseFileSet(fileSets[i]));
	};

	async.series(p,function(err, results){
		if(err){
			// add: pass error back upstream
			console.log('err: ' + results,err);
		} else {
			deferred.resolve(results);
		}
	});
	return deferred.promise;
}

function prepareFileSet(values){
	var deferred = Q.defer();
	var p = [];
	var fileSets = [
		{ 'regx' : RegExp(/normalize\.css/) , 'fromFolder' : 'css',  'toFolder' : values.rootFolder + '/css'},
//		{ 'regx' : RegExp(/.*\.css/) , 'fromFolder' : 'css',  'toFolder' : values.rootFolder + '/css'},
		{ 'regx' : RegExp(/main\.js/) , 'fromFolder' : 'js',  'toFolder' : values.rootFolder + '/js'},
//		{ 'regx' : RegExp(/svc\.js/) , 'fromFolder' : 'js',  'toFolder' : values.rootFolder + '/js'},
//		{ 'regx' : RegExp(/controllers\.js/) , 'fromFolder' : 'js',  'toFolder' : values.rootFolder + '/js'},
//		{ 'regx' : RegExp(/filters\.js/) , 'fromFolder' : 'js',  'toFolder' : values.rootFolder + '/js'},
		{  'fromFolder' : 'views', 'toFolder' : values.rootFolder + '/views'}
//		{  'fromFolder' : 'js/directives', 'toFolder' : values.rootFolder + '/js/directives'}
	];
	if(values.directives){
//		fileSets.push({  'fromFolder' : 'js/directives', 'toFolder' : values.rootFolder + '/js/directives'});
//		fileSets.push({ 'regx' : RegExp(/clock\.js/) , 'fromFolder' : 'js/directives',  'toFolder' : values.rootFolder + '/js/directives'});
//		fileSets.push({ 'regx' : RegExp(/myCustomer\.js/) , 'fromFolder' : 'js/directives',  'toFolder' : values.rootFolder + '/js/directives'});
		fileSets.push({ 'regx' : RegExp(/filters\.js/) , 'fromFolder' : 'js',  'toFolder' : values.rootFolder + '/js'});
	}
	if(values.filters == 'y'){
		fileSets.push({ 'regx' : RegExp(/filters\.js/) , 'fromFolder' : 'js',  'toFolder' : values.rootFolder + '/js'});
	}
	if(values.restCalls == 'y'){
		fileSets.push({ 'regx' : RegExp(/flip\.css/) , 'fromFolder' : 'css',  'toFolder' : values.rootFolder + '/css'});
//		fileSets.push({'fromFolder' : 'css/', 'toFolder' : values.rootFolder + '/css'});
		fileSets.push({ 'regx' : RegExp(/icons\.json/) , 'fromFolder' : 'data',  'toFolder' : values.rootFolder + '/data'});
//		fileSets.push({ 'regx' : RegExp(/toggleClass\.js/) , 'fromFolder' : 'js/directives',  'toFolder' : values.rootFolder + '/js/directives'});
	}
	if(values.dataBinding == 'y'){
		fileSets.push({ 'regx' : RegExp(/heroes\.json/) , 'fromFolder' : 'data',  'toFolder' : values.rootFolder + '/data'})
	}
	if(values.fontawesome == 'y'){
		fileSets.push({ 'regx' : RegExp(/colors\.json/) , 'fromFolder' : 'data',  'toFolder' : values.rootFolder + '/data'});
		fileSets.push({ 'regx' : RegExp(/tile\.css/) , 'fromFolder' : 'css',  'toFolder' : values.rootFolder + '/css'})
	}
	return fileSets;
}

/*
	NOTE: DEPRECATED BY READLINE
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
	var dir = 'tpl/';
	for (var i = 0; i < data.length; i++) {
		var fn = data[i].filename;
		builds.push(this.writeFile({ 'filename' : fn, 'html' : data[i].html }));
	};

	var bunchOPromises = Q.all(builds);

	bunchOPromises
	.then(function (results) {
		deferred.resolve(results);
	}).fail(function(e){
		deferred.reject('writeManyFiles error: ' + e);
	});
	return deferred.promise;
};

/*
	input: filename of file to write, and the content that goes into it
	data obj = { filename , html }
*/
exports.writeFile = function(data){
	var deferred = Q.defer();

	createPath(data.filename)
		.then(function(res){
			FS.writeFile(data.filename, data.html, function (err,r) {
				if (err) {
					deferred.reject('writeFile error: ' + err)
				} else {
					deferred.resolve('file ' + data.filename + ' has been successfully written')
				}
			});
		})
	return deferred.promise;
}

function createPath(fname){
	var deferred = Q.defer();

	// remove filename off the end of the path/filename string
	// existence of filename dependent on finding a '.' after the last '/'
	if(fname.substring(fname.lastIndexOf('/')).indexOf('.') != -1){
		var dir = fname.substring(0,fname.lastIndexOf('/'));
	} else {
		var dir = fname;
	}

	mkdirp(dir, function (err) {
		if (err) {
			console.log('createPath error:', err);
		} else {
			deferred.resolve('createPath successfule');
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
