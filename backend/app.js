var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

const session = require('express-session');
const MongoStore = require('connect-mongo');
// const dbUrl = process.env.ATLASDB_URL;

var pool = require('./routes/pool');
pool()

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var floorDetailsRouter = require('./routes/floorDetails');
var propertyDetailsRouter = require('./routes/propertyDetails');
var buildingImagesRouter = require('./routes/buildingImages');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// const store = MongoStore.create({
    // mongoUrl: dbUrl,   //MONGO_URL
    // crypto: {
    //     secret: process.env.SECRET,
    // },
    // touchAfter: 24 * 3600,   // 60 * 60  
// });

// store.on("error", () => {
//     console.log("ERROR in MONGO SESSION STORE", err);
// })

// const sessionOptions = {
//     // store,
//     secret: process.env.SECRET || 'shhhhhh',
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//         expires: Date.now() + 7 * 24 * 60 * 60 * 1000 ,
//         maxAge: 7 * 24 * 60 * 60 * 1000 ,
//         httpOnly: true,
//     },
// };

// // app.get("/", (req, res) => {
// //     res.send("Hi, I am root");
// // })


// app.use(session(sessionOptions));

app.use(cors());
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/floordetails', floorDetailsRouter);
app.use('/propertydetails', propertyDetailsRouter);
app.use('/buildingimages', buildingImagesRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
