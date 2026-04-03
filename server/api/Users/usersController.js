

const userModel = require("./usersModel")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")

const skey = "hahahaha@2403";




const login=(req,res)=>{


if(!req.body.email || !req.body.password){
    res.send({
        message:"Email and password is required",
        success:false,
        status:403
    })

}else{
    userModel.findOne({email:req.body.email}).then((userData)=>{
        if(userData==null){
                res.send({
                message:"user Not found",
                success:false,
                status:404
                })
        }else{
           let confirm= bcrypt.compareSync(req.body.password, userData.password );

             let payload={
                userId:userData._id,
                email:userData.email,
                userType:userData.userType,
                name:userData.name
            }

            console.log({userData});
            console.log({payload});
            

            let token=jwt.sign(payload,skey)

           

            if(confirm){
                     res.send({
                massage:"Login Successfully",
                success:true,
                status:200,
                token:token
                })
            }else{
                     res.send({
                massage:"Invalid password",
                success:false,
                status:404
                })
            }
            
        }

    }).catch((err)=>{
        res.send({
             message:"Internal server error",
                success:false,
                status:500,
                error:err.message
        })

    })
}

}




module.exports={login}
