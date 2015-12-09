# acs-processing
Node Package for processing ACS data into a PostgreSQL database

###Setup

'''
npm install acs1014
'''

**Configure the connection.json file with your database parameters!**


Then, where -s is a comma separated list of state abbreviations (lowercase, no spaces):

'''
acs1014 -s ne,de,fl
'''

CONNECTION STRING (TO DO LATER) if omitted, will read connection.json file (ONLY FUNCTIONALITY AT PRESENT)
 - -h 54.69.15.55 -p 5432 -u postgres -w eAs456!!$ -d acs1014

OPTIONS (TO DO LATER)
 - -l load & unzip data to disk only  ::stops after dl_and_extract.js
 - -s upload to database only (keep in seq files, no processing) ::stops after upload_files.js
 - -k keep temp files on disk ::doesn't run cleanup.js
 - -x dont clean temp files (seq files) from database  ::doesn't run streamline.js

STATES (REQUIRED!)
 - -s ne,ca,fl   ::all lower case.  comma separated.  no spaces.
 - -s all ::for everything (SO FAR UNTESTED)

