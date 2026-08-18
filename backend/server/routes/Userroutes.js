const router = require("express").Router();
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const userController = require("../api/Users/usersController");
const parkingController = require("../api/Parking_Space/parkingController");
const psController = require("../api/Parking Slots/psController");
const bookingController = require("../api/Bookings/bookingController");
const paymentsController = require("../api/Payments/paymentsController");
const pricingController = require("../api/Pricing/pricingController");
const paController = require("../api/Parking_Availability/paController");
const disputeController = require("../api/Disputes/disputeController");

// Public User Auth & Search
router.post("/Users/login", userController.login);
router.post("/Users/register", userController.registerUser);
router.post("/parkingspace/discovery", parkingController.discovery);
router.post("/parkingspace/single", parkingController.single);
router.post("/bookings/calculate", bookingController.calculate);

// Protected User/Driver Routes
router.use(require("../middleware/usertoken"));

// Profile & Vehicles
router.post("/profile", userController.getProfile);
router.post("/profile/update", userController.updateProfile);
router.post("/vehicle/add", userController.addVehicle);
router.post("/vehicle/delete", userController.deleteVehicle);

// Booking Lifecycle
router.post("/bookings/create", bookingController.createBooking);
router.post("/bookings/my-bookings", bookingController.userBookings);
router.post("/bookings/single", bookingController.single);
router.post("/bookings/check-in", bookingController.checkIn);
router.post("/bookings/checkout", bookingController.checkout);
router.post("/bookings/cancel", bookingController.cancelBooking);

// Payment & Confirmation
router.post("/payments/process", paymentsController.processPayment);

// Disputes
router.post("/disputes/create", upload.single("evidenceImage"), disputeController.createDispute);
router.post("/disputes/my-disputes", disputeController.userDisputes);

module.exports = router;