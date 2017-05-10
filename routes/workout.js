const express = require('express');
const methodOverride = require('method-override');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const {Workout} = require('../models/workoutmodel');
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

/*all request must use workoutname , equipment, and bodyParts*/

router.get('/create',function(req, res, next){
    res.render('workout/create', {
        //enter variable here
    });
});

router.get('/', function(req, res, next){
    let workoutList;
    Workout.find({},function(err, workouts, workoutName){
        if(err){
           console.log('err'); 
        } else {
            res.render('workout/index', {workoutList:workouts, message: null});
        }
    })
});

router.get('/:workoutname', function (req, res, next) {
    Workout.findOne({name: req.params.workoutname}, function(err, workout){
       if(err){
           handleError(err);
       } else {
         res.render('workout/show', {name: workout.name, bodyParts: workout.bodyParts, equipment: workout.equipment});
       }
    })
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
    const bodyCopy = Object.assign({}, req.body);
    const {workout, equipment} = bodyCopy;
    delete bodyCopy.workout;
    delete bodyCopy.equipment;
    const partsOfBody = Object.keys(bodyCopy);
    let workoutName = workout.replace(/\s/g,"");
    const workoutObj = new Workout({name: workoutName, equipment: equipment, bodyParts: partsOfBody });

    workoutObj.save(function(err){ //need to fix if/else 
        if(err)
            res.send(err);
            res.render('workout/show', {
                name: workoutName,
                bodyParts: partsOfBody,
                equipment: equipment
            })
            console.log('Im saving to ');
    })

});

router.put('/:workoutname/update',function(req, res){
    res.render('workout/show', {name: req.params.workoutname, bodyParts: req.body.bodyParts, equipment: req.body.equipment});
    Workout.findOneAndUpdate({ 'name': req.body.workoutname }, { 'equipment': req.body.equipment, 'bodyParts': req.body.bodyParts}, {'new': true}, function(err, workingout){
        if(err) return handleError(err)
    });
});


router.delete('/:workoutname/remove', function(req, res){

     Workout.find({},function(err, workouts, workoutName){
        if(err){
           console.log(err) 
        } else {
            
            res.render('workout/index', {workoutList:workouts, message: null});
        }

    });

    Workout.findOneAndRemove({ 'name': req.params.workoutname}, function(err, workout){
        if (err) return handleError(err);
    })

});


module.exports = router;
