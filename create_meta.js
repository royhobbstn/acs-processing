/*jslint node: true */
"use strict";


var fs = require('fs');
var EventEmitter = require('events').EventEmitter;
var filesEE = new EventEmitter();
var X = require('xlsx');
var pg = require('pg');

module.exports = function(filesEEG, winston) {

    var insert_cc = "";
    var insert_ct = "";

    var workbook = X.readFile('scan/ACS_5yr_Seq_Table_Number_Lookup.xls');

    var cc_meta = "CREATE TABLE data.census_column_metadata ( column_id character varying(16) NOT NULL, table_id character varying(10), line_number numeric(4,1), column_title text, indent smallint, parent_column_id character varying(16), column_verbose text, CONSTRAINT cmkey PRIMARY KEY (column_id) ); ";

    var ct_meta = "CREATE TABLE data.census_table_metadata ( table_id character varying(10) NOT NULL, table_title text, simple_table_title text, subject_area text, universe text, denominator_column_id character varying(16), topics text[], CONSTRAINT ctkey PRIMARY KEY (table_id) ); ";


    var alljson = [];

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



    alljson.push(to_json(workbook));



    //add padding zeros
    function pad(n, width, z) {
        z = z || '0';
        n = n + '';
        return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
    }

    //loop through excel sheet, create insert statements


    var tabletitle = "";

    for (var i = 0; i < alljson[0]['Sequence_Number_and_Table_Numbe'].length; i = i + 1) {

        //just discard apostrophes
        tabletitle = alljson[0]['Sequence_Number_and_Table_Numbe'][i]['Table Title'];
        tabletitle = tabletitle.replace(/'/g, " ");

        //only if has line number
        if (alljson[0]['Sequence_Number_and_Table_Numbe'][i]['Line Number'] != ' ' && alljson[0]['Sequence_Number_and_Table_Numbe'][i]['Line Number'] != '') {

            insert_cc = insert_cc + "INSERT INTO data.census_column_metadata VALUES ('" + alljson[0]['Sequence_Number_and_Table_Numbe'][i]['Table ID'].toLowerCase() + pad(alljson[0]['Sequence_Number_and_Table_Numbe'][i]['Line Number'], 3) + "', '" + alljson[0]['Sequence_Number_and_Table_Numbe'][i]['Table ID'].toLowerCase() + "', '" + parseFloat(alljson[0]['Sequence_Number_and_Table_Numbe'][i]['Line Number']) + "', '" + tabletitle + "', 0, 0, '" + tabletitle + "'); ";
        }
    }

    var universe = "";

    for (var i = 0; i < alljson[0]['Sequence_Number_and_Table_Numbe'].length; i = i + 1) {

        //just discard apostrophes
        tabletitle = alljson[0]['Sequence_Number_and_Table_Numbe'][i]['Table Title'];
        tabletitle = tabletitle.replace(/'/g, " ");

        //only if has subject area
        if (alljson[0]['Sequence_Number_and_Table_Numbe'][i]['Subject Area'] != ' ' && alljson[0]['Sequence_Number_and_Table_Numbe'][i]['Subject Area'] != '' && alljson[0]['Sequence_Number_and_Table_Numbe'][i]['Subject Area'] != undefined && alljson[0]['Sequence_Number_and_Table_Numbe'][i]['Table ID'].toLowerCase() != 'b24121' && alljson[0]['Sequence_Number_and_Table_Numbe'][i]['Table ID'].toLowerCase() != 'b24122' && alljson[0]['Sequence_Number_and_Table_Numbe'][i]['Table ID'].toLowerCase() != 'b24123' && alljson[0]['Sequence_Number_and_Table_Numbe'][i]['Table ID'].toLowerCase() != 'b24124' && alljson[0]['Sequence_Number_and_Table_Numbe'][i]['Table ID'].toLowerCase() != 'b24125' && alljson[0]['Sequence_Number_and_Table_Numbe'][i]['Table ID'].toLowerCase() != 'b24126') {

            universe = alljson[0]['Sequence_Number_and_Table_Numbe'][i + 1]['Table Title'];
            universe = universe.replace(/'/g, " ");

            insert_ct = insert_ct + "INSERT INTO data.census_table_metadata VALUES ('" + alljson[0]['Sequence_Number_and_Table_Numbe'][i]['Table ID'].toLowerCase() + "', '" + tabletitle + "', '" + tabletitle + "', '" + alljson[0]['Sequence_Number_and_Table_Numbe'][i]['Subject Area'] + "', '" + universe + "', '', '{}'); ";

        }
    }



    var obj = JSON.parse(fs.readFileSync('connection.json', 'utf8'));


    var conString = "postgres://" + obj.name + ":" + obj.password + "@" + obj.host + ":" + obj.port + "/" + obj.db;

    var client = new pg.Client(conString);

    client.connect();

    var query = client.query(cc_meta + ct_meta + insert_cc + insert_ct);


    query.on('end', function() {
        client.end();
            winston.info('end create_meta');
        filesEEG.emit('geo_clean');
    });

};