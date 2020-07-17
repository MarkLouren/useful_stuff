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
11) Подключаем bcrypt для шифрования паролей: https://www.npmjs.com/package/bcryptjs и Валидатор для полей (email, password, etc) + JWT  https://www.npmjs.com/package/jsonwebtoken
```
npm i bcryptjs
npm i express-validator
npm i jsonwebtoken
```

12) Обновление файла auth.routes.js -> добавление логики регистрации и валидации данных + добавление логики логинизации (валидация, jwt) [JWT]
```
const {Router} =require('express')
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const {check, validationResult} = require('express-validator')
const User = require('../models/User')
const router=Router()
// api/auth/
router.post(
    '/register',
    // Validation middleware:
    [
        check('email', 'Некорректный емейл').isEmail(),
        check('password', 'Минимальная длина пароля 6 символов').isLength({min:6})
    ],
    async (req, res)=>{
    try{
        //validation results:
        const errors = validationResult(req)
        if (!errors.isEmpty()){
            return res.status(400).json(
               {
                   errors:errors.array(),
                   message:'Не корректные регистрационные данные'
               }
           )
        }
        //handle req data
        const {email, password}=req.body
        const candidate = await User.findOne({email}) //ищем - есть ли юзер в базе

        if (candidate){
           return res.status(400).json({message:'Такой пользователь уже существует [1.1]'})
        }
        const hashedPassword = await bcrypt.hash(password, 12) //bcrypt is async
        const user = new User({email, password:hashedPassword}) //  cоздаем Юзера
        await user.save()
        res.status(201).json({message:'Пользователь создан'})


    } catch(e){
       res.status(500).json({message:'Что-то пошло не так, попробуйте снова [1]'})
    }

})
router.post('/login',
    [
    check('email', 'Введите корректный емейл').normalizeEmail().isEmail(),
    check('password', 'Ведите пароль').exists()],
    async (req, res)=>{

    try{
        //validation results:
        const errors = validationResult(req)
        if (!errors.isEmpty()){
            return res.status(400).json(
                {
                    errors:errors.array(),
                    message:'Не корректные данные логинизации'
                }
            )
        }
        //handle req data
const{email, password} = req.body
    // проверка наличия пользователя
const user = await User.findOne({email})
if (!user){
    return res.status(400).json({message:'Пользователь не найден'})
}
// проверка пароля
        const isMatch = await bcrypt.compare(password, user.password)
if (!isMatch){
    return res.status(400).json({message:'Введите правильный пароль'})
}
// проверка успешна -генерим jwt:
        const token = jwt.sign(
            {userId:user.id},
            config.get('jwtSecret'),
            {expiresIn: '1h'}
            )
    //возвращаем токен в ответе
      await  res.json({token, userId:user.id})

    } catch(e){
        await res.status(500).json({message:'Что-то пошло не так, попробуйте снова [1.3]'})
    }
})
module.exports=router

```
13) **Create FrontEnd**
```
npx create-react-app client   - cоздаем реакт app в папке client
cd client - переходим  в client
rm -rf node_modules/ - удаляем модули
rm -rf .git - удаляем git
npm i -  уставлливаем зависимости что есть в  package.json

```
=>оставляем чистый react app 

14) Front: in App.js=> оставляем pure Template:
```
import React from 'react'

function App() {
  return (
  <div><h1>Hello</h1></div>
  );
}
export default App;
```
16) Back -настраиваем, чтобы сервер и фронт запускались одновременно. Для этого в package.json (Back) ( команда: <strong>npm run dev</strong>)
```
 "scripts": {
    "start": "node app.js",
    "server": "nodemon app.js",
    "client": "npm run start --prefix client",
    "dev": "concurrently  \"npm run server\" \"npm run client\" "
  },
```
17) Front: начинаем работать над клиентом. Установим стили с библиотеки:
```
npm install materialize-css@next
```
Добавляем в проект => app.js:
```
import 'materialize-css'
```
index.css
```
@import "~materialize-css/dist/css/materialize.min.css";
```
18) Front: Cоздаем Компоненты Реакта: 
в папке src => new folder: pages - add file AuthPage.js (blank template)- react APP components=>
```
import React from 'react'
export const AuthPage=()=>{
    return(
        <div>
            <h1>Auth Page</h1>
        </div>
    )
}
```
Other new Files: LinksPage.js, CreatePage.js, DetailPage - с тем же  blank template

19)  Front: Работа с Router:
```
npm i react-router-dom
```
cоздаем file: routes.js  <strong>[AUTH есть]</strong>
```
import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {LinksPage} from './pages/LinksPage'
import {CreatePage} from "./pages/CreatePage";
import {DetailPage} from "./pages/DetailPage";
import {AuthPage} from "./pages/AuthPage";

export const useRoutes = (isAuthenticated)=>{
    if (isAuthenticated) {
        return (
            <Switch>
                <Route path="/links" exact><LinksPage/></Route>
                <Route path="/create" exact><CreatePage/></Route>
                <Route path="/detail/:id"><DetailPage/></Route>
                <Redirect to="/create"/>
            </Switch>
        )
    }
    return (
        <Switch>
            <Route path="/" exact><AuthPage/></Route>
            <Redirect to="/" />
        </Switch>
    )

}

```
20) Добавляем роуты в FRONT: app.js <strong>[Пока авторизация false]</strong>
```
import React from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import 'materialize-css'
import {useRoutes} from './routes'

function App() {
  const routes = useRoutes(false)
  return (
      <Router>
  <div className="container">{routes}</div>
      </Router>
  );
}
export default App;
```

21) Пока работаем над страницами- компонтентами реакта:
- AuthPage.js
```
```



Нам нужно понять авторизованный ли пользователь и в зависимости от его Авторизации -показывать те или иные сылки
