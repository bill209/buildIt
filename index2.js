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
var Q = require('q');

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
	console.log('buildFiles');
	processTemplate('templates/test1.tpl', result);
}
// readFileUsingPromises.js
function processTemplate(fname, options){
	Q.nfcall(fs.readFile, fname, "utf-8")
	.then(function(tpl) {
		var page = format(tpl,options);
		console.log('page\n\r',page);
	})
	.fail(function(err) {
			console.error('Error received:', err);
	})
	.done();
}

function processTemplate222(pathToFile) {
	return Q.nfcall(fs.readFile, pathToFile, "utf-8")
	.then(function(tpl) {
			console.log(tpl);
//				return [Q.nfcall(fs.readFile, 'templates/test2.tpl', "utf-8")];
			var options = { headers: {'User-Agent': 'MyAgent'} }; // github requires user agent string
			return [Q.nfcall(request, 'https://api.github.com/repos/'+repo+'/collaborators', options),
							Q.nfcall(request, 'https://api.github.com/repos/'+repo+'/commits', options)];


	})
	.spread(function(collaboratorsRes, commitsRes) {
			return [collaboratorsRes[1], commitsRes[1]];  // return the response body
	})
	.fail(function(err) {
			console.error('***errror***', err)
			return err;
	});
}
// actual call
// processTemplate222('templates/test1.tpl').then(function(responses) {
// 	console.log('responses',responses);
// 		// do something with the responses
// });




function getResults(pathToFile) {
	return Q.nfcall(fs.readFile, pathToFile, "utf-8")
	.then(function(repo) {
			var options = { headers: {'User-Agent': 'MyAgent'} }; // github requires user agent string
			return [Q.nfcall(request, 'https://api.github.com/repos/'+repo+'/collaborators', options),
						Q.nfcall(request, 'https://api.github.com/repos/'+repo+'/commits', options)];
	})
	.spread(function(collaboratorsRes, commitsRes) {
			return [collaboratorsRes[1], commitsRes[1]];  // return the response body
	})
	.fail(function(err) {
			console.error(err)
			return err;
	});
}

// actual call
// getResults('templates/test1.tpl').then(function(responses) {
// 	console.log('responses',responses);
// 		// do something with the responses
// });

