const mongoose=require("mongoose")
const pricingSchema=new mongoose.Schema({
    pricingId:{type:mongoose.Schema.Types.ObjectId,ref:'pricings'},
    // parkingId:{type:Number},
    slotType:{type:String},
    hourlyRate:{type:Number},
    dailyRate:{type:Number},
    monthlyRate:{type:Number},
    createdAt:{type:Date,default:Date.now()}

})

module.exports=mongoose.model("pricings",pricingSchema);



