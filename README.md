# acs-processing
Node Package for processing ACS data into a PostgreSQL database

###Setup

```
npm install acs1014
```

**Configure the connection.json file with your database parameters!**

####STATES (REQUIRED!)
 - -s ne,ca,fl   ::all lower case.  comma separated.  no spaces.
 - -s all ::for everything (SO FAR UNTESTED)

Example:

```
acs1014 -s ne,de,fl
```

###Roadmap

####CONNECTION STRING (TO DO LATER) if omitted, will read connection.json file (ONLY FUNCTIONALITY AT PRESENT)
 - -h 54.69.15.55 -p 5432 -u postgres -w eAs456!!$ -d acs1014

####OPTIONS (TO DO LATER)
 - -l load & unzip data to disk only  ::only loads raw data to hard drive
 - -s upload to database only (keep in seq files, no processing) ::stops after bulk uploading
 - -k keep temp files on disk ::doesn't run clean up temp data files on drive
 - -x dont clean temp files (seq files) from database  ::doesn't delete temporary sequence file tables in database



