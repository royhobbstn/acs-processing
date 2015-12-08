/*jslint node: true */
"use strict";

module.exports = function() {

    var rmdir = require('rmdir');
    var path = 'temp';
    var path2 = 'scan';

    rmdir(path, function(err, dirs, files) {
        console.log(dirs);
        console.log(files);
        console.log('all temp directory files are removed');
    });

    rmdir(path2, function(err, dirs, files) {
        console.log(dirs);
        console.log(files);
        console.log('all scan directory files are removed');
    });

};