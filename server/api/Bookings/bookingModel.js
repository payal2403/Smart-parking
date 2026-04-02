const mongoose=require("mongoose")
const bookingScehma=new mongoose.Schema({
    bookingId:{type:Number},
    userId:{type:mongoose.Schema.types.ObjId,ref:'users'},
    parkingId:{type:Number},
    slotType:{type:String},
    startTime:{type:Date},
    endTime:{type:Date},
    bookingType:{type:String},
    amount:{type:Number},
    paymentStatus:{type:Boolean},
    bookingStatus:{type:Boolean},
    createdAt:{type:Date,default:Date.now()}

})

module.exports=mongoose.model("bookings",bookingSchema);



