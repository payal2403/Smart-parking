const mongoose=require("mongoose")
const paymentSchema=new mongoose.Schema({
    // parkingId:{type:Number},
    // bookingId:{type:Number},
    // userId:{type:},
    amount:{type:Number},
    paymentMethod:{type:String},
    transactionId:{type:mongoose.Schema.Types.ObjectId,ref:'payments' },
    paymentStatus:{type:String},
    createdAt:{type:Date,default:Date.now()}
    

})

module.exports=mongoose.model("payments",paymentSchema);



