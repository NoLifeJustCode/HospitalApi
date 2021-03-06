const passport=require('passport')
const jwtStratergy=require('passport-jwt').Strategy
const ExtractJwt=require('passport-jwt').ExtractJwt
const doctors=require('../models/Doctors')
const setup=require('./setupProperties')
function CookieExtractor(req){
   // console.log('calling Extraction')
  //  console.log(req.cookies)
    var token=null
    if(req&&req.cookies)
        token=req.cookies['jwt']
    return token
}
//ExtractJwt.fromAuthHeaderAsBearerToken(),
const opts={
    jwtFromRequest:ExtractJwt.fromExtractors([ExtractJwt.fromAuthHeaderAsBearerToken(),CookieExtractor]),
    secretOrKey :setup.secretKey
}
passport.use(setup.DocApi,new jwtStratergy(opts,async (docData,done )=>{
    try{
                var doc=await doctors.findById(docData.id)
              //  console.log(doc)
                if(!doc)
                    return done(null,false)
                return done(null,doc)
                    
    }catch(err)
    { //  console.log(err)
        return done(err,null)
    } 
}))


module.exports=passport
