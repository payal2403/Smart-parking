const mongoose=require("mongoose")
const bookingSchema=new mongoose.Schema({
    bookingId:{type:mongoose.Schema.Types.ObjectId,ref:'bookings'},
    userId:{type:mongoose.Schema.Types.ObjectId,ref:'users'},
    parkingId:{type:mongoose.Schema.Types.ObjectId,ref:'spaces'},
    slotType:{type:String},
    startTime:{type:String},
    endTime:{type:String},
    bookingType:{type:String},
    amount:{type:String},
    paymentStatus:{type:Boolean},
    bookingStatus:{type:Boolean},
    createdAt:{type:Date,default:Date.now()}

})

module.exports=mongoose.model("bookings",bookingSchema);



