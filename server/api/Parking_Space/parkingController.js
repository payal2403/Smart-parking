const parkingModel=require("./parkingModel");
const { uploadImg } = require("../../utilities/helper");

const add = (req, res) => {
  let parkingObj = new parkingModel();
  parkingObj.ownerProfileId = req.body.ownerProfileId;
  parkingObj.title = req.body.title;
  parkingObj.address = req.body.address;
  parkingObj.latitude = req.body.latitude;
  parkingObj.longitude = req.body.longitude;
  parkingObj.totalArea = req.body.totalArea;
  parkingObj.parkingType = req.body.parkingType;
  // parkingObj.parking_images = req.body.parking_images;
  let errmsg=[]

  if(!req.file){
    return res.send({
        status: 201,
        message: "Image is required",
        success:false
      });
  }
  
  if (errmsg.length > 0) {
    res.send({
      success: false,
      status: 400,
      message: errmsg,
    });
  } else {

  parkingModel.findOne({ title: req.body.title })
      .then(async(Data) => {
        // console.log("HLo",Data);
        if (Data == null) {
          // let parkingObj = new parkingModel();

          parkingObj.title= req.body.title;
          parkingObj.address= req.body.address;
          parkingObj.latitude= req.body.latitude;
          parkingObj.longitude= req.body.longitude;
          parkingObj.totalArea= req.body.totalArea;
          // parkingObj.image = req.body.image;

          try{

            let url=await uploadImg(req.file.buffer)
          parkingObj.parking_images = url


          }catch(err){
               res.send({
                success: false,
                status:403 ,
                message: "Cloudinary err",
                err: err,
              });
          }

          console.log(parkingObj);

        

 
  // console.log(req.files);

  // req.files.map((f)=>{

  //   parkingObj.parking_images.push(f.filename)
  // })


  parkingObj
    .save()
    .then((data) => {
      res.send({
        status: 201,
        message: "Parking space Created",
        success:true,
        data: data,
      });
    })
    .catch((err) => {
      res.send({
    status: 500,
    message: "Error while saving parking",
    success: false,
    error: err.message
  });
    });
  }
})
.catch((err)=>{
   console.log(err);
        
        res.send({
          success: false,
          status: 500,
          message: "Internal server Error",
          err: err,
        });
      });

}
};


const single = (req, res) => {
  let ErrMsg = [];

  if (!req.body._id) {
    ErrMsg.push("_id is required");
  }

  if (ErrMsg.length > 0) {
    res.send({
      status: 404,
      message: ErrMsg,
      success: false,
    });
  } else {
    parkingModel
      .findOne({ _id: req.body._id })
      .then((Existparking) => {
        if (Existparking == null) {
          res.send({
            status: 404,
            message: "Not Found",
            success: false,
          });
        } else {
          res.send({
            status: 200,
            message: "Found",
            success: true,
            data: Existparking,
          });
        }
      })
      .catch((err) => {
        res.send({
          status: 500,
          message: "Internal Server Error",
          success: false,
        });
      });
  
 
    

};
}

const DeleteOne = (req, res) => {
  let ErrMsg = [];

  if (!req.body._id) {
    ErrMsg.push("_id is required");
  }

  if (ErrMsg.length > 0) {
    res.send({
      status: 404,
      message: ErrMsg,
      success: false,
    });
  } else {
    parkingModel
      .findOne({ _id: req.body._id })
      .then((Existparking) => {
        if (Existparking== null) {
          res.send({
            status: 404,
            message: "Not Found",
            success: false,
          });
        } else {
          parkingModel.deleteOne({ _id: req.body._id }).then(() => {
            res.send({
              status: 200,
              message: "delete",
              success: true,
            });
          }).catch((err)=>{
             res.send({
          status: 500,
          message: "Internal Server Error",
          success: false,
        });
          })
        }
      })
      .catch((err) => {
        res.send({
          status: 500,
          message: "Internal Server Error",
          success: false,
        });
      });
  }
};

const Updatespace = (req, res) => {
  let ErrMsg = [];

  if (!req.body._id) {
    ErrMsg.push("_id is required");
  }

  if (ErrMsg.length > 0) {
    res.send({
      status: 404,
      message: ErrMsg,
      success: false,
    });
  } else {
    parkingModel
      .findOne({ _id: req.body._id })
      .then(async(Existspace) => {
        if (Existspace == null) {
          res.send({
            status: 404,
            message: "Not Found",
            success: false,
          });
        } else {


          if (req.body.ownerProfileId ) {
            Existspace.ownerProfileId =req.body.ownerProfileId 
          }

          if (req.body.title) {
            Existspace.title=req.body.title
          }
          if (req.body.address) {
            Existspace.address=req.body.address
          }
          if (req.body.latitude) {
            Existspace.latitude=req.body.latitude
          }
           if (req.body.longitude) {
            Existspace.longitude=req.body.longitude
          }

          if (req.body.totalArea){
            Existspace.totalArea=req.body.totalArea
          }
           if (req.body.parkingType){
            Existspace.parkingType=req.body.parkingType
          }
            if (req.file) {
                       try {
           
                         let url = await uploadImg(req.file.buffer)
                         Existspace.parking_images = url
           
           
                       } catch (err) {
                         console.log(err);
                         
                         return res.send({
                           success: false,
                           status: 403,
                           message: "Cloudinary err",
                           err: err,
                         });
                       }
           
                     }
           
            
          Existspace.save() .then((data) => {
              res.send({
                status: 200,
                message: "space  Updated",
                success:true,
                data: data,
              });
            })
            
            .catch((err) => {
              res.send({
                status:500,
                message:"Internal server error",
                success:false,
                error:err
              })
            });



        }
      })
      .catch((err) => {
        res.send({
          status: 500,
          message: "Internal Server Error",
          success: false,
        });
      });

  }
};
const all = (req, res) => {
  parkingModel
    .find(req.body)
    .then((Existspace) => {
      if (Existspace == null) {
        res.send({
          status: 404,
          message: "Space Not Found",
          success: false,
        });
      } else {
        res.send({
          status: 200,
          message: "All Space",
          success: true,
          totalspace: Existspace.length,
          data: Existspace,
        });
      }
    })
    .catch((err) => {
      res.send({
        status: 500,
        message: "Internal Server Error",
        success: false,
      });
    });
};

module.exports={
    add,
    single,
    DeleteOne,
    Updatespace,
    all
}
