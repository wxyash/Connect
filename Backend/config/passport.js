const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = mongoose.model('User')


passport.use(new LocalStrategy({
    usernameField: 'email'
},(useremail, password, done)=>{
    User.findOne({email: useremail}, (err, user)=>{
        if(err){return done(err); }

        console.log(user)
        if(!user){
            return done(null, false, {
                message: "User not found"
            });
        }

        if(!user.validPassword(password)){
            return done(null, false, {
                message: "Password is wrong"
            });
        }
        return done(null, user);
    });
}))