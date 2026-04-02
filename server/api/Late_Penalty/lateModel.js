const mongoose=require("mongoose")
const penaltyScehma=new mongoose.Schema({
   penaltyId:{type:Number},
    bookingId:{type:Number},
    lateMinutes:{type:Number},
    penaltyAmount:{type:Number},
    status:{type:Boolean},
    createdAt:{type:Date,default:Date.now()}
   
   

})

module.exports=mongoose.model("penalties",penaltySchema);



