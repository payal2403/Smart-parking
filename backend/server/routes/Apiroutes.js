const OwnerController=require("../api/Owner_Profile/OwnerController")
const parkingController=require("../api/Parking_Space/parkingController")
const psController=require("../api/Parking Slots/psController")
const bookingController=require("../api/Bookings/bookingController")
const userController=require("../api/Users/usersController")
const lateController=require("../api/Late_Penalty/lateController")
const paController=require("../api/Parking_Availability/paController")
const paymentsController=require("../api/Payments/paymentsController")
const pricingController=require("../api/Pricing/pricingController")
const categoryController=require("../api/Category/categoryController")
const user_profileController=require("../api/User_Profile/user_profileController")
const ApiController=require("../api/Apicontroller/ApiController")
const multer=require("multer")
const cloudinary=require("cloudinary")


// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'server/public')
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//     cb(null, uniqueSuffix  + '-' +  file.fieldname)
//   }
// })

// const upload = multer({ storage: storage })

const router=require("express").Router()


const storage = multer.memoryStorage()
const upload = multer({ storage: storage })


// Login API
router.post("/Users/login",userController.login)
router.post("/aicall",ApiController.main)

//Owner_Profile
router.post("/Owner/add",OwnerController.register)
router.post("/Owner/all",OwnerController.all)


//Users_Profile
router.post("/Users/add",user_profileController.userRegister)

router.post("/parkingspace/all",parkingController.all)


// AdminToken
router.use(require("../middleware/AdminToken"))



// Parking_Space
router.post("/parkingspace/add",upload.single("parking_images"),parkingController.add)
router.post("/parkingspace/Updatespace",upload.single("parking_images"),parkingController.Updatespace)
router.post("/parkingspace/single",parkingController.single)
router.post("/parkingspace/deleteOne",parkingController.DeleteOne)
// router.post("/parkingspace/Updatespace",parkingController.Updatespace)

// Parking Slots
router.post("/parkingslots/add",psController.add)
router.post("/parkingslots/single",psController.single)
router.post("/parkingslots/deleteOne",psController.DeleteOne)
router.post("/parkingslots/UpdateSlots",psController.UpdateSlots)
router.post("/parkingslots/all",psController.all)

// Bookings
router.post("/bookings/add",bookingController.add)
router.post("/bookings/single",bookingController.single)
router.post("/bookings/deleteOne",bookingController.DeleteOne)
router.post("/bookings/Updatebooking",bookingController.Updatebooking)
router.post("/bookings/all",bookingController.all)

// Late_Penalty
router.post("/penalty/add",lateController.add)
router.post("/penalty/single",lateController.single)
router.post("/penalty/deleteOne",lateController.DeleteOne)
router.post("/penalty/Updatepenalty",lateController.Updatepenalty)
router.post("/penalty/all",lateController.all)

// Parking_Availabilty
router.post("/availabilities/add",paController.add)
router.post("/availabilities/single",paController.single)
router.post("/availabilities/deleteOne",paController.DeleteOne)
router.post("/availabilities/Updateavailability",paController.Updateavailability)
router.post("/availabilities/all",paController.all)

// Payments
router.post("/payments/add",paymentsController.add)
router.post("/payments/single",paymentsController.single)
router.post("/payments/deleteOne",paymentsController.DeleteOne)
router.post("/payments/Updatepayments",paymentsController.Updatepayments)
router.post("/payments/all",paymentsController.all)

// Pricing
router.post("/pricing/add",pricingController.add)
router.post("/pricing/single",pricingController.single)
router.post("/pricing/deleteOne",pricingController.DeleteOne)
router.post("/pricing/UpdateCategory",pricingController.Updatepricing)
router.post("/pricing/all",pricingController.all)


// Category

router.post("/category/add",upload.single("image"),categoryController.add)
router.post("/category/UpdateCategory",upload.single("image"),categoryController.UpdateCategory)
// router.post("/category/add",categoryController.add)
router.post("/category/single",categoryController.single)
router.post("/category/deleteOne",categoryController.DeleteOne)
// router.post("/category/UpdateCategory",categoryController.UpdateCategory)
router.post("/category/all",categoryController.all)








module.exports=router;