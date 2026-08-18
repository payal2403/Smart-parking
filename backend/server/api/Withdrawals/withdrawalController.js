const withdrawalModel = require("./withdrawalModel");
const paymentsModel = require("../Payments/paymentsModel");
const bookingModel = require("../Bookings/bookingModel");
const parkingModel = require("../Parking_Space/parkingModel");
const OwnerModel = require("../Owner_Profile/OwnerModel");

const getEarningsSummary = async (req, res) => {
  try {
    const ownerId = req.user?.userId || req.body.ownerProfileId;
    if (!ownerId) {
      return res.send({ message: "Owner authentication required", success: false, status: 401 });
    }

    // Get all spaces for owner
    const spaces = await parkingModel.find({ ownerProfileId: ownerId }).select("_id");
    const spaceIds = spaces.map(s => s._id);

    // Completed or confirmed bookings
    const bookings = await bookingModel.find({
      parkingId: { $in: spaceIds },
      paymentStatus: 'PAID'
    });

    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    let totalEarnings = 0;
    let todayEarnings = 0;
    let monthEarnings = 0;

    bookings.forEach(b => {
      const earnings = b.ownerEarnings || (b.totalAmount ? Math.round(b.totalAmount * 0.9) : 0);
      totalEarnings += earnings;
      const bDate = new Date(b.createdAt);
      if (bDate >= startOfToday) todayEarnings += earnings;
      if (bDate >= startOfMonth) monthEarnings += earnings;
    });

    // Total withdrawn (APPROVED/COMPLETED)
    const withdrawals = await withdrawalModel.find({ ownerId });
    let totalWithdrawn = 0;
    let pendingWithdrawal = 0;

    withdrawals.forEach(w => {
      if (w.status === 'COMPLETED') totalWithdrawn += w.amount;
      if (w.status === 'PENDING' || w.status === 'PROCESSING') pendingWithdrawal += w.amount;
    });

    const withdrawableBalance = Math.max(0, totalEarnings - totalWithdrawn - pendingWithdrawal);

    res.send({
      message: "Earnings summary fetched",
      success: true,
      status: 200,
      data: {
        totalEarnings,
        todayEarnings,
        monthEarnings,
        totalWithdrawn,
        pendingWithdrawal,
        withdrawableBalance,
        totalBookings: bookings.length
      }
    });
  } catch (err) {
    res.send({ message: "Error fetching earnings summary", success: false, status: 500, error: err.message });
  }
};

const requestWithdrawal = async (req, res) => {
  try {
    const ownerId = req.user?.userId || req.body.ownerProfileId;
    const amount = Number(req.body.amount);

    if (!amount || amount <= 0) {
      return res.send({ message: "Valid withdrawal amount is required", success: false, status: 400 });
    }

    // Check available balance
    const spaces = await parkingModel.find({ ownerProfileId: ownerId }).select("_id");
    const spaceIds = spaces.map(s => s._id);
    const bookings = await bookingModel.find({ parkingId: { $in: spaceIds }, paymentStatus: 'PAID' });
    let totalEarnings = 0;
    bookings.forEach(b => {
      totalEarnings += b.ownerEarnings || (b.totalAmount ? Math.round(b.totalAmount * 0.9) : 0);
    });

    const withdrawals = await withdrawalModel.find({ ownerId });
    let totalWithdrawn = 0;
    let pendingWithdrawal = 0;
    withdrawals.forEach(w => {
      if (w.status === 'COMPLETED') totalWithdrawn += w.amount;
      if (w.status === 'PENDING' || w.status === 'PROCESSING') pendingWithdrawal += w.amount;
    });

    const available = totalEarnings - totalWithdrawn - pendingWithdrawal;
    if (amount > available) {
      return res.send({
        message: `Insufficient withdrawable balance. Available: ₹${available}`,
        success: false,
        status: 400
      });
    }

    const ownerProfile = await OwnerModel.findOne({ userId: ownerId });
    const bankDetails = req.body.bankDetails || ownerProfile?.bankDetails || {};

    const newReq = new withdrawalModel({
      ownerId,
      amount,
      bankDetails,
      status: 'PENDING'
    });

    await newReq.save();

    res.send({
      message: "Withdrawal request submitted successfully! Pending admin approval.",
      success: true,
      status: 201,
      data: newReq
    });
  } catch (err) {
    res.send({ message: "Error submitting withdrawal request", success: false, status: 500, error: err.message });
  }
};

const ownerWithdrawals = async (req, res) => {
  try {
    const ownerId = req.user?.userId || req.body.ownerProfileId;
    const withdrawals = await withdrawalModel.find({ ownerId }).sort({ createdAt: -1 });
    res.send({
      message: "Withdrawal history",
      success: true,
      status: 200,
      total: withdrawals.length,
      data: withdrawals
    });
  } catch (err) {
    res.send({ message: "Error fetching withdrawals", success: false, status: 500, error: err.message });
  }
};

const adminWithdrawals = async (req, res) => {
  try {
    const filter = {};
    if (req.body.status) filter.status = req.body.status;

    const withdrawals = await withdrawalModel.find(filter)
      .populate("ownerId", "name email phone")
      .sort({ createdAt: -1 });

    res.send({
      message: "All withdrawal requests",
      success: true,
      status: 200,
      total: withdrawals.length,
      data: withdrawals
    });
  } catch (err) {
    res.send({ message: "Error fetching withdrawal requests", success: false, status: 500, error: err.message });
  }
};

const updateWithdrawalStatus = async (req, res) => {
  try {
    const { withdrawalId, status, rejectionReason, adminNotes } = req.body;
    if (!withdrawalId || !status) {
      return res.send({ message: "withdrawalId and status are required", success: false, status: 400 });
    }

    const item = await withdrawalModel.findById(withdrawalId);
    if (!item) {
      return res.send({ message: "Withdrawal request not found", success: false, status: 404 });
    }

    item.status = status; // 'PROCESSING', 'COMPLETED', 'REJECTED'
    if (rejectionReason) item.rejectionReason = rejectionReason;
    if (adminNotes) item.adminNotes = adminNotes;
    if (status === 'COMPLETED') item.processedAt = new Date();

    await item.save();

    res.send({
      message: `Withdrawal status updated to ${status}`,
      success: true,
      status: 200,
      data: item
    });
  } catch (err) {
    res.send({ message: "Error updating withdrawal", success: false, status: 500, error: err.message });
  }
};

module.exports = {
  getEarningsSummary,
  requestWithdrawal,
  ownerWithdrawals,
  adminWithdrawals,
  updateWithdrawalStatus
};
