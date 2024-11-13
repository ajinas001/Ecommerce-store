const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const RegisterRouter = require('./Src/Router/Registration/Registerrouter');
const Adminrouter = require('./Src/Router/Admin/Adminrouter');
const Userrouter = require('./Src/Router/User/Userrouter');
const session = require('express-session');
const LoginRouter = require('./Src/Router/Registration/Loginrouter');
const Cartrouter = require('./Src/Router/User/Cartrouter');
const Orderrouter = require('./Src/Router/User/Orderrouter');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();

app.use(cookieParser());
app.use(express.static('./public'));
app.use(bodyparser.json());
app.use(express.urlencoded({ extended: true }));

const allowedOrigins = [
    'http://localhost:3000',
    'https://www.googleapis.com/oauth2/v3/userinfo',  // Add other allowed origins here
    'http://localhost:3003'
];

app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader("Access-Control-Allow-Origin", origin);
    }
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Cross-Origin-Opener-Policy", "same-origin"); // Set COOP header
    next();
});

app.use(session({
    secret: 'sessionSecret',
    resave: false,
    saveUninitialized: true
}));

app.use('/register', RegisterRouter);
app.use('/admin', Adminrouter);
app.use('/user', Userrouter);
app.use('/login', LoginRouter);
app.use('/cart', Cartrouter);
app.use('/orderrouter', Orderrouter);

const port = process.env.port || 4005;
mongoose.connect(process.env.connectionString).then((res) => {
    app.listen(port, () => {
        console.log(`server started`);
    });
})
    .catch((err) => {
        console.log('Mongodb connection error server not started');
    });
