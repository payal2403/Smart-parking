const psModel=require("./psModel")


const add = (req, res) => {
  let slotsObj = new psModel();
  slotsObj.parkingId = req.body.parkingId;
  slotsObj.slotType = req.body.slotType;
  slotsObj.maxVehicleCount= req.body.maxVehicleCount;
  slotsObj.areaUsed = req.body.areaUsed;
  

  slotsObj
    .save()
    .then((data) => {
      res.send({
        status: 201,
        message: "Slots Created",
        success:true,
        data: data,
      });
    })
    .catch((err) => {
      res.send({
    status: 500,
    message: "Error while saving slots",
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
    psModel
      .findOne({ _id: req.body._id })
      .then((ExistSlots) => {
        if (ExistSlots == null) {
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
            data: ExistSlots,
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
    psModel
      .findOne({ _id: req.body._id })
      .then((ExistSlots) => {
        if (ExistSlots== null) {
          res.send({
            status: 404,
            message: "Not Found",
            success: false,
          });
        } else {
          psModel.deleteOne({ _id: req.body._id }).then(() => {
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

const UpdateSlots = (req, res) => {
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
    psModel
      .findOne({ _id: req.body._id })
      .then((ExistSlots) => {
        if (ExistSlots == null) {
          res.send({
            status: 404,
            message: "Not Found",
            success: false,
          });
        } else {


          if (req.body.parkingId ) {
            ExistSlots.parkingId =req.body.parkingId 
          }

          if (req.body.slotType) {
            ExistSlots.slotType=req.body.slotType
          }
          if (req.body.maxVehicleCount) {
            ExistSlots.maxVehicleCount=req.body.maxVehicleCount
          }
          if (req.body.areaUsed) {
            ExistSlots.areaUsed=req.body.areaUsed
          }
           

          ExistSlots.save() .then((data) => {
              res.send({
                status: 200,
                message: "Slot  Updated",
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
}

const all = (req, res) => {
  psModel
    .find(req.body)
    .then((ExistSlots) => {
      if (ExistSlots == null) {
        res.send({
          status: 404,
          message: "Slots Not Found",
          success: false,
        });
      } else {
        res.send({
          status: 200,
          message: "All Slots",
          success: true,
          totalspace: ExistSlots.length,
          data: ExistSlots,
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
    UpdateSlots,
    all
    
}