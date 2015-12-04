var fs = require('fs');
var pg = require('pg');
var conString = "postgres://postgres:eA_987_Tr@acs2014testing.c3w3zliliagq.us-west-2.rds.amazonaws.com:5432/acs";


var client = new pg.Client(conString);

client.connect();

var query = client.query('CREATE TABLE IF NOT EXISTS geo(FILEID text, STUSAB text, SUMLEVEL text, COMPONENT text, LOGRECNO text, US text, REGION text, DIVISION text, STATECE text, STATE text, COUNTY text, COUSUB text, PLACE text, TRACT text, BLKGRP text, CONCIT text, AIANHH text, AIANHHFP text, AIHHTLI text, AITSCE text, AITS text, ANRC text, CBSA text, CSA text, METDIV text, MACC text, MEMI text, NECTA text, CNECTA text, NECTADIV text, UA text, BLANK1 text, CDCURR text, SLDU text, SLDL text, BLANK2 text, BLANK3 text, ZCTA5 text, SUBMCD text, SDELM text, SDSEC text, SDUNI text, UR text, PCI text, BLANK4 text, BLANK5 text, PUMA5 text, BLANK6 text, GEOID text, NAME text, BTTR text, BTBG text, BLANK7 text)');

query.on('end', function() { client.end(); });