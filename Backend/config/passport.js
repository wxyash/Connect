const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = mongoose.model('User')
const Admin = mongoose.model('Admin')


passport.use(new LocalStrategy({
    usernameField: 'email'
}, async (useremail, password, done)=>{
    let user , admin
    user = await User.findOne({email: useremail})
    admin = await Admin.findOne({email: useremail})
    console.log(user)
    console.log(admin)
    if(user == null && admin == null){
       console.log("JSDSD")
       if(user == null){
           return done(null, false, {
               message: 'User not found, please try with valid credintial'
           })
       }else if(admin == null){
           return done(null, false, {
               message: 'Admin not found, please try with valid credintial'
           })
       }else{
           return done(null, false, {
               message: 'User and Admin not found, please try with valid credintial'
           })
       }
    }else if(user != null){
        console.log(user)
        try {
            if(!user){
                return done(null, false, {
                    message: 'user not found'
                })
            }
        } catch (error) {
            return badRequest('error finding user', {error: error}, res)
        }
        
        try {
            if(!user.validPassword(password)){
                return done(null, false ,{
                    message: "Password is wrong"
                })
            }
        } catch (error) {
            badRequest('Error validating password', {error: error.message}, res)
        }
        return done(null, user)
    }
    else if(admin != null){
        try {
            if(!admin){
                return done(null, false, {
                    message: 'admin not found'
                })
            }
        } catch (error) {
            return badRequest('error finding admin', {error: error}, res)
        }

        try {
            if(!admin.validPassword(password)){
                return done(null, false ,{
                    message: "Password is wrong"
                })
            }
        } catch (error) {
            return badRequest('Error validating password', {error: error.message}, res)
        }

        return done(null, admin)
    }else{
        // In Actual App it should never be in the else block
        return 
    }
//     // try {
//     //     if(!user){
//     //         return done(null, false, {
//     //             message: 'user not found'
//     //         })
//     //     }
//     // } catch (error) {
        
//     // }
//     // console.log(useremail, password)
//     // Admin.findOne({email: useremail}, (err, user)=>{
//     //     if(err){
//     //         return done(err); 
//     //     }

//     //     console.log(user)
//     //     if(!user){
//     //         return done(null, false, {
//     //             message: "User not found"
//     //         });
//     //     }

//     //     if(!user.validPassword(password)){
//     //         return done(null, false, {
//     //             message: "Password is wrong"
//     //         });
//     //     }
//     //     return done(null, user);
//     // });
}))