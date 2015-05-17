var req = require('./includes/require.js');
var format = require("string-template");
//var request = require("request");
var FS = require('fs');
var Q = require('q');
 var express = require("express");

var schemaUrl = 'http://localhost/repos/buildIt/schema.json';
var tplDataUrl = 'http://localhost/repos/buildIt/tpl_data.json';

var resultsObj = {};
var func = require('./includes/functions.js');

func.getJson(schemaUrl)
	.then(function(schema){
		func.getUserInput(schema)
		.then(function(results){
			func.buildFiles(results)
 			.then(function(data){
 				console.log('data - HTML',data);
 			}).fail(function(e){ console.log('error reading test3.txt: ',e) });

		}).fail(function(e){ console.log('error reading test2.txt: ',e) });

	})
	.fail(function(e){ console.log('error reading test3.txt: ',e) });

function temp(x){
	return x;
}





function exit(){
	console.log('\r\n\r\n\r\n');
	process.exit(code=0);
}

function zzzbuildFiles(){
	var path = 'templates/';
	var queue = [];

	files = ['index.tpl','test1.tpl','test2.tpl'];

	for (var i = 0; i < files.length; i++) {
		readFile(path + files[i])
		.then(changeText)
		.then(outputResults)
		.fail(function (error) {
			console.log('Something went wrong: ' + error.message);
		}).fin(function(){
			console.log('THE END');
		});
	};
}

function readFile(fname){
	var deferred = Q.defer();

	FS.readFile(fname, 'utf8', function (error, text) {
		if (error) {
			deferred.reject(error);
		} else {
			deferred.resolve(text);
		}
	});
	return deferred.promise;
}

var changeText = function (tpl) {
	var d = Q.defer();
	page = format(tpl, resultsObj);
	d.resolve(page);
	return d.promise;
};

var outputResults = function (newpage) {
	var d = Q.defer();
	console.log('*********data********\r\n');
	console.log(newpage);
};


