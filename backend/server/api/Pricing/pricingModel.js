const mongoose = require("mongoose");

const pricingSchema = new mongoose.Schema({
  parkingId: { type: mongoose.Schema.Types.ObjectId, ref: 'spaces' },
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
  slotType: { type: String, default: 'Car' }, // 'Car', 'Bike', 'SUV', etc.
  hourlyRate: { type: Number, default: 30 },
  dailyRate: { type: Number, default: 200 },
  monthlyRate: { type: Number, default: 3000 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("pricings", pricingSchema);




