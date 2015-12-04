var fs = require('fs');
var pg = require('pg');
var conString = "postgres://postgres:eAs456!!$@acsprocessing.c3w3zliliagq.us-west-2.rds.amazonaws.com:5432/acs";
var copyFrom = require('pg-copy-streams').from;


//each geo file contains all GEOGRAPHIES for the state.  No need to load geos from both 'AllTractsBG' and 'AllOtherGeos'

pg.connect(conString, function(err, client, done) {

    var stream = client.query(copyFrom('COPY geo FROM STDIN USING DELIMITERS \',\' CSV'));
    var fileStream = fs.createReadStream('temp/file1/g20145de.csv')

    fileStream.pipe(stream);
    fileStream.on('end', done)
    fileStream.on('error', done);

});

