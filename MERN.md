video: https://www.youtube.com/watch?v=ivDjWYcKDZI&list=WL&index=11&t=0s

**AUTH**
===================
<ul>
  <li>1. Back: App.js при логинизации юзера - генерим ему JWT token- и отправляем на front JWT токен и userId=>  res.json({token, userId:user.id})</li>
   <li>2. Front: AuthPage.js функция loginHandler - отправляет POST запрос с данными пользователя и получает ответ его userId(5f12bd1b4818b928d3583e62) и JWT Token</li> 
  <li>3. Front: Создаем  сustom hook: auth.hook.js (p.22) - F:useAuth который сохраняет (login)/удаляет(logout) jwt token, userId В local state и Local Storage</li>
  <li>4.Front: Создаем AuthContext чтобы передавать данные c auth.hook.js всем компонентам в приложении (p.24) </li>
    <li> 5.Front: Используем auth.hook.js в Front App.js (p.23) Тянем с него данные (jwtToken, userId, login, logout) и передаем данные с него в AuthContext.Provider(p.25) (обарчиваем приложение) После чего всего все данные с него доступны каждому компоненту в приложении. И через Context можно запускать login/logout c auth.hook.js </li>
   <li>6.Front: В AuthPage мы тянем данные с AuthContext (const auth = useContext(AuthContext)) и в момент логинизации обновляем их p.26 => auth.login(data.token, data.userId). По факту мы сохраням данные в Local Storage и в localState Приложения. Одновременно флаг isAuthentificated меняется на true (так как есть токен) </li>
   <li>7. Front: В routes.js создаем функцию и как аргумент передаем isAuthentificated  true или False - В зависимости от этого перенаправляем пользователя на соответствующий роут (p.19)</li>
   <li>8. Front: Теперь по умолчанию при логинизацию редиректит на ту страницу, которая указана для зарегестрированных пользователей.</li>
   <li>9. Front: Аналогично в меню указываем  auth.logout() - для выхода с системы с редиректом на главную.</li>
    <li>10. Front:  При отправке запроса на сервер мы в header в поле authentification: добавляем наш токен</li>
     <li>11. Back: На сервере создаем Middleware (auth.middleware.js) по обработке requests -он получает req. вытягивает от туда данные с authentification - cам токен. Декодирует токен и вытягивает userId: Создает новый метод в обьекте res и сохраняет в нем userId. После чего передает response -  дальше на обработку.</li>
  <li>12. Back: при обработке роута -вставляем middleware -получаем userId и используем его для работы с базой (обновление/удаление) -пример link.routers.js (p.29)
  </li>
  <li> 13. Front: при отправке запроса на сервер необходимо в заголовок header добавить поле  Authorization: `Bearer ${auth.token}` (p.32) -по которому будет происходить аутентификация пользователя на серваке </li>
    <li> 14. Front: Обновить App.js -чтобы проверяло, загрузились ли Auth данные в прилжение. Если еще нет то показывать Loader а не компоненты (p.35). Иначе будут проблемы с роутами и отображением компонентов - будет показывать как для не авторизованного юзера</li>
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

21) - 1 Пока работаем над страницами - компонтентами реакта:
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
                                   value={form.email}
                                   onChange={changeHandler}/>
                            <label htmlFor="email">Email</label>
                        </div>

                        <div className="input-field">
                            <input placeholder="Введите пароль"
                                   id="password"
                                   type="text"
                                   name="password"
                                   className="validate"
                                   value={form.password}
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

21) - 2 ***Внимание!*** 

<p><strong>HTTP.HOOKS.JS</strong></p>
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
21) - 3 <p> <strong>PROXY</strong></p>
Мы используем Proxy для автоматического перевода урлов с порта 3000 на 5000, для этого в Front: package.json добавлям:
```
 "proxy": "http://localhost:5000",  -все запросы с фронта мы перенаправляем на сервер
```
21) - 4 <p> <strong>BODY MIDDLEWARE</strong></p>

По умолчаниюю Back Server: node воспрринимает body запросы как стримы с undefined и чтобы коректно считывало, нужно добавить middleware на Back в app.js:
```
// Чтобы считавало правильно request body
app.use(express.json({extended:true}))  
//теперь body будет как пустой обьект {object, object}- фиксится в http.hooks нужно указать что это json object.

```
21) - 5  <p><strong>MESSAGE.HOOK.JS</strong></p>
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
<p>Front: Создаем custom hook: <strong>hook->auth.hook.js</strong> Работает исключительо над авторизацией человека в систему</p>

