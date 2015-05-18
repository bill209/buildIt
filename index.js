var FS = require('fs');
var Q = require('q');
var func = require('./includes/functions.js');
CURDIR = __dirname;

var schemaUrl = 'http://localhost/repos/buildIt/schema.prompt';
var schemaFile = 'schema.json';
var tplDataUrl = 'http://localhost/repos/buildIt/tpl_data.json';

func.readFile(schemaFile)
	.then(function(schema){
		func.getUserInput(schema)
		.then(function(results){
			func.buildManyFiles(results)
			.then(function(x){
 				func.writeManyFiles(x)
 				.then(function(msg){
					console.log(msg);
 					func.exit('finished\r\n');
 				}).fail(function(e){console.log('1',e) });
 			}).fail(function(e){ console.log('2',e) });

		}).fail(function(e){ console.log('3',e) });
	}).fail(function(e){ console.log('4',e) });


/* files to build

index.html
/css/
	normalize.css
	main.css
/js/
	controllers.js
	main.js
o	db.js
o	functions.js
o	movieAPIs.js
o	svc.js
/views/
	main.html
o	restCalls.html

*/
