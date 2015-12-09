/*jslint node: true */
"use strict";


var request = require('request');
var fs = require('fs');
var mkdirp = require('mkdirp');
var unzip = require('unzip');

var EventEmitterG = require('events').EventEmitter;
var filesEEG = new EventEmitterG();

var winston = require('winston');
 
//setup logfile
try {
    fs.unlinkSync('somefile.log');
} catch (e) {
    if(e){
      console.log("logfile doesn't exist:  creating.");
    }
}

winston.add(winston.transports.File, { filename: 'somefile.log' });
  winston.remove(winston.transports.Console);


  winston.info('Logfile Created!');
 

//index.js 

//CONNECTION STRING (TO DO LATER)
//if omitted, will read connection json file
//-h 54.69.15.55 -p 5432 -u postgres -w eAs456!!$ -d acs1014

//OPTIONS (TO DO LATER)
//-l load & unzip data to disk only  ::stops after dl_and_extract.js
//-s upload to database only (keep in seq files, no processing) ::stops after upload_files.js
//-k keep temp files on disk ::doesn't run cleanup.js
//-x dont clean temp files (seq files) from database  ::doesn't run streamline.js

//STATES (REQUIRED!)
//-s ne,ca,fl   ::all lower case.  comma separated.  no spaces.
//-s all ::for everything

var statestring = "";

if (process.argv.indexOf("-s") != -1) { //does our flag exist?
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

winston.info('dl_scan_files called');
dl_scan_files(filesEEG, winston);

filesEEG.on('dl_and_extract', function() {
    winston.info('dl_and_extract called');
    dl_and_extract(statestring, filesEEG, winston);
});

filesEEG.on('scaffold', function() {
    winston.info('scaffold called');
    scaffold(filesEEG, winston);
});

filesEEG.on('create_meta', function() {
    winston.info('create_meta called');
    create_meta(filesEEG, winston);
});

filesEEG.on('geo_clean', function() {
    winston.info('geo_clean called');
    geo_clean(statestring, filesEEG, winston);
});
  
filesEEG.on('upload_geo', function() {
    winston.info('upload_geo called');
    upload_geo(statestring, filesEEG, winston);
});

filesEEG.on('upload_files', function() {
    winston.info('upload_files called');
    upload_files(statestring, filesEEG, winston);
});

filesEEG.on('geo_operate', function() {
    winston.info('geo_operate called');
    geo_operate(filesEEG, winston);
});


//the choke point.  Need to wait until all files done 


filesEEG.on('column_valid', function() {
    winston.info('column_valid called');
column_valid(filesEEG, winston);
});

filesEEG.on('create_tables', function() {
    winston.info('create_tables called');
create_tables(filesEEG, winston);
});

filesEEG.on('streamline', function() {
    winston.info('streamline called');
streamline(filesEEG, winston);
  });
  
filesEEG.on('cleanup', function() {
    winston.info('cleanup called');
cleanup(filesEEG, winston);
   });
   
  