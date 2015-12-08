/*jslint node: true */
"use strict";


var request = require('request');
var fs = require('fs');
var mkdirp = require('mkdirp');
var unzip = require('unzip');


//index.js 

//CONNECTION STRING (TO DO LATER)
//if omitted, will read connection json file
//-h 54.69.15.55 -p 5432 -u postgres -w eAs456!!$ 

//OPTIONS (TO DO LATER)
//-l load & unzip data to disk only  ::stops after dl_and_extract.js
//-s upload to database only (keep in seq files, no processing) ::stops after upload_files.js
//-k keep temp files on disk ::doesn't run cleanup.js
//-x dont clean temp files (seq files) from database  ::doesn't run streamline.js

//STATES (REQUIRED!)
//-s ne,ca,fl   ::all lower case.  comma separated.  no spaces.
//-s all ::for everything

var statestring="";

if(process.argv.indexOf("-s") != -1){ //does our flag exist?
    statestring = process.argv[process.argv.indexOf("-s") + 1]; //grab the next item
}


//EXAMPLE
//node index.js host=54.69.15.55 port=5432 user=postgres password=eAs456!!$ -k -s states=ne,ca,tx

var dl_scan_files = require('./dl_scan_files.js');
var dl_and_extract = require('./dl_and_extract.js');
var scaffold = require('./scaffold.js');
var create_meta = require('./create_meta.js');
var geo_clean = require('./geo_clean.js');
var upload_geo = require('./upload_geo.js');
var upload_files = require('./upload_files.js');
var geo_operate = require('./geo_operate.js');
var column_valid = require('./column_valid.js');
var create_tables = require('./create_tables.js');
var streamline = require('./streamline.js');
var cleanup = require('./cleanup.js');

dl_scan_files();
dl_and_extract(statestring);
scaffold();
create_meta();
geo_clean(statestring);
upload_geo(statestring);
upload_files();
geo_operate();
column_valid();
create_tables();
streamline();
cleanup();

