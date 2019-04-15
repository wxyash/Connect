const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Admin = mongoose.model('Admin')

passport.use(new LocalStrategy({
    usernameField: 'email'
}, (useremail, password, done) =>{
   Admin.findOne({email: useremail}, (err, user)=>{
       if(err){
           return done(err);
       }
       if(!user){
           return done(null, false, {
               message: "User not found"
           })
       }

       if(!user.validPassword(password)){
           return done(null, false, {
               message: "Password is wrong"
           })
       }

       return done(null, user);
   })
}))