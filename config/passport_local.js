const passport=require('passport')
const localStratergy=require('passport-local').Strategy
const doctors=require('../models/Doctors')
passport.use('Doctor_local',new localStratergy({
    usernameField:'email',
    passwordField:'password'
    
},async function(username,password,done){
        try{
            const doctorData=await doctors.findOne({email:username})
                
            if(!doctorData||doctorData.verifyPassword())     
                       return done(null,false)
            return done(null,doctorData)
                 

        }catch(err){
            return done(err,null)
        }
}))

passport.serializeUser(function(user,done){
    console.log('serialising')
    done(null,user.id)
})

passport.deserializeUser(function(userId,done){
    doctors.findById(userId,function(err,data){
       console.log(data)
       return done(err,data)
   })   
})


module.exports=passport