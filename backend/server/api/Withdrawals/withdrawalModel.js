const mongoose = require("mongoose");

const withdrawalSchema = new mongoose.Schema({
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
  amount: { type: Number, required: true },
  bankDetails: {
    accountNumber: { type: String, default: '' },
    ifsc: { type: String, default: '' },
    bankName: { type: String, default: '' },
    accountHolder: { type: String, default: '' }
  },
  status: { 
    type: String, 
    enum: ['PENDING', 'PROCESSING', 'COMPLETED', 'REJECTED'], 
    default: 'PENDING' 
  },
  adminNotes: { type: String, default: '' },
  rejectionReason: { type: String, default: '' },
  processedAt: { type: Date },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("withdrawals", withdrawalSchema);
