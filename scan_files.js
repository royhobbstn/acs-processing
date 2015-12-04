var fs = require('fs'),
    EventEmitter = require('events').EventEmitter,
    filesEE = new EventEmitter(),
    myfiles = [],
    X = require('xlsx');

var alljson = [];
var allfilenames = [];
var sql = "";


// this event will be called when all files have been added to json
filesEE.on('json_complete', function() {

    //for each file  
    for (var i = 0; i < alljson.length; i = i + 1) {
        //add key, end parenthesis and semicolon
        if (i > 0) {
            sql = sql + ' CONSTRAINT ' + allfilenames[i - 1].toLowerCase() + '_pkey PRIMARY KEY (stusab, logrecno) );';
        }
        sql = sql + " CREATE TABLE IF NOT EXISTS " + allfilenames[i].toLowerCase() + " (";
        for (var key in alljson[i].E[0]) {
            //they have to all be text.  some acs fields are just '.'
            sql = sql + " " + key.toLowerCase() + " text,";
        }
    }

    //add last key, end parenthesis and semicolon
    sql = sql + ' CONSTRAINT ' + allfilenames[i - 1].toLowerCase() + '_pkey PRIMARY KEY (stusab, logrecno) );';

    //output sql to file that can be read
    fs.writeFile("scaffold.sql", sql, function(err) {
        if (err) {
            return console.log(err);
        }

        console.log("The scaffold.sql file was saved!");
        filesEE.emit('createtables'); // trigger files_ready event
    });

});

// read all files from current directory
fs.readdir('scan/unzip/seq', function(err, files) {
    if (err) throw err;
    files.forEach(function(file) {

        var fntext = file.split('.');



        var workbook = X.readFile('scan/unzip/seq/' + file);

        alljson.push(to_json(workbook));
        allfilenames.push(file.split('.')[0]);

        function to_json(workbook) {
            var result = {};
            workbook.SheetNames.forEach(function(sheetName) {
                var roa = X.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
                if (roa.length > 0) {
                    result[sheetName] = roa;
                }
            });
            return result;
        }

        //console.log(file+" processed");


    });
    filesEE.emit('json_complete'); // trigger files_ready event
});


//now create a list of SQL statements to create individual tables from the scaffold tables: export to createtables.sql
filesEE.on('createtables', function() {


    var fieldarray = [];

    var ctsql = "";
    var pushkey = {};
    var prevtable = "";
    var prevseq = "seq1";  

    //for each file  - create an array of key values for fields and seq_tables
    for (var i = 0; i < alljson.length; i = i + 1) {
        for (var key in alljson[i].E[0]) {

            if (key != 'FILEID' && key != 'FILETYPE' && key != 'STUSAB' && key != 'CHARITER' && key != 'SEQUENCE' && key != 'LOGRECNO') {
                //seq 84 - 101 are a special case: NO DATA
                if (allfilenames[i].toLowerCase() !== 'seq84' && allfilenames[i].toLowerCase() !== 'seq85' && allfilenames[i].toLowerCase() !== 'seq86' && allfilenames[i].toLowerCase() !== 'seq87' && allfilenames[i].toLowerCase() !== 'seq88' && allfilenames[i].toLowerCase() !== 'seq89' && allfilenames[i].toLowerCase() !== 'seq90' && allfilenames[i].toLowerCase() !== 'seq91' && allfilenames[i].toLowerCase() !== 'seq92' && allfilenames[i].toLowerCase() !== 'seq93' && allfilenames[i].toLowerCase() !== 'seq94' && allfilenames[i].toLowerCase() !== 'seq95' && allfilenames[i].toLowerCase() !== 'seq96' && allfilenames[i].toLowerCase() !== 'seq97' && allfilenames[i].toLowerCase() !== 'seq98' && allfilenames[i].toLowerCase() !== 'seq99' && allfilenames[i].toLowerCase() !== 'seq100' && allfilenames[i].toLowerCase() !== 'seq101') {

                    pushkey = {
                        key: key.toLowerCase(),
                        seq: allfilenames[i].toLowerCase()
                    };
                    fieldarray.push(pushkey);
                }

            }

        }
    }

  
    //loop through above created array of objects: construct sql
    for (var i = 0; i < fieldarray.length; i = i + 1) {  

        splitkey = fieldarray[i].key.split("_"); //get just the table string, not the field number

        if (splitkey[0] != prevtable) {
            if (i !== 0) {
                ctsql = ctsql + " FROM " + prevseq + " natural join geo; "
            }
            prevtable = splitkey[0];
            prevseq = fieldarray[i].seq;
            ctsql = ctsql + "CREATE TABLE " + splitkey[0] + " AS SELECT geonum";
        }

        ctsql = ctsql + ", " + fieldarray[i].key ;


    }

    //add to end of ctsql
    ctsql = ctsql + " FROM " + prevseq + " natural join geo; "


    //save file as createtables.sql
    //output sql to file that can be read
    fs.writeFile("createtables.sql", ctsql, function(err) {
        if (err) {
            return console.log(err);
        }

        console.log("The createtables.sql file was saved!");

    });

});