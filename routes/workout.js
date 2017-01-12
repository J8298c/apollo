const express = require('express');
var cors = require('cors');
const router = express.Router();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const {Workout} = require('../models/workoutmodel');
const jsonParser = bodyParser.json();
router.use(cors());
router.get('/create', function(req, res, next){
    res.render('workout/create');
});
router.get('/', function(req, res, next){
    res.render('workout/index', {
    });
});
router.get('/:workoutname', function (req, res, next) {
    res.render('workout/show', {workoutname: req.params.workoutname, bodyParts: [], equipment: 'barbell'});
});
//for put rquest need a {get} to serve template
//also put to submit to information to server
router.get('/:workoutname/edit', function (req, res, next) {
    res.render('workout/edit', {workoutname: req.params.workoutname, bodyParts: [], equipment: 'barbell'});
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
//search for express put request 404 in browsers
router.post('/:workoutname/update', jsonParser, function(req, res){
    console.log('hit the update route');
    //required fields from workoutmodel
    console.log('Not showing ')
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
        updatedWorkout = Workout.findOneAndUpdate({name: req.params.name}, {name: req.body.name}, function(err, workout) {
            if (err) throw err;
            });
            console.log(req.body.name);
        res.status(204).json(updatedWorkout);

    }
    //render index page here--
    res.render("workout/index", {excercisename: req.params.name, bodyParts: [req.params.bodyParts], equipment: req.params.equipment});
})

module.exports = router;