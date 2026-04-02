const mongoose=require("mongoose")
const slotSchema=new mongoose.Schema({
    slotId:{type:Number},
    parkingId:{type:Number},
    slotType:{type:String},
    maxVehicleCount:{type:Number},
    areaUsed:{type:Number},
    createdAt:{type:Date,default:Date.now()}
   

})

module.exports=mongoose.model("slots",slotSchema);



