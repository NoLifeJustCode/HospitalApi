const mongoose=require('mongoose')

const HospitalDb=require('../config/mongoose_HospitalDB')
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
doctorSchema.pre('save',async function(next){
    const salt_rounds=10
    console.log(this)
    console.log(this.password)
    this.password=await bcyrpt.hash(this.password,salt_rounds)
    next()
})

doctorSchema.path('email').validate(function(email){
    var emailRegex=/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
    return emailRegex.test(email)
},'email validation failed')

doctorSchema.path('mobile').validateMobile=async function(mobile){
    var mobileRegex=(/[1-9]{2}\d{8}/);
    return mobileRegex.test(mobile)
}

doctorSchema.methods.verifyPassword= async function(password){
        return await bcyrpt.compare(password,this.password)
}


module.exports=HospitalDb.model('Doctors',doctorSchema)