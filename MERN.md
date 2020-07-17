video: https://www.youtube.com/watch?v=ivDjWYcKDZI&list=WL&index=11&t=0s

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
4) package for managing configuration => https://www.npmjs.com/package/config
```
 npm i config
 ```
5) create directory: config=> file: default.json (where we will be store const for our project
```
{
  "port": 5000,
  "mongoUri": "mongodb+...",
  "jwtSecret": "mySecretKey",
  "baseUrl": "http://localhost:5000"
}
```
6) Create a cluster in MongoDB -> add credentails to "mongoUri" (click a button Connect in mongodb account)
7) in app.js
```
const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const app = express()
const PORT = config.get('port') || 5000

//database connection: mongoose returns a promise so use async

async function start(){
try {
    await mongoose.connect(config.get('mongoUri'), {
    useNewUrlParser:true,
     useUnifiedTopology:true,
     useCreateIndex:true
    })

} catch(e){
    console.log('Server Error', e.message)
    process.exit(1) //process is global object
}
}
start()

app.listen(PORT, ()=>console.log(`App has been started on port ${PORT} `))

```
*check if everything is ok: npm start

8) create a directory "routes" => file: auth.routes.js - initial config:

```
const {Router} =require('express')
const router=Router()
module.exports=router
```
9) add in app.js:
```
app.use('/api/auth', require('./routes/auth.routes'))
```
10) Создаем модель пользователя: directory: models=> file: Users.js-> in file:
```
const {Schema, model, Types} = require('mongoose')

//fields for User:
const schema = new Schema({
email:{type:String, required:true, unique:true},
password: {type:String, required:true},
    links:[{type:Types.ObjectId, ref:'Link'}]  //ref -  к какой коллекции привязываемся?
})
module.exports=model('User', schema)
```
11) Подключаем bcrypt для шифрования паролей: https://www.npmjs.com/package/bcryptjs
```
npm i bcryptjs
```

12) Обновление файла auth.routes.js -> добавление логики регистрации:
```

```