```
import {useState, useCallback, useEffect} from 'react'

const storageName='userData'

export const useAuth =()=>{
    const[token, setToken]=useState(null)// отвечает за токен
    const[userId, setUserId]=useState(null) //отвечает за юзер id
    const [ready, setReady] = useState(false) // проверяет произошла ли полностью загрузка auth данных с сервака, так как у нас запрос асинхронный и может отработать раньше

    const login = useCallback((jwtToken, id)=>{
        setToken(jwtToken)
        setUserId(id)
        localStorage.setItem(storageName, JSON.stringify({userId:id, token:jwtToken}))
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

23) Обновляем на FRONT APP.js - добавляем Auth hook <b>[AUTH]</b> и оборачиваем приложение в контекст AuthContext (p.24):

```
import React from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import {useRoutes} from './routes'
import {useAuth} from "./hooks/auth.hook";
import 'materialize-css'
import {AuthContext} from "./context/AuthContext";

function App() {
    const {token, login, logout, userId, ready} = useAuth() //!!! обновляется при каждом рендеринге прилжения
    const isAuthenticated = !!token  //!! перевод в boolean true or false -  если токен есть то true
  const routes = useRoutes(isAuthenticated)  //true or false для передачи соответствующих роутов
  return (
      <AuthContext.Provider value={{token, login, logout, userId, isAuthenticated}}>
      <Router>
  <div className="container">{routes}</div>
      </Router>
      </AuthContext.Provider>
  );
}
export default App;

```

24) Мы хотим через контекст передавать все данные по token, userId всему нашему приложению. <b>[AUTH]</b>:
Front=>src=>new folder:context=> File: <b>AuthContext.js</b>

```
import {createContext} from 'react'

function noop(){}

export const AuthContext = createContext( {
    token:null,
    userId:null,
    login:noop,
    logout:noop,
    isAuthenticated:false

})

```
25) Front: Обновляем <b>AuthPage</b> компонент, добавляем useContext() => useContext(AuthContext) и срабатывание его в момент логинизации.

```
import React, {useState, useEffect, useContext} from 'react'
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook"; //custom hook!
import {AuthContext} from '../context/AuthContext'

export const AuthPage=()=>{
    const auth = useContext(AuthContext)
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
    
   // M global object from Material Design - сделать активными инпуты -чистка старого текста в полях ) 
 useEffect(()=>{
      window.M.updateTextFields()   
    },[])
   
   
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
         
         // Используем метод login с AuthContext -чтобы данные с запроса закинуть в контекст
            // login в AuthContext мы получаем в App.js c auth.hook.js
          
          auth.login(data.token, data.userId)

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

26) Front Создаем компоненты для Application. в src=>new folder components=> new file: <b>Navbar.js</b> Тут же делаем кнопку с <b>Logout</b>

```
import React, {useContext} from 'react'
import {NavLink, useHistory} from 'react-router-dom';
import {AuthContext} from "../context/AuthContext";

const Navbar = () => {
    const history = useHistory()
    const auth = useContext(AuthContext)

    const logoutHandler = (event)=>{
        event.preventDefault()
        auth.logout()
        history.push('/')  // делает редирект на главную после логаута
    }
    return (
        <nav>
            <div className="nav-wrapper blue darken-1" style={{padding: '0 2rem'}}>
                <span className="brand-logo">Сокращение ссылок</span>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><NavLink to="/create">Создать</NavLink></li>
                    <li><NavLink to="/links">Ссылки</NavLink></li>
                    <li><a href="/" onClick={logoutHandler}>Выйти</a></li>
                </ul>
            </div>
        </nav>
    )
}
export default Navbar

```
27) Обновляем Front App.js  -  добавляем меню (NavBar):

```
import React from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import {useRoutes} from './routes'
import {useAuth} from "./hooks/auth.hook";
import 'materialize-css'
import {AuthContext} from "./context/AuthContext";
import Navbar from "./components/Navbar";

function App() {
    const {token, login, logout, userId} = useAuth() //обновляется при каждом рендеринге прилжения
    const isAuthenticated = !!token  //!! перевод в boolean true or false -  если токен есть то true
  const routes = useRoutes(isAuthenticated)  //true or false для передачи соответствующих роутов
  return (
      <AuthContext.Provider value={{token, login, logout, userId, isAuthenticated}}>
      <Router>
        
        {/*если залогинен то дополнительно показываем NavBar*/}
          {isAuthenticated&&<Navbar/>} 
          
  <div className="container">{routes}</div>
      </Router>
      </AuthContext.Provider>
  );
}
export default App;

```

