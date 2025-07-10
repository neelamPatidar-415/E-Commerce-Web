const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");
const path = require('path');

const db = require('./config/mongoose-connection');

const index = require('./routes/index');
const ownersRouter = require('./routes/ownersRouter');
const usersRouter = require('./routes/usersRouter');
const productsRouter = require('./routes/productsRouter');

const flash = require("connect-flash");
const expressSession = require("express-session");
//middleware to set expressSession to finally set flash which helps to take a msg to other route 
app.use(
  expressSession({
    secret: "process.env.EXPRESS_SESSION_SECRET",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(flash());

//multer already route me set he jaha chahiye jis form me barna he 

require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname , "public")));

app.use("/index",index);
app.use("/owners",ownersRouter);
app.use("/products",productsRouter);
app.use("/users",usersRouter);

const Port = process.env.PORT ;
app.listen(Port);

