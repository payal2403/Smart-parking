const usersModel = require("../api/Users/usersModel")



module.exports=()=>{
    usersModel.findOne({email:"admin@gmail.com"}).then((data)=>{
        if(data==null){
            let userobj=new usersModel()

            userobj.name="admin",
            userobj.email="admin@gmail.com",
            userobj.password="123",
            userobj.userType="1",

            userobj.save().then(()=>{
                console.log("Admin Create Successfully");
                

            }).catch(()=>{

            })
        }else{
            console.log("admin already exist");
        }
    }).catch((err)=>{

    })
}

