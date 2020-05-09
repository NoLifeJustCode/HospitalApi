const express=require('express')
const passport=require('passport')
const setup=require('../../../config/setupProperties')
const router=express.Router()

router.use('/Authorize/doctors',passport.authenticate(setup.DocApi,{session:false}),require('./Authorize/doctors'))

router.use('/Authorize/patients',require('./Authorize/patients'))

router.use('/doctors',require('./UnAuthenticated/doctors'))

module.exports=router