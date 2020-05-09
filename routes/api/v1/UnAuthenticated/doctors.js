const express=require('express')
const passport=require('passport')
const router=express.Router()

const doctorController=require('../../../../controller/api/v1/doctorsController')
const passport_opts={
    failureRedirect:'back',
    failureMessage:'Invalid username or Password'
}

router.post('/register',doctorController.Register)
 
router.post('/Login',doctorController.Login)
module.exports=router