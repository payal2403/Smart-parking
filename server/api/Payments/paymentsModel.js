const mongoose=require("mongoose")
const paymentSchema=new mongoose.Schema({
    parkingId:{type:Number},
    bookingId:{type:Number},
    userId:{type:Number},
    amount:{type:Number},
    paymentMethod:{type:String},
    transactionId:{type:Number},
    paymentStatus:{type:Boolean},
    createdAt:{type:Date,default:Date.now()}
    

})

module.exports=mongoose.model("payments",paymentSchema);



