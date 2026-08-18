const lateModel = require("./lateModel");

const getRule = async (req, res) => {
  try {
    let rule = await lateModel.findOne({ isActive: true });
    if (!rule) {
      rule = new lateModel({
        ruleName: "Standard Platform Policy",
        gracePeriodMinutes: 15,
        lateFeePerHour: 50,
        maxLateFee: 500,
        isActive: true
      });
      await rule.save();
    }
    res.send({ status: 200, message: "Late fee rule fetched", success: true, data: rule });
  } catch (err) {
    res.send({ status: 500, message: "Error fetching late fee rule", success: false, error: err.message });
  }
};

const updateRule = async (req, res) => {
  try {
    const { gracePeriodMinutes, lateFeePerHour, maxLateFee, ruleName } = req.body;
    let rule = await lateModel.findOne({ isActive: true });
    if (!rule) {
      rule = new lateModel();
    }

    if (gracePeriodMinutes !== undefined) rule.gracePeriodMinutes = Number(gracePeriodMinutes);
    if (lateFeePerHour !== undefined) rule.lateFeePerHour = Number(lateFeePerHour);
    if (maxLateFee !== undefined) rule.maxLateFee = Number(maxLateFee);
    if (ruleName) rule.ruleName = ruleName;
    rule.updatedAt = new Date();

    const saved = await rule.save();
    res.send({ status: 200, message: "Late fee policy updated successfully", success: true, data: saved });
  } catch (err) {
    res.send({ status: 500, message: "Error updating late fee rule", success: false, error: err.message });
  }
};

module.exports = {
  getRule,
  updateRule,
  add: updateRule,
  single: getRule,
  all: getRule,
  Updatepenalty: updateRule,
  DeleteOne: (req, res) => res.send({ status: 200, message: "Default policy active", success: true })
};


