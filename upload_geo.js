var fs = require('fs');
var pg = require('pg');
var conString = "postgres://postgres:eA_987_Tr@acs2014testing.c3w3zliliagq.us-west-2.rds.amazonaws.com:5432/acs";
var copyFrom = require('pg-copy-streams').from;


pg.connect(conString, function(err, client, done) {

  var stream = client.query(copyFrom('COPY geo FROM STDIN USING DELIMITERS \',\' CSV'));
  var fileStream = fs.createReadStream('temp/file1/g20145de.csv')

  fileStream.pipe(stream);
  fileStream.on('end', done)
  fileStream.on('error', done);
  
  
  });