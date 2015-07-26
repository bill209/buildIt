CURDIR = __dirname;

var input = require('./includes/input.js');
var tpl = require('./includes/tpl.js');
var func = require('./includes/functions.js');
var sbox = require('./includes/sandbox.js');
var schemaFile = 'schema.prompt';
var tplDataUrl = 'http://localhost/repos/buildIt/tpl_data.json';
results = {};

// func.readFile(schemaFile)												// read the input schema - presently deprecated
// 	.then(function(schema){
		input.getUserInput()											// get user input from stdin
		.then(function(userInput){
			results = userInput;  // converting to global to pass down the line
			console.log('results',results);
			sbox.processInput(results)									// process the user input
			.then(function(msg){
				func.copyBaseFiles(results)
				.then(function(msg){
					tpl.buildManyFiles(results)							// create HTML from templates and schema
					.then(function(tplData){
		 				func.writeManyFiles(tplData)								// create files from the HTML
		 				.then(function(msg){
		 					func.exit('finished\r\n');						// all done  : )
		 				}).fail(function(e){console.log('1',e) });
		 			}).fail(function(e){ console.log('2',e) });
				}).fail(function(e){ console.log('3',e) });
			}).fail(function(e){ console.log('44',e) });
		}).fail(function(e){ console.log('5',e) });
//	}).fail(function(e){ console.log('6',e) });


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
