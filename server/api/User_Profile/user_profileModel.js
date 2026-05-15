const mongoose=require("mongoose")
const userprofile=new mongoose.Schema({
   
    userId:{type:mongoose.Schema.Types.ObjectId,ref:'users'},
    idProofImage:{type:String},
    address:{type:String},
    verificationStatus :{type:Boolean,default:true},
    createdAt:{type:Date,default:Date.now()}

})

module.exports=mongoose.model("userprofiles",userprofile);



