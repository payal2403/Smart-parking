const pricingModel=require("./pricingModel")

const add = (req, res) => {
  let pricingObj = new pricingModel();
//   pricingObj.parkingId = req.body.parkingId;
  pricingObj.slotType = req.body.slotType;
  pricingObj.hourlyRate= req.body.hourlyRate;
  pricingObj.dailyRate = req.body.dailyRate;
  pricingObj.monthlyRate = req.body.monthlyRate;
 


  
  pricingObj
    .save()
    .then((data) => {
      res.send({
        status: 201,
        message: "Pricing Created",
        success:true,
        data: data,
      });
    })
    .catch((err) => {
      res.send({
    status: 500,
    message: "Error while saving pricing",
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
    pricingModel
      .findOne({ _id: req.body._id })
      .then((Existpricing) => {
        if (Existpricing == null) {
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
            data: Existpricing,
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
    pricingModel
      .findOne({ _id: req.body._id })
      .then((Existpricing) => {
        if (Existpricing== null) {
          res.send({
            status: 404,
            message: "Not Found",
            success: false,
          });
        } else {
          pricingModel.deleteOne({ _id: req.body._id }).then(() => {
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

const Updatepricing = (req, res) => {
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
    pricingModel
      .findOne({ _id: req.body._id })
      .then((Existpricing) => {
        if (Existpricing == null) {
          res.send({
            status: 404,
            message: "Not Found",
            success: false,
          });
        } else {


       

          if (req.body.slotType) {
            Existpricing.slotType=req.body.slotType
          }
          if (req.body.hourlyRate) {
            Existpricing.hourlyRate=req.body.hourlyRate
          }
          if (req.body.dailyRate) {
            Existpricing.dailyRate=req.body.dailyRate
          }
           if (req.body.monthlyRate) {
            Existpricing.monthlyRate=req.body.monthlyRate
          }

          

          Existpricing.save() .then((data) => {
              res.send({
                status: 200,
                message: "Pricing Updated 🎉",
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
  pricingModel
    .find(req.body)
    .then((Existpricing) => {
      if (Existpricing == null) {
        res.send({
          status: 404,
          message: "Pricing Not Found",
          success: false,
        });
      } else {
        res.send({
          status: 200,
          message: "All Payment",
          success: true,
          totalspace: Existpricing.length,
          data: Existpricing,
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
    Updatepricing,
    all
}

