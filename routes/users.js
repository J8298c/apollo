const express = require('express');
const methodOverride = require('method-override');
const router = express.Router();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const {User, validEmailCheck} = require('../models/usermodel');
const jsonParser = bodyParser.json();

router.use(methodOverride('_method'));
router.use(passport.initialize());
router.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user.name);
  console.log(user);
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
        loggedIn(user);
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
function loggedIn(user){
    if(user){
        console.log('hi');
    } else{
        console.log('nope');
    }
}


//get request for login page template
router.get('/', function (req, res, next) {
    res.render('users/index', {
    });
});

//renders user profile page
const failureRoute = passport.authenticate('local', { failureRedirect: '/users/loginPage'});


router.get('/loginPage', function(req, res){
    res.render('users/index', {});
    console.log('reached log in page');
});
//if calling get request ensure the redirect is before the actual authentication get req
router.get('/:name', function (req, res, next){
    res.render('users/profile', {name: req.params.name});
});

router.get('/:name/showall', function(req, res, next){
    User.find({},function(err, friends){
        if(err){
           console.log('you have an error') 
        } else {
            res.render('users/all', {users: friends});
        }
    });
});

router.get('/profile', function(req, res, next){
    res.render('users/profile', {name: req.params.name});
});
//renders page to let user edit thier profile
//username is unique and therefore uneditable
router.get('/:name/edit', failureRoute, function(req, res, next){
    res.render('users/edit', {name: req.params.name});
});

//get request that renders the delete template
router.get('/:name/delete', failureRoute, function(req, res, next){
    res.render('users/delete', {name: req.params.name});
});

//post route to create new users
router.post('/register', function(req, res){
    let name = req.body.name;
    name = name.replace(/\s/g,"");
    const user = new User({name: name, email: req.body.email, password: req.body.password});
    console.log('saving your user')
    user.save(function(err){
        if(err){
            res.send(err);
            console.log('hit a snag')
        }
        res.render('users/profile', {name: name});
    })
});

router.put('/:name/update', failureRoute, function(req, res, next){
    let email = req.body.email;
    let errorEmail;
    if(validEmailCheck(email)){
         User.findOneAndUpdate({ 'name': req.body.name },{'email': email, 'password': req.body.password},{'new': true} ,function (err, user) {
        if (err){
            errorEmail = err;
            // return handleError(err);
        } 
        console.log('your new email is ' + email);
        res.render('users/profile', {name: req.params.name});
    })   
    } else {
        console.log('Bad email');
        res.render(errorEmail)
    }
});

router.delete('/:name/remove', failureRoute, function(req, res){
    res.render('users/index', {});
    User.findOneAndRemove({ 'name': req.params.name }, function(err, user){
        if (err) return handleError(err);
    })
});

//login Authentication
router.post('/login',
  failureRoute,
  function(req, res) {
        res.render('users/profile', {name: req.body.name})
    });




module.exports = router;



//enum pages and make pages private resaerch how to use passport to close all routes unless user is autheticated..


//making resources private with Authentication using passport/express
//create USER 
//attending my first meetup
//

