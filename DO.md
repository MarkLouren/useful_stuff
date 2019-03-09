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

-------------------
Setting up Nginx and REST API
-------------------

 Ngix - receive external requests and decides what to do with them. Stays beetwen a user and an application. Aallows to launch several Flax applications simultaneously, redirect requests to different apps, reverse proxy etc.

34. sudo apt-get update  - Update pacakges
35. sudo apt-get install nginx - Install nginx

#### Allow nginx to work via Ununtu firewall (ufw) or it'll be blocked

36. sudo ufw status - Check the status of a firewall
37. sudo ufw enable - Enable a firewall
38. sudo ufw  allow 'Nginx HTTP'  - Add rule, where Nginx works via Firewall
39. sudo ufw allow ssh - in order we'll not belog out of the server
40. sudo ufw status - check if everything works
41. systemctl status nginx - check if nginx installed properly 

#### Change configuration of Nginx

42. sudo vi /etc/nginx/sites-available/items-rest.conf - Change configuration of Nginx in order to work with our Rest Api. Creates a new file. "I" - Insert mode -edit file
43.
```
 server {
listen 80;
real_ip_header X-Forwarded-For;
set_real_ip_from 127.0.0.1;
server_name localhost;

location / {
include uwsgi_params;
uwsgi_pass unix:/var/www/html/items-rest/socket.sock;
uwsgi_modifier1 30;
 }

error_page 404 /404.html;
location = /404.html {
root /usr/share/nginx/html;
}
error_page 500 502 503 504 /50x.html;
location = /50x.html {
root /usr/share/nginx/html;}
}
``` 
##### Where:
* listen 80; - listen the port, for sites can be other
* real_ip_header X-Forwarded-For; -forward ip address of requester to our flask app
* set_real_ip_from 127.0.0.1; - Check that requests come from the local host
* location / - whoever visit our root / should be redirected to
* include uwsgi_params - _uwsgi_ progrmam that helps to work servers more efficiently 
* uwsgi_pass unix:/var/www/html/items-rest/socket.sock; Connection point beetween flask and nginx
* uwsgi_modifier1 30 - tels when to die if it becomes blocked
```
error_page 404 /404.html;
location = /404.html {
root /usr/share/nginx/html

```
* Serve 404.html page from the directory: /usr/share/nginx/html
* Summary when we enter any page, we go to our Flax app exclusion pages 404, 50x. More you can learn by reading about _uwsgi_ protocol and it's documentation
44. esc, :wq - quit the file

45. sudo ln -s /etc/nginx/sites-available/items-rest.conf /etc/nginx/sites-enabled/ - create a soft(-s) link (ln) between our created file and enabled directory. Makes items-rest.conf enable.
46. sudo mkdir /var/www/html/items-rest - create a folder where our application will live
47. sudo chown jose:jose /var/www/html/items-rest ChangeOwner (chown) for items-rest, make jose an owner

#### Clone App from github to the server and istall python env

48. cd /var/www/html/items-rest/  -Move to the folder
49. git clone https://github.com/MarkLouren/stores-rest-api.git . - Clone application from github (. in the end- clone at the same directory)
50. mkdir log - Create a log folder 
51. sudo apt-get install python-pip python3-dev libpq-dev - Install Python and related liabraries
52. pip install virtualenv - Set up python env
53. virtualenv venv --python=python3.5 - create folder in env
54. source venv/bin/activate - active env => should go to (env mode)
55. pip install -r requirements.txt  - install all requirements from the requirements.txt to the virtual environment

-------------------
 Setting up uWSGI to run our REST API
-------------------
56. start session or continue: ssh jose@api
57. Start Ubuntu service (contor start/restart etc apps) for this aim:
sudo vi /etc/systemd/system/uwsgi_items_rest.service  - Change the system file for uwsgi
```
[Unit]
Description=uWSGI items rest

[Service]
Environment=DATABASE_URL=postgres://jose:pass@localhost:5432/jose
ExecStart=/var/www/html/items-rest/venv/bin/uwsgi --master --emperor /var/www/html/items-rest/uwsgi.ini --die-on-term --uid jose --gid jose --logto /var/www/html/items-rest/log/emperor.log
Restart=always
KillSignal=SIGQUIT
Type=notify
NotifyAccess=all

[Install]
WantedBy=multi-user.target
```
#### Where:
* Description - just a description of the project
* Environment - describe variables before the service starts, so Server will know about them
* DATABASE_URL=postgres://jose:password@localhost:5432/jose - set up a link to database (database user and password)@NameOfServer:Port/NameOfDataBase
* ExecStart=/var/www/html/items-rest/venv/bin/uwsgi --master --emperor /var/www/html/items-rest/uwsgi.ini --die-on-term --uid jose --gid jose --logto /var/www/html/items-rest/log/emperor.log - Which program should launch when we start the server, use -- master Process, --emperor - Controler, uwsgi.ini- configuration file for launching the program, --die-on-term  - Terminate python program in uwsgi when we close uwsgi, --uid jose - run uid proccess as user jose, gid -group id user, emperor.log - where to log files.
* Restart=always - when restart
* KillSignal=SIGQUIT  - Command to force quit the server without loosing data
* Type=notify   - Notifcation settings
* NotifyAccess=all
59. ESC, :wq
60. cd /var/www/html/items-rest - move to directory
61. vi uwsgi.ini - change uwsgi.ini. (Delete everything in vi editor Click: dG)
```
[uwsgi]
base = /var/www/html/items-rest
app = run
module = %(app)

home = %(base)/venv
pythonpath = %(base)

socket = %(base)/socket.sock
chmod-socket = 777
processes = 8

threads = 8
harakiri = 15
callable = app
logto = /var/www/html/items-rest/log/%n.log
```
#### Where:
* base = /var/www/html/items-rest - where the file exist
* app = run  - run .py file
* module = %(app) - Loads veriable app
* home = %(base)/venv   - base -home directory
* pythonpath = %(base) - where the python located
* socket = %(base)/socket.sock -location of a socket file
* chmod-socket = 777 - permission to access, 777 - all
* processes = 8
* threads = 8
* harakiri = 15 - if one of the threads blocked than it willbe killed in 15 sec and created another one
* callable = app - call the variable
* logto = /var/www/html/items-rest/log/%n.log  - % it's uwsgi
62. sudo systemctl start uwsgi_items_rest  =go into the service _uwsgi_items_rest.service_ and run it
63. vi log/uwsgi.log - just to check that everything works

-------------------
 Testing our API: 
-------------------
##### Launch Nginx
64.  sudo rm /etc/nginx/sites-enabled/default - Remove Default configuration file for Nginex !! Because it loads the first
65. sudo systemctl reload nginx  - Relad the nginx - or other !!!!!Command: sudo service nginx restart ( it worked for me)
66. systemctl status nginx  - Check the status nginx! Check the ERRORS -command: systemctl status nginx.service
67. sudo systemctl start uwsgi_items_rest - run uwsgi in our app (it'll connect to Nginx)
68.

