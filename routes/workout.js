const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const {Workout} = require('../models/workoutmodel');
const jsonParser = bodyParser.json();

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
//route to update workouts based on workout name
router.put('/:workoutname/update', jsonParser, function(req, res){
    res.render("workout/index", {excercisename: req.params.name, bodyParts: [req.params.bodyParts], equipment: req.params.equipment});
    //required fields from workoutmodel
    const requiredFields = ['name', 'equipment'];
    for(let i = 0; i < requiredFields.length; i++){
        const field = requiredFields[i];
        if(!(field in req.body)) {
            const message = `Missing ${field} in your request`;
            //need to turn into alert message before deployment
            console.error(message);
            return res.status(400).send(message);
        }
        console.log(`Updating your workout with ${req.params.workout}`);
        Workout.findOneAndUpdate({name: req.params.name}, {name: req.body.name}, function(err, workout) {
            if (err) throw err;
            console.log(workout);
            });
        res.status(204).json(updatedWorkout);
    }
})

module.exports = router;