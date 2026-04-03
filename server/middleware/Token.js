const jwt = require("jsonwebtoken");
const skey = "hahahaha@2403";

module.exports = (req, res, next) => {


  let token = req.headers["authorization"];

  jwt.verify(token, skey, function (err, decoded) {

    if(err){
        res.send({
            message:"Token NOt Found",
            status:404,
            success:false,
            err:err
        })
    }else{

        next()
    }



  });



};
