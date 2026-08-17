const mongoose=require("mongoose")
const availabilitySchema=new mongoose.Schema({
    // availabilityId :{type:Number},
    parkingId:{type:mongoose.Schema.Types.ObjectId,ref:'availabilities'},
    dayOfWeek:{type:String},
    startTime:{type:String},
    endTime:{type:String},
    isActive:{type:Boolean},
    createdAt:{type:Date,default:Date.now()}

})

module.exports=mongoose.model("availabilities",availabilitySchema);



