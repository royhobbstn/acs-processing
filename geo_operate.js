/*jslint node: true */
"use strict";

var fs = require('fs');
var pg = require('pg');

module.exports = function(filesEEG, winston) {
  winston.info('begin geo_operate');
  console.log('begin geo_operate');

    var obj = JSON.parse(fs.readFileSync('connection.json', 'utf8'));

    var conString = "postgres://" + obj.name + ":" + obj.password + "@" + obj.host + ":" + obj.port + "/" + obj.db;

    var client = new pg.Client(conString);

    client.connect();

    var query = client.query("ALTER TABLE data.geo DROP COLUMN fileid; UPDATE data.geo SET stusab=lower(stusab); ALTER TABLE data.geo ADD geonum bigint; ALTER TABLE data.geo RENAME COLUMN geoid TO fullgeoid; ALTER TABLE data.geo ADD geoid varchar(12); ALTER TABLE data.geo ALTER COLUMN sumlevel TYPE smallint USING (sumlevel::smallint); " +

        "update data.geo set geoid = state where sumlevel = 40; update data.geo set geoid = state || county where sumlevel = 50; update data.geo set geoid = state || county || tract where sumlevel = 140; update data.geo set geoid = state || county || tract || blkgrp where sumlevel = 150; update data.geo set geoid = state || place where sumlevel=160; update data.geo set geoid = state || county || cousub where sumlevel = 60; update data.geo set geoid = '00' || zcta5 where sumlevel = 860; update data.geo set geoid = state || '1' || sdelm where sumlevel = 950; update data.geo set geoid = state || '2' || sdsec where sumlevel = 960; update data.geo set geoid = state || '3' || sduni where sumlevel = 970; update data.geo set geoid = '0' where sumlevel = 10; update data.geo set geoid = state || place || county where sumlevel = 155; update data.geo set geoid = state || anrc where sumlevel = 230; update data.geo set geoid = aianhh where sumlevel = 250; update data.geo set geoid = state || aianhh where sumlevel = 280; update data.geo set geoid = cbsa where sumlevel = 310; update data.geo set geoid = state || cbsa where sumlevel = 320; update data.geo set geoid = csa where sumlevel = 330; update data.geo set geoid = state || csa where sumlevel = 340; update data.geo set geoid = necta where sumlevel = 350; update data.geo set geoid = state || necta where sumlevel = 360; " +

        "update data.geo set geonum = ('1' || geoid)::bigint where sumlevel = 40; update data.geo set geonum = ('1' || geoid)::bigint where sumlevel = 50; update data.geo set geonum = ('1' || geoid)::bigint where sumlevel = 140; update data.geo set geonum = ('1' || geoid)::bigint where sumlevel = 150; update data.geo set geonum = ('1' || geoid)::bigint where sumlevel = 160; update data.geo set geonum = ('2' || geoid)::bigint where sumlevel = 60; update data.geo set geonum = ('2' || geoid)::bigint where sumlevel = 860; update data.geo set geonum = ('2' || geoid)::bigint where sumlevel = 950; update data.geo set geonum = ('2' || geoid)::bigint where sumlevel = 960; update data.geo set geonum = ('2' || geoid)::bigint where sumlevel = 970; update data.geo set geonum = ('3' || geoid)::bigint where sumlevel = 10; update data.geo set geonum = ('3' || geoid)::bigint where sumlevel = 155; update data.geo set geonum = ('3' || geoid)::bigint where sumlevel = 230; update data.geo set geonum = ('3' || geoid)::bigint where sumlevel = 250; update data.geo set geonum = ('3' || geoid)::bigint where sumlevel = 280; update data.geo set geonum = ('3' || geoid)::bigint where sumlevel = 310; update data.geo set geonum = ('4' || geoid)::bigint where sumlevel = 320; update data.geo set geonum = ('4' || geoid)::bigint where sumlevel = 330; update data.geo set geonum = ('4' || geoid)::bigint where sumlevel = 340; update data.geo set geonum = ('5' || geoid)::bigint where sumlevel = 350; update data.geo set geonum = ('5' || geoid)::bigint where sumlevel = 360; delete from data.geo where component <> '00'; delete from data.geo where sumlevel<>10 and sumlevel<>40 and sumlevel<>50 and sumlevel<>60 and sumlevel<>140 and sumlevel<>150 and sumlevel<>155 and sumlevel<>160 and sumlevel<>230 and sumlevel<>250 and sumlevel<>280 and sumlevel<>310 and sumlevel<>320 and sumlevel<>330 and sumlevel<>340 and sumlevel<>350 and sumlevel<>360 and sumlevel<>860 and sumlevel<>950 and sumlevel<>960 and sumlevel<>970;" +

        "CREATE TABLE search.data_exp AS SELECT stusab, cousub, tract, blkgrp, zcta5, sdelm, sdsec, sduni, anrc, aianhh, cbsa, csa, necta, name as geoname, sumlevel as sumlev, geoid, geonum, logrecno::integer as logrecno, state::smallint as state, county::smallint as county, place::integer as place, fullgeoid from data.geo; ALTER TABLE search.data_exp ADD PRIMARY KEY (geonum); CREATE INDEX acs_exp_geoid_idx ON search.data_exp USING btree (geoid); CREATE INDEX acs_exp_state_idx ON search.data_exp USING btree (state); CREATE INDEX acs_exp_sumlev_idx ON search.data_exp USING btree (sumlev);" +

        "CREATE TABLE search.data AS SELECT sumlevel as sumlev, logrecno::integer as logrecno, tract, blkgrp as bg, name as geoname, geonum, geoid, state::smallint as state, county::smallint as county, place::integer as place, stusab from data.geo; ALTER TABLE search.data ADD PRIMARY KEY (geonum); CREATE INDEX acs_geoid_idx ON search.data USING btree (geoid); CREATE INDEX acs_state_idx ON search.data USING btree (state); CREATE INDEX acs_sumlev_idx ON search.data USING btree (sumlev);" +

        "CREATE TABLE search.key AS SELECT stusab, logrecno::integer as logrecno, geonum from data.geo; ALTER TABLE search.key ADD PRIMARY KEY (stusab, logrecno);"

    );

    query.on('end', function() {
        client.end();
      console.log('end geo_operate');
      winston.info('end geo_operate');

      filesEEG.emit('create_tables');
    });

};