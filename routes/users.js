module.exports = (app, passport)=> {

    app.get('/', (req, res)=> {
        res.render('index', {title: 'Apollo'});
    });

    app.get('/profile', isLoggedIn, (req, res) => {
        res.render('users/profile', {user: req.user});
    });

    app.get('/logout', (req, res)=>{
        req.logout();
        res.redirect('/');
    });

    app.get('/login', (req, res)=> {
        res.render('users/login', {message: req.flash('loginMessage')});
    });

    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile',
        failureRedirect : '/login',
        failureFlash    : true
    }));

    //============Signup==============//
    
    app.get('/signup', (req, res)=>{
        res.render('users/signup', {message: req.flash('signupMessage')});
    });

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile',
        failureRedirect : '/signup',
        failureFlash    : true
    })) 
}

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated())
        return next();
    res.redirect('/');
}