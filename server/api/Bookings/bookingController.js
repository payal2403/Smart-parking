const bookingModel=require("./bookingModel")

const add = (req, res) => {
  let bookingObj = new bookingModel();
  bookingObj.parkingId = req.body.parkingId;
  bookingObj.slotType = req.body.slotType;
  bookingObj.startTime= req.body.startTime;
  bookingObj.endTime = req.body.endTime;
  bookingObj.bookingType = req.body.bookingType;
  bookingObj.amount = req.body.amount;


  
  bookingObj
    .save()
    .then((data) => {
      res.send({
        status: 201,
        message: "booking Created",
        success:true,
        data: data,
      });
    })
    .catch((err) => {
      res.send({
    status: 500,
    message: "Error while saving booking",
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
    bookingModel
      .findOne({ _id: req.body._id })
      .then((Existbooking) => {
        if (Existbooking == null) {
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
            data: Existbooking,
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
    bookingModel
      .findOne({ _id: req.body._id })
      .then((Existbooking) => {
        if (Existbooking== null) {
          res.send({
            status: 404,
            message: "Not Found",
            success: false,
          });
        } else {
          bookingModel.deleteOne({ _id: req.body._id }).then(() => {
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

const Updatebooking = (req, res) => {
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
    bookingModel
      .findOne({ _id: req.body._id })
      .then((Existbooking) => {
        if (Existbooking == null) {
          res.send({
            status: 404,
            message: "Not Found",
            success: false,
          });
        } else {


          if (req.body.parkingId ) {
            Existbooking.parkingId =req.body.parkingId 
          }

          if (req.body.slotType) {
            Existbooking.slotType=req.body.slotType
          }
          if (req.body.startTime) {
            Existbooking.startTime=req.body.startTime
          }
          if (req.body.endTime) {
            Existbooking.endTime=req.body.endTime
          }
           if (req.body.bookingType) {
            Existbooking.bookingType=req.body.bookingType
          }

          if (req.body.amount){
            Existbooking.amount=req.body.amount
          }
           

          Existbooking.save() .then((data) => {
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
  bookingModel
    .find(req.body)
    .then((Existbooking) => {
      if (Existbooking == null) {
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
          totalspace: Existbooking.length,
          data: Existbooking,
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
    Updatebooking,
    all
}

