const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/usermodel');

passport.serializeUser(function(user, done) {
  done(null, user.name);
  console.log(user);
});

passport.deserializeUser(function(name, done) {
  User.findOne({name: name}, function(err, user) {
    done(err, user);
  });
});


//middleware for logging && User Authentication
//==================================================//


router.use(function(req, res, next){
    console.log('Currently making a ' + req.method + " request");
    console.log('From this current URL' + req.url);
    next();
});

//passport middleware
passport.use('local-login', new LocalStrategy({
    usernameField: 'name',
    passwordField: 'password'
},
function(username, password, done){
    console.log('finding user');
    User.findOne({'name': username}, function(err, user){
        console.log('current user');
        console.log(username)
        if(err){
            return done(err);
        }
        if(!user) {
            return done(null, false, {message: 'You entered the wrong user name please try again'});
        }
        if(!user.validPassword(password)){
            return done(null, false, {message: 'Incorrect Password'});
        }
        return done(null, user);
        console.log('returning user that just signed in');
        console.log(user);
        loggedIn(user);
        return user;
    });
}));