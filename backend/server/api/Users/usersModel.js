const mongoose=require("mongoose")
const usersSchema=new mongoose.Schema({
    userType:{type:String},
    name:{type:String},
    email:{type:String},
    phone:{type:Number},
    password:{type:String},
    Status:{type:Boolean},
    createdAt:{type:Date,default:Date.now()}
    

})

module.exports=mongoose.model("users",usersSchema);



