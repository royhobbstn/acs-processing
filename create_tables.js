
/*jslint node: true */
"use strict";

var fs = require('fs');
var pg = require('pg');
var Promise = require('es6-promise').Promise;

module.exports = function(filesEEG, winston) {
  
  console.log('begin create tables (16)');

    var obj = JSON.parse(fs.readFileSync('connection.json', 'utf8'));

    var contents1 = fs.readFileSync('create/create1.sql', 'utf8');
    var contents2 = fs.readFileSync('create/create2.sql', 'utf8');
    var contents3 = fs.readFileSync('create/create3.sql', 'utf8');
    var contents4 = fs.readFileSync('create/create4.sql', 'utf8');
    var contents5 = fs.readFileSync('create/create5.sql', 'utf8');
    var contents6 = fs.readFileSync('create/create6.sql', 'utf8');
    var contents7 = fs.readFileSync('create/create7.sql', 'utf8');
    var contents8 = fs.readFileSync('create/create8.sql', 'utf8');
    var contents9 = fs.readFileSync('create/create9.sql', 'utf8');
    var contents10 = fs.readFileSync('create/create10.sql', 'utf8');
    var contents11 = fs.readFileSync('create/create11.sql', 'utf8');
    var contents12 = fs.readFileSync('create/create12.sql', 'utf8');
    var contents13 = fs.readFileSync('create/create13.sql', 'utf8');
    var contents14 = fs.readFileSync('create/create14.sql', 'utf8');
    var contents15 = fs.readFileSync('create/create15.sql', 'utf8');
    var contents16 = fs.readFileSync('create/create16.sql', 'utf8');
  
  

  

    var conString = "postgres://" + obj.name + ":" + obj.password + "@" + obj.host + ":" + obj.port + "/" + obj.db;

    var client = new pg.Client(conString);

    client.connect();

    var promise1 = new Promise(function(resolve, reject) {

        var query1 = client.query(contents1);

        query1.on('end', function() {
            //client.end();
            console.log('create1 complete');
            resolve("");
        });

    });
    var promise2 = new Promise(function(resolve, reject) {

        var query2 = client.query(contents2);

        query2.on('end', function() {
            //client.end();
            console.log('create2 complete');
            resolve("");
        });

    });

    var promise3 = new Promise(function(resolve, reject) {

        var query3 = client.query(contents3);

        query3.on('end', function() {
            //client.end();
            console.log('create3 complete');
            resolve("");
        });

    });
    var promise4 = new Promise(function(resolve, reject) {

        var query4 = client.query(contents4);

        query4.on('end', function() {
            //client.end();
            console.log('create4 complete');
            resolve("");
        });

    });  
  
  
    var promise5 = new Promise(function(resolve, reject) {

        var query5 = client.query(contents5);

        query5.on('end', function() {
            //client.end();
            console.log('create5 complete');
            resolve("");
        });

    });
    var promise6 = new Promise(function(resolve, reject) {

        var query6 = client.query(contents6);

        query6.on('end', function() {
            //client.end();
            console.log('create6 complete');
            resolve("");
        });

    });
  
  
    var promise7 = new Promise(function(resolve, reject) {

        var query7 = client.query(contents7);

        query7.on('end', function() {
            //client.end();
            console.log('create7 complete');
            resolve("");
        });

    });
    var promise8 = new Promise(function(resolve, reject) {

        var query8 = client.query(contents8);

        query8.on('end', function() {
            //client.end();
            console.log('create8 complete');
            resolve("");
        });

    });
  
    var promise9 = new Promise(function(resolve, reject) {

        var query9 = client.query(contents9);

        query9.on('end', function() {
            //client.end();
            console.log('create9 complete');
            resolve("");
        });

    });
    var promise10 = new Promise(function(resolve, reject) {

        var query10 = client.query(contents10);

        query10.on('end', function() {
            //client.end();
            console.log('create10 complete');
            resolve("");
        });

    });
  
  
    var promise11 = new Promise(function(resolve, reject) {

        var query11 = client.query(contents11);

        query11.on('end', function() {
            //client.end();
            console.log('create11 complete');
            resolve("");
        });

    });
    var promise12 = new Promise(function(resolve, reject) {

        var query12 = client.query(contents12);

        query12.on('end', function() {
            //client.end();
            console.log('create12 complete');
            resolve("");
        });

    });  
  
    var promise13 = new Promise(function(resolve, reject) {

        var query13 = client.query(contents13);

        query13.on('end', function() {
            //client.end();
            console.log('create13 complete');
            resolve("");
        });

    });
    var promise14 = new Promise(function(resolve, reject) {

        var query14 = client.query(contents14);

        query14.on('end', function() {
            //client.end();
            console.log('create14 complete');
            resolve("");
        });

    });  
  
  
    var promise15 = new Promise(function(resolve, reject) {

        var query15 = client.query(contents15);

        query15.on('end', function() {
            //client.end();
            console.log('create15 complete');
            resolve("");
        });

    });
    var promise16 = new Promise(function(resolve, reject) {

        var query16 = client.query(contents16);

        query16.on('end', function() {
            //client.end();
            console.log('create16 complete');
            resolve("");
        });

    });  
  




    //wait for both promises to complete
    Promise.all([promise1, promise2, promise3, promise4, promise5, promise6, promise7, promise8, promise9, promise10, promise11, promise12, promise13, promise14, promise15, promise16]).then(function(values) {
        console.log('create tables complete!;');
      client.end();
            filesEEG.emit('streamline');
        
    });
};