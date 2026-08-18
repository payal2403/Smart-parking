const usersModel = require("../api/Users/usersModel");
const lateModel = require("../api/Late_Penalty/lateModel");
const bcrypt = require("bcrypt");

module.exports = async () => {
  try {
    const admin = await usersModel.findOne({ email: "admin@gmail.com" });
    if (!admin) {
      const userobj = new usersModel({
        name: "Admin",
        email: "admin@gmail.com",
        password: bcrypt.hashSync("123", 10),
        userType: "1",
        status: "ACTIVE"
      });
      await userobj.save();
      console.log("Admin Created Successfully");
    }

    const defaultRule = await lateModel.findOne({});
    if (!defaultRule) {
      const rule = new lateModel({
        ruleName: "Standard Platform Policy",
        gracePeriodMinutes: 15,
        lateFeePerHour: 50,
        maxLateFee: 500,
        isActive: true
      });
      await rule.save();
      console.log("Default Late Fee Rule Initialized");
    }
  } catch (err) {
    console.log("Seeder error:", err.message);
  }
};


