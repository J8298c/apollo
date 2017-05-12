const User = require('../models/usermodel');

module.exports = (app, passport)=> {

    app.get('/', (req, res)=> {
        res.render('index', {title: 'Apollo'});
    });

    app.get('/profile', isLoggedIn, (req, res) => {
        console.log(req.user, 'the req.user');
        let email = req.user.local.email.split(/[@]/)[0]
        console.log(email, 'email after split');
        res.render('profile', {user: req.user, username: email});
    });

    app.get('/logout', (req, res)=>{
        req.logout();
        res.redirect('/');
    });

    app.get('/login', (req, res)=> {
        res.render('login', {message: req.flash('loginMessage')});
    });

    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile',
        failureRedirect : '/login',
        failureFlash    : true
    }));

    //============Signup==============//
    
    app.get('/signup', (req, res)=>{
        res.render('signup', {message: req.flash('signupMessage')});
    });

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile',
        failureRedirect : '/signup',
        failureFlash    : true
    }));

    //============AllUsers==================//

    app.get('/allusers', (req, res)=>{
        console.log(User, 'did it import the user');
        User.find({}, (err, users)=>{
            if(err){
                res.render('error',{err: err});
            } else {
                console.log(users)
                res.render('allusers', {alluser: users});
            }
        });
    }); 
}

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated())
        return next();
    res.redirect('/');
}