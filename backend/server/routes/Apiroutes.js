const router = require("express").Router();
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const userController = require("../api/Users/usersController");
const OwnerController = require("../api/Owner_Profile/OwnerController");
const parkingController = require("../api/Parking_Space/parkingController");
const psController = require("../api/Parking Slots/psController");
const bookingController = require("../api/Bookings/bookingController");
const paymentsController = require("../api/Payments/paymentsController");
const pricingController = require("../api/Pricing/pricingController");
const lateController = require("../api/Late_Penalty/lateController");
const paController = require("../api/Parking_Availability/paController");
const categoryController = require("../api/Category/categoryController");
const withdrawalController = require("../api/Withdrawals/withdrawalController");
const disputeController = require("../api/Disputes/disputeController");
const adminController = require("../api/Admin/adminController");
const ApiController = require("../api/Apicontroller/ApiController");

// Public Authentication & Discovery
router.post("/Users/login", userController.login);
router.post("/Users/register", userController.registerUser);
router.post("/Owner/add", OwnerController.register);
router.post("/parkingspace/discovery", parkingController.discovery);
router.post("/parkingspace/single", parkingController.single);
router.post("/aicall", ApiController.main);

// Protected Admin Routes
router.use(require("../middleware/AdminToken"));

// Admin Analytics & Reports
router.post("/admin/stats", adminController.getPlatformStats);
router.post("/admin/reports", adminController.getPlatformStats);

// Admin Owner Verification
router.post("/admin/owners", OwnerController.all);
router.post("/admin/owner/verify", OwnerController.verifyOwner);
router.post("/Owner/all", OwnerController.all);

// Admin User Management
router.post("/admin/users", userController.getAllUsers);
router.post("/admin/user/toggle-status", userController.toggleUserStatus);

// Admin Parking Spaces
router.post("/admin/parkings", parkingController.all);
router.post("/admin/parking/verify", parkingController.verifyParking);
router.post("/parkingspace/all", parkingController.all);
router.post("/parkingspace/add", upload.array("images", 5), parkingController.add);
router.post("/parkingspace/Updatespace", upload.single("parking_images"), parkingController.Updatespace);
router.post("/parkingspace/deleteOne", parkingController.DeleteOne);

// Admin Bookings
router.post("/admin/bookings", bookingController.adminBookings);
router.post("/admin/booking/force-close", bookingController.forceCloseBooking);
router.post("/bookings/all", bookingController.all);
router.post("/bookings/single", bookingController.single);
router.post("/bookings/deleteOne", bookingController.DeleteOne);

// Admin Financial Transactions
router.post("/admin/transactions", paymentsController.all);
router.post("/payments/all", paymentsController.all);
router.post("/payments/single", paymentsController.single);

// Admin Withdrawals
router.post("/admin/withdrawals", withdrawalController.adminWithdrawals);
router.post("/admin/withdrawal/update", withdrawalController.updateWithdrawalStatus);

// Admin Disputes
router.post("/admin/disputes", disputeController.adminDisputes);
router.post("/admin/dispute/update", disputeController.updateDisputeStatus);

// Admin Late Fee Rules
router.post("/admin/late-fee-rules", lateController.getRule);
router.post("/admin/late-fee-rules/update", lateController.updateRule);
router.post("/penalty/all", lateController.all);
router.post("/penalty/Updatepenalty", lateController.Updatepenalty);

// Slots & Categories
router.post("/parkingslots/all", psController.all);
router.post("/parkingslots/add", psController.add);
router.post("/parkingslots/single", psController.single);
router.post("/parkingslots/deleteOne", psController.DeleteOne);
router.post("/parkingslots/UpdateSlots", psController.UpdateSlots);

router.post("/category/add", upload.single("image"), categoryController.add);
router.post("/category/UpdateCategory", upload.single("image"), categoryController.UpdateCategory);
router.post("/category/single", categoryController.single);
router.post("/category/deleteOne", categoryController.DeleteOne);
router.post("/category/all", categoryController.all);

module.exports = router;