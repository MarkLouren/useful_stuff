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
 Creating a UNIX user in Ubuntu
-------------------

11. adduser jose - create a new user
12  Set up a password for the new user
13. visudo - check if a new user has the rights and add them in the line:

```
# User privilege specification
root    ALL=(ALL:ALL) ALL
jose    ALL=(ALL:ALL) ALL
``` 
14.  Click CNTR+O in order to save changes CNTR+X - exit
15.  Check if a new user can log in to the server and his rights:
16.  vi /etc/ssh/sshd_config   - open config file:
17. Change the rights of the user here (PermitRootLogin should be no), click: I+Q (edit mode), ESC after we've made changed
```
# Authentication:
LoginGraceTime 120
PermitRootLogin yes
StrictModes yes
```
18. + Add at the end of the file (Allow user to commect to the server)
```
AllowUsers jose
```
19. wq  - write and quit from the file
20. service sshd reload - Reload the server and use the new configuration
21. exit - exit from the server
22. ssh jose@server_address - login to the server via a new user jose
23. sudo su - log in as a root user root@server_address - exit back to jose

-------------------
Setting up our New user with PostgreSQL Permissions
-------------------
24.  Start from login as jose@rest-api-course-trial user
25. sudo su - change to the root user: root@rest-api-course-trial:/home/jose#
26. sudo -i -u postgres - Change to the potsgres user: postgres@rest-api-course-trial
27. createuser jose -P  - Create user of the postgres table. The same namwe as a Unix user. (-P - set up a password)
28. Create passwords
29.  createdb jose - Move back to the jose@ and Create a new DB jose 
30.  psql - connect to the database jose=> 
31. \conninfo - Check the status of db
32. \q - Leave the DB  (drobdb - if we want to delete a database, use a postgres@ acc)
33. sudo vi /etc/postgresql/9.5/main/pg_hba.conf - User login security configuration file, Change peer=>md5 (all access to ssk of password access (bottom of the page) Q+I, ESC:
```
# "local" is for Unix domain socket connections only
local   all             all                                     peer
```

33. :wq  - Write and Quite












