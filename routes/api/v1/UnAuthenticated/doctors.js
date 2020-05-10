/**
 * Import express and passport to authenticate and create Routes to handle routing
 */

const express=require('express')
const passport=require('passport')
const router=express.Router()
//Doctor Controller containing all actions Related to Doctors
const doctorController=require('../../../../controller/api/v1/doctorsController')
/**
 * UnAuthenticated Routes
 */
//Router Doctors Register 
router.post('/register',doctorController.Register)
 //Router Login to Login Action
router.post('/Login',doctorController.Login)
module.exports=router