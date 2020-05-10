//import mongoose and HospitalDB connection
const mongoose=require('mongoose')

const HospitalDb=require('../config/mongoose_HospitalDB')
//import bcrypt to hash password and other sensitive info
const bcyrpt=require('bcrypt')

const Schema=mongoose.Schema

const doctorSchema=new Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    mobile:{
        type:Number,
        required:true,
    },
    password:{
        type:String,
        required:true,
    }
},{timestamps:true})
//hash password
doctorSchema.pre('save',async function(next){
    
    const salt_rounds=10//Default salt_rounds
    console.log(this)
    console.log(this.password)
    this.password=await bcyrpt.hash(this.password,salt_rounds)
    next()
})
//validate email and mobile
doctorSchema.path('email').validate(function(email){
    var emailRegex=/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
    return emailRegex.test(email)
},'email validation failed')

doctorSchema.path('mobile').validate(function(mobile){
    var mobileRegex=/^[0-9]{10}$/;
    console.log(mobileRegex.test(mobile))
    return mobileRegex.test(mobile)
},'mobile Validtion failed : Mobile number shld be of 10 digits and shld not start with 0')
//Instance methods to verify hashed passwords
doctorSchema.methods.verifyPassword= async function(password){
        return await bcyrpt.compare(password,this.password)
}

module.exports=mongoose.model('Doctors',doctorSchema)
// module.exports=HospitalDb.model('Doctors',doctorSchema)