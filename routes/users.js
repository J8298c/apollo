const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const {User} = require('../models/usermodel');
const jsonParser = bodyParser.json();
/* GET users. */
router.get('/create', function (req, res, next) {
    res.render('users/create', {
     });
});

router.get('/', function (req, res, next) {
    res.render('users/index', {
    });
});

router.get('/:username', function (req, res, next){
    console.log('The user is', req.params.username);
    res.render('users/show', {username: req.params.username});
});

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
        }
    })
});

router.put('/:username/update', jsonParser, function(req, res){
    res.render('users/update', {excercisename: req.params.excercisename, bodyParts: [], equipment: 'barbell'});
    //required fields from workoutmodel
    const requiredFields = ['name', 'email'];
    for(let i = 0; i < requiredFields.length; i++){
        const field = requiredFields[i];
        if(!(field in req.body)) {
            const message = `Missing ${field} in your request`;
            //need to turn into alert message before deployment
            console.error(message);
            return res.status(400).send(message);
        }
        console.log(`Updating the user with ${req.params.name}`);
        User.findOneAndUpdate({name: req.params.name}, {name: req.body.name}, function(err, workout) {
            if (err) throw err;
            console.log(user);
            });
        res.status(204).json(updatedWorkout);
    }
})
module.exports = router;


