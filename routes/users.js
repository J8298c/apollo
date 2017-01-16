const express = require('express');
var cors = require('cors');
const router = express.Router();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const {User} = require('../models/usermodel');
const jsonParser = bodyParser.json();
router.use(cors());

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

//renders user profile page
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
})
//route to create a new users via the register link in the login page
router.post('/create', function (req, res){
    console.log('step 3 im creating your new user');
    console.log('this is the  create request');
    console.log("created " + req.body.name);
    const newUser = new User({ name: req.body.name, password: req.body.password, email: req.body.email });
    newUser.save(function(err){
        if(err){
            console.log("Couldnt save the user");
            console.log(err);
        } else {
            console.log("Saved it");
            console.log('displaying newly created user page');
            res.render('users/show', {name: req.body.name});
        }
    })
});

//renders userprofile and lets users update 
//theyre email and password
//need to fix findoneandupdate go to http://coursework.vschool.io/mongoose-crud/
router.put('/:name/edit', jsonParser, function(req, res){
    console.log('step 6 updates the users')
    console.log('updating the user');
   console.log(`Updating your profile for ${req.params.user}`);
        User.findOneAndUpdate({name: req.params.name, password: req.params.password, email: req.params.email}, {name: req.body.name, password: req.body.password, email: req.params.email}, function(err, user) {
            if (err) {
            console.error(err);
            }
            console.log(req.body.name);
            res.status(204).json(updatedUser);
            //render index page here--
            res.render("users/index", {

            });
            });
});

//deletes user from DB and renders login page
router.delete('/:name/delete', jsonParser, function(req, res){
    console.log('deleting the user');
    const requiredFields = [ 'username','email', 'password'];
    for(let i = 0; i < requiredFields.length; i++){
        const field = requiredFields[i];
        if(!(field in req.body)) {
            const message = `Missing ${field} in your request`;
            console.error(message);
            return res.status(400).send(message);
        }
        console.log('sad to see you go');
        User.findOneAndRemove({name: req.params.name}, function(err, user){
            if(err) throw err;
            //print error to the dom console.error/ error
        });
        console.log('User deleted');
        res.status(204).json();
        res.render("user/index", {message: "User was successfully deleted"});
    }
})

module.exports = router;


