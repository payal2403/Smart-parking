const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  bookingId: { type: mongoose.Schema.Types.ObjectId, ref: 'bookings', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
  amount: { type: Number, required: true },
  platformCommission: { type: Number, default: 0 },
  ownerEarnings: { type: Number, default: 0 },
  paymentMethod: { type: String, default: 'Online' },
  transactionId: { type: String, required: true },
  paymentStatus: { 
    type: String, 
    enum: ['SUCCESS', 'FAILED', 'REFUNDED', 'PENDING'], 
    default: 'SUCCESS' 
  },
  type: { 
    type: String, 
    enum: ['BOOKING_PAYMENT', 'LATE_FEE', 'REFUND', 'WITHDRAWAL'], 
    default: 'BOOKING_PAYMENT' 
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("payments", paymentSchema);




