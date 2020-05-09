const express=require('express')
const patientsController=require('../../../../controller/api/v1/PatientsController')
const router=express.Router()


router.post('/Register',patientsController.Register)
router.post('/:id/create_report',patientsController.createReport)
router.post('/:id/all_reports',patientsController.all_reports)
module.exports=router