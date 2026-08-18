const usersModel = require("../Users/usersModel");
const OwnerModel = require("../Owner_Profile/OwnerModel");
const parkingModel = require("../Parking_Space/parkingModel");
const bookingModel = require("../Bookings/bookingModel");
const paymentsModel = require("../Payments/paymentsModel");
const disputeModel = require("../Disputes/disputeModel");
const withdrawalModel = require("../Withdrawals/withdrawalModel");

const getPlatformStats = async (req, res) => {
  try {
    const { timeRange } = req.body; // 'today', 'this_week', 'this_month', 'all'
    const now = new Date();
    let dateFilter = {};

    if (timeRange === 'today') {
      dateFilter = { createdAt: { $gte: new Date(now.getFullYear(), now.getMonth(), now.getDate()) } };
    } else if (timeRange === 'this_week') {
      const firstDayOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
      firstDayOfWeek.setHours(0, 0, 0, 0);
      dateFilter = { createdAt: { $gte: firstDayOfWeek } };
    } else if (timeRange === 'this_month') {
      dateFilter = { createdAt: { $gte: new Date(now.getFullYear(), now.getMonth(), 1) } };
    }

    const totalUsers = await usersModel.countDocuments({ userType: "3" });
    const totalOwners = await usersModel.countDocuments({ userType: "2" });
    const totalSpaces = await parkingModel.countDocuments();
    const approvedSpaces = await parkingModel.countDocuments({ approvalStatus: 'APPROVED' });
    const pendingSpaces = await parkingModel.countDocuments({ approvalStatus: 'PENDING' });
    const pendingOwners = await OwnerModel.countDocuments({ verificationStatus: 'PENDING' });

    const allBookings = await bookingModel.find(dateFilter);
    let totalRevenue = 0;
    let platformCommission = 0;
    let ownerEarnings = 0;
    let lateFeeCollected = 0;
    let completedBookings = 0;
    let cancelledBookings = 0;
    let activeBookings = 0;

    allBookings.forEach(b => {
      if (b.paymentStatus === 'PAID') {
        const amt = b.totalAmount || b.baseAmount || 0;
        totalRevenue += amt;
        platformCommission += b.platformCommission || Math.round(amt * 0.1);
        ownerEarnings += b.ownerEarnings || Math.round(amt * 0.9);
        lateFeeCollected += b.lateFee || 0;
      }
      if (b.bookingStatus === 'COMPLETED') completedBookings++;
      if (b.bookingStatus === 'CANCELLED') cancelledBookings++;
      if (b.bookingStatus === 'ACTIVE') activeBookings++;
    });

    const openDisputes = await disputeModel.countDocuments({ status: { $in: ['OPEN', 'UNDER_REVIEW'] } });
    const pendingWithdrawals = await withdrawalModel.countDocuments({ status: { $in: ['PENDING', 'PROCESSING'] } });

    res.send({
      message: "Platform analytics fetched",
      success: true,
      status: 200,
      data: {
        totalUsers,
        totalOwners,
        totalSpaces,
        approvedSpaces,
        pendingSpaces,
        pendingOwners,
        totalBookings: allBookings.length,
        completedBookings,
        cancelledBookings,
        activeBookings,
        totalRevenue,
        platformCommission,
        ownerEarnings,
        lateFeeCollected,
        openDisputes,
        pendingWithdrawals
      }
    });
  } catch (err) {
    res.send({ message: "Error fetching platform statistics", success: false, status: 500, error: err.message });
  }
};

module.exports = {
  getPlatformStats
};
