var input = require('./includes/input.js');
var func = require('./includes/functions.js');
var sbox = require('./includes/sandbox.js');
CURDIR = __dirname;

var schemaFile = 'schema.prompt';
var tplDataUrl = 'http://localhost/repos/buildIt/tpl_data.json';
results = {};

func.readFile(schemaFile)												// read the input schema - presently deprecated
	.then(function(schema){
		input.getUserInput()											// get user input from stdin
		.then(function(x){
			results = x;  // converting to global to pass down the line
			sbox.processInput(results)									// process thie user input
			.then(function(y){
				func.buildManyFiles(results)							// create HTML from templates and schema
				.then(function(z){
	 				func.writeManyFiles(z)								// create files from the HTML
	 				.then(function(msg){
						console.log(msg);
	 					func.exit('finished\r\n');						// all done  : )
	 				}).fail(function(e){console.log('1',e) });
	 			}).fail(function(e){ console.log('2',e) });
			}).fail(function(e){ console.log('3',e) });
		}).fail(function(e){ console.log('4',e) });
	}).fail(function(e){ console.log('5',e) });


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
