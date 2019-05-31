var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// authentication
var session = require('express-session');
var passport = require('passport');
var methodOverride = require('method-override');

// load secrets from .env file
require('dotenv').config();

// connect to the MongoDB with mongoose
require('./config/database');

// configure Passport
require('./config/passport');

var indexRouter = require('./routes/index');
var dealershipsRouter = require('./routes/dealerships');
var vehiclesRouter = require('./routes/vehicles');
var servicesRouter = require('./routes/services');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(methodOverride('_method'));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// add code here for session middleware
app.use(session({
  secret: 'edcr9fvt248gbyHHNum8',
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());


app.use('/', indexRouter);
app.use('/', dealershipsRouter);
app.use('/vehicles', vehiclesRouter);
app.use('/vehicles', servicesRouter);

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
