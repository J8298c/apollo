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
        name: 'Bench-Press',
        equipment: 'Barbbell',
        bodyParts: ['Chest','Triceps']
        //need to get excersise info from database query perhaps 
        //and parse through it to set up for loop in ejs file        
    });
});
router.get('/exercises/all', function(req, res, next){
    res.render('excerall', {
        name: 'ipsum lorem',
        equipment: 'ipsum lorerm',
        bodyParts: ['ipsum', 'lorem']
    })
})
// router.get('/exercises/new', function (req, res, next) {
//     res.render('new_exercise', {
        
//     });
// });

module.exports = router;
