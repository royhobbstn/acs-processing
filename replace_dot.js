/*jslint node: true */
"use strict";

var fs = require('fs');
var pg = require('pg');
var copyFrom = require('pg-copy-streams').from;
var Promise = require('es6-promise').Promise;
var replace = require('replace');

module.exports = function(st_string, filesEEG, winston) {


  console.log('begin transliterating files');

    var j; //loop var
    var i; //loop var

    var states = st_string.split(",");
    if (st_string === '') {
        states = [];
    }

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

    } //end j loop




console.log('begin clean data files');
//winston.info('begin upload_files');



var totalfiles = 0;
var completedfiles = 0;

//All other Geo's File
fs.readdir('temp/file1', function(err, files) {

    if (err) throw err;
    files.forEach(function(file) {

        var fntext = file.split('.');


        //grab seq number
        var thefn = parseInt(fntext[0].substring(9, 12));

        //only doing estimate files and moe files - no geos
        if (fntext[0][0] === 'e' || fntext[0][0] === 'm') {
            totalfiles++;

            //http://stackoverflow.com/questions/14177087/replace-a-string-in-a-file-with-nodejs

replace({
    regex: ",\\.",
    replacement: ",",
    paths: ['temp/file1/' + file],
    recursive: true,
    silent: false,
});
          completedfiles++;

        }



    });

});



//Tracts BGs file
fs.readdir('temp/file2', function(err, files) {

    if (err) throw err;
    files.forEach(function(file) {

        var fntext = file.split('.');


        //grab seq number
        var thefn = parseInt(fntext[0].substring(9, 12));

        //only doing estimate files and moe files - no geos
        if (fntext[0][0] === 'e' || fntext[0][0] === 'm') {
            totalfiles++;


replace({
    regex: ",\\.",
    replacement: ",",
    paths: ['temp/file2/' + file],
    recursive: true,
    silent: false,
});

completedfiles++;

        }



    });

});



//wait for count to increase to max
//check that all files were downloaded and unzipped before moving on to scaffolding
function check() {
    winston.info('completed files: ' + completedfiles);
    winston.info('total files: ' + totalfiles);
    console.log('completed files: ' + completedfiles);
    console.log('total files: ' + totalfiles);
    if (completedfiles < ((states.length) * 484)) { 
        setTimeout(check, 1000); 
    } else {
      winston.info('end replace_dot');
      console.log('end replace_dot');
        winston.info('calling upload_geo');
      console.log('calling upload_geo');
        filesEEG.emit('upload_geo');
    }


}

check();


};