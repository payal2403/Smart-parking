const mongoose = require("mongoose");

const disputeSchema = new mongoose.Schema({
  bookingId: { type: mongoose.Schema.Types.ObjectId, ref: 'bookings', required: true },
  raisedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
  parkingId: { type: mongoose.Schema.Types.ObjectId, ref: 'spaces' },
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
  reason: { type: String, required: true },
  evidenceImage: { type: String, default: '' },
  status: { 
    type: String, 
    enum: ['OPEN', 'UNDER_REVIEW', 'RESOLVED', 'REJECTED'], 
    default: 'OPEN' 
  },
  adminNotes: { type: String, default: '' },
  resolvedAt: { type: Date },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("disputes", disputeSchema);