</br>
=========== AUTH Login/Logout DONE Back+Front======
</br>

  **Back - разрабатываем функционал приложения -обработка API запросов:**

28) Back: in folder: models=>new file: <b>Link.js</b> -новая модель для DB по обработке и хранению ссылок:

```
const {Schema, model, Types} = require('mongoose')

// fields for User:
const schema = new Schema({
   from:{type:String, required:true},
    to: {type:String, required:true,unique:true},
    code: {type:String, required:true, unique:true},
    date: {type:Date, default:Date.now},
    clicks: {type:Number, default: 0},
    owner:{type:Types.ObjectId, ref:'User'}   //связка с моделью юзера
})
module.exports = model('Link', schema)

```

29) -1 !!!! Back: In folder: router=> new file: <b>link.routers.js</b> - роуты будут отвечать за генерацию ссылок: Чтобы получить данные о том, какой пользователь отправляет запрос -можно использовать jwt token данные (Так как в нем зашифрован userId). Для этого в link.routers.js добавляем Middleware, который будет проверять а авторизован ли пользователь? валидный ли у него токен и если да, то получать из него необходимые данные (p.30) <b>[AUTH]</b>. 

```
const {Router} = require('express')
const config = require('config')
const shortid =require('shortid')
const Link = require('../models/Link')
const auth=require('../middleware/auth.middleware')
const router = Router()

//генерация ссылки

router.post('/generate', auth, async(req,res)=>{

    try{
        //для вставки в урл новой сокращенной ссылки:
        
        const baseUrl= config.get('baseUrl')
       
       // с client мы будем получать обьект  "from" -откуда делаем ссылку:
       
       const {from} = req.body
       
       // генерим короткую ссылку:
       
       const code = shortid.generate()
     
     // проверяем есть ли уже такая ссылка с from
     
     const existing = await Link.findOne({from})
    
    //если есть то просто ее отправляем
    
    if (existing) {
            return res.json({link:existing})
        }
     
     // формируем сокраещенную ссылку:
     
     const to = baseUrl+'/t/'+code
     
     // готовим новый обьект ссылки чтобы отправить в базу
     
     //  owner:req.user.userId - тянется с auth middleware -описание ниже
     
     const link = new Link({
            code, to, from,  owner:req.user.userId
        })
     
     //  cохраняем новую ссылку в базу:
         await link.save()
         
     // отправляем весь обьект  link на фронт

        await res.status(201).json({link}) 

    } catch(e){
        await res.status(500).json({message:'Что-то пошло не так, попробуйте снова [link-routes Error-1]'})
    }

})

//получение всех ссылок
// auth  - это middleware который обрабатывает jwt и передает данные по юзеру в req.user -для использования дальше
router.get('/', auth, async(req,res)=>{
    try{
        //ищем все ссылки
        
      const links=await Link.find({owner:req.user.userId})
      // user - был создан в middleware и добавлен к обьекту req как метод и туда закинут обьект {userId:user.id}
       
       await res.json(links) // отправляем данные на фронт

    } catch(e){
        await res.status(500).json({message:'Что-то пошло не так, попробуйте снова [link-routes Error-2]'})
    }


})
//получение ссылки по id
router.get('/:id', auth, async(req,res)=>{
    try{
        const link=await Link.findById(req.params.id)
       
        await res.json(link) // отправляем данные на фронт

    } catch(e){
        await res.status(500).json({message:'Что-то пошло не так, попробуйте снова [link-routes Error-3]'})
    }


})
module.exports=router

```
29) - 2 Back: устанавливаем библиотеку по сокращению ссылок (используется в link.routers.js)

```
npm short id 
```

30 !!!!Back: Cоздаем middleWare для проверки авторизован ли пользователь, валидный ли у него токен и какой у него id. Создаем folder <b> middleware=>file auth.middleware.js </b> <b>[AUTH]</b>: 

