const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  bookingId: { type: String, unique: true, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
  parkingId: { type: mongoose.Schema.Types.ObjectId, ref: 'spaces', required: true },
  slotId: { type: mongoose.Schema.Types.ObjectId, ref: 'slots' },
  vehicleNumber: { type: String, default: '' },
  vehicleType: { type: String, default: 'Car' },
  vehicleModel: { type: String, default: '' },
  slotType: { type: String, default: 'Car' },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  actualCheckInTime: { type: Date },
  actualCheckOutTime: { type: Date },
  bookingType: { type: String, enum: ['HOURLY', 'DAILY', 'MONTHLY'], default: 'HOURLY' },
  baseAmount: { type: Number, default: 0 },
  lateFee: { type: Number, default: 0 },
  totalAmount: { type: Number, default: 0 },
  platformCommission: { type: Number, default: 0 },
  ownerEarnings: { type: Number, default: 0 },
  paymentStatus: { 
    type: String, 
    enum: ['PENDING', 'PAID', 'FAILED', 'REFUNDED'], 
    default: 'PENDING' 
  },
  bookingStatus: { 
    type: String, 
    enum: ['PENDING', 'CONFIRMED', 'ACTIVE', 'COMPLETED', 'CANCELLED', 'FORCE_CLOSED', 'EXPIRED'], 
    default: 'PENDING' 
  },
  cancellationReason: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("bookings", bookingSchema);




