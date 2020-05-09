const passport=require('passport')
const jwtStratergy=require('passport-jwt').Strategy
const ExtractJwt=require('passport-jwt').ExtractJwt
const doctors=require('../models/Doctors')
const setup=require('./setupProperties')
const opts={
    jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey :setup.secretKey
}
passport.use(setup.DocApi,new jwtStratergy(opts,async (docData,done )=>{
    try{
                var doc=await doctors.findById(docData.id)
                if(!doc)
                    return done(null,false,'Session expired ')
                return done(null,doc)
                    
    }catch(err)
    {
        return done(err,null)
    } 
}))


module.exports=passport
