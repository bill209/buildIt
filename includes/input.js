var Q = require('q');
var exports = module.exports = {};
var readline = require('readline'),

rl = readline.createInterface(process.stdin, process.stdout);
var answers = {};
/*
	no input: yet
	output: return an object with the value: answer pairs
*/
exports.getUserInput = function(){
 var deferred = Q.defer();

	rl.question("take defaults? (y): ", function(answer) {
		var skippy = answer == "" ? 'y' : answer;
if(skippy == 'y') {

	answers.appName = 'appology';
	answers.author = 'billbobb';
	answers.appFolder = 'appology';
	answers.rootFolder = CURDIR + '/newApp/' + answers.appFolder;
	answers.dataBinding = 'y';
	answers.restCalls = 'y';
	answers.bootstrap = 'y';
	answers.firebase = 'y';
	answers.fontawesome = 'y';
	deferred.resolve(answers);
	rl.close();

} else {
	rl.question("name of your app (appology): ", function(answer) {
		answers.appName = answer == "" ? 'appology' : answer;
		var folderName = answers.appName.replace(" ", "_");
		rl.question("your name (billbobb): ", function(answer) {
			answers.author = answer == "" ? 'billbobb' : answer;
			rl.question("app folder (" + folderName + "): ", function(answer) {
				answers.appFolder = answer == "" ? folderName : answer;		// not sure which of these two properties to use, so... create both
				answers.rootFolder = CURDIR  + '/newApp/' + answers.appFolder;
				rl.question("data binding (y): ", function(answer) {
					answers.dataBinding = answer == "" ? 'y' : answer;
					rl.question("include REST calls (y): ", function(answer) {
						answers.restCalls = answer == "" ? 'y' : answer;

						rl.question("include bootstrap (y): ", function(answer) {
							answers.bootstrap = answer == "" ? 'y' : answer;

							rl.question("include firebase (y): ", function(answer) {
								answers.firebase = answer == "" ? 'y' : answer;


								rl.question("include font awesome (y): ", function(answer) {
									answers.fontawesome = answer == "" ? 'y' : answer;


										deferred.resolve(answers);
										rl.close();

								});
							});
						});
					});
				});
			});
		});
	});

}  // else
});

	return deferred.promise;
};

