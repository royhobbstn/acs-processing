/*jslint node: true */
"use strict";

var fs = require('fs');
var pg = require('pg');

module.exports = function(filesEEG, winston) {

    var obj = JSON.parse(fs.readFileSync('connection.json', 'utf8'));

    var conString = "postgres://" + obj.name + ":" + obj.password + "@" + obj.host + ":" + obj.port + "/" + obj.db;


    var contents = fs.readFileSync('scaffold.sql', 'utf8');
    //console.log(contents);

    //create duplicate text with moe
    var res = contents.replace(/EXISTS data./g, "EXISTS data.moe");
    res = res.replace(/CONSTRAINT /g, "CONSTRAINT moe");


    var client = new pg.Client(conString);

    client.connect();

    var query = client.query('CREATE SCHEMA data AUTHORIZATION postgres; CREATE SCHEMA search AUTHORIZATION postgres; CREATE TABLE IF NOT EXISTS data.geo(FILEID text, STUSAB text, SUMLEVEL text, COMPONENT text, LOGRECNO text, US text, REGION text, DIVISION text, STATECE text, STATE text, COUNTY text, COUSUB text, PLACE text, TRACT text, BLKGRP text, CONCIT text, AIANHH text, AIANHHFP text, AIHHTLI text, AITSCE text, AITS text, ANRC text, CBSA text, CSA text, METDIV text, MACC text, MEMI text, NECTA text, CNECTA text, NECTADIV text, UA text, BLANK1 text, CDCURR text, SLDU text, SLDL text, BLANK2 text, BLANK3 text, ZCTA5 text, SUBMCD text, SDELM text, SDSEC text, SDUNI text, UR text, PCI text, BLANK4 text, BLANK5 text, PUMA5 text, BLANK6 text, GEOID text, NAME text, BTTR text, BTBG text, BLANK7 text, CONSTRAINT geo_pkey PRIMARY KEY (stusab, logrecno));');

    var query2 = client.query(contents);

    //trick to add moe tables
    var query3 = client.query(res);

    query3.on('end', function() {
        client.end();
            winston.info('end scaffolding');
      filesEEG.emit('create_meta');
    });

};