const express = require('express');
const methodOverride = require('method-override');
const router = express.Router();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const {Workout} = require('../models/workoutmodel');
const jsonParser = bodyParser.json();

router.use(methodOverride('_method'));

//middleware for loging
//===================================================//
router.use(function(req, res, next){
    console.log('Currently making a ' + req.method + ' request');
    console.log('From this current URL ' + req.url);
    next();
})

//Routes for apollo
//====================================================//

router.get('/create', function(req, res, next){
    res.render('workout/create', {
        //enter variable here
    });
});

router.get('/', function(req, res, next){
    res.render('workout/index', {message: null});
});

router.get('/:workoutname', function (req, res, next) {
    res.render('workout/show', {workoutname: req.params.workoutname, bodyParts: [req.params.bodyParts], equipment: req.params.equipment});
});
//for put rquest need a {get} to serve template
//also put to submit to information to server
router.get('/:workoutname/edit', function (req, res, next) {
    res.render('workout/edit', {workoutname: req.params.workoutname, bodyParts: [req.params.bodyParts], equipment: req.params.equipment});
});

router.post('/create', function (req, res){

    const newWorkout = new Workout({ name: req.body.workout, equipment: req.body.equipment });
    newWorkout.save(function(err){
        if(err)
            res.send(err);
            console.log('saving ' + req.body.name);
            res.render('workout/show', {
                //enter variable here
            })
    })
});
//route to update workouts based on workout name
//search for express put request 404 in browsers
router.put('/:workoutname/update', jsonParser, function(req, res){
    res.render('workout/show', {
        //variable here
    });
    Workout.findOneAndUpdate({ 'name': req.body.name}, {'name': req.body.name, 'bodyParts': req.body.bodyParts, 'equipment': req.body.equipment}, {'new': true}, function(err, workout){
        if (err) return handleError(err);
        console.log('New wokout is ' + workout.name + workout.bodyParts + workout.equipment);
    })
});

//deletes user from DB and renders login page
router.delete('/:workoutname/remove', function(req, res){
    res.render('workout/index', {});
    Workout.findOneAndRemove({ 'name': req.params.name}, function(err, workout){
        if (err) return handleError(err);
        console.log('deleted' + req.params.name + 'workout');
    })
});

module.exports = router;
