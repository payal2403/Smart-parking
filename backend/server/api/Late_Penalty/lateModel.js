const mongoose = require("mongoose");

const lateFeeRuleSchema = new mongoose.Schema({
  ruleName: { type: String, default: 'Standard Rule' },
  gracePeriodMinutes: { type: Number, default: 15 },
  lateFeePerHour: { type: Number, default: 50 },
  maxLateFee: { type: Number, default: 500 },
  isActive: { type: Boolean, default: true },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("latefeerules", lateFeeRuleSchema);




