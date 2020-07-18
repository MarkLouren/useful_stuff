video: https://www.youtube.com/watch?v=ivDjWYcKDZI&list=WL&index=11&t=0s

**AUTH**
===================
<ul>
  <li>1. Back: App.js при логинизации юзера - генерим ему JWT token- и отправляем на front JWT токен и userId=>  res.json({token, userId:user.id})</li>
   <li>2. Front: AuthPage.js функция loginHandler - отправляет POST запрос с данными пользователя и получает ответ его userId(5f12bd1b4818b928d3583e62) и JWT Token</li> 
  <li>3. Front: Создаем  сustom hook: auth.hook.js (p.22) - F:useAuth который сохраняет (login)/удаляет(logout) jwt token, userId В local state и Local Storage </li>
  
  <li>4. Используем этот Хук в Front App.js (p.23) Тянем с него данные (jwtToken, userId, login, logout) </li>
  <li>5. Используем Context чтобы передавать эти данные всем компонентам в приложении (p.24) </li>
   <li></li>
    <li></li>
   <li>Front: В routes.js создаем функцию и как аргумент передаем Auth true или False - В зависимости от этого показываем роуты</li>
   <li></li>
</ul>

===================
**Project Workflow**

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
<p>Нам нужно понять авторизованный ли пользователь и в зависимости от его Авторизации -показывать те или иные сылки</p>
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

21)-1 Пока работаем над страницами - компонтентами реакта:
**AuthPage.js**
```
import React, {useState, useEffect} from 'react'
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook"; //custom hook!

export const AuthPage=()=>{
    const message = useMessage()
    const {loading, request, error, clearError}=useHttp()

    const [form, setForm]= useState({
        email:'',
        password:''
    })
    //обработка ошибки с http запроса и вывод ее пользователю
    useEffect(()=>{
        message(error)  //message - обвертка с хука useMessage
        clearError() //очистка errors obj
    },[error, message, clearError])
    //обработка изменяющихся параметров в форме через Хук!
    const changeHandler = event => {
        setForm({...form, [event.target.name]:event.target.value})
    }
    //отправка запроса на Сервер через хук:
 const registerHandler = async()=>{
        try{
            const data = await request('/api/auth/register', 'POST', {...form})
            //popup что пользователь создан
            message(data.message)

        } catch(e){}
 }

    const loginHandler = async()=>{
        try{
            const data = await request('/api/auth/login', 'POST', {...form})
            //popup что пользователь создан
            message(data.message)

        } catch(e){}
    }


    return(
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>Сократи Ссылку</h1>

                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Авторизация</span>

                        <div className="input-field">
                            <input placeholder="Введите Емейл"
                                   id="email"
                                   type="text"
                                   name="email"
                                   className="validate"
                                   onChange={changeHandler}/>
                            <label htmlFor="email">Email</label>
                        </div>

                        <div className="input-field">
                            <input placeholder="Введите пароль"
                                   id="password"
                                   type="text"
                                   name="password"
                                   className="validate"
                                   onChange={changeHandler}/>
                            <label htmlFor="password">Password</label>
                        </div>

                    </div>

                    <div className="card-action">
                        <button className="btn yellow darken-4"
                                style={{marginRight: 10}}
                                disabled={loading}
                                onClick={loginHandler}
                        >Войти</button>
                        <button className="btn grey"
                                onClick={registerHandler}
                                disabled={loading}
                        >Регистрация</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
```

21)-2***Внимание!***
<p><strong>Первое: HTTP.HOOKS.JS</strong></p>
<p>В файле выше используется custom hook для отправки запросов на сервер.
Делается в отдельном файле => new directory: <strong>hooks=> new file: http.hook.js </strong></p>

