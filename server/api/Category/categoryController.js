const { uploadImg } = require("../../utilities/helper");
const categoryModel = require("./categoryModel")

const add = (req, res) => {
  let categoryObj = new categoryModel();
  categoryObj.userId = req.body.userId;
  categoryObj.name = req.body.name;
  categoryObj.description = req.body.description;
  // categoryObj.image = req.body.image;

  let errmsg = []


  if (!req.body.name) {
    errmsg.push("Name is required");
  }

  if (!req.file) {
    return res.send({
      status: 201,
      message: "Image is required",
      success: false
    });
  }
  if (errmsg.length > 0) {
    res.send({
      success: false,
      status: 400,
      message: errmsg,
    });
  } else {
    categoryModel.findOne({ name: req.body.name })
      .then(async (Data) => {

        if (Data == null) {
          let categoryObj = new categoryModel();

          categoryObj.name = req.body.name;
          categoryObj.description = req.body.description;
          // categoryObj.image = req.body.image;

          try {

            let url = await uploadImg(req.file.buffer)
            categoryObj.image = url


          } catch (err) {
            return res.send({
              success: false,
              status: 403,
              message: "Cloudinary err",
              err: err,
            });
          }

          // console.log(categoryObj);





          categoryObj
            .save()
            .then((data) => {
              res.send({
                status: 201,
                message: "Category Created",
                success: true,
                data: data,
              });
            })
        }
      })
      .catch((err) => {
        res.send({
          status: 500,
          message: "Error while saving Category",
          success: false,
          error: err.message
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
    categoryModel
      .findOne({ _id: req.body._id })
      .then((ExistCategory) => {
        if (ExistCategory == null) {
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
            data: ExistCategory,
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
    categoryModel
      .findOne({ _id: req.body._id })
      .then((ExistCategory) => {
        if (ExistCategory == null) {
          res.send({
            status: 404,
            message: "Not Found",
            success: false,
          });
        } else {
          categoryModel.deleteOne({ _id: req.body._id }).then(() => {
            res.send({
              status: 200,
              message: "delete",
              success: true,
            });
          }).catch((err) => {
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

const UpdateCategory = (req, res) => {

  console.log("hlo");
  
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
    categoryModel
      .findOne({ _id: req.body._id })
      .then(async (ExistCategory) => {
        if (ExistCategory == null) {
          res.send({
            status: 404,
            message: "Not Found",
            success: false,
          });
        } else {



          if (req.body.name) {
            ExistCategory.name = req.body.name
          }

          if (req.body.description) {
            ExistCategory.description = req.body.description
          }

          if (req.file) {
            try {

              let url = await uploadImg(req.file.buffer)
              ExistCategory.image = url


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


          ExistCategory.save().then((data) => {
            res.send({
              status: 200,
              message: "Category Updated 🎉",
              success:true,
              data: data,
            });
          })

            .catch((err) => {
              res.send({
                status: 500,
                message: "Internal server error",
                success:false,
                error: err
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
  categoryModel
    .find(req.body)
    .then((ExistCategory) => {
      if (ExistCategory == null) {
        res.send({
          status: 404,
          message: "Category Not Found",
          success: false,
        });
      } else {
        res.send({
          status: 200,
          message: "All Category",
          success: true,
          totalspace: ExistCategory.length,
          data: ExistCategory,
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
module.exports = {
  add,
  single,
  DeleteOne,
  UpdateCategory,
  all
}

