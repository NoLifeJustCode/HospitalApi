const mongoose=require('mongoose')
const HospitalDb=require('../config/mongoose_HospitalDB')
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
patientSchema.path('mobile').validateMobile=async function(mobile){
    var mobileRegex=(/[1-9]{2}\d{8}/);
    return mobileRegex.test(mobile)
}
module.exports=HospitalDb.model('Patients',patientSchema)