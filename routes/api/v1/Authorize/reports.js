const express=require('express')
const doctorsController=require('../../../../controller/api/v1/DoctorsController')
const router=express.Router()
//Retreive all Reports of filtered by said status
router.get('/:status',doctorsController.status)


module.exports=router