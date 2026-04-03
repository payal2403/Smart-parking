const mongoose=require("mongoose")
const penaltySchema=new mongoose.Schema({
   penaltyId:{type:mongoose.Schema.Types.ObjectId,ref:'penalties'},
    bookingId:{type:String},
    lateMinutes:{type:String},
    penaltyAmount:{type:String},
    status:{type:Boolean},
    createdAt:{type:Date,default:Date.now()}
   
   

})

module.exports=mongoose.model("penalties",penaltySchema);



