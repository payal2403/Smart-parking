const router = require("express").Router();
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const OwnerController = require("../api/Owner_Profile/OwnerController");
const parkingController = require("../api/Parking_Space/parkingController");
const psController = require("../api/Parking Slots/psController");
const bookingController = require("../api/Bookings/bookingController");
const paymentsController = require("../api/Payments/paymentsController");
const pricingController = require("../api/Pricing/pricingController");
const paController = require("../api/Parking_Availability/paController");
const withdrawalController = require("../api/Withdrawals/withdrawalController");
const disputeController = require("../api/Disputes/disputeController");

// Public owner registration
router.post("/Owner/add", OwnerController.register);

// Protected Owner Routes
router.use(require("../middleware/Ownertoken"));

// Owner Profile & Documents
router.post("/profile", OwnerController.getProfile);
router.post("/profile/documents", upload.fields([{ name: 'idProof', maxCount: 1 }, { name: 'addressProof', maxCount: 1 }]), OwnerController.updateDocuments);
router.post("/profile/bank", OwnerController.updateBankDetails);

// Parking Spaces
router.post("/parkingspace/add", upload.array("images", 5), parkingController.add);
router.post("/parkingspace/Updatespace", upload.single("parking_images"), parkingController.Updatespace);
router.post("/parkingspace/single", parkingController.single);
router.post("/parkingspace/deleteOne", parkingController.DeleteOne);
router.post("/parkingspace/toggle-status", parkingController.toggleStatus);
router.post("/parkingspace/all", parkingController.all);

// Parking Slots
router.post("/parkingslots/add", psController.add);
router.post("/parkingslots/single", psController.single);
router.post("/parkingslots/deleteOne", psController.DeleteOne);
router.post("/parkingslots/UpdateSlots", psController.UpdateSlots);
router.post("/parkingslots/all", psController.all);

// Pricing
router.post("/pricing/add", pricingController.add);
router.post("/pricing/single", pricingController.single);
router.post("/pricing/deleteOne", pricingController.DeleteOne);
router.post("/pricing/Updatepricing", pricingController.Updatepricing);
router.post("/pricing/all", pricingController.all);

// Availability
router.post("/availabilities/add", paController.add);
router.post("/availabilities/single", paController.single);
router.post("/availabilities/deleteOne", paController.DeleteOne);
router.post("/availabilities/Updateavailability", paController.Updateavailability);
router.post("/availabilities/all", paController.all);

// Bookings
router.post("/bookings/all", bookingController.ownerBookings);
router.post("/bookings/single", bookingController.single);
router.post("/bookings/check-in", bookingController.checkIn);
router.post("/bookings/checkout", bookingController.checkout);

// Earnings & Withdrawals
router.post("/earnings/summary", withdrawalController.getEarningsSummary);
router.post("/withdrawals/request", withdrawalController.requestWithdrawal);
router.post("/withdrawals/history", withdrawalController.ownerWithdrawals);

module.exports = router;