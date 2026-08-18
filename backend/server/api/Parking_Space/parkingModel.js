const mongoose = require("mongoose");

const spaceSchema = new mongoose.Schema({
  ownerProfileId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
  title: { type: String, required: true },
  description: { type: String, default: '' },
  address: { type: String, required: true },
  city: { type: String, default: '' },
  latitude: { type: Number, default: 0 },
  longitude: { type: Number, default: 0 },
  totalArea: { type: String, default: '' },
  parkingType: { type: String, default: 'Open' }, // 'Open', 'Covered', 'Multi-level', 'Underground'
  parking_images: { type: String, default: '' },
  images: [{ type: String }],
  supportedVehicles: { 
    type: [String], 
    default: ['Car', 'Bike', 'SUV'] 
  },
  amenities: { 
    type: [String], 
    default: ['CCTV', 'Security Guard'] 
  },
  rules: { type: String, default: 'Park properly within slot boundaries. No hazardous materials.' },
  totalSlots: { type: Number, default: 10 },
  availableSlots: { type: Number, default: 10 },
  Status: { type: Boolean, default: true }, // enabled/disabled by owner
  approvalStatus: { 
    type: String, 
    enum: ['PENDING', 'APPROVED', 'REJECTED', 'SUSPENDED'], 
    default: 'PENDING' 
  },
  rejectionReason: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("spaces", spaceSchema);




