const paModel=require("./paModel")

const add = (req, res) => {
  let AvailabilityObj = new paModel();
  AvailabilityObj.parkingId = req.body.parkingId;
  AvailabilityObj.dayOfWeek = req.body.dayOfWeek;
  AvailabilityObj.startTime= req.body.startTime;
  AvailabilityObj.endTime = req.body.endTime;
  


  
  AvailabilityObj
    .save()
    .then((data) => {
      res.send({
        status: 201,
        message: "Availabilty Created",
        success:true,
        data: data,
      });
    })
    .catch((err) => {
      res.send({
    status: 500,
    message: "Error while saving availabilty",
    success: false,
    error: err.message
  });
    });
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
    paModel
      .findOne({ _id: req.body._id })
      .then((Existavailability) => {
        if (Existavailability == null) {
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
            data: Existavailability,
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
    paModel
      .findOne({ _id: req.body._id })
      .then((Existavailability) => {
        if (Existavailability== null) {
          res.send({
            status: 404,
            message: "Not Found",
            success: false,
          });
        } else {
          paModel.deleteOne({ _id: req.body._id }).then(() => {
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

const Updateavailability = (req, res) => {
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
    paModel
      .findOne({ _id: req.body._id })
      .then((Existavailability) => {
        if (Existavailability == null) {
          res.send({
            status: 404,
            message: "Not Found",
            success: false,
          });
        } else {


          if (req.body.parkingId ) {
            Existavailability.parkingId =req.body.parkingId 
          }

          if (req.body.dayOfWeek) {
            Existavailability.dayOfWeek=req.body.dayOfWeek
          }
          if (req.body.startTime) {
            Existavailability.startTime=req.body.startTime
          }
          if (req.body.endTime) {
            Existavailability.endTime=req.body.endTime
          }
           if (req.body.isActive) {
            Existavailability.isActive=req.body.isActive
          }

         

          Existavailability.save() .then((data) => {
              res.send({
                status: 200,
                message: "booking Updated 🎉",
                data: data,
              });
            })
            
            .catch((err) => {
              res.send({
                status:500,
                message:"Internal server error",
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
  paModel
    .find(req.body)
    .then((Existavailability) => {
      if (Existavailability == null) {
        res.send({
          status: 404,
          message: "Booking Not Found",
          success: false,
        });
      } else {
        res.send({
          status: 200,
          message: "All Booking",
          success: true,
          totalspace: Existavailability.length,
          data: Existavailability,
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
    Updateavailability,
    all
}

