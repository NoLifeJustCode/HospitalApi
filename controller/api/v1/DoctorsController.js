//import Doctors and patients Model
const doctors=require('../../../models/Doctors')
const reports=require('../../../models/Reports')
//import jwt to generate web token
const jwt=require('jsonwebtoken')

//import setup to retrieve setup info
const setup=require('../../../config/setupProperties')
/*
  The module Registers a Doctor based on info passed
  Email is unique
  Validations :
            Email
            Mobile
 */
module.exports.Register=async function(req,res){
    try{
        var doc={}
        //console.log(JSON.parse(req.body))
        if(!req.body.email||!req.body.mobile||!req.body.password||!req.body.name)
            return res.send(422,{
                message:'Invalid Sign up Data'
            })
        doc['email']=req.body.email
        doc['mobile']=req.body.mobile
        doc['password']=req.body.password
        doc['name']=req.body.name
       // console.log('doc',doc)
        var docData=await doctors.create(doc)
        // const data={
        //     id:docData._id,
        //     name:docData.name,
        //     email:docData.name,
        //     name:docData.name,
        // }
        return res.send(200,{
            message:'Registeration Successfull!!',
           // data:data
        })    
    }catch(err){
      //  console.log(err)
        return res.send(504,{message:err.message})
    }

}

/*
 * Login generates a web token to be used to authenticate routes and provide access 
 * password is excluded from jwtPayload
 */
module.exports.Login=async function(req,res){
    try{    //console.log(req.body)
            var docData=await doctors.findOne({email:req.body.email})
            if(!docData)
                return res.send(422,{
                    message:'Invalid Credentials'
                })
            if(!req.body.password)
                return res.send(422,{message:'invalid password'})
            const validatepassword=await docData.verifyPassword(req.body.password)
            if(!validatepassword)
                return res.send(422,{message:'invalid password'})
            const data={
                id:docData.id,
                name:docData.name,
                email:docData.email,
                mobile:docData.mobile,
            }
            const token=jwt.sign(data,setup.secretKey,{expiresIn:setup.jwt_expiry})
            res.header('Access-Control-Allow-Origin', "http://localhost:3000");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            res.header( 'Access-Control-Allow-Credentials',true);
            res.cookie('jwt',token,{maxAge:900000,secure:false})
            
             res.send(200,{
                 message:'Login successfull',
                 token:token,
             })
    }
    catch(err){
        return res.send(504,{message:err.message})
    }
}
/**
 * This query provides list of reports matching certain status queries
 */
module.exports.status=async function(req,res){
    try{
        var statusReports=await reports.find({
            Status:req.params.status
        }).populate('patient','name mobile Age').populate('ReportCreatedBy','email mobile name')
     //   console.log('called')
        return res.status(200).json(statusReports)
    }catch(err){
        return res.send(504,{message:err.message})
    }
}

module.exports.getPatients=async function(req,res){
    try{
        //var patients=await doctors.findById(req.user.id,{select:'patients '}).populate('patients','Reports').populate('Reports')
     //   console.log('patients Called')
        var patients=await doctors.findById(req.user.id).select('email name mobile patients').populate(
            {
                path:'patients',
                select:'Reports name mobile Age',
                populate:{
                    path:'Reports',
                    select:'Status'
                }
            }
        )
      //  console.log("patients",patients)
        return res.status(200).send(patients)    
    }catch(err){
        return res.send(504,{message:err.message})
    }
}

