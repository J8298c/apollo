var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var {User} = require('../models/usermodel');

/* GET users. */
router.get('/create', function (req, res, next) {
    res.render('users/create', {
     });
});

router.get('/', function (req, res, next) {
    res.render('users/index', {
    });
});
//colon username is a placeholder
router.get('/:username', function (req, res, next){
    console.log('The user is', req.params.username);
    res.render('users/show', {username: req.params.username});
});

router.post('/create', function (req, res){
    console.log('this is the request');
    console.log(req.body);
    console.log(User);
    const newUser = new User({ name: req.body.name, password: req.body.password, email: req.body.email });
    newWorkout.save(function(err){
        if(err){
            console.log("Couldnt save the user");
            console.log(err);
        } else {
            console.log("Saved it");
        }
    })
});

module.exports = router;


