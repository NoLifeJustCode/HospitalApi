//import Doctors and patients Model
const doctors=require('../../../models/Doctors')
const patients=require('../../../models/Patients')
const reports=require('../../../models/Reports')
//import setup to retrieve setup info
const setup=require('../../../config/setupProperties')

/**
 * Retreive Patient Record if Exists else create one 
 */
module.exports.Register=async function(req,res){
    try{
        var doc={}
     //   console.log(req.body)
        if(!req.body.mobile||!req.body.Age||!req.body.name)
            return res.send(422,{
                message:'Invalid Sign up Data'
            })   
        doc['mobile']=req.body.mobile
        doc['Age']=req.body.Age
        doc['name']=req.body.name
        var patient=await patients.findOne(doc)
      //  console.log(req.user)
        if(!patient)
                patient=await patients.create(doc);
        doctors.findOneAndUpdate({_id:req.user.id,
            'patients':{'$ne':patient.id}    
        },{'$push':{'patients':patient.id}},{'upsert':true},(err,data)=>{
           // console.log(err,data)
        })
            
        return res.status(200).json(patient)

    }catch(err){
        return res.send(504,err.message)
    }
}


/**
 * 
 * Update patient Info
 * 
 */

module.exports.updatePatient=async function(req,res){
    try{
        var message='',status=200;
        var patient=null;
        if(!req.body.id||!req.body.mobile||!req.body.Age||!req.body.name)
            {   status=422
                message='Invalid Credentials'
            }
        else{
            patient =await patients.findByIdAndUpdate(req.body.id,{
                mobile:req.body.mobile,
                Age:req.body.Age,
                name:req.body.name
            },{
                runValidators:true,
                upsert:true
            })
            if(!patient)
                {   status=404
                    message='patient id is not registered'
                }
        }
        return res.status(status).json({
            message:message,
            patient:patient
        })
        
    }catch(err){
        return res.send(504,err.message)
    }
}


/**
 * Create Report or update Report Status with updated time stamps
 */
module.exports.createReport=async function(req,res){
    try{
      //  console.log(req.params)
        if(!req.body.status)
            return res.status(422).json('Incomplete Data')
        var patient=await patients.findById(req.params.id)
        if(!patient)
            return res.status(422).json('patient Record doesn\'t exists')
        var doctor=req.user
        var report=await reports.findOneAndUpdate({
            ReportCreatedBy:doctor._id,
            patient:patient._id
            },
            {Status:req.body.status},
            {new :true,upsert:true,runValidators:true}
            );
      //  console.log(report)
        await patient.update({'$addToSet':{Reports:report.id}})
     //   console.log(patient)
        return res.status(200).json(report)

        

    }catch(err){
        return res.send(504,err.message)
    }       
}
/**
 * Retrive all Reports of a patient and is currently Authenticated by doctors JWT 
 */
module.exports.all_reports=async function(req,res){
    try{
       
        var patient=await patients.findById(req.params.id,{select:'Reports'}).populate('Reports','ReportCreatedBy status createdAt updatedAt')
        if(patient)
        await patient.populate('ReportCreatedBy','name')
        if(!patient)
            return res.status(422).json('patient Record doesn\'t exists')
         
        
        return res.status(200).json(patient)

    }catch(err){
      //  console.log(err)
        return res.send(504,err.message)
    }       
}

