const mongoose = require("mongoose");

const ownerSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
  idProofImage: { type: String, default: '' },
  addressProofImage: { type: String, default: '' },
  verificationStatus: { 
    type: String, 
    enum: ['PENDING', 'UNDER_REVIEW', 'APPROVED', 'REJECTED', 'SUSPENDED'], 
    default: 'PENDING' 
  },
  rejectionReason: { type: String, default: '' },
  bankDetails: {
    accountNumber: { type: String, default: '' },
    ifsc: { type: String, default: '' },
    bankName: { type: String, default: '' },
    accountHolder: { type: String, default: '' }
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("owners", ownerSchema);




