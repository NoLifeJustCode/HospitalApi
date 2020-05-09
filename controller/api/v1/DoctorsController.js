const doctors=require('../../../models/Doctors')
const jwt=require('jsonwebtoken')
const setup=require('../../../config/setupProperties')
module.exports.Register=async function(req,res){
    try{
        var doc={}
        
        if(!req.body.email||!req.body.mobile||!req.body.password||!req.body.name)
            return res.send(422,{
                message:'Invalid Sign up Data'
            })
        doc['email']=req.body.email
        doc['mobile']=req.body.mobile
        doc['password']=req.body.password
        doc['name']=req.body.name
        console.log(doc)
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
        console.log(err)
        return res.send(504,{message:err.message})
    }

}


module.exports.Login=async function(req,res){
    try{
            var docData=await doctors.findOne({email:req.body.email})
            if(!docData)
                return res.send(422,{
                    message:'Invalid Credentials'
                })
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
            res.send(200,{
                message:'Login successfull',
                token:token,
            })
    }
    catch(err){
        return res.send(504,{message:err.message})
    }
}