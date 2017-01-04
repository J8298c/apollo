const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
//routes for app
const index = require('./routes/index');
const users = require('./routes/users');
const excercises = require('./routes/excercises');


const app = express();

// view engine setup
//__Dirname place holder means route folder of apollo points to the directory to where file currently is __dirname in this instance is the root of apollo
//path.join take several arg to and joins so __dirname "views" is apollo/views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//put all my routes in app look at index example
app.use('/', index);
app.use('/users', users);
app.use('/excercises', excercises);

// app.use('/users', users);
//use passport to auth useer 
//after user clicks sumbit to authenticate create post request
///excersise/create should to point to slash create 


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  //server error backennd error
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
