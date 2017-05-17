const express = require('express');
const path = require('path');
require('dotenv').config()
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const APOLLO_PRODUCTION_DATABASE = require('./test/config');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
require('./passport')(passport);
const mongoose = require('mongoose');
const User = require('./models/usermodel');
const Workout = require('./models/workoutmodel');
const app = express();
mongoose.connect(APOLLO_PRODUCTION_DATABASE);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

require('./passport')(passport);
app.use(session({
    secret: 'ilovelittledebbies',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize())
app.use(passport.session())
app.use(flash());

require('./routes/users')(app,passport, User);
require('./routes/workout')(app, passport, Workout);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
