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
// const expressSession = require("express-session");
//middleware to set expressSession to finally set flash which helps to take a msg to other route 
// app.use(
//   expressSession({
//     secret: "process.env.EXPRESS_SESSION_SECRET",
//     resave: false,
//     saveUninitialized: false,
//   })
// );
require("dotenv").config();

const config = require("config");
const session = require('express-session');
const MongoStore = require('connect-mongo');
// console.log(config.get("MONGO_URI"));
app.use(session({
  secret: 'process.env.EXPRESS_SESSION_SECRET',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    // mongoUrl: config.get("MONGO_URI"),
  }),
}));
app.use(flash());

///adding it to make web faster cuz its broke now with --- to many requests
const rateLimit = require('express-rate-limit');

// Apply to all requests
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 100, // limit each IP to 100 requests per minute
  message: 'Too many requests, please try again later.',
});

app.use(limiter);

/// adding this to make storage less    /// leading to problems on my authcontroller 
// // Express snippets
// const compression = require('compression');
// const apicache    = require('apicache');

// app.use(compression()); // gzip / brotli
// app.use(express.static('public', { maxAge: '7d' })); // cache static files
// app.use(apicache.middleware('5 minutes')); // response caching



//multer already route me set he jaha chahiye jis form me barna he 


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname , "public")));

app.get('/', (req, res) => {
  res.redirect('/index');
});

app.use("/index",index);
app.use("/owners",ownersRouter);
app.use("/products",productsRouter);
app.use("/users",usersRouter);

const Port = process.env.PORT || 3000 ;
app.listen(Port);

