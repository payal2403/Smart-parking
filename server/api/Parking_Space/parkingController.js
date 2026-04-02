const parkingModel=require("./parkingModel");

const add = (req, res) => {
  let parkingObj = new parkingModel();
  parkingObj.ownerProfileId = req.body.ownerProfileId;
  parkingObj.title = req.body.title;
  parkingObj.address = req.body.address;
  parkingObj.latitude = req.body.latitude;
  parkingObj.longitude = req.body.longitude;
  parkingObj.totalArea = req.body.totalArea;
  parkingObj.parkingType = req.body.parkingType;
  parkingObj.parking_images = req.body.parking_images;

  parkingObj
    .save()
    .then((data) => {
      res.send({
        status: 201,
        message: "Parking space Created",
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

module.exports={
    add,
    single,
    DeleteOne
}
