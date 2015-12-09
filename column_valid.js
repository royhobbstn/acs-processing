/*jslint node: true */
"use strict";

var fs = require('fs');
var pg = require('pg');
var Promise = require('es6-promise').Promise;

module.exports = function(filesEEG, winston) {
  
  console.log('beginning validate columns');

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

    var promise1 = new Promise(function(resolve, reject) {

        var query1 = client.query(contents);

        query1.on('end', function() {
            client.end();
            console.log('estimates columns validated');
            resolve("");
        });

    });
    var promise2 = new Promise(function(resolve, reject) {

        var query2 = client.query(res);

        query2.on('end', function() {
            client.end();
            console.log('moe columns validated');
            resolve("");
        });

    });


    client.on('drain', function(){
      client.end.bind(client);
      console.log('closing connection');

    }); //disconnect client when all queries are finished


    //wait for both promises to complete
    Promise.all([promise1, promise2]).then(function(values) {
        console.log('column validation complete!;');
            filesEEG.emit('create_tables');
        
    });
};