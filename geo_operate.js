var fs = require('fs');
var pg = require('pg');
var conString = "postgres://postgres:eAs456!!$@acsprocessing.c3w3zliliagq.us-west-2.rds.amazonaws.com:5432/acs";



var client = new pg.Client(conString);

client.connect();

var query = client.query('ALTER TABLE geo DROP COLUMN fileid');

var query2 = client.query('UPDATE geo SET stusab=lower(stusab)');

var query3 = client.query('ALTER TABLE geo ADD geonum bigint'); //crazy geoid creation

query3.on('end', function() { client.end(); });