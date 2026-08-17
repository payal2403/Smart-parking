const mongoose=require("mongoose")
const ownerSchema=new mongoose.Schema({
   
    userId:{type:mongoose.Schema.Types.ObjectId,ref:'users'},
    idProofImage:{type:String},
    addressProofImage:{type:String},
    verificationStatus :{type:Boolean},
    createdAt:{type:Date,default:Date.now()}

})

module.exports=mongoose.model("owners",ownerSchema);



