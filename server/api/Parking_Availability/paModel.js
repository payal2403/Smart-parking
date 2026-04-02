const mongoose=require("mongoose")
const availabilitySchema=new mongoose.Schema({
    availabilityId :{type:Number},
    parkingId:{type:Number},
    dayOfWeek:{type:String},
    startTime:{type:Date},
    endTime:{type:Date},
    isActive:{type:Boolean},
    createdAt:{type:Date,default:Date.now()}

})

module.exports=mongoose.model("availabilities",availabilitySchema);