```
//используем нативный fetch - должен взаимодействовать с сервером
import {useState, useCallback} from 'react'

export const useHttp=()=>{
const [loading, setLoading]=useState(false) //проверка идет ли загрузка на сервак или нет

 const [error, setError] = useState(null)

//useCallback используется чтобы Реакт не уходил в рекурсию.

    const request = useCallback(async (url, method='GET', body=null, headers={})=>{
 setLoading(true)
        try {
     //Чтобы передвалао правильно body на server а не как {object, object}- если  body есть -переводим в строку
            if (body){
                body=JSON.stringify(body)
                headers['Content-Type']='application/json' //указываем что передаем именно Json
            }
    const response= await fetch(url, {method, body, headers})
    //получили ответ - обрабатываем его:
     const data = await response.json()
         // ок- это глобальный метод для response
     if (!response.ok){
         throw new Error(data.message ||'Что-то пошло не так') //message определен на бекенде
     }
            setLoading(false)
     return data

 } catch(e){
            setLoading(false)
            setError(e.message)
            throw e

 }
    },[])
    //чистит ошибки
    const clearError = useCallback(()=>{setError(null)},[])

    return {loading, request, error, clearError}

}
```
21)- 3 <p> <strong>Второе: PROXY</strong></p>
Мы используем Proxy для автоматического перевода урлов с порта 3000 на 5000, для этого в Front: package.json добавлям:
```
 "proxy": "http://localhost:5000",  -все запросы с фронта мы перенаправляем на сервер
```
21)- 4 <p> <strong>Третье: BODY MIDDLEWARE</strong></p>

По умолчаниюю Back Server: node воспрринимает body запросы как стримы с undefined и чтобы коректно считывало, нужно добавить middleware на Back в app.js:
```
// Чтобы считавало правильно request body
app.use(express.json({extended:true}))  
//теперь body будет как пусой обьект {object, object}

```
21)-5 <p><strong>Четвертое: MESSAGE.HOOK.JS</strong></p>
Обработка ошибок, которые могут быть в запросах и показ их пользователю. В Auth Page это:useMessage().Реализация нового custom hook <strong>hooks=>message.hook.js</strong>
```
import {useCallback} from 'react'

//useCallback - для того, чтобы реакт не входил в цикличный рендеринг

export const useMessage = ()=>{
return useCallback( (text)=>{
    if (window.M&&text){
        window.M.toast({html:text})     //M-global object from Materialize lib. toast -method (popup)
    }
},[])
}

```
22) На Front (клиенте) Создаем Авторизацию по JWT токену. На данном этапе нам при логинизации с бека приходят userId и JWT. <strong>[AUTH]</strong>
<p>При авторизации нам нужно сохранить токен в Local Storage</p>
<p>Front: Создаем custom hook: <strong>hook->auth.hook.js</strong>Работает исключительо над авторизацией человека в систему</p>
```
import {useState, useCallback, useEffect} from 'react'

const storageName='userData'

export const useAuth =()=>{
    const[token, setToken]=useState(null)// отвечает за токен
    const[userId, setUserId]=useState(null) //отвечает за юзер id
    const [ready, setReady] = useState(false)

    const login = useCallback((jwtToken, id)=>{
        setToken(jwtToken)
        setUserId(id)
        localStorage.setItem(storageName, JSON.stringify({userId, token}))
    },[])

    const logout = useCallback(()=>{
        setToken(null)
        setUserId(null)
        localStorage.removeItem(storageName)

    },[])

    // Хотим чтобы когда приложение загружается компонент смотрел есть ли данные в localstorage. Если есть, то чтобы сам автоматически
    //  записал в локальные состояния

    useEffect( ()=>{
        const data = JSON.parse(localStorage.getItem(storageName))

        // если data есть и в ней есть токен, то
        if (data && data.token){
            //передаем в функцию и обновляем local state
            login(data.token, data.userId)
        }
        setReady(true)
    }, [login])

    return {login, logout, token, userId, ready}
}
```
23) Обновляем на FRONT APP.js - добавляем Auth hook <strong>[AUTH]</strong>:
```

```
24) Мы хотим через контекст передавать все данные по token, userId всему нашему приложению.


