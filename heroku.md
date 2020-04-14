- https://devhints.io/heroku Cheat List

**usefull commands**
```
 -a, --app=app        (required) app to run command against
 
heroku logs --tail --app jmerenka-petition   - check Error Logs
heroku run bash -a jmerenka-petition    - visit app (file structure)

NODE_ENV=production npm start  - diferences beetween prod and dev mode

heroku config:set NODE_MODULES_CACHE=false -a jmerenka-petition -  temporarily disable any module caching!
```
