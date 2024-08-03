const express = require("express");
const app = express();
const passport =require('passport')
const localStrategy= require('passport-local').Strategy;
const AllUser = require("./Model/UserSchema");
passport.use(new localStrategy(async (UserName,password,done)=>{
    try{
      const data =await AllUser.findOne({username:UserName})
       if(!data) return  done(null,false,{ message: 'Incorrect username.' })
        // console.log(data)
        await data.comparePassword(password,function(err, isMatch) {
            if (err) throw err;
            // console.log(password, isMatch);
            if(isMatch)  return done(null,data)
                return done(null, false,{ message: 'Incorrect password.' })
        });
        
     
    }
    catch(err){
        console.log(err)
        done(err)
    }
}))

app.use(passport.initialize())
const authHandler= passport.authenticate('local',{session:false})

module.exports=authHandler;