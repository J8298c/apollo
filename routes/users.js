

module.exports = (app, passport, User)=> {

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
        User.find({}, (err, users)=>{
            if(err){
                res.render('error',{err: err});
            } else {
                let userArr = [];
                users.map((user)=>{
                   userArr.push(user.local.email.split(/[@]/)[0])
                })
                res.render('allusers', {alluser: userArr});
            }
        });
    }); 
    app.get('/follow/:name', (req, res)=>{
        console.log(req.params)
        res.render('othersprofile', {username: hello});
    })
}

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated())
        return next();
    res.redirect('/');
}