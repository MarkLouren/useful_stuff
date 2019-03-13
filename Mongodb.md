### Launch db command:
* mongod - Launcn Mongo server  in a new terminal window:
* mongo - launch db
* show dbs - Show statistics of db usage
* use "dbname"  - use a database "dbname -name of db" Example:
* use fullstack  - if you don't have this db it will be created
switched to db fullstack
* show collections - show the data in fullstack db
* db.students.insert({"name":"Jose", "mark":99}) - Add data to DB
=> WriteResult({ "nInserted" : 1 })  - Results
* db.students.find({}) -  find data in db
=>{ "_id" : ObjectId("5c892aec6efdb226993cbea0"), "name" : "Jose", "mark" : 99 }
*  db.students.remove({"name":"Jose"}) - Remove data from db
=>WriteResult({ "nRemoved" : 1 })
