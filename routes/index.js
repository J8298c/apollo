var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Apollo' });
});


// router.get('/excercises/:excercisename', function (req, res, next) {
//     res.render('excercises/show', {excercisename: req.params.excercisename, bodyParts: [], equipment: 'barbell'});
// });

// router.get('/excercises', function(req, res, next){
//     res.render('excercises/index', {
//     });
// })


// .post()??


module.exports = router;
