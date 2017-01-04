var express = require('express');
var router = express.Router();

router.get('/excercises/:excercisename', function (req, res, next) {
    res.render('excercises/show', {excercisename: req.params.excercisename, bodyParts: [], equipment: 'barbell'});
});

router.get('/excercises', function(req, res, next){
    res.render('excercises/index', {
    });
});
router.post('/excercises/new', function (req, res){

});

module.exports = router;