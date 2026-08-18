const mongoose = require("mongoose");
const bookingModel = require("./bookingModel");
const parkingModel = require("../Parking_Space/parkingModel");
const psModel = require("../Parking Slots/psModel");
const pricingModel = require("../Pricing/pricingModel");
const paModel = require("../Parking_Availability/paModel");
const lateModel = require("../Late_Penalty/lateModel");
const paymentsModel = require("../Payments/paymentsModel");

function getBookingQuery(id) {
  if (!id) return { _id: null };
  if (mongoose.isValidObjectId(id)) {
    return { $or: [{ _id: id }, { bookingId: id }] };
  }
  return { bookingId: id };
}

// Helper to check for overlapping bookings
async function checkOverlap(parkingId, start, end) {
  const overlapping = await bookingModel.countDocuments({
    parkingId,
    bookingStatus: { $in: ['PENDING', 'CONFIRMED', 'ACTIVE'] },
    startTime: { $lt: end },
    endTime: { $gt: start }
  });
  return overlapping;
}

const calculate = async (req, res) => {
  try {
    const { parkingId, vehicleType, startTime, endTime, bookingType } = req.body;
    if (!parkingId || !startTime || !endTime) {
      return res.send({ message: "Parking, start time, and end time are required", success: false, status: 400 });
    }

    const start = new Date(startTime);
    const end = new Date(endTime);

    if (isNaN(start.getTime()) || isNaN(end.getTime()) || start >= end) {
      return res.send({ message: "Invalid time range. End time must be after start time.", success: false, status: 400 });
    }

    if (start < new Date(Date.now() - 5 * 60 * 1000)) {
      return res.send({ message: "Start time cannot be in the past.", success: false, status: 400 });
    }

    const space = await parkingModel.findById(parkingId);
    if (!space || space.approvalStatus !== 'APPROVED' || !space.Status) {
      return res.send({ message: "This parking space is currently unavailable for booking.", success: false, status: 400 });
    }

    // Check double-booking & capacity
    const overlapCount = await checkOverlap(parkingId, start, end);
    const totalSlots = space.totalSlots || 10;
    if (overlapCount >= totalSlots) {
      return res.send({
        message: "No available slots for the selected time interval. Please choose another time or location.",
        success: false,
        status: 409
      });
    }

    // Get pricing
    const pricing = await pricingModel.findOne({ parkingId }) || {
      hourlyRate: 30,
      dailyRate: 200,
      monthlyRate: 3000
    };

    const diffHours = Math.max(1, Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60)));
    const diffDays = Math.ceil(diffHours / 24);

    let amount = 0;
    const type = bookingType || 'HOURLY';
    if (type === 'DAILY' || diffHours >= 24) {
      amount = diffDays * (pricing.dailyRate || 200);
    } else if (type === 'MONTHLY' || diffDays >= 30) {
      const months = Math.ceil(diffDays / 30);
      amount = months * (pricing.monthlyRate || 3000);
    } else {
      amount = diffHours * (pricing.hourlyRate || 30);
    }

    const platformCommission = Math.round(amount * 0.10);
    const ownerEarnings = amount - platformCommission;

    res.send({
      message: "Price calculated successfully",
      success: true,
      status: 200,
      data: {
        durationHours: diffHours,
        durationDays: diffDays,
        baseAmount: amount,
        platformCommission,
        ownerEarnings,
        availableSlotsRemaining: totalSlots - overlapCount
      }
    });
  } catch (err) {
    res.send({ message: "Error calculating price", success: false, status: 500, error: err.message });
  }
};

const createBooking = async (req, res) => {
  try {
    const userId = req.user?.userId || req.body.userId;
    if (!userId) {
      return res.send({ message: "User authentication required", success: false, status: 401 });
    }

    const {
      parkingId,
      vehicleNumber,
      vehicleType,
      vehicleModel,
      startTime,
      endTime,
      bookingType,
      amount
    } = req.body;

    if (!parkingId || !startTime || !endTime) {
      return res.send({ message: "Required booking details missing", success: false, status: 400 });
    }

    const start = new Date(startTime);
    const end = new Date(endTime);

    const space = await parkingModel.findById(parkingId);
    if (!space || space.approvalStatus !== 'APPROVED' || !space.Status) {
      return res.send({ message: "Parking space unavailable", success: false, status: 400 });
    }

    // Check capacity atomically
    const overlapCount = await checkOverlap(parkingId, start, end);
    const totalSlots = space.totalSlots || 10;
    if (overlapCount >= totalSlots) {
      return res.send({ message: "Slot no longer available for this time range", success: false, status: 409 });
    }

    // Find first available slot
    const slot = await psModel.findOne({ parkingId, status: true }) || null;

    const baseAmount = Number(amount) || 50;
    const platformCommission = Math.round(baseAmount * 0.10);
    const ownerEarnings = baseAmount - platformCommission;

    const readableId = `BK-${Date.now().toString().slice(-6)}-${Math.floor(100 + Math.random() * 900)}`;

    const newBooking = new bookingModel({
      bookingId: readableId,
      userId,
      parkingId,
      slotId: slot ? slot._id : undefined,
      vehicleNumber: vehicleNumber || '',
      vehicleType: vehicleType || 'Car',
      vehicleModel: vehicleModel || '',
      slotType: vehicleType || 'Car',
      startTime: start,
      endTime: end,
      bookingType: bookingType || 'HOURLY',
      baseAmount,
      lateFee: 0,
      totalAmount: baseAmount,
      platformCommission,
      ownerEarnings,
      paymentStatus: 'PENDING',
      bookingStatus: 'PENDING'
    });

    const saved = await newBooking.save();

    res.send({
      message: "Booking created! Please complete payment.",
      success: true,
      status: 201,
      data: saved
    });
  } catch (err) {
    res.send({ message: "Error creating booking", success: false, status: 500, error: err.message });
  }
};

