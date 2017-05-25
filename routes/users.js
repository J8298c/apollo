module.exports = (app, passport, User)=>{

  app.get('/profile', isLoggedIn, (req, res)=>{
    let email = req.user.local.email.spilt(/[@]/)[0];
    res.render('profile', {user: req.user, username: email});
  });

  app.get('logout', (req, res)=>{
    req.logout();
    res.redirect('/');
  });

  app.get('/login', (req, res)=>{
    res.render('login', {message: req.flash('loginMessage')});
  });

  app.post('/login', passport.authenticate('local-login', {
    successRedirect   :   '/profile',
    failureRedirect   :   '/login',
    failureFlash      : true
  }));

  app.get('/signup', (req, res)=>{
    res.render('signup', {message: req.flash('signupMessage')});
  });

  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect   :   '/profile',
    failureRedirect   :   '/signup',
    failureFlash      : true
  }));
}

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  } else{
    res.redirect('/');
  }
}