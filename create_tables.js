var fs = require('fs');
var pg = require('pg');
var conString = "postgres://postgres:eAs456!!$@acsprocessing.c3w3zliliagq.us-west-2.rds.amazonaws.com:5432/acs";


 
var contents = fs.readFileSync('createtables.sql', 'utf8');
//console.log(contents);

//create duplicate text with moe
var res = contents.replace(/EXISTS /g, "EXISTS moe");
res = res.replace(/CONSTRAINT /g, "CONSTRAINT moe");


var client = new pg.Client(conString);

client.connect();

var query = client.query(contents);

query.on('end', function() { client.end(); });