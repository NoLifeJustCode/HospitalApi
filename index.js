
//import express framework
const express=require('express')
//import express-session
const express_session=require('express-session')
//import path
const path=require('path')
//import passportjs
const passport=require('passport')
//import stratergy
const passport_jwt=require('./config/passport_jwt.js')
const passport_local=require('./config/passport_local')

//create instance of framework
const app=express();

//logical port where server listens for incoming connection
const port=3000;

app.use(express.urlencoded())

// app.use(passport.initialize())
// app.use(passport.session())




//router to products route

app.use('/',require('./routes/index'))


//Attach server to port 3000 to listen for incomeing client request
app.listen(port,function(err){
    if(err){
        console.log(err)
        return;
    }
    console.log('server running')
})