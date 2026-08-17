const lateModel = require("./lateModel");




const add = (req, res) => {
  let LateObj = new lateModel();
  LateObj.penaltyId = req.body.penaltyId;
  LateObj.lateMinutes = req.body.lateMinutes;
  LateObj.penaltyAmount= req.body.penaltyAmount;
  

  
  LateObj
    .save()
    .then((data) => {
      res.send({
        status: 201,
        message: "Penalty Created",
        success:true,
        data: data,
      });
    })
    .catch((err) => {
      res.send({
    status: 500,
    message: "Error while saving penalties",
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
    lateModel
      .findOne({ _id: req.body._id })
      .then((Existpenalty) => {
        if (Existpenalty == null) {
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
            data: Existpenalty,
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
    lateModel
      .findOne({ _id: req.body._id })
      .then((Existpenalty) => {
        if (Existpenalty== null) {
          res.send({
            status: 404,
            message: "Not Found",
            success: false,
          });
        } else {
          lateModel.deleteOne({ _id: req.body._id }).then(() => {
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

const Updatepenalty = (req, res) => {
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
    lateModel
      .findOne({ _id: req.body._id })
      .then((Existpenalty) => {
        if (Existpenalty == null) {
          res.send({
            status: 404,
            message: "Not Found",
            success: false,
          });
        } else {


          if (req.body.penaltyId ) {
            Existpenalty.penaltyId =req.body.penaltyId 
          }

          if (req.body.lateMinutes) {
            Existpenalty.lateMinutes=req.body.lateMinutes
          }
          if (req.body.penaltyAmount) {
            Existpenalty.penaltyAmount=req.body.penaltyAmount
          }
        
           

          Existpenalty.save() .then((data) => {
              res.send({
                status: 200,
                message: "Penalty Updated 🎉",
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
  lateModel
    .find(req.body)
    .then((Existpenalty) => {
      if (Existpenalty == null) {
        res.send({
          status: 404,
          message: "Penalty Not Found",
          success: false,
        });
      } else {
        res.send({
          status: 200,
          message: "All penalty",
          success: true,
          totalspace: Existpenalty.length,
          data: Existpenalty,
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
    Updatepenalty,
    all
}

