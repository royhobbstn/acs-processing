var request = require('request');
var fs = require('fs');
var mkdirp = require('mkdirp');
var unzip = require('unzip');

  
var states=[];
var processing="";


for(j=2; j<(process.argv).length;j=j+1){
  if(process.argv[j]==="al" || process.argv[j]==="ak" || process.argv[j]==="az" || process.argv[j]==="as" || process.argv[j]==="ca" || process.argv[j]==="co" || process.argv[j]==="ct" || process.argv[j]==="de" || process.argv[j]==="dc" || process.argv[j]==="fl" || process.argv[j]==="ga" || process.argv[j]==="hi" || process.argv[j]==="id" || process.argv[j]==="il" || process.argv[j]==="in" || process.argv[j]==="ia" || process.argv[j]==="ks" || process.argv[j]==="ky" || process.argv[j]==="la" || process.argv[j]==="me" || process.argv[j]==="md" || process.argv[j]==="ma" || process.argv[j]==="mi" || process.argv[j]==="mn" || process.argv[j]==="ms" || process.argv[j]==="mo" || process.argv[j]==="mt" || process.argv[j]==="ne" || process.argv[j]==="nv" || process.argv[j]==="nh" || process.argv[j]==="nj" || process.argv[j]==="nm" || process.argv[j]==="ny" || process.argv[j]==="nc" || process.argv[j]==="nd" || process.argv[j]==="oh" || process.argv[j]==="ok" || process.argv[j]==="or" || process.argv[j]==="pa" || process.argv[j]==="pr" || process.argv[j]==="ri" || process.argv[j]==="sc" || process.argv[j]==="sd" || process.argv[j]==="tn" || process.argv[j]==="tx" || process.argv[j]==="us" || process.argv[j]==="ut" || process.argv[j]==="vt" || process.argv[j]==="va" || process.argv[j]==="wa" || process.argv[j]==="wv" || process.argv[j]==="wi" || process.argv[j]==="wy" || process.argv[j]==="all"){
    states.push(process.argv[j]);
  }
  
  if(arg[j]==="all"){
  states = ["al","ak","az","as","ca","co","ct","de","dc","fl","ga","hi","id","il","in","ia","ks","ky","la","me","md","ma","mi","mn","ms","mo","mt","ne","nv","nh","nj","nm","ny","nc","nd","oh","ok","or","pa","pr","ri","sc","sd","tn","tx","us","ut","vt","va","wa","wv","wi","wy"];
  break; 
}
  
}





for(var i=0;i<states.length;i=i+1){
  
  if(states[i]==="al"){ processing = "Alabama"; }
  if(states[i]==="ak"){ processing = "Alaska"; }
  if(states[i]==="az"){ processing = "Arizona"; }
  if(states[i]==="as"){ processing = "Arkansas"; }
  if(states[i]==="ca"){ processing = "California"; }
  if(states[i]==="co"){ processing = "Colorado"; }
  if(states[i]==="ct"){ processing = "Connecticut"; }
  if(states[i]==="de"){ processing = "Delaware"; }
  if(states[i]==="dc"){ processing = "DistrictOfColumbia"; }
  if(states[i]==="fl"){ processing = "Florida"; }
  if(states[i]==="ga"){ processing = "Georgia"; }
  if(states[i]==="hi"){ processing = "Hawaii"; }
  if(states[i]==="id"){ processing = "Idaho"; }
  if(states[i]==="il"){ processing = "Illinois"; }
  if(states[i]==="in"){ processing = "Indiana"; }
  if(states[i]==="ia"){ processing = "Iowa"; }
  if(states[i]==="ks"){ processing = "Kansas"; }
  if(states[i]==="ky"){ processing = "Kentucky"; }
  if(states[i]==="la"){ processing = "Louisiana"; }
  if(states[i]==="me"){ processing = "Maine"; }
  if(states[i]==="md"){ processing = "Maryland"; }
  if(states[i]==="ma"){ processing = "Massachusetts"; }
  if(states[i]==="mi"){ processing = "Michigan"; }
  if(states[i]==="mn"){ processing = "Minnesota"; }
  if(states[i]==="ms"){ processing = "Mississippi"; }
  if(states[i]==="mo"){ processing = "Missouri"; }
  if(states[i]==="mt"){ processing = "Montana"; }
  if(states[i]==="ne"){ processing = "Nebraska"; }
  if(states[i]==="nv"){ processing = "Nevada"; }
  if(states[i]==="nh"){ processing = "NewHampshire"; }
  if(states[i]==="nj"){ processing = "NewJersey"; }
  if(states[i]==="nm"){ processing = "NewMexico"; }
  if(states[i]==="ny"){ processing = "NewYork"; }
  if(states[i]==="nc"){ processing = "NorthCarolina"; }
  if(states[i]==="nd"){ processing = "NorthDakota"; }
  if(states[i]==="oh"){ processing = "Ohio"; }
  if(states[i]==="ok"){ processing = "Oklahoma"; }
  if(states[i]==="or"){ processing = "Oregon"; }
  if(states[i]==="pa"){ processing = "Pennsylvania"; }
  if(states[i]==="pr"){ processing = "PuertoRico"; }
  if(states[i]==="ri"){ processing = "RhodeIsland"; }
  if(states[i]==="sc"){ processing = "SouthCarolina"; }
  if(states[i]==="sd"){ processing = "SouthDakota"; }
  if(states[i]==="tn"){ processing = "Tennessee"; }
  if(states[i]==="tx"){ processing = "Texas"; }
  if(states[i]==="us"){ processing = "UnitedStates"; }
  if(states[i]==="ut"){ processing = "Utah"; }
  if(states[i]==="vt"){ processing = "Vermont"; }
  if(states[i]==="va"){ processing = "Virginia"; }
  if(states[i]==="wa"){ processing = "Washington"; }
  if(states[i]==="wv"){ processing = "WestVirginia"; }
  if(states[i]==="wi"){ processing = "Wisconsin"; }
  if(states[i]==="wy"){ processing = "Wyoming"; }

}


//create temp directory
mkdirp('temp', function(err) {

    // path was created unless there was error
    if (err) {
        console.log("Error:" + err);
    } else {
        console.log('temp directory created');
    }

    request('http://www2.census.gov/programs-surveys/acs/summary_file/2014/data/5_year_by_state/' + processing + '_All_Geographies_Not_Tracts_Block_Groups.zip')
        .pipe(fs.createWriteStream('temp/' + processing + '_All_Geographies_Not_Tracts_Block_Groups.zip'))
        .on('close', function() {
            console.log( processing + ' other geo written!');

            //create temp directory
            mkdirp('temp/file1', function(err) {
                //unzip file to temp/file1        
                fs.createReadStream('temp/' + processing + '_All_Geographies_Not_Tracts_Block_Groups.zip').pipe(unzip.Extract({
                    path: 'temp/file1'
                }));
                console.log( processing + ' other geo Unzipped!');
            });

        });

    request('http://www2.census.gov/programs-surveys/acs/summary_file/2014/data/5_year_by_state/' + processing + '_Tracts_Block_Groups_Only.zip')
        .pipe(fs.createWriteStream('temp/' + processing + '_Tracts_Block_Groups_Only.zip'))
        .on('close', function() {
            console.log( processing + ' tract and bg written!');

            //create temp directory
            mkdirp('temp/file2', function(err) {
                //unzip file to temp/file2
                fs.createReadStream('temp/' + processing + '_Tracts_Block_Groups_Only.zip').pipe(unzip.Extract({
                    path: 'temp/file2'
                }));
                console.log( processing + ' tract and bg Unzipped!');
            });

        });

});
  