const userBookings = async (req, res) => {
  try {
    const userId = req.user?.userId || req.body.userId;
    const filter = { userId };
    if (req.body.bookingStatus) {
      filter.bookingStatus = req.body.bookingStatus;
    }

    const bookings = await bookingModel.find(filter)
      .populate("parkingId", "title address city parking_images latitude longitude rules totalSlots")
      .populate("slotId", "slotNumber slotType")
      .sort({ createdAt: -1 });

    res.send({
      message: "User bookings",
      success: true,
      status: 200,
      total: bookings.length,
      data: bookings
    });
  } catch (err) {
    res.send({ message: "Error fetching user bookings", success: false, status: 500, error: err.message });
  }
};

const ownerBookings = async (req, res) => {
  try {
    const ownerId = req.user?.userId || req.body.ownerProfileId;
    const spaces = await parkingModel.find({ ownerProfileId: ownerId }).select("_id");
    const spaceIds = spaces.map(s => s._id);

    const filter = { parkingId: { $in: spaceIds } };
    if (req.body.bookingStatus) {
      filter.bookingStatus = req.body.bookingStatus;
    }

    const bookings = await bookingModel.find(filter)
      .populate("userId", "name email phone")
      .populate("parkingId", "title address city parking_images")
      .populate("slotId", "slotNumber slotType")
      .sort({ createdAt: -1 });

    res.send({
      message: "Owner bookings",
      success: true,
      status: 200,
      total: bookings.length,
      data: bookings
    });
  } catch (err) {
    res.send({ message: "Error fetching owner bookings", success: false, status: 500, error: err.message });
  }
};

const adminBookings = async (req, res) => {
  try {
    const filter = {};
    if (req.body.bookingStatus) {
      filter.bookingStatus = req.body.bookingStatus;
    }
    if (req.body.paymentStatus) {
      filter.paymentStatus = req.body.paymentStatus;
    }

    const bookings = await bookingModel.find(filter)
      .populate("userId", "name email phone")
      .populate("parkingId", "title address city ownerProfileId")
      .populate("slotId", "slotNumber")
      .sort({ createdAt: -1 });

    res.send({
      message: "All bookings",
      success: true,
      status: 200,
      total: bookings.length,
      data: bookings
    });
  } catch (err) {
    res.send({ message: "Error fetching all bookings", success: false, status: 500, error: err.message });
  }
};

const single = async (req, res) => {
  try {
    const bookingId = req.body._id || req.body.bookingId;
    const booking = await bookingModel.findOne(getBookingQuery(bookingId))
      .populate("userId", "name email phone")
      .populate("parkingId", "title address city parking_images latitude longitude rules contactPhone")
      .populate("slotId", "slotNumber slotType");

    if (!booking) {
      return res.send({ message: "Booking not found", success: false, status: 404 });
    }

    const payment = await paymentsModel.findOne({ bookingId: booking._id });

    res.send({
      message: "Booking found",
      success: true,
      status: 200,
      data: {
        ...booking.toObject(),
        payment
      }
    });
  } catch (err) {
    res.send({ message: "Error fetching booking", success: false, status: 500, error: err.message });
  }
};

