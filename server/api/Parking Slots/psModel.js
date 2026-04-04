const mongoose=require("mongoose")
const slotSchema=new mongoose.Schema({
    // slotId:{type:mongoose.Schema.Types.ObjectId,ref:'slots'},
    // parkingId:{type:mongoose.Schema.Types.ObjectId,ref:'spaces'},
    slotType:{type:String},
    maxVehicleCount:{type:String},
    areaUsed:{type:String},
    createdAt:{type:Date,default:Date.now()}
   

})

module.exports=mongoose.model("slots",slotSchema);



