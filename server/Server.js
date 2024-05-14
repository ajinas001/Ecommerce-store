const express = require('express')
const mongoose = require('mongoose')
const bodyparser = require('body-parser');
const RegisterRouter = require('./Src/Router/Registration/Registerrouter');
const Adminrouter = require('./Src/Router/Admin/Adminrouter');
const Userrouter = require('./Src/Router/User/Userrouter');
const session = require('express-session');
const LoginRouter = require('./Src/Router/Registration/Loginrouter');
require('dotenv').config();


const app = express()

app.use(express.static('./public'))
app.use(bodyparser.json())
app.use(express.urlencoded({ extended: true }))

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
});

app.use(session({
    secret: 'sessionSecrect',
    resave: false,
    saveUninitialized: true
  
  }));

app.use('/register',RegisterRouter)
app.use('/admin',Adminrouter)
app.use('/user',Userrouter)
app.use('/login',LoginRouter)

const port = process.env.port || 4005
mongoose.connect(process.env.connectionString).then((res) => {
    app.listen(port, () => {
        console.log(`server started`);
    })
})
    .catch((err) => {
        console.log('Mongodb connection error server not started');
    })

    