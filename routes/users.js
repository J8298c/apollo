const express = require('express');
const methodOverride = require('method-override');
const router = express.Router();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const {User} = require('../models/usermodel');
const jsonParser = bodyParser.json();

router.use(methodOverride('_method'));
router.use(passport.initialize());
router.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user.name);
});

passport.deserializeUser(function(id, done) {
  User.findOne({name: name}, function(err, user) {
    done(err, user);
  });
});


//middleware for logging && User Authentication
//==================================================//


router.use(function(req, res, next){
    console.log('Currently making a ' + req.method + " request");
    console.log('From this current URL' + req.url);
    next();
});

//passport middleware
passport.use(new LocalStrategy({
    usernameField: 'name',
    passwordField: 'password'
},
function(username, password, done){
    console.log('finding user');
    User.findOne({'name': username}, function(err, user){
        console.log('current user');
        console.log(username)
        if(err){
            return done(err);
        }
        if(!user) {
            return done(null, false, {message: 'You entered the wrong user name please try again'});
        }
        // if(!user.validPassword(password)){
        //     return done(null, false, {message: 'Incorrect Password'});
        // }
        return done(null, user);
        console.log('returning user that just signed in');
        console.log(user);
        return user;
    });
}));


//Routes for apollo app 
//==================================================//
//get request for user register page
router.get('/register', function (req, res, next) {
    res.render('users/registration', { name: req.params.name
     });
});



//get request for login page template
router.get('/', function (req, res, next) {
    res.render('users/index', {
    });
});



//renders user profile page
router.get('/:name', function (req, res, next){
    res.render('users/profile', {name: req.params.name});
});

//renders page to let user edit thier profile
//username is unique and therefore uneditable
router.get('/:name/edit', function(req, res, next){
    res.render('users/edit', {name: req.params.name});
});

//get request that renders the delete template
router.get('/:name/delete', function(req, res, next){
    res.render('users/delete', {name: req.params.name});
});

//post route to create new users
router.post('/register', function(req, res){
    let name = req.body.name;
    name = name.replace(/\s/g,"");
    const user = new User({name: name, email: req.body.email, password: req.body.password});
    user.save(function(err){
        if(err)
        res.send(err);
        res.render('users/profile', {name: name});
    })
});

router.put('/:name/update', function(req, res, next){
    let email = req.body.email;
    if(validEmailCheck(email)){
         User.findOneAndUpdate({ 'name': req.body.name },{'email': email, 'password': req.body.password},{'new': true} ,function (err, user) {
        if (err) return handleError(err);
        console.log('your new email is ' + email);
    })   
    } else {
        console.log('Bad email');
    }
    res.render('users/profile', {name: req.params.name});
});

router.delete('/:name/remove', function(req, res){
    res.render('users/index', {});
    User.findOneAndRemove({ 'name': req.params.name }, function(err, user){
        if (err) return handleError(err);
    })
});
//login Authentication
router.post('/login', 
    passport.authenticate('local', {successRedirect: '/:name',
                                    failureRedirect: '/',        
                                    failureFlash: true }));

/*function to validate email for findOneAndUpdate method*/
//===========================================================================//
function validEmailCheck(email){
    const emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const valid = emailReg.test(email);
    if(valid){
        return true;
    } else {
        return false;
    }
}

module.exports = router;


//enum pages and make pages private resaerch how to use passport to close all routes unless user is autheticated..

//TODO custom validation with mongoose
//making resources private with Authentication using passport/express
//create USER 
//attending my first meetup
//

