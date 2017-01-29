const express = require('express');
const methodOverride = require('method-override');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const {Workout} = require('../models/workoutmodel');
router.use(methodOverride('_method'));
router.use(bodyParser.json())


//middleware for loging
//===================================================//
router.use(function(req, res, next){
    console.log('Currently making a ' + req.method + ' request');
    console.log('From this current URL ' + req.url);
    next();
})

//Routes for apollo
//====================================================//

/*all request must use workoutname , equipment, and bodyParts*/

router.get('/create',function(req, res, next){
    res.render('workout/create', {
        //enter variable here
    });
});

router.get('/', function(req, res, next){
    res.render('workout/index', {message: null});
});

router.get('/:workoutname', function (req, res, next) {
    res.render('workout/show', {name: req.params.workoutname});
});
//for put rquest need a {get} to serve template
//also put to submit to information to server
router.get('/:workoutname/edit', function (req, res, next) {
    res.render('workout/edit', {name: req.params.workoutname});
});
router.get('/:workoutname/remove', function(req, res, next){
    res.render('workout/delete', {name: req.params.workoutname})
})
router.post('/create', function (req, res){
    //creat a copy instead of messing with actual object to illevaite unexpected behaviours//
    const bodyCopy = Object.assign({}, req.body);
    //object destructure
    const {workout, equipment} = bodyCopy;
    console.log('im the workout var');
    console.log(workout);
    delete bodyCopy.workout;
    delete bodyCopy.equipment;
    const partsOfBody = Object.keys(bodyCopy);
    let workoutName = workout.replace(/\s/g,"");
    const workoutObj = new Workout({name: workoutName, equipment: equipment, bodyParts: partsOfBody });

    workoutObj.save(function(err){
        if(err)
            res.send(err);
            res.render('workout/show', {
                name: workoutName,
                bodyParts: partsOfBody,
                equipment: equipment
            })
            console.log(req.body);
    })
});

router.put('/:workoutname/update',function(req, res){
    res.render('workout/show', {name: req.params.workoutname, bodyParts: req.body.bodyParts, equipment: req.body.equipment});
    console.log('the req params, workout variable and equipment');
    console.log(req.params.workoutname, req.body.equipment, req.body.bodyParts);
    Workout.findOneAndUpdate({ 'name': req.body.workoutname }, { 'equipment': req.body.equipment, 'bodyParts': req.body.bodyParts}, {'new': true}, function(err, workingout){
        if(err) return handleError(err)
        console.log('updated it')
    });
});
//stop changing names and stay consistent
//think how the change will affect your code

//deletes user from DB and renders login page
router.delete('/:workoutname/remove', function(req, res){
    res.render('workout/index', {message: null});
    Workout.findOneAndRemove({ 'name': req.params.workoutname}, function(err, workout){
        if (err) return handleError(err);
        console.log('deleted it')
    })
});


module.exports = router;
