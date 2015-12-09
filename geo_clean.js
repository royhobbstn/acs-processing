/*jslint node: true */
"use strict";

var tr = require('transliteration');
var fs = require('fs');
var iconvlite = require('iconv-lite');


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
        if (states[j] === "al" || states[j] === "ak" || states[j] === "az" || states[j] === "as" || states[j] === "ca" || states[j] === "co" || states[j] === "ct" || states[j] === "de" || states[j] === "dc" || states[j] === "fl" || states[j] === "ga" || states[j] === "hi" || states[j] === "id" || states[j] === "il" || states[j] === "in" || states[j] === "ia" || states[j] === "ks" || states[j] === "ky" || states[j] === "la" || states[j] === "me" || states[j] === "md" || states[j] === "ma" || states[j] === "mi" || states[j] === "mn" || states[j] === "ms" || states[j] === "mo" || states[j] === "mt" || states[j] === "ne" || states[j] === "nv" || states[j] === "nh" || states[j] === "nj" || states[j] === "nm" || states[j] === "ny" || states[j] === "nc" || states[j] === "nd" || states[j] === "oh" || states[j] === "ok" || states[j] === "or" || states[j] === "pa" || states[j] === "pr" || states[j] === "ri" || states[j] === "sc" || states[j] === "sd" || states[j] === "tn" || states[j] === "tx" || states[j] === "us" || states[j] === "ut" || states[j] === "vt" || states[j] === "va" || states[j] === "wa" || states[j] === "wv" || states[j] === "wi" || states[j] === "wy" || states[j] === "all") {
            //valid state
        } else {
            console.log('one or more of your state codes are not valid');
            process.exit();
        }

        if (states[j] === "all") {
            states = ["al", "ak", "az", "as", "ca", "co", "ct", "de", "dc", "fl", "ga", "hi", "id", "il", "in", "ia", "ks", "ky", "la", "me", "md", "ma", "mi", "mn", "ms", "mo", "mt", "ne", "nv", "nh", "nj", "nm", "ny", "nc", "nd", "oh", "ok", "or", "pa", "pr", "ri", "sc", "sd", "tn", "tx", "us", "ut", "vt", "va", "wa", "wv", "wi", "wy"];
            break;
        }

    } //end j loop


    function readFileSync_encoding(filename, encoding) {
        var content = fs.readFileSync(filename);
        return iconvlite.decode(content, encoding);
    }

    for (i = 0; i < states.length; i = i + 1) {
        var trans_content = readFileSync_encoding('temp/file1/g20145' + states[i] + '.csv', 'utf8');
        //output sql to file that can be read
        fs.writeFileSync('temp/file1/g20145' + states[i] + '.csv', trans_content);


        if (i === (states.length-1)) {
            //if last state, then move on to next module
            console.log('end transliterating files');
      winston.info('end transliterating files');
            filesEEG.emit('upload_geo');
        }
    } //end i loop


}; //end module