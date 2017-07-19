var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');

passport.serializeUser((user, done) => {
    //  console.log('vvdfvdffffvvvvvvvffffffffffffffffffffffffffffffffffffffffffffffffffff');
    //console.log('id is' + user.id)
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        //  console.log('vvdfvdffffvvvvvvvffffffffffffffffffffffffffffffffffffffffffffffffffff');
        //console.log('id is' + id);
        done(err, user);
    });
});

passport.use('local.signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, (req, email, password, done) => {
    User.findOne({ 'email': email }, (err, user) => {

        if (err) {



            return done(err);
        }
        if (user) {

            return done(null, false, req.flash('error', 'email already exists'));

        }

        var user = new User();
        user.fullname = req.body.fullname;
        user.email = req.body.email;
        user.password = user.encryptPassword(req.body.password);
        user.save((err) => {
            return done(null, user);
        });
    })


}))




passport.use('local.signin', new LocalStrategy({
    usernameField: 'email1',
    passwordField: 'password1',
    passReqToCallback: true
}, (req, email, password, done) => {
    User.findOne({ 'email': email }, (err, user) => {



        if (err) {



            return done(err);
        }


        if (!user) {


            return done(null, false, req.flash('error', 'email doesnot exists  '));

        }


        if (!user.validPassword(password)) {

            return done(null, false, req.flash('error', ' incorrect password '));

        }




        return done(null, user);

    })


}))