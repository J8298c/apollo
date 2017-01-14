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
    res.render('users/create', {
     });
});


//get request for login page template
router.get('/', function (req, res, next) {
    res.render('users/index', {
    });
});

//renders user profile page
router.get('/:username', function (req, res, next){
    console.log('The user is', req.params.name);
    res.render('users/show', {name: req.params.name});
});

//renders page to let user edit thier profile
//username is unique and therefore uneditable
router.get('/:username/edit', function(req, res, next){
    res.render('user/edit', {name: req.params.name, email: req.params.email});
})



router.post('/create', function (req, res){
    console.log('this is the request');
    console.log(req.body);
    console.log(User);
    const newUser = new User({ name: req.body.name, password: req.body.password, email: req.body.email });
    newUser.save(function(err){
        if(err){
            console.log("Couldnt save the user");
            console.log(err);
        } else {
            console.log("Saved it");
            res.render('users/show', {name: req.params.name});

        }
    })
});

//renders userprofile and lets users update 
//theyre email and password
router.put('/:username/update', jsonParser, function(req, res){
    res.render('users/update', {name: req.params.name})
    console.log('hit the update route');
    //required fields from workoutmodel
    console.log('Not showing ')
    const requiredFields = ['email', 'password'];
    for(let i = 0; i < requiredFields.length; i++){
        const field = requiredFields[i];
        if(!(field in req.body)) {
            const message = `Missing ${field} in your request`;
            //need to turn into alert message before deployment
            console.error(message);
            return res.status(400).send(message);
        }
        /* research this tonight */

        //validation to ensure user cant update username
        //read-only attritubte in html or js code to prevent isnt enough 
        //read-only on the DB level (research document on db to read only un editiable attr)
        

        console.log(`Updating your profile with ${req.params.name}`);
        updatedProfile = User.findOneAndUpdate({email: req.params.email, password: req.params.password }, {email: req.body.email, password: req.body.password}, function(err, workout) {
            if (err) throw err;
            });
            console.log(req.body.name);
        res.status(204).json(updatedProfile);
    }

    //render index page here--
    res.render("user/index", {name: req.params.name, bodyParts: [req.params.bodyParts], equipment: req.params.equipment});
});

//deletes user from DB and renders login page
router.delete('/:username/update', jsonParser, function(req, res){
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


