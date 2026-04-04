const paymentsModel=require("./paymentsModel")

const add = (req, res) => {
  let paymentsObj = new paymentsModel();
    paymentsObj.bookingId = req.body.bookingId;
  paymentsObj.amount = req.body.amount;
  paymentsObj.paymentMethod= req.body.paymentMethod;
  paymentsObj.transactionId = req.body.transactionId;
  paymentsObj.bookingType = req.body.bookinType;
  paymentsObj.amount = req.body.amount;


  
  paymentsObj
    .save()
    .then((data) => {
      res.send({
        status: 201,
        message: "Payment Created",
        success:true,
        data: data,
      });
    })
    .catch((err) => {
      res.send({
    status: 500,
    message: "Error while saving Payment",
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
    paymentsModel
      .findOne({ _id: req.body._id })
      .then((Existpayments) => {
        if (Existpayments == null) {
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
            data: Existpayments,
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
    paymentsModel
      .findOne({ _id: req.body._id })
      .then((Existpayments) => {
        if (Existpayments== null) {
          res.send({
            status: 404,
            message: "Not Found",
            success: false,
          });
        } else {
          paymentsModel.deleteOne({ _id: req.body._id }).then(() => {
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

const Updatepayments = (req, res) => {
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
    paymentsModel
      .findOne({ _id: req.body._id })
      .then((Existpayments) => {
        if (Existpayments == null) {
          res.send({
            status: 404,
            message: "Not Found",
            success: false,
          });
        } else {


        

          if (req.body.amount) {
            Existpayments.amount=req.body.amount
          }
          if (req.body.paymentMethod) {
            Existpayments.paymentMethod=req.body.paymentMethod
          }
          if (req.body.transactionId) {
            Existpayments.transactionId=req.body.transactionId
          }
           if (req.body.paymentStatus) {
            Existpayments.paymentStatus=req.body.paymentStatus
          }

          

          Existpayments.save() .then((data) => {
              res.send({
                status: 200,
                message: "Payment Updated 🎉",
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
  paymentsModel
    .find(req.body)
    .then((Existpayments) => {
      if (Existpayments == null) {
        res.send({
          status: 404,
          message: "Payment Not Found",
          success: false,
        });
      } else {
        res.send({
          status: 200,
          message: "All Payment",
          success: true,
          totalspace: Existpayments.length,
          data: Existpayments,
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
    Updatepayments,
    all
}

