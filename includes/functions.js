var Q = require('q');
var prompt = require('prompt');
var request = require("request");
var FS = require('fs');
 var path = require('path');
var jade = require('jade');

module.exports.getJson = function (fname){
	var deferred = Q.defer();
	request({url: fname}, function (err, response, result) {
		if (!err && response.statusCode == 200) {
			var schema  = JSON.parse(result);
			deferred.resolve(schema);
		} else {
			deferred.reject('Error: ',response.statusCode);
		}
	});
	return deferred.promise;
};

module.exports.getUserInput = function(schema){
	var deferred = Q.defer();

	prompt.delimiter = ":  ".green;
	prompt.start();
	prompt.get(schema, function (err, result) {
		if (!err) {
			deferred.resolve(result);
		} else {
			deferred.reject('Error: ',response.statusCode);
		}
	});
	return deferred.promise;
}

module.exports.buildFiles = function(dObj){
	var deferred = Q.defer();

	FS.readFile('views/layout.jade', 'utf8', function (err, data) {
		if (err){
			deferred.reject('error: ' + err);
		} else {
			var options = { 'filename': path.join(__dirname, 'layout.jade'), 'pretty': '\t'}
			var fn = jade.compile(data,options);
			var html = fn(dObj);
			console.log('html\r\n',html);
			deferred.resolve(html);
		}
	});
	return deferred.promise;
}
