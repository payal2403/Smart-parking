const mongoose = require("mongoose");
const paymentsModel = require("./paymentsModel");
const bookingModel = require("../Bookings/bookingModel");
const parkingModel = require("../Parking_Space/parkingModel");

function getBookingQuery(id) {
  if (!id) return { _id: null };
  if (mongoose.isValidObjectId(id)) {
    return { $or: [{ _id: id }, { bookingId: id }] };
  }
  return { bookingId: id };
}

function getPaymentQuery(id) {
  if (!id) return { _id: null };
  if (mongoose.isValidObjectId(id)) {
    return { $or: [{ _id: id }, { transactionId: id }] };
  }
  return { transactionId: id };
}

const processPayment = async (req, res) => {
  try {
    const userId = req.user?.userId || req.body.userId;
    const { bookingId, paymentMethod, transactionId } = req.body;

    if (!bookingId) {
      return res.send({ message: "Booking ID is required", success: false, status: 400 });
    }

    const booking = await bookingModel.findOne(getBookingQuery(bookingId));

    if (!booking) {
      return res.send({ message: "Booking not found", success: false, status: 404 });
    }

    if (booking.paymentStatus === 'PAID') {
      return res.send({ message: "Booking has already been paid", success: false, status: 400 });
    }

    const space = await parkingModel.findById(booking.parkingId);
    const ownerId = space?.ownerProfileId || null;

    const amount = booking.totalAmount || booking.baseAmount || 50;
    const platformCommission = Math.round(amount * 0.10);
    const ownerEarnings = amount - platformCommission;

    const txnId = transactionId || `TXN-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newPayment = new paymentsModel({
      bookingId: booking._id,
      userId: booking.userId,
      ownerId: ownerId,
      amount: amount,
      platformCommission,
      ownerEarnings,
      paymentMethod: paymentMethod || 'Online / Card',
      transactionId: txnId,
      paymentStatus: 'SUCCESS',
      type: 'BOOKING_PAYMENT'
    });

    await newPayment.save();

    booking.paymentStatus = 'PAID';
    booking.bookingStatus = 'CONFIRMED';
    booking.platformCommission = platformCommission;
    booking.ownerEarnings = ownerEarnings;
    await booking.save();

    // Decrease available slots
    if (space && space.availableSlots > 0) {
      space.availableSlots = space.availableSlots - 1;
      await space.save();
    }

    res.send({
      message: "Payment processed successfully! Booking CONFIRMED.",
      success: true,
      status: 200,
      data: {
        payment: newPayment,
        booking
      }
    });
  } catch (err) {
    res.send({ message: "Payment processing failed", success: false, status: 500, error: err.message });
  }
};

const all = async (req, res) => {
  try {
    const filter = {};
    if (req.body.paymentStatus) filter.paymentStatus = req.body.paymentStatus;
    if (req.body.type) filter.type = req.body.type;

    const payments = await paymentsModel.find(filter)
      .populate("userId", "name email phone")
      .populate("ownerId", "name email phone")
      .populate("bookingId", "bookingId startTime endTime")
      .sort({ createdAt: -1 });

    res.send({
      status: 200,
      message: "All Transactions",
      success: true,
      total: payments.length,
      data: payments
    });
  } catch (err) {
    res.send({ status: 500, message: "Internal Server Error", success: false, error: err.message });
  }
};

const single = async (req, res) => {
  try {
    const paymentId = req.body._id || req.body.transactionId;
    const payment = await paymentsModel.findOne(getPaymentQuery(paymentId))
      .populate("userId", "name email phone")
      .populate("ownerId", "name email phone")
      .populate("bookingId");

    if (!payment) {
      return res.send({ status: 404, message: "Payment transaction not found", success: false });
    }

    res.send({ status: 200, message: "Found", success: true, data: payment });
  } catch (err) {
    res.send({ status: 500, message: "Internal Server Error", success: false, error: err.message });
  }
};

module.exports = {
  processPayment,
  add: processPayment,
  all,
  single,
  DeleteOne: (req, res) => res.send({ status: 200, message: "Transaction archived", success: true }),
  Updatepayments: processPayment
};


