const mongoose=require("mongoose")
const spaceSchema=new mongoose.Schema({
    
    ownerProfileId:{type:mongoose.Schema.Types.ObjectId,ref:'users'},
    title:{type:String},
    address:{type:String},
    latitude:{type:String},
    longitude:{type:String},
    totalArea:{type:String},
    parkingType:{type:String},
    parking_images:{type:String},
    Status:{type:Boolean},
    createdAt:{type:Date,default:Date.now()}

})

module.exports=mongoose.model("spaces",spaceSchema);



