const express=require('express')
const doctorsController=require('../../../../controller/api/v1/DoctorsController')
const router=express.Router()

router.get('/:status',doctorsController.status)


module.exports=router