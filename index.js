let dbHost="mongodb://localhost:27017/Hospital"
let env=process.argv.splice(2,1)[0];
if(env=="test")
    dbHost="mongodb://localhost:27017/test";
//import express framework
const express=require('express')
const cookieParser=require('cookie-parser')

//import express-session
const express_session=require('express-session')
//import path
const path=require('path')
//import passportjs
const passport=require('passport')
//import stratergy
const passport_jwt=require('./config/passport_jwt.js')
//const passport_local=require('./config/passport_local')
const body_parser=require('body-parser')
//create instance of framework
const app=express();
const db=require('./config/mongoose_HospitalDB').configureMongoose(dbHost);
const mongoose=require('mongoose');
if(env=="test"){
    db.dropDatabase((e)=>console.log('dropped'))
}
//logical port where server listens for incoming connection
const port=8000;
app.use(cookieParser())
//
app.use(require('cors')({origin:'http://localhost:3000',credentials:true}))
app.use(body_parser.json())
app.use(body_parser.urlencoded({extended:true}))

// app.use(passport.initialize())
// app.use(passport.session())




//router to products route
// app.use(function(req,res,next){
//     console.log(req.url)
//     console.log(req.body)
//     next()
// })
app.use('/',require('./routes/index'))


//Attach server to port 3000 to listen for incomeing client request
app.listen(port,function(err){
    if(err){
        console.log(err.message)
        return;
    }
    console.log('server running')
})