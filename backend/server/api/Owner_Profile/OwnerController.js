const usersModel = require("../Users/usersModel");

const OwnerModel=require("./OwnerModel");
const bcrypt=require("bcrypt")

const register=(req,res)=>{
    let errMsg=[];

    if (!req.body.name){
        errMsg.push("name is required 😠")
    }
    if(!req.body.email){
        errMsg.push("email is required")
    }
    if(!req.body.phone){
        errMsg.push("Phone no. is required")
    }
    if(!req.body.password){
        errMsg.push("Password is required 🔑")
    }
      if (errMsg.length>0){
        res.send({
            message:errMsg,
            success:false,
            status:404,
        });
    } else{
        usersModel.findOne({email:req.body.email}).then((existuser)=>{
            if(!existuser){
            let userObj=new usersModel();
            userObj.name=req.body.name;
            userObj.email=req.body.email;
            userObj.phone=req.body.phone;
            userObj.password=bcrypt.hashSync(req.body.password,10);
            userObj.userType="2"
            userObj.save().then((data)=>{
                console.log(data._id);
               
                

           let ownerObj=new OwnerModel();
        
            ownerObj.userId=data._id;
            ownerObj.idProofImage=req.body.idProofImage;
            ownerObj.addressProofImage=req.body.addressProofImage;
           
            ownerObj.save().then((owner)=>{
                res.send({
                    message:"Owner added successfully 🎉",
                    status:201,
                    success:true,
                    data:owner
                })
                    
                
                
                
            }).catch((err)=>{
                res.send({
                    message:"Error while saving owner",
                    success:false,
                    error:err
                })




            });
                
            })

            } else{
                res.send({
                    message:"Owner already exist",
                    success:false,
                    status:403,
                })
                
            }
        })
    } 
        
    
}

const all = (req, res) => {
  OwnerModel
    .find(req.body)
    .then((ExistOwner) => {
      if (ExistOwner == null) {
        res.send({
          status: 404,
          message: "Owner Not Found",
          success: false,
        });
      } else {
        res.send({
          status: 200,
          message: "All Owner",
          success: true,
          totalspace: ExistOwner.length,
          data: ExistOwner,
        });
      }
    })
    .catch((err) => {
      res.send({
        status: 500,
        message: "Internal Server Error",
        success: false,
      });
    });
};

module.exports={
    register,
    all
}