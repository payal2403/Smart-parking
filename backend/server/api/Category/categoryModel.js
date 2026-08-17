const mongoose=require("mongoose")
const CategorySchema=new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,ref:'users'},
    name:{type:String},
    description:{type:String},
    image:{type:String}

})

module.exports=mongoose.model("categories",CategorySchema)