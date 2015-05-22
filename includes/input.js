var Q = require('q');
var exports = module.exports = {};
var readline = require('readline'),
CURDIR = __dirname;

rl = readline.createInterface(process.stdin, process.stdout);
var answers = {};
/*
	no input: yet
	output: return an object with the value: answer pairs
*/
exports.getUserInput = function(){
	var deferred = Q.defer();

	rl.question("name of your app (appology): ", function(answer) {
		answers.appname = answer == "" ? 'appology' : answer;
		var folderName = answers.appname.replace(" ", "_");
		rl.question("your name (billbobb): ", function(answer) {
			answers.author = answer == "" ? 'billbobb' : answer;
			rl.question("app folder (" + folderName + "): ", function(answer) {
				answers.appFolder = answer == "" ? folderName : answer;		// not sure which of these two properties to use, so... create both
				answers.rootFolder = CURDIR  + '/' + answers.appFolder;

				deferred.resolve(answers);
				rl.close();
			});
		});
	});
	return deferred.promise;
};