```
const jwt =require('jsonwebtoken') //чтобы раскодировать токен с фронта
const config=require('config')

// next- pass req to other function

module.exports = (req, res, next) => {

// OPTIONS - REST API method -checks if server is available
   
   if (req.method === 'OPTIONS'){
        return next()
    }
    try {
        // в request в header смотрим поле authorization и данные в нем формата: "Bearer TOKEN"
        // Парсим данные делаем split() чтобы вытянуть только TOKEN - первый элемент масива
       
       const token=req.headers.authorization.split(' ')[1]
        
        // если нет токена:
        if (!token){
            return res.status(401).json({message:'Нет Авторизации'})
        }
        
        //если токен есть, то его нужно раскодировать - jwt.verify - раскодирует токен
       
       const decoded = jwt.verify(token, config.get('jwtSecret'))
       
       // ложим его в обьект request для передачи дальше по факту создаем новый метод и засовываем в него данные
       
       req.user=decoded
      
      //продолжаем выполнение запроса- отправляем его в роуты
     
     next()


    } catch(e){
        res.status(401).json({message:'Нет Авторизации-ошибка'})

    }
}

```

31) Back: Подключаем link.routers.js в App.js (back)- добавляем:

```
app.use('/api/link', require('./routes/link.routes')) 
```

  **FRONT - разрабатываем Компоненты и отправка Запросов на сервер:**


32) Верстка и разработа функционала для внутренних страниц компонентов. Начнем с pages=>CreatePage.js

```
import React, {useEffect, useState, useContext, } from 'react'

import {useHttp} from "../hooks/http.hook";
import AuthContext from '../context/AuthContext';
import { useHistory } from 'react-router-dom';

export const CreatePage =()=>{
    const history=useHistory()

    const auth=useContext(AuthContext) // вытягиваем данные по токену с контекста

    const {request}=useHttp()
    const  [link, setLink] =useState('');

    useEffect( ()=>{window.M.updateTextFields()},[])

    const pressHandler = async (event)=>{
        // проверяем что нажали enter
        if (event.key==='Enter'){
            try {
                // формируем link
                const data = await request ('/api/link/generate', 'POST', {from:link}, {
                    Authorization: `Bearer ${auth.token}` // передаем данные по токену в header
                })  // параметры передачи описаны в хуке useHttp -так как request вытянут от туда
                history.push(`/detail/${data.link._id}`) //redirect to the detail link page

            } catch (e){

            }

        }
    }


    return (
        <div className="row">
            <div className="cpl s8 offset-s2"  style={{paddingTop: '2rem'}}>

                <div className="input-field">
                    <input placeholder="Вставьте ссылку"
                           id="link"
                           type="text"
                           value={link}
                           onChange={e=>{setLink(e.target.value)}}
                           onKeyPress ={pressHandler} //если нажимем Enter то формируем ссылку
                    />
                    <label htmlFor="link">Введите Ссылку</label>
                </div>

            </div>

        </div>
    )
}

```
33) Реализация страницы pages=>CreatePage.js 

```

import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import Loader from '../components/Loader'
import LinkCard from '../components/LinkCard'


export const DetailPage =()=>{
    const {request, loading} = useHttp()
    const {token}=useContext(AuthContext)

    const[link, setLink]= useState(null) // ccылка которуб мы получим с бекенда по умолчанию нет

    const linkId=useParams().id  // тянем с урла id

    // отправляем запрос на бекенд с заданным id

    const getLink = useCallback( async()=>{
        try{
            const fetched = await request(`/api/link/${linkId}`, 'GET', null , {
                Authorization: `Bearer ${token}`
            })
            setLink(fetched)

        }catch (e){

        }

    },[token, linkId, request])

    // Делаем запрос (запуск функции с запросом) - при  начальной загрузке станицы
    useEffect( ()=>{

        getLink()

    },[getLink])

    //loading берем с хука - пока нет Auth данных в приложении- показываем только loader

    if (loading){
        return <Loader/>
    }
    // {!loading&&link&&<LinkCard link={link}/>}  - если не Loading и есть уже есть Link - то показываю компонент LinkCard
    // В LinkCard как props передаем ответ с сервера (link object) где его и разворачиваем.

    return (
        <div>
            {!loading&&link&&<LinkCard link={link}/>}
        </div>
    )
}


```

34) В процессе реализации p.33 необходимо было создать два дополнительных компонента:

34) - 1  components=> file: <b>Loader.js</b> (колесо загрузки):

