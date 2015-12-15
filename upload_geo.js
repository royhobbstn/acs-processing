/*jslint node: true */
"use strict";

var fs = require('fs');
var pg = require('pg');

module.exports = function(st_string, filesEEG, winston) {

  console.log('uploading geo files');

    var j; //loop var
    var i; //loop var

    var countcompleted=0;
  
    var states = st_string.split(",");
    if (st_string === '') {
        states = [];
    }

    //no state arguments.  end
    if (states.length === 0) {
        console.log('missing state argument.  program exiting');
            winston.info('missing state argument.  program exiting');
        process.exit();
    }

    //check state code validity
    for (j = 0; j < states.length; j = j + 1) {
        if (states[j] === "al" || states[j] === "ak" || states[j] === "az" || states[j] === "ar" || states[j] === "ca" || states[j] === "co" || states[j] === "ct" || states[j] === "de" || states[j] === "dc" || states[j] === "fl" || states[j] === "ga" || states[j] === "hi" || states[j] === "id" || states[j] === "il" || states[j] === "in" || states[j] === "ia" || states[j] === "ks" || states[j] === "ky" || states[j] === "la" || states[j] === "me" || states[j] === "md" || states[j] === "ma" || states[j] === "mi" || states[j] === "mn" || states[j] === "ms" || states[j] === "mo" || states[j] === "mt" || states[j] === "ne" || states[j] === "nv" || states[j] === "nh" || states[j] === "nj" || states[j] === "nm" || states[j] === "ny" || states[j] === "nc" || states[j] === "nd" || states[j] === "oh" || states[j] === "ok" || states[j] === "or" || states[j] === "pa" || states[j] === "pr" || states[j] === "ri" || states[j] === "sc" || states[j] === "sd" || states[j] === "tn" || states[j] === "tx" || states[j] === "us" || states[j] === "ut" || states[j] === "vt" || states[j] === "va" || states[j] === "wa" || states[j] === "wv" || states[j] === "wi" || states[j] === "wy" || states[j] === "all") {
            //valid state
        } else {
            console.log('one or more of your state codes are not valid');
                      winston.info('one or more of your state codes are not valid');
            process.exit();
        }

        if (states[j] === "all") {
            states = ["al", "ak", "az", "ar", "ca", "co", "ct", "de", "dc", "fl", "ga", "hi", "id", "il", "in", "ia", "ks", "ky", "la", "me", "md", "ma", "mi", "mn", "ms", "mo", "mt", "ne", "nv", "nh", "nj", "nm", "ny", "nc", "nd", "oh", "ok", "or", "pa", "pr", "ri", "sc", "sd", "tn", "tx", "us", "ut", "vt", "va", "wa", "wv", "wi", "wy"];
            break;
        }

    } //end j loop


    var obj = JSON.parse(fs.readFileSync('connection.json', 'utf8'));

    var conString = "postgres://" + obj.name + ":" + obj.password + "@" + obj.host + ":" + obj.port + "/" + obj.db;

    var copyFrom = require('pg-copy-streams').from;


    //each geo file contains all GEOGRAPHIES for the state.  No need to load geos from both 'AllTractsBG' and 'AllOtherGeos'

    function dumpgeo(state) {
        pg.connect(conString, function(err, client, done) {

            var stream = client.query(copyFrom('COPY data.geo FROM STDIN USING DELIMITERS \',\' CSV'));
            var fileStream = fs.createReadStream('temp/file1/g20145' + state + '.csv')
            fileStream.on('end', done);
            fileStream.on('end', function(){
              countcompleted++;
              console.log(state + ' geo uploaded.');
              winston.info(state + ' geo uploaded.');
                  if(countcompleted===states.length){
        //this is bad - but since cant get callback to work on pg query
        console.log('uploading geo files completed');
                    winston.info('uploading geo files completed');
        filesEEG.emit('upload_files');
        //go to upload files (almost) immediately.  *SHOULD* be okay because files will always take longer to load than geo. Right?  Right???
      }
            })
            fileStream.on('error', done);
            fileStream.pipe(stream);

                    
        });
    }

    for (i = 0; i < states.length; i = i + 1) {
        dumpgeo(states[i]);

    }



};