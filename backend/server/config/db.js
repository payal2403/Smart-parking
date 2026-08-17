const mongoose=require("mongoose")
mongoose.connect("mongodb://localhost:27017/Smart_Parking").then(()=>{
    console.log("Database is Connected");
    
}).catch(()=>{
    console.log(err);
    
})
    
    