var http = require('http');
http.createServer(function (req, res) {
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end('Hello World\n');
}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');

	var prompt = require('prompt');
	var format = require("string-template")
	var deferred = require('deferred');
	var request = require("request")
	var fs = require('fs');

	var file = '';
	var deferred = require('deferred'), getSchema;
	var schema={};
	var url = 'http://localhost/repos/buildIt/schema.json';





// provides the schema via a promise
getSchema = function () {
	var d = deferred();
	request({url: url, json: true}, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			console.log('<-------------------------------->');
			console.log(body.substring(0,30));
			console.log('<-------------------------------->');
			d.resolve(body)
		} else {
			console.log(response.statusCode);
		}
	});
	return d.promise;
};


// provides the schema via a promise
getSchemazzz = function () {
	var d = deferred();

	file='schema2.js';
	fs.readFile(file, 'utf8', function(err, str){
		if(err){
			console.log(err);
		} else {
			d.resolve(str);
		}
	});
	return d.promise;
};

// gets the schema and call the templating process
getSchema().then(function self() {
//	schema=JSON.parse(str);
//	return value;
}).done(function (result) {
console.log('result',result);
//	getUserInput();
});


function getUserInput(){
	prompt.delimiter = ":  ".green;
	prompt.start();
console.log(schema);
	prompt.get(schema, function (err, result) {

	console.log('Command-line input received:');
	console.log('  name: ' + result.name);
	console.log('  password: ' + result.password);
	});
}
