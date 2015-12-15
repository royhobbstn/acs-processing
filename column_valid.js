/*jslint node: true */
"use strict";

var fs = require('fs');
var pg = require('pg');
var Promise = require('es6-promise').Promise;

module.exports = function(filesEEG, winston) {
  
  console.log('beginning validate columns (32)');

    var obj = JSON.parse(fs.readFileSync('connection.json', 'utf8'));

    var contents1 = fs.readFileSync('validate/columnvalid1.sql', 'utf8');
    var contents2 = fs.readFileSync('validate/columnvalid2.sql', 'utf8');
    var contents3 = fs.readFileSync('validate/columnvalid3.sql', 'utf8');
    var contents4 = fs.readFileSync('validate/columnvalid4.sql', 'utf8');
    var contents5 = fs.readFileSync('validate/columnvalid5.sql', 'utf8');
    var contents6 = fs.readFileSync('validate/columnvalid6.sql', 'utf8');
    var contents7 = fs.readFileSync('validate/columnvalid7.sql', 'utf8');
    var contents8 = fs.readFileSync('validate/columnvalid8.sql', 'utf8');
    var contents9 = fs.readFileSync('validate/columnvalid9.sql', 'utf8');
    var contents10 = fs.readFileSync('validate/columnvalid10.sql', 'utf8');
    var contents11 = fs.readFileSync('validate/columnvalid11.sql', 'utf8');
    var contents12 = fs.readFileSync('validate/columnvalid12.sql', 'utf8');
    var contents13 = fs.readFileSync('validate/columnvalid13.sql', 'utf8');
    var contents14 = fs.readFileSync('validate/columnvalid14.sql', 'utf8');
    var contents15 = fs.readFileSync('validate/columnvalid15.sql', 'utf8');
    var contents16 = fs.readFileSync('validate/columnvalid16.sql', 'utf8');
  
  
  function moeswap(contents){
    //hack to get around 'sequence' field name 
    var res = contents.replace(/sequence/g, "zyx");
    res = res.replace(/seq/g, "moeseq");
    res = res.replace(/zyx/g, "sequence");
    return res;
  }

    var contents17 = moeswap(contents1);
    var contents18 = moeswap(contents2);
    var contents19 = moeswap(contents3);
    var contents20 = moeswap(contents4);
    var contents21 = moeswap(contents5);
    var contents22 = moeswap(contents6);
    var contents23 = moeswap(contents7);
    var contents24 = moeswap(contents8);
    var contents25 = moeswap(contents9);
    var contents26 = moeswap(contents10);
    var contents27 = moeswap(contents11);
    var contents28 = moeswap(contents12);
    var contents29 = moeswap(contents13);
    var contents30 = moeswap(contents14);
    var contents31 = moeswap(contents15);
    var contents32 = moeswap(contents16);

  

    var conString = "postgres://" + obj.name + ":" + obj.password + "@" + obj.host + ":" + obj.port + "/" + obj.db;

    var client = new pg.Client(conString);

    client.connect();

    var promise1 = new Promise(function(resolve, reject) {

        var query1 = client.query(contents1);

        query1.on('end', function() {
            //client.end();
            console.log('query1 complete');
            resolve("");
        });

    });
    var promise2 = new Promise(function(resolve, reject) {

        var query2 = client.query(contents2);

        query2.on('end', function() {
            //client.end();
            console.log('query2 complete');
            resolve("");
        });

    });

    var promise3 = new Promise(function(resolve, reject) {

        var query3 = client.query(contents3);

        query3.on('end', function() {
            //client.end();
            console.log('query3 complete');
            resolve("");
        });

    });
    var promise4 = new Promise(function(resolve, reject) {

        var query4 = client.query(contents4);

        query4.on('end', function() {
            //client.end();
            console.log('query4 complete');
            resolve("");
        });

    });  
  
  
    var promise5 = new Promise(function(resolve, reject) {

        var query5 = client.query(contents5);

        query5.on('end', function() {
            //client.end();
            console.log('query5 complete');
            resolve("");
        });

    });
    var promise6 = new Promise(function(resolve, reject) {

        var query6 = client.query(contents6);

        query6.on('end', function() {
            //client.end();
            console.log('query6 complete');
            resolve("");
        });

    });
  
  
    var promise7 = new Promise(function(resolve, reject) {

        var query7 = client.query(contents7);

        query7.on('end', function() {
            //client.end();
            console.log('query7 complete');
            resolve("");
        });

    });
    var promise8 = new Promise(function(resolve, reject) {

        var query8 = client.query(contents8);

        query8.on('end', function() {
            //client.end();
            console.log('query8 complete');
            resolve("");
        });

    });
  
    var promise9 = new Promise(function(resolve, reject) {

        var query9 = client.query(contents9);

        query9.on('end', function() {
            //client.end();
            console.log('query9 complete');
            resolve("");
        });

    });
    var promise10 = new Promise(function(resolve, reject) {

        var query10 = client.query(contents10);

        query10.on('end', function() {
            //client.end();
            console.log('query10 complete');
            resolve("");
        });

    });
  
  
    var promise11 = new Promise(function(resolve, reject) {

        var query11 = client.query(contents11);

        query11.on('end', function() {
            //client.end();
            console.log('query11 complete');
            resolve("");
        });

    });
    var promise12 = new Promise(function(resolve, reject) {

        var query12 = client.query(contents12);

        query12.on('end', function() {
            //client.end();
            console.log('query12 complete');
            resolve("");
        });

    });  
  
    var promise13 = new Promise(function(resolve, reject) {

        var query13 = client.query(contents13);

        query13.on('end', function() {
            //client.end();
            console.log('query13 complete');
            resolve("");
        });

    });
    var promise14 = new Promise(function(resolve, reject) {

        var query14 = client.query(contents14);

        query14.on('end', function() {
            //client.end();
            console.log('query14 complete');
            resolve("");
        });

    });  
  
  
    var promise15 = new Promise(function(resolve, reject) {

        var query15 = client.query(contents15);

        query15.on('end', function() {
            //client.end();
            console.log('query15 complete');
            resolve("");
        });

    });
    var promise16 = new Promise(function(resolve, reject) {

        var query16 = client.query(contents16);

        query16.on('end', function() {
            //client.end();
            console.log('query16 complete');
            resolve("");
        });

    });  
  

    var promise17 = new Promise(function(resolve, reject) {

        var query17 = client.query(contents17);

        query17.on('end', function() {
            //client.end();
            console.log('query17 complete');
            resolve("");
        });

    });
    var promise18 = new Promise(function(resolve, reject) {

        var query18 = client.query(contents18);

        query18.on('end', function() {
            //client.end();
            console.log('query18 complete');
            resolve("");
        });

    });

    var promise19 = new Promise(function(resolve, reject) {

        var query19 = client.query(contents19);

        query19.on('end', function() {
            //client.end();
            console.log('query19 complete');
            resolve("");
        });

    });
    var promise20 = new Promise(function(resolve, reject) {

        var query20 = client.query(contents20);

        query20.on('end', function() {
            //client.end();
            console.log('query20 complete');
            resolve("");
        });

    });  
  
  
    var promise21 = new Promise(function(resolve, reject) {

        var query21 = client.query(contents21);

        query21.on('end', function() {
            //client.end();
            console.log('query21 complete');
            resolve("");
        });

    });
    var promise22 = new Promise(function(resolve, reject) {

        var query22 = client.query(contents22);

        query22.on('end', function() {
            //client.end();
            console.log('query22 complete');
            resolve("");
        });

    });
  
  
    var promise23 = new Promise(function(resolve, reject) {

        var query23 = client.query(contents23);

        query23.on('end', function() {
            //client.end();
            console.log('query23 complete');
            resolve("");
        });

    });
    var promise24 = new Promise(function(resolve, reject) {

        var query24 = client.query(contents24);

        query24.on('end', function() {
            //client.end();
            console.log('query24 complete');
            resolve("");
        });

    });
  
    var promise25 = new Promise(function(resolve, reject) {

        var query25 = client.query(contents25);

        query25.on('end', function() {
            //client.end();
            console.log('query25 complete');
            resolve("");
        });

    });
    var promise26 = new Promise(function(resolve, reject) {

        var query26 = client.query(contents26);

        query26.on('end', function() {
            //client.end();
            console.log('query26 complete');
            resolve("");
        });

    });
  
  
    var promise27 = new Promise(function(resolve, reject) {

        var query27 = client.query(contents27);

        query27.on('end', function() {
            //client.end();
            console.log('query27 complete');
            resolve("");
        });

    });
    var promise28 = new Promise(function(resolve, reject) {

        var query28 = client.query(contents28);

        query28.on('end', function() {
            //client.end();
            console.log('query28 complete');
            resolve("");
        });

    });  
  
    var promise29 = new Promise(function(resolve, reject) {

        var query29 = client.query(contents29);

        query29.on('end', function() {
            //client.end();
            console.log('query29 complete');
            resolve("");
        });

    });
    var promise30 = new Promise(function(resolve, reject) {

        var query30 = client.query(contents30);

        query30.on('end', function() {
            //client.end();
            console.log('query30 complete');
            resolve("");
        });

    });  
  
  
    var promise31 = new Promise(function(resolve, reject) {

        var query31 = client.query(contents31);

        query31.on('end', function() {
            //client.end();
            console.log('query31 complete');
            resolve("");
        });

    });
    var promise32 = new Promise(function(resolve, reject) {

        var query32 = client.query(contents32);

        query32.on('end', function() {
            //client.end();
            console.log('query32 complete');
            resolve("");
        });

    });  
  
    client.on('drain', function(){
      client.end.bind(client);
      console.log('closing connection');

    }); //disconnect client when all queries are finished


    //wait for both promises to complete
    Promise.all([promise1, promise2, promise3, promise4, promise5, promise6, promise7, promise8, promise9, promise10, promise11, promise12, promise13, promise14, promise15, promise16, promise17, promise18, promise19, promise20, promise21, promise22, promise23, promise24, promise25, promise26, promise27, promise28, promise29, promise30, promise31, promise32]).then(function(values) {
        console.log('column validation complete!;');
            filesEEG.emit('create_tables');
        
    });
};