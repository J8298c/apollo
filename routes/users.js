module.exports = (app, passport, User)=>{

  app.get('/users/profile', isLoggedIn, (req, res)=>{
    res.render('profile', {user: req.user.email});
  });

  app.get('logout', (req, res)=>{
    req.logout();
    res.redirect('/');
  });

  app.get('/users/login', (req, res)=>{
    res.render('login', {message: req.flash('loginMessage')});
  });

  app.post('/login', passport.authenticate('local-login', {
    successRedirect   :   '/users/profile',
    failureRedirect   :   '/users/login',
    failureFlash      : true
  }));

  app.get('/users/signup', (req, res)=>{
    res.render('signup', {message: req.flash('signupMessage')});
  });

  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect   :   '/users/profile',
    failureRedirect   :   '/users/signup',
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