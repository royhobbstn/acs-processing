var request = require('request');
var fs = require('fs');
var mkdirp = require('mkdirp');
var unzip = require('unzip');

//create temp directory
mkdirp('temp', function(err) {

    // path was created unless there was error
    if (err) {
        console.log("Error:" + err);
    } else {
        console.log('temp directory created');
    }

    request('http://www2.census.gov/programs-surveys/acs/summary_file/2014/data/5_year_by_state/Delaware_All_Geographies_Not_Tracts_Block_Groups.zip')
        .pipe(fs.createWriteStream('temp/file1.zip'))
        .on('close', function() {
            console.log('File1 written!');

            //create temp directory
            mkdirp('temp/file1', function(err) {
                //unzip file to temp/file1        
                fs.createReadStream('temp/file1.zip').pipe(unzip.Extract({
                    path: 'temp/file1'
                }));
                console.log('done file 1');
            });

        });

    request('http://www2.census.gov/programs-surveys/acs/summary_file/2014/data/5_year_by_state/Delaware_Tracts_Block_Groups_Only.zip')
        .pipe(fs.createWriteStream('temp/file2.zip'))
        .on('close', function() {
            console.log('File2 written!');

            //create temp directory
            mkdirp('temp/file2', function(err) {
                //unzip file to temp/file2
                fs.createReadStream('temp/file2.zip').pipe(unzip.Extract({
                    path: 'temp/file2'
                }));
                console.log('done file 2');
            });

        });

});