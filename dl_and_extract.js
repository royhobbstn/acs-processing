/*jslint node: true */
"use strict";

var request = require('request');
var fs = require('fs');
var mkdirp = require('mkdirp');
var unzip = require('unzip');


module.exports = function(st_string, filesEEG, winston) {

    var unzippedcount = 0;
    var maxunzipped = 0;

    //create temp directories
    mkdirp('temp', function(err) {

        // path was created unless there was error
        if (err) {
            console.log("Error:" + err);
        } else {
            console.log('temp directory created');
            mkdirp('temp/file1', function(err) {
                if (err) {
                    console.log("Error:" + err);
                } else {
                    console.log('file1 directory created');
                }
            });
            mkdirp('temp/file2', function(err) {
                if (err) {
                    console.log("Error:" + err);
                } else {
                    console.log('file2 directory created');
                }
            });
        }

    });

    var j; //loop var
    var i; //loop var

    var states = st_string.split(",");
    if (st_string === '') {
        states = [];
    }


    //current state to download data for
    var processing = "";

    //no state arguments.  end
    if (states.length === 0) {
        console.log('missing state argument.  program exiting');
        process.exit();
    }

    //check state code validity
    for (j = 0; j < states.length; j = j + 1) {
        if (states[j] === "al" || states[j] === "ak" || states[j] === "az" || states[j] === "ar" || states[j] === "ca" || states[j] === "co" || states[j] === "ct" || states[j] === "de" || states[j] === "dc" || states[j] === "fl" || states[j] === "ga" || states[j] === "hi" || states[j] === "id" || states[j] === "il" || states[j] === "in" || states[j] === "ia" || states[j] === "ks" || states[j] === "ky" || states[j] === "la" || states[j] === "me" || states[j] === "md" || states[j] === "ma" || states[j] === "mi" || states[j] === "mn" || states[j] === "ms" || states[j] === "mo" || states[j] === "mt" || states[j] === "ne" || states[j] === "nv" || states[j] === "nh" || states[j] === "nj" || states[j] === "nm" || states[j] === "ny" || states[j] === "nc" || states[j] === "nd" || states[j] === "oh" || states[j] === "ok" || states[j] === "or" || states[j] === "pa" || states[j] === "pr" || states[j] === "ri" || states[j] === "sc" || states[j] === "sd" || states[j] === "tn" || states[j] === "tx" || states[j] === "us" || states[j] === "ut" || states[j] === "vt" || states[j] === "va" || states[j] === "wa" || states[j] === "wv" || states[j] === "wi" || states[j] === "wy" || states[j] === "all") {
            //valid state
        } else {
            console.log('one or more of your state codes are not valid');
            process.exit();
        }

        if (states[j] === "all") {
            states = ["al", "ak", "az", "ar", "ca", "co", "ct", "de", "dc", "fl", "ga", "hi", "id", "il", "in", "ia", "ks", "ky", "la", "me", "md", "ma", "mi", "mn", "ms", "mo", "mt", "ne", "nv", "nh", "nj", "nm", "ny", "nc", "nd", "oh", "ok", "or", "pa", "pr", "ri", "sc", "sd", "tn", "tx", "us", "ut", "vt", "va", "wa", "wv", "wi", "wy"];
            break;
        }

    }

    maxunzipped = (states.length) * 2;

    for (i = 0; i < states.length; i = i + 1) {

        if (states[i] === "al") {
            processing = "Alabama";
        }
        if (states[i] === "ak") {
            processing = "Alaska";
        }
        if (states[i] === "az") {
            processing = "Arizona";
        }
        if (states[i] === "ar") {
            processing = "Arkansas";
        }
        if (states[i] === "ca") {
            processing = "California";
        }
        if (states[i] === "co") {
            processing = "Colorado";
        }
        if (states[i] === "ct") {
            processing = "Connecticut";
        }
        if (states[i] === "de") {
            processing = "Delaware";
        }
        if (states[i] === "dc") {
            processing = "DistrictOfColumbia";
        }
        if (states[i] === "fl") {
            processing = "Florida";
        }
        if (states[i] === "ga") {
            processing = "Georgia";
        }
        if (states[i] === "hi") {
            processing = "Hawaii";
        }
        if (states[i] === "id") {
            processing = "Idaho";
        }
        if (states[i] === "il") {
            processing = "Illinois";
        }
        if (states[i] === "in") {
            processing = "Indiana";
        }
        if (states[i] === "ia") {
            processing = "Iowa";
        }
        if (states[i] === "ks") {
            processing = "Kansas";
        }
        if (states[i] === "ky") {
            processing = "Kentucky";
        }
        if (states[i] === "la") {
            processing = "Louisiana";
        }
        if (states[i] === "me") {
            processing = "Maine";
        }
        if (states[i] === "md") {
            processing = "Maryland";
        }
        if (states[i] === "ma") {
            processing = "Massachusetts";
        }
        if (states[i] === "mi") {
            processing = "Michigan";
        }
        if (states[i] === "mn") {
            processing = "Minnesota";
        }
        if (states[i] === "ms") {
            processing = "Mississippi";
        }
        if (states[i] === "mo") {
            processing = "Missouri";
        }
        if (states[i] === "mt") {
            processing = "Montana";
        }
        if (states[i] === "ne") {
            processing = "Nebraska";
        }
        if (states[i] === "nv") {
            processing = "Nevada";
        }
        if (states[i] === "nh") {
            processing = "NewHampshire";
        }
        if (states[i] === "nj") {
            processing = "NewJersey";
        }
        if (states[i] === "nm") {
            processing = "NewMexico";
        }
        if (states[i] === "ny") {
            processing = "NewYork";
        }
        if (states[i] === "nc") {
            processing = "NorthCarolina";
        }
        if (states[i] === "nd") {
            processing = "NorthDakota";
        }
        if (states[i] === "oh") {
            processing = "Ohio";
        }
        if (states[i] === "ok") {
            processing = "Oklahoma";
        }
        if (states[i] === "or") {
            processing = "Oregon";
        }
        if (states[i] === "pa") {
            processing = "Pennsylvania";
        }
        if (states[i] === "pr") {
            processing = "PuertoRico";
        }
        if (states[i] === "ri") {
            processing = "RhodeIsland";
        }
        if (states[i] === "sc") {
            processing = "SouthCarolina";
        }
        if (states[i] === "sd") {
            processing = "SouthDakota";
        }
        if (states[i] === "tn") {
            processing = "Tennessee";
        }
        if (states[i] === "tx") {
            processing = "Texas";
        }
        if (states[i] === "us") {
            processing = "UnitedStates";
        }
        if (states[i] === "ut") {
            processing = "Utah";
        }
        if (states[i] === "vt") {
            processing = "Vermont";
        }
        if (states[i] === "va") {
            processing = "Virginia";
        }
        if (states[i] === "wa") {
            processing = "Washington";
        }
        if (states[i] === "wv") {
            processing = "WestVirginia";
        }
        if (states[i] === "wi") {
            processing = "Wisconsin";
        }
        if (states[i] === "wy") {
            processing = "Wyoming";
        }


        var makerequest = function(processing, geostring, tempfoldername) {

            request('http://www2.census.gov/programs-surveys/acs/summary_file/2014/data/5_year_by_state/' + processing + geostring + '.zip')
                .pipe(fs.createWriteStream('temp/' + processing + geostring + '.zip'))
                .on('close', function() {
                    console.log(processing + ' ' + geostring + ' written!');



                    var unzipStream = fs.createReadStream('temp/' + processing + geostring + '.zip').pipe(unzip.Extract({
                        path: 'temp/' + tempfoldername
                    }));


                    unzipStream.on('close', function() {

                        console.log(processing + geostring + ' unzipped!');
                        unzippedcount++;

                    });


                });

        }

        makerequest(processing, '_All_Geographies_Not_Tracts_Block_Groups', 'file1');
        makerequest(processing, '_Tracts_Block_Groups_Only', 'file2');

    } //end i loop


    //check that all files were downloaded and unzipped before moving on to scaffolding
    function check() {

        if (unzippedcount < maxunzipped) {
              winston.info('unzipped files: ' + unzippedcount);
    winston.info('total files: ' + maxunzipped);
    console.log('unzipped files: ' + unzippedcount);
    console.log('total files: ' + maxunzipped);
            setTimeout(check, 1000); // setTimeout(func, timeMS, params...)
        } else {
            // Set location on form here if it isn't in getLocation()
            filesEEG.emit('scaffold');
        }
    }

    check();

}; //end module