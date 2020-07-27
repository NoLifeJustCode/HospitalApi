//import mongoose and HospitalDB connection
const mongoose=require('mongoose')

//const HospitalDb=require('../config/mongoose_HospitalDB')

const Schema=mongoose.Schema

const reportSchema=new Schema({
  ReportCreatedBy:{
      type:mongoose.SchemaTypes.ObjectId,
      ref:'Doctors',
      required:true,
  },
  patient:{
    type:mongoose.SchemaTypes.ObjectId,
    ref:'Patients',
    required:true
  },
  Status:{
      type:String,
      enum:['Negative','Travelled-Quarantine','Symptoms-Quarantine','Positive-Admit'],
      required:true,
  }  
},{timestamps:true})
module.exports=mongoose.model('Reports',reportSchema)
//module.exports=HospitalDb.model('Reports',reportSchema)
