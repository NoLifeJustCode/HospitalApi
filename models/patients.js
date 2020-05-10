//import mongoose and HospitalDB connection 
const mongoose=require('mongoose')
const HospitalDb=require('../config/mongoose_HospitalDB')
//import bcrypt to hash password
const bcyrpt=require('bcrypt')
const Schema=mongoose.Schema

const patientSchema=new Schema({
    name:{
            type:String,
            required:true,
    },
    mobile:{
        type:Number,
        required:true,
    },
    Age:{
        type:Number,
        required:true,
    },
    Reports:[
        {
         type:mongoose.SchemaTypes.ObjectId,
         ref:'Reports'
        }
    ]

},{timestamps:true})
//Mobile validations to validate mobile numbers
patientSchema.path('mobile').validate(function(mobile){
    var mobileRegex=/^[0-9]{10}$/;
    console.log(mobileRegex.test(mobile))
    return mobileRegex.test(mobile)
},'mobile Validtion failed : Mobile number shld be of 10 digits and shld not start with 0')
module.exports=HospitalDb.model('Patients',patientSchema)