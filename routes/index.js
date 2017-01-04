var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Apollo' });
});

/* GET users. */
router.get('/users', function (req, res, next) {
    res.render('users/index', {
    });
});
//colon username is a placeholder
router.get('/users/:username', function (req, res, next){
    console.log('The user is', req.params.username);
    res.render('users/show', {username: req.params.username});
})

router.get('/excercises/:excercisename', function (req, res, next) {
    res.render('excercises/show', {excercisename: req.params.excercisename, bodyParts: [], equipment: 'barbell'});
});

router.get('/excercises', function(req, res, next){
    res.render('excercises/index', {
    });
})
router.get('/exercises/new', function (req, res, next) {
    res.render('new_exercise', {
        
    });
});

module.exports = router;
