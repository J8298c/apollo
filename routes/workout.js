var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var {Workout} = require('../models/workoutmodel');
//include mongoose and make sure I can save as an object and make new instance of schema
//and save (mongo.save());

router.get('/create', function(req, res, next){
    res.render('workout/create');
});
router.get('/', function(req, res, next){
    res.render('workout/index', {
    });
});
router.get('/:workoutname', function (req, res, next) {
    res.render('workout/show', {excercisename: req.params.excercisename, bodyParts: [], equipment: 'barbell'});
});


router.post('/create', function (req, res){
    console.log('this is the request');
    console.log(req.body);
    console.log(Workout);
    const newWorkout = new Workout({ name: req.body.workout, equipment: req.body.equipment });
    newWorkout.save(function(err){
        if(err){
            console.log("Couldnt save your awesome workout");
            console.log(err);
        } else {
            console.log("Saved it");
        }
    })
});

module.exports = router;