/**
 * Import express and passport with setup Properties
 */

const express=require('express')
const passport=require('passport')
const setup=require('../../../config/setupProperties')
const router=express.Router()
//secured Route to doctors Related Actions
router.use('/Authorize/doctors',passport.authenticate(setup.DocApi,{session:false}),require('./Authorize/doctors'))


//secured Route to doctors Related Patients
router.use('/Authorize/patients',passport.authenticate(setup.DocApi,{session:false}),require('./Authorize/patients'))


//secured Route to doctors Related Reports
router.use('/Authorize/reports',passport.authenticate(setup.DocApi,{session:false}),require('./Authorize/reports'))



//UnAuthenticated Routes
router.use('/doctors',require('./UnAuthenticated/doctors'))

module.exports=router