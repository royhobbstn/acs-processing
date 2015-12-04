var request = require('request');
var fs = require('fs');
var mkdirp = require('mkdirp');
var unzip = require('unzip');

//create temp directory
mkdirp('scan', function(err) {

    // path was created unless there was error
    if (err) {
        console.log("Error:" + err);
    } else {
        console.log('scan directory created');
    }

    request('http://www2.census.gov/programs-surveys/acs/summary_file/2014/data/2014_5yr_Summary_FileTemplates.zip')
        .pipe(fs.createWriteStream('scan/2014_5yr_Summary_FileTemplates.zip'))
        .on('close', function() {
            console.log('Template File Written!');

            //create temp directory
            mkdirp('scan/unzip', function(err) {
                //unzip file to temp/file1        
                fs.createReadStream('scan/2014_5yr_Summary_FileTemplates.zip').pipe(unzip.Extract({
                    path: 'scan/unzip'
                }));
                console.log('unzipped template file');
            });

        });



});