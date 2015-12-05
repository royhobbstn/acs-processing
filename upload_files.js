var fs = require('fs');
var pg = require('pg');
var conString = "postgres://postgres:eAs456!!$@acsprocessing.c3w3zliliagq.us-west-2.rds.amazonaws.com:5432/acs";
var copyFrom = require('pg-copy-streams').from;

//All other Geo's File
fs.readdir('temp/file1', function(err, files) {
    if (err) throw err;
    files.forEach(function(file) {

        var fntext = file.split('.');


          //grab seq number
          var thefn=parseInt(fntext[0].substring(9, 12));

            //only doing estimate files and moe files - no geos
            if (fntext[0][0] === 'e' || fntext[0][0] === 'm') {

              //table prefix of moe for Margin of Error Tables
              var prefix="";
              if(fntext[0][0] === 'm'){prefix="moe";}
              
                //connect to db
                pg.connect(conString, function(err, client, done) {

                    var stream = client.query(copyFrom('COPY ' + prefix + 'seq' + thefn + ' FROM STDIN USING DELIMITERS \',\' CSV'));
                    var fileStream = fs.createReadStream('temp/file1/' + fntext[0] + '.txt')

                    fileStream.pipe(stream);
                    fileStream.on('end', done)
                    fileStream.on('error', done);


                });

            }



    });
  
  //filesEE.emit('json_complete'); // trigger files_ready event
  
});


//Tracts BGs file
fs.readdir('temp/file2', function(err, files) {
    if (err) throw err;
    files.forEach(function(file) {

        var fntext = file.split('.');


          //grab seq number
          var thefn=parseInt(fntext[0].substring(9, 12));

            //only doing estimate files and moe files - no geos
            if (fntext[0][0] === 'e' || fntext[0][0] === 'm') {

              //table prefix of moe for Margin of Error Tables
              var prefix="";
              if(fntext[0][0] === 'm'){prefix="moe";}
              
                //connect to db
                pg.connect(conString, function(err, client, done) {

                    var stream = client.query(copyFrom('COPY ' + prefix + 'seq' + thefn + ' FROM STDIN USING DELIMITERS \',\' CSV'));
                    var fileStream = fs.createReadStream('temp/file2/' + fntext[0] + '.txt')

                    fileStream.pipe(stream);
                    fileStream.on('end', done)
                    fileStream.on('error', done);


                });

            }



    });
  
  //filesEE.emit('json_complete'); // trigger files_ready event
  
});