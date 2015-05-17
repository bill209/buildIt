var req = require('./includes/require.js');
var FS = require('fs');
var Q = require('q');
var express = require("express");
var func = require('./includes/functions.js');

var schemaUrl = 'http://localhost/repos/buildIt/schema.json';
var tplDataUrl = 'http://localhost/repos/buildIt/tpl_data.json';

func.getJson(schemaUrl)
	.then(function(schema){
		func.getUserInput(schema)
		.then(function(results){
			func.buildFile(results)
 			.then(function(html){
 				func.writeFile(html)
 				.then(function(msg){
					console.log(msg);
 					func.exit('finished\r\n');
 				}).fail(function(e){console.log('1',e) });
 			}).fail(function(e){ console.log('2',e) });
		}).fail(function(e){ console.log('3',e) });
	}).fail(function(e){ console.log('4',e) });
