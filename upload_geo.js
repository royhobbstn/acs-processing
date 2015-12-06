var fs = require('fs');
var pg = require('pg');

var obj = JSON.parse(fs.readFileSync('connection.json', 'utf8'));

var conString = "postgres://"+obj.name+":"+obj.password+"@"+obj.host+":"+obj.port+"/"+obj.db;

var copyFrom = require('pg-copy-streams').from;


//each geo file contains all GEOGRAPHIES for the state.  No need to load geos from both 'AllTractsBG' and 'AllOtherGeos'

pg.connect(conString, function(err, client, done) {

    var stream = client.query(copyFrom('COPY data.geo FROM STDIN USING DELIMITERS \',\' CSV'));
    var fileStream = fs.createReadStream('temp/file1/g20145de.csv')

    fileStream.pipe(stream);
    fileStream.on('end', done)
    fileStream.on('error', done);

});

