/*jslint node: true */
"use strict";

var fs = require('fs');
var pg = require('pg');

module.exports = function() {

    var obj = JSON.parse(fs.readFileSync('connection.json', 'utf8'));

    var contents = fs.readFileSync('columnvalid.sql', 'utf8');

    //hack to get around 'sequence' field name 
    var res = contents.replace(/sequence/g, "zyx");
    res = res.replace(/seq/g, "moeseq");
    res = res.replace(/zyx/g, "sequence");

    //console.log(res);

    var conString = "postgres://" + obj.name + ":" + obj.password + "@" + obj.host + ":" + obj.port + "/" + obj.db;

    var client = new pg.Client(conString);

    client.connect();

    var query = client.query(contents);

    var query2 = client.query(res);

    query2.on('end', function() {
        client.end();
    });

};