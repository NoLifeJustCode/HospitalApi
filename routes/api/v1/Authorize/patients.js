const express=require('express')
//Patient Controller contains basic CRUD actions on patient Records 
const patientsController=require('../../../../controller/api/v1/PatientsController')
const router=express.Router()

//Route Registering or retreive  of Patient Record
router.post('/Register',patientsController.Register)
//Route to update patient info
router.post('/update',patientsController.updatePatient)
//Route Creating of Repoert Related to patients
router.post('/:id/create_report',patientsController.createReport)

//Retrieve all reports of particular patient
router.get('/:id/all_reports',patientsController.all_reports)
module.exports=router