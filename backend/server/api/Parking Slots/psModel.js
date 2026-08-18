const mongoose = require("mongoose");

const slotSchema = new mongoose.Schema({
  parkingId: { type: mongoose.Schema.Types.ObjectId, ref: 'spaces', required: true },
  slotNumber: { type: String, required: true },
  slotType: { type: String, enum: ['Car', 'Bike', 'Scooter', 'SUV', 'Other'], default: 'Car' },
  areaUsed: { type: String, default: '' },
  isOccupied: { type: Boolean, default: false },
  status: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("slots", slotSchema);




