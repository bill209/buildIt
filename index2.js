var http = require('http');
http.createServer(function (req, res) {
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end('Hello World\n');
}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');

var prompt = require('prompt');
var format = require("string-template")
var request = require("request")
var fs = require('fs');
var q = require('q');

var url = 'http://localhost/repos/buildIt/schema.json';

request({url: url}, function (error, response, body) {
	if (!error && response.statusCode == 200) {
		var schema  = JSON.parse(body);
		getUserInput(schema);
	} else {
		console.log(response.statusCode);
	}
});

function getUserInput(schema){
	prompt.delimiter = ":  ".green;
	prompt.start();
	prompt.get(schema, function (err, result) {
		buildFiles(result);
	});
}

function exit(){
	console.log('\r\n\r\n\r\n');
	process.exit(code=0);
}

function buildFiles(result){
	var path = 'templates/';
	var queue = [];

	files = ['index.tpl','test1.tpl','test2.tpl'];

	for (var i = files.length - 1; i >= 0; i--) {
		queue.push(readFile(path + files[i]));
	};

	q.all(queue).then(function(ful) {
		console.log('fulfilled', ful);
	}, function(rej) {
		console.log('rejected', rej);
	}).fail(function(err) {
		console.log('fail', err);
	}).fin(function() {
		console.log('finally');
		exit();
	});
}


function readFile(fname){
	var deferred = q.defer();

	fs.readFile(fname, 'utf8', function (error, text) {
		if (error) {
			deferred.reject(error);
		} else {
			deferred.resolve(text);
		}
	});
	return deferred.promise;
}
