# Digital Ocean: Commands for Ubuntu

1. ssh root@ IP adress of the server
2. Enter your Root Password
3. apt-get update - Collect what we can update  that we've installed on the server, apt - Ubuntu Package mannager

-------------------
 Install PostgreSQL
-------------------

4. apt-get install postgresql postgresql-contrib  - Install a postgre database on the server (two pacakges postgresql and postgresql-contrib
```
Creating new cluster 9.5/main ...
  config /etc/postgresql/9.5/main
  data   /var/lib/postgresql/9.5/main
  locale en_US.UTF-8
  socket /var/run/postgresql
  port   5432
```
5. Also created a new user who owns this data base, so we switch our root user to this one: postgres@ 
6. sudo -i -u postgres - Switched a user
7. psql - connect ot the Database - Now you can type postgresql Commands or leave it to the application
8. \conninfo  -check if you connected to DB
9. \q - exit DB
10. exit - logout from the postgres@ user to the root user

-------------------
 Creating UNIX user in Ubuntu
-------------------
