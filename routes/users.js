const express = require('express');
const methodOverride = require('method-override');
const router = express.Router();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const {User} = require('../models/usermodel');
const jsonParser = bodyParser.json();

router.use(methodOverride('_method'));

//middleware for logging
//==================================================//

router.use(function(req, res, next){
    console.log('Currently making a ' + req.method + " request");
    console.log('From this current URL' + req.url);
    next();
})

//Routes for apollo app 
//==================================================//
//get request for user register page
router.get('/create', function (req, res, next) {
    console.log('step 2 goes to new user registration')
    res.render('users/create', { name: req.params.name
     });
});

//get request for login page template
router.get('/', function (req, res, next) {
    console.log('Step 1 get req for index page/log in')
    res.render('users/index', {
    });
});

// renders user profile page
router.get('/:name', function (req, res, next){
    console.log('step 5 showing user page for updated user');
    console.log('The user is' + {name: req.params.name});
    res.render('users/show', {name: req.params.name});
    console.log('The last thing that happens');
});

//renders page to let user edit thier profile
//username is unique and therefore uneditable
router.get('/:name/edit', function(req, res, next){
    console.log('step 4 edit page for user');
    res.render('users/edit', {name: req.params.name});
    console.log('This is the request params name =' + req.params.name);
});
//post route to create new users
router.post('/create', function(req, res){
    
    const user = new User({name: req.body.name, email: req.body.email, password: req.body.password});
    user.save(function(err){
        if(err)
        res.send(err);
        console.log('saving ' + req.body.name);
        res.render('users/show', {name: req.body.name});
    })
});
router.put('/:name/update', function(req, res){
    res.render('users/edit', {name: req.params.name});
    console.log('finnaly doing a put');

    //debug then find one and update 
    // user.findOneAndUpdate({name: req.params.name}, {$set: {email: req.body.email, password: req.body.password}}, function(err, user){
    //     if(err){
    //         console.log(err);
    //     } else {
    //         user.save(function(err){
    //             if(err)
    //             res.send(err);
    //             console.log('updated user');
    //             res.render('users/show');
    //         })
    //     }
    // });
});

//work around for put express with browsers 
    // updatedUser.save(function(err){
    //     if(err)
    //         res.send(err);
    //     console.log('updated user');
    // })
// })
//route to handle updating user
// router.route('/users/update')
// .put(function(req, res){
//     user.findOneAndUpdate(req.params.name, function(err, user){
//         if(err)
//             res.send(err);
//             user.email = req.body.email;
//             user.password = req.body.password;
//             user.save(function(err){
//                 if(err)
//                     res.send(err);
//                 res.render('users/show', {name: req.body.name});
//             })
//         })
//     });

//renders userprofile and lets users update 
//theyre email and password
//need to fix findoneandupdate go to http://coursework.vschool.io/mongoose-crud/
// router.put('/:name/edit', jsonParser, function(req, res){
//     console.log('step 6 updates the users')
//     console.log('updating the user');
//    console.log(`Updating your profile for ${req.params.user}`);
//         User.findOneAndUpdate({name: req.params.name, password: req.params.password, email: req.params.email}, {name: req.body.name, password: req.body.password, email: req.params.email}, function(err, user) {
//             if (err) {
//             console.error(err);
//             }
//             console.log(req.body.name);
//             res.status(204).json(updatedUser);
//             //render index page here--
//             res.render("users/index", {

//             });
//             });
// });


module.exports = router;


