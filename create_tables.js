var fs = require('fs');
var pg = require('pg');


var obj = JSON.parse(fs.readFileSync('connection.json', 'utf8'));

var conString = "postgres://"+obj.name+":"+obj.password+"@"+obj.host+":"+obj.port+"/"+obj.db;


 
var contents = fs.readFileSync('createtables.sql', 'utf8');
//console.log(contents);

//create duplicate text with moe
// var res = contents.replace(/EXISTS /g, "EXISTS moe");
// res = res.replace(/CONSTRAINT /g, "CONSTRAINT moe");


var client = new pg.Client(conString);

client.connect();

var query = client.query(contents);

query.on('end', function() { client.end(); });