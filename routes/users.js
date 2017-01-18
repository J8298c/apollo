const express = require('express');
const methodOverride = require('method-override');
const router = express.Router();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const {User} = require('../models/usermodel');
const jsonParser = bodyParser.json();

router.use(methodOverride('_method'));

//middleware for logging
//==================================================//

router.use(function(req, res, next){
    console.log('Currently making a ' + req.method + " request");
    console.log('From this current URL' + req.url);
    next();
})

//Routes for apollo app 
//==================================================//
//get request for user register page
router.get('/create', function (req, res, next) {
    console.log('step 2 goes to new user registration')
    res.render('users/create', { name: req.params.name
     });
});

//get request for login page template
router.get('/', function (req, res, next) {
    console.log('Step 1 get req for index page/log in')
    res.render('users/index', {
    });
});

// renders user profile page
router.get('/:name', function (req, res, next){
    console.log('step 5 showing user page for updated user');
    console.log('The user is' + {name: req.params.name});
    res.render('users/show', {name: req.params.name});
    console.log('The last thing that happens');
});

//renders page to let user edit thier profile
//username is unique and therefore uneditable
router.get('/:name/edit', function(req, res, next){
    console.log('step 4 edit page for user');
    res.render('users/edit', {name: req.params.name});
    console.log('This is the request params name =' + req.params.name);
});
//get request that renders the delete template
router.get('/:name/delete', function(req, res, next){
    console.log('Getting delete page')
    res.render('users/delete', {name: req.params.name});
})
//post route to create new users
router.post('/create', function(req, res){
    
    const user = new User({name: req.body.name, email: req.body.email, password: req.body.password});
    user.save(function(err){
        if(err)
        res.send(err);
        console.log('saving ' + req.body.name);
        res.render('users/show', {name: req.body.name});
    })
});
router.put('/:name/update', function(req, res){
    // res.render('users/edit', {name: req.params.name});
    res.render('users/show', {name: req.params.name});
    //mongo db finds document by user name and edits field from /edit form 
    User.findOneAndUpdate({ 'name': req.body.name },{'email': req.body.email, 'password': req.body.password},{'new': true} ,function (err, user) {
        if (err) return handleError(err);
        console.log('Found your user his name is ' + user.name + 'his email is '+ user.email +  'and his new password ' + user.password);
    })
});
router.delete('/:name/remove', function(req, res){
    res.render('users/index', {});
    User.findOneAndRemove({ 'name': req.params.name }, function(err, user){
        if (err) return handleError(err);
        console.log('deleted user named ' + req.params.name);
    })
});

module.exports = router;


