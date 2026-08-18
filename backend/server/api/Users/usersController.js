

const userModel = require("./usersModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const skey = "hahahaha@2403";

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.send({
        message: "Email and password are required",
        success: false,
        status: 400
      });
    }

    const userData = await userModel.findOne({ email });
    if (!userData) {
      return res.send({
        message: "User not found",
        success: false,
        status: 404
      });
    }

    if (userData.status === 'SUSPENDED') {
      return res.send({
        message: "Your account has been suspended. Please contact admin.",
        success: false,
        status: 403
      });
    }

    const confirm = bcrypt.compareSync(password, userData.password);
    if (!confirm) {
      return res.send({
        message: "Invalid password",
        success: false,
        status: 401
      });
    }

    const payload = {
      userId: userData._id,
      email: userData.email,
      userType: userData.userType,
      name: userData.name
    };

    const token = jwt.sign(payload, skey, { expiresIn: '7d' });

    res.send({
      message: "Login Successfully",
      success: true,
      status: 200,
      data: payload,
      token: token
    });
  } catch (err) {
    res.send({
      message: "Internal server error",
      success: false,
      status: 500,
      error: err.message
    });
  }
};

const registerUser = async (req, res) => {
  try {
    const { name, email, phone, password, vehicleNumber, vehicleType, vehicleModel, vehicleColor } = req.body;
    if (!name || !email || !password) {
      return res.send({
        message: "Name, email, and password are required",
        success: false,
        status: 400
      });
    }

    const exist = await userModel.findOne({ email });
    if (exist) {
      return res.send({
        message: "User with this email already exists",
        success: false,
        status: 409
      });
    }

    const vehicles = [];
    if (vehicleNumber) {
      vehicles.push({
        vehicleNumber,
        vehicleType: vehicleType || 'Car',
        model: vehicleModel || '',
        color: vehicleColor || ''
      });
    }

    const newUser = new userModel({
      name,
      email,
      phone,
      password: bcrypt.hashSync(password, 10),
      userType: "3", // User / Driver
      status: "ACTIVE",
      vehicles
    });

    const saved = await newUser.save();

    const payload = {
      userId: saved._id,
      email: saved.email,
      userType: saved.userType,
      name: saved.name
    };
    const token = jwt.sign(payload, skey, { expiresIn: '7d' });

    res.send({
      message: "User registered successfully",
      success: true,
      status: 201,
      data: payload,
      token
    });
  } catch (err) {
    res.send({
      message: "Error registering user",
      success: false,
      status: 500,
      error: err.message
    });
  }
};

const getProfile = async (req, res) => {
  try {
    const userId = req.user?.userId || req.body.userId;
    const user = await userModel.findById(userId).select("-password");
    if (!user) {
      return res.send({ message: "User not found", success: false, status: 404 });
    }
    res.send({ message: "Profile fetched", success: true, status: 200, data: user });
  } catch (err) {
    res.send({ message: "Error fetching profile", success: false, status: 500, error: err.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const userId = req.user?.userId || req.body.userId;
    const { name, phone } = req.body;
    const user = await userModel.findById(userId);
    if (!user) {
      return res.send({ message: "User not found", success: false, status: 404 });
    }

    if (name) user.name = name;
    if (phone) user.phone = phone;

    await user.save();
    res.send({ message: "Profile updated successfully", success: true, status: 200, data: user });
  } catch (err) {
    res.send({ message: "Error updating profile", success: false, status: 500, error: err.message });
  }
};

const addVehicle = async (req, res) => {
  try {
    const userId = req.user?.userId || req.body.userId;
    const { vehicleNumber, vehicleType, model, color } = req.body;
    if (!vehicleNumber) {
      return res.send({ message: "Vehicle number is required", success: false, status: 400 });
    }

    const user = await userModel.findById(userId);
    if (!user) {
      return res.send({ message: "User not found", success: false, status: 404 });
    }

    user.vehicles.push({
      vehicleNumber,
      vehicleType: vehicleType || 'Car',
      model: model || '',
      color: color || ''
    });

    await user.save();
    res.send({ message: "Vehicle added successfully", success: true, status: 200, data: user.vehicles });
  } catch (err) {
    res.send({ message: "Error adding vehicle", success: false, status: 500, error: err.message });
  }
};

const deleteVehicle = async (req, res) => {
  try {
    const userId = req.user?.userId || req.body.userId;
    const { vehicleId } = req.body;
    const user = await userModel.findById(userId);
    if (!user) {
      return res.send({ message: "User not found", success: false, status: 404 });
    }

    user.vehicles = user.vehicles.filter(v => v._id.toString() !== vehicleId);
    await user.save();
    res.send({ message: "Vehicle removed successfully", success: true, status: 200, data: user.vehicles });
  } catch (err) {
    res.send({ message: "Error removing vehicle", success: false, status: 500, error: err.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find({ userType: "3" }).select("-password").sort({ createdAt: -1 });
    res.send({
      message: "All users",
      success: true,
      status: 200,
      total: users.length,
      data: users
    });
  } catch (err) {
    res.send({ message: "Error fetching users", success: false, status: 500, error: err.message });
  }
};

const toggleUserStatus = async (req, res) => {
  try {
    const { userId, status } = req.body;
    const user = await userModel.findById(userId);
    if (!user) {
      return res.send({ message: "User not found", success: false, status: 404 });
    }
    user.status = status || (user.status === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE');
    await user.save();
    res.send({ message: `User status updated to ${user.status}`, success: true, status: 200, data: user });
  } catch (err) {
    res.send({ message: "Error updating user status", success: false, status: 500, error: err.message });
  }
};

module.exports = {
  login,
  registerUser,
  getProfile,
  updateProfile,
  addVehicle,
  deleteVehicle,
  getAllUsers,
  toggleUserStatus
};