```
import React from 'react'

const Loader = ()=>{

    return <React.Fragment>
        <div style={{display:'flex',justifyContent: 'center', paddingTop:'2rem'}}>
            <div className="preloader-wrapper active">
                <div className="spinner-layer spinner-red-only">
                    <div className="circle-clipper left">
                        <div className="circle"/>
                    </div>
                    <div className="gap-patch">
                        <div className="circle"/>
                    </div>
                    <div className="circle-clipper right">
                        <div className="circle"/>
                    </div>
                </div>
            </div>
        </div>

    </React.Fragment>
}
export default Loader

```
34) - 2  components=> file: <b>LinkCard.js</b>

```
import React from 'react'
const LinkCard =({link})=>{
    return (<>
            <h2>Cсылка: </h2>
            <p>Ваша ссылка: <a href={link.to} target="_blank" rel="noopener noreferrer">{link.to}</a></p>
            <p>Откуда: <a href={link.from} target="_blank" rel="noopener noreferrer">{link.from}</a></p>
            <p>Количество кликов по ссылке: <strong>{link.clicks}</strong></p>
            <p>Дата создания: <strong>{new Date(link.date).toLocaleDateString()}</strong></p>
        </>

    )

}
export default LinkCard

```
35) Обновить Front: <b>App.js </b>- добавить проверку на загрузку Auth Данных в приложении, если они еще не загрузились -то показывать Loader, если загрузились -то показывать вместо компонентов приложения

```
import React from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import {useRoutes} from './routes'
import {useAuth} from "./hooks/auth.hook";
import 'materialize-css'
import {AuthContext} from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Loader from "./components/Loader";   // !!! NEW

function App() {
    const {token, login, logout, userId, ready} = useAuth() //обновляется при каждом рендеринге прилжения
    const isAuthenticated = !!token  //!! перевод в boolean true or false -  если токен есть то true
  const routes = useRoutes(isAuthenticated)  //true or false для передачи соответствующих роутов

    //  если auth данные еще не подгрузились с сервера, показываем loader для всего приложения !!!! NEW
    if(!ready){
        return <Loader/>
    }

  return (
      <AuthContext.Provider value={{token, login, logout, userId, isAuthenticated}}>
      <Router>
          {/*если залогинен то дополнительно показываем NavBar*/}
          {isAuthenticated&&<Navbar/>}
  <div className="container">{routes}</div>
      </Router>
      </AuthContext.Provider>
  );
}
export default App;

```
36) Front:Добавление страницы pages=><b>LinksPage.js</b>

```
import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import Loader from '../components/Loader'
import LinksList from '../components/LinksList'

export const LinksPage = () => {
    const [links, setLinks] = useState([])
    const {loading, request} = useHttp()
    const {token} = useContext(AuthContext)

    const fetchLinks = useCallback(async () => {
        try {
            const fetched = await request('/api/link', 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setLinks(fetched)
        } catch (e) {}
    }, [token, request])

    useEffect(() => {
        fetchLinks()
    }, [fetchLinks])

    if (loading) {
        return <Loader/>
    }

    return (
        <>
            {!loading && <LinksList links={links} />}
        </>
    )
}

```
36) - 1 К этой странице делаем дополнительный компонент <b> components=>LinksList.js </b>

```
import React from 'react';
import {Link} from 'react-router-dom';

const LinksList = ({links})=>{
    if (!links.length){
        return <p className="center">Ссылок пока нет</p>
    }

    return <React.Fragment>
        <table>
            <thead>
            <tr >
                <th>N</th>
                <th>Оригинальная</th>
                <th>Сокращенная</th>
                <th>Открыть</th>
            </tr>
            </thead>

            <tbody>

            {links.map( (link, index)=>{
                return (
                    <tr key={link._id}>
                        <td>{index+1}</td>
                        <td>{link.from}</td>
                        <td>{link.to}</td>
                        <td><Link to={`/detail/${link._id}`}>Открыть</Link></td>
                    </tr>

                )
            })}

            </tbody>
        </table>
    </React.Fragment>
}

export default LinksList
```
По фронту приложение закончено.

  **BACK - финализация проекта. Доработка логики редиректов и подсчета ссылок на сервере:**
  
  37) Back: Создаем <b>Folder: routes=>File: redirect.routes.js </b>
  
  ```
  
  ```
  38) Добавляем redirect.routes.js - в app.js:
  ```
  app.use('/t',require('./routes/redirect.routes') )

  ```
  **================== ПРИЛОЖЕНИЕ ЗАКОНЧЕНО ================**
  
  **ДЕПЛОЙ**
