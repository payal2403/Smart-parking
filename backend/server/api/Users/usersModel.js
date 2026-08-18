const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema({
  vehicleNumber: { type: String, required: true },
  vehicleType: { type: String, enum: ['Car', 'Bike', 'Scooter', 'SUV', 'Other'], default: 'Car' },
  model: { type: String, default: '' },
  color: { type: String, default: '' }
}, { _id: true });

const usersSchema = new mongoose.Schema({
  userType: { type: String, required: true }, // "1": Admin, "2": Owner, "3": User/Driver
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  password: { type: String, required: true },
  status: { type: String, enum: ['ACTIVE', 'SUSPENDED'], default: 'ACTIVE' },
  vehicles: [vehicleSchema],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("users", usersSchema);




