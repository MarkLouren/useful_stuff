### Useful docs:
https://docs.mongodb.com/manual/reference/default-mongodb-port/ - Documentation

### Launch db command:
* _mongod_ - Launcn Mongo server  in a new terminal window:
* _mongo_ - launch db
* _show dbs_ - Show statistics of db usage
* _use "dbname"_  - Use a database "dbname -name of db" Example:
* _use fullstack_  - if you don't have this db it will be created
switched to db fullstack
* _show collections_ - Show the data in fullstack db
* _db.students.insert({"name":"Jose", "mark":99})_ - Add data to DB
=> WriteResult({ "nInserted" : 1 })  - Results
* _db.students.find({})_ -  Find data in db
=>{ "_id" : ObjectId("5c892aec6efdb226993cbea0"), "name" : "Jose", "mark" : 99 }
*  _db.students.remove({"name":"Jose"})_ - Remove data from db
=>WriteResult({ "nRemoved" : 1 })
