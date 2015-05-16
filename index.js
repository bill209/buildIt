var http = require('http');
http.createServer(function (req, res) {
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end('Hello World\n');
}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');

var prompt = require('prompt');
var format = require("string-template")
var request = require("request")
var FS = require('fs');
var Q = require('q');

var schemaUrl = 'http://localhost/repos/buildIt/schema.json';
var tplDataUrl = 'http://localhost/repos/buildIt/tpl_data.json';
var resultsObj = {};
var schema = getJson(schemaUrl);

var jade = require('jade');

var tpl = 'h3 =d.title
p = 'hi ' + d.content
';

var d = { 'title' : 'is it working?', 'content' : 'world' };
// compile
var fn = jade.compile(tpl);
var html = fn(locals);
console.log('html',html);
// render
//var html = jade.render('string of jade', merge(options, locals));

// renderFile
//var html = jade.renderFile('filename.jade', merge(options, locals));



function getJson(fname){
	request({url: fname}, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			var schema  = JSON.parse(body);
			getUserInput(schema);
		} else {
			console.log('Error: ',response.statusCode);
		}
	});
}

function getUserInput(schema){
	prompt.delimiter = ":  ".green;
	prompt.start();
	prompt.get(schema, function (err, result) {
		resultsObj = result;
//		buildFiles();
	});
}

function exit(){
	console.log('\r\n\r\n\r\n');
	process.exit(code=0);
}

function buildFiles(){
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
