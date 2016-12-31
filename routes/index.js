var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Apollo' });
});

/* GET users. */
router.get('/users', function (req, res, next) {
    res.render('users', {
        name: 'Arnold'
    });
});

router.get('/exercises', function (req, res, next) {
    res.render('exercises', {
        title: 'Apollo - Exercises'
    });
});

router.get('/exercises/new', function (req, res, next) {
    res.render('new_exercise', {
        title: 'Apollo - New Exercise'
    });
});

module.exports = router;
