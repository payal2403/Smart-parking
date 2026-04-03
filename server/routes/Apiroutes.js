const OwnerController=require("../api/Owner_Profile/OwnerController")
const parkingController=require("../api/Parking_Space/parkingController")




const router=require("express").Router()
router.post("/Owner/add",OwnerController.register)
router.post("/parkingspace/add",parkingController.add)
router.post("/parkingspace/single",parkingController.single)
router.post("/parkingspace/deleteOne",parkingController.DeleteOne)
router.post("/parkingspace/Updatespace",parkingController.Updatespace)
router.post("/parkingspace/all",parkingController.all)

module.exports=router;