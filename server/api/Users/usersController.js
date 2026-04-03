

const userModel = require("./usersModel")
const bcrypt=require("bcrypt")




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

           

            if(confirm){
                     res.send({
                massage:"Login Successfully",
                success:true,
                status:200
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
