var tr = require('transliteration');
var fs = require('fs');
var iconvlite = require('iconv-lite');


function readFileSync_encoding(filename, encoding) {
    var content = fs.readFileSync(filename);
    return iconvlite.decode(content, encoding);
}

var trans_content = readFileSync_encoding('temp/file1/g20145co.csv', 'utf8');

    //output sql to file that can be read
    fs.writeFile("temp/file1/g20145co.csv", trans_content, function(err) {
        if (err) {
            return console.log(err);
        }
      
      console.log('written');
      
    });


