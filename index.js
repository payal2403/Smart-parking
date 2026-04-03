const express = require('express');
const app = express();

const db=require("./server/config/db")
const adminseed=require("./server/config/seeder")

adminseed()

const userroutes=require("./server/routes/Apiroutes")



app.use(express.urlencoded());

app.use(express.json())






app.get('/', (req, res)=>{
        res.send("Welcome to server")
    })

const apiroutes=require("./server/routes/Apiroutes")

   
app.use("/apis",apiroutes)



// for app listening
app.listen(5001, ()=>{
    console.log("I am listening to port 5001");
})

