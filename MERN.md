1) init a project:
npm init ("main": "app.js",)

2) Backend:

```
create app.js
npm install express mongoose
npm install -D nodemon concurrently
```
3) package.json
```
  "scripts": {
    "start": "node app.js",
    "server": "nodemon app.js"
  },
```
4) package for managing configuration
```
 npm i config
 ```
