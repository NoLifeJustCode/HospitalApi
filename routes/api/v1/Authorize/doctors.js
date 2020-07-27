const express=require('express')
const doctorController=require('../../../../controller/api/v1/doctorsController')
const patientController=require('../../../../controller/api/v1/patientsController')
const router=express.Router()

router.get('/patients',doctorController.getPatients)

module.exports=router