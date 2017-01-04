var express = require('express');
var router = express.Router();

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

module.exports = router;


