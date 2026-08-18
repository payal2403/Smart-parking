const mongoose = require("mongoose");

const availabilitySchema = new mongoose.Schema({
  parkingId: { type: mongoose.Schema.Types.ObjectId, ref: 'spaces', required: true },
  daysOpen: { 
    type: [String], 
    default: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] 
  },
  openTime: { type: String, default: '00:00' },
  closeTime: { type: String, default: '23:59' },
  is24Hours: { type: Boolean, default: true },
  holidays: [{ type: Date }],
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("availabilities", availabilitySchema);