const checkIn = async (req, res) => {
  try {
    const bookingId = req.body._id || req.body.bookingId;
    const booking = await bookingModel.findOne(getBookingQuery(bookingId));

    if (!booking) {
      return res.send({ message: "Booking not found", success: false, status: 404 });
    }

    if (booking.bookingStatus !== 'CONFIRMED') {
      return res.send({
        message: `Cannot check in. Current booking status is ${booking.bookingStatus}`,
        success: false,
        status: 400
      });
    }

    booking.actualCheckInTime = new Date();
    booking.bookingStatus = 'ACTIVE';
    await booking.save();

    res.send({
      message: "Vehicle checked in successfully! Booking is now ACTIVE.",
      success: true,
      status: 200,
      data: booking
    });
  } catch (err) {
    res.send({ message: "Error during check-in", success: false, status: 500, error: err.message });
  }
};

const checkout = async (req, res) => {
  try {
    const bookingId = req.body._id || req.body.bookingId;
    const booking = await bookingModel.findOne(getBookingQuery(bookingId));

    if (!booking) {
      return res.send({ message: "Booking not found", success: false, status: 404 });
    }

    if (booking.bookingStatus !== 'ACTIVE' && booking.bookingStatus !== 'CONFIRMED') {
      return res.send({
        message: `Cannot check out. Booking is ${booking.bookingStatus}`,
        success: false,
        status: 400
      });
    }

    const now = new Date();
    booking.actualCheckOutTime = now;

    // Calculate Late Fee based on admin rules
    const lateRule = await lateModel.findOne({ isActive: true }) || {
      gracePeriodMinutes: 15,
      lateFeePerHour: 50,
      maxLateFee: 500
    };

    const scheduledEnd = new Date(booking.endTime);
    const diffMs = now.getTime() - scheduledEnd.getTime();
    const diffMinutes = Math.floor(diffMs / (1000 * 60));

    let lateFee = 0;
    if (diffMinutes > lateRule.gracePeriodMinutes) {
      const billableLateMinutes = diffMinutes - lateRule.gracePeriodMinutes;
      const lateHours = Math.ceil(billableLateMinutes / 60);
      lateFee = Math.min(lateHours * lateRule.lateFeePerHour, lateRule.maxLateFee);
    }

    booking.lateFee = lateFee;
    booking.totalAmount = (booking.baseAmount || 0) + lateFee;
    booking.bookingStatus = 'COMPLETED';

    // Update commission & owner earnings with total
    const commission = Math.round(booking.totalAmount * 0.10);
    booking.platformCommission = commission;
    booking.ownerEarnings = booking.totalAmount - commission;

    await booking.save();

    res.send({
      message: lateFee > 0
        ? `Checkout complete. Late fee of ₹${lateFee} applied (${diffMinutes} mins late).`
        : "Checkout completed on time! Thank you.",
      success: true,
      status: 200,
      data: booking
    });
  } catch (err) {
    res.send({ message: "Error during checkout", success: false, status: 500, error: err.message });
  }
};

const cancelBooking = async (req, res) => {
  try {
    const bookingId = req.body._id || req.body.bookingId;
    const { cancellationReason } = req.body;

    const booking = await bookingModel.findOne(getBookingQuery(bookingId));

    if (!booking) {
      return res.send({ message: "Booking not found", success: false, status: 404 });
    }

    if (booking.bookingStatus === 'COMPLETED' || booking.bookingStatus === 'ACTIVE') {
      return res.send({
        message: `Cannot cancel an ${booking.bookingStatus} booking.`,
        success: false,
        status: 400
      });
    }

    booking.bookingStatus = 'CANCELLED';
    if (booking.paymentStatus === 'PAID') {
      booking.paymentStatus = 'REFUNDED';
    }
    booking.cancellationReason = cancellationReason || 'Cancelled by user';

    await booking.save();

    res.send({
      message: "Booking cancelled successfully.",
      success: true,
      status: 200,
      data: booking
    });
  } catch (err) {
    res.send({ message: "Error cancelling booking", success: false, status: 500, error: err.message });
  }
};

const forceCloseBooking = async (req, res) => {
  try {
    const bookingId = req.body._id || req.body.bookingId;
    const { reason } = req.body;

    const booking = await bookingModel.findOne(getBookingQuery(bookingId));

    if (!booking) {
      return res.send({ message: "Booking not found", success: false, status: 404 });
    }

    booking.bookingStatus = 'FORCE_CLOSED';
    booking.cancellationReason = reason || 'Force closed by administrator';
    booking.actualCheckOutTime = new Date();
    await booking.save();

    res.send({
      message: "Booking force closed by admin.",
      success: true,
      status: 200,
      data: booking
    });
  } catch (err) {
    res.send({ message: "Error force closing booking", success: false, status: 500, error: err.message });
  }
};

module.exports = {
  calculate,
  createBooking,
  add: createBooking,
  userBookings,
  ownerBookings,
  adminBookings,
  all: adminBookings,
  single,
  checkIn,
  checkout,
  cancelBooking,
  forceCloseBooking,
  DeleteOne: cancelBooking,
  Updatebooking: createBooking
};


