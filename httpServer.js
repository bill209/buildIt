//create an app server
var express = require("express");
var app = express();
//set path to the views (template) directory
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

//set path to static files
app.use(express.static(__dirname + '/css/'));

function User(name, email) {
  this.name = name;
  this.email = email;
}

var d = { 'title' : 'Angular App' };

d.users = [
    new User('tj', 'tj@vision-media.ca')
  , new User('ciaran', 'ciaranj@gmail.com')
  , new User('aaron', 'aaron.heckmann+github@gmail.com')
];

app.get('/', function(req, res){
  res.render('index', { d:d });
});
//listen on localhost:3000
app.listen(3000);
