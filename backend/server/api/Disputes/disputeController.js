const disputeModel = require("./disputeModel");
const bookingModel = require("../Bookings/bookingModel");
const parkingModel = require("../Parking_Space/parkingModel");
const { uploadImg } = require("../../utilities/helper");

const createDispute = async (req, res) => {
  try {
    const userId = req.user?.userId || req.body.userId;
    const { bookingId, reason } = req.body;

    if (!bookingId || !reason) {
      return res.send({ message: "Booking ID and reason are required", success: false, status: 400 });
    }

    const booking = await bookingModel.findOne({
      $or: [{ _id: bookingId }, { bookingId: bookingId }]
    });

    if (!booking) {
      return res.send({ message: "Booking not found", success: false, status: 404 });
    }

    const space = await parkingModel.findById(booking.parkingId);

    let evidenceUrl = "";
    if (req.file) {
      evidenceUrl = await uploadImg(req.file.buffer);
    } else if (req.body.evidenceImage) {
      evidenceUrl = req.body.evidenceImage;
    }

    const newDispute = new disputeModel({
      bookingId: booking._id,
      raisedBy: userId,
      parkingId: booking.parkingId,
      ownerId: space?.ownerProfileId,
      reason,
      evidenceImage: evidenceUrl,
      status: 'OPEN'
    });

    await newDispute.save();

    res.send({
      message: "Dispute submitted successfully! Our support team will review it.",
      success: true,
      status: 201,
      data: newDispute
    });
  } catch (err) {
    res.send({ message: "Error submitting dispute", success: false, status: 500, error: err.message });
  }
};

const userDisputes = async (req, res) => {
  try {
    const userId = req.user?.userId || req.body.userId;
    const disputes = await disputeModel.find({ raisedBy: userId })
      .populate("bookingId", "bookingId startTime endTime totalAmount")
      .populate("parkingId", "title address")
      .sort({ createdAt: -1 });

    res.send({
      message: "User disputes",
      success: true,
      status: 200,
      total: disputes.length,
      data: disputes
    });
  } catch (err) {
    res.send({ message: "Error fetching disputes", success: false, status: 500, error: err.message });
  }
};

const adminDisputes = async (req, res) => {
  try {
    const filter = {};
    if (req.body.status) filter.status = req.body.status;

    const disputes = await disputeModel.find(filter)
      .populate("raisedBy", "name email phone")
      .populate("ownerId", "name email phone")
      .populate("bookingId", "bookingId totalAmount paymentStatus")
      .populate("parkingId", "title address")
      .sort({ createdAt: -1 });

    res.send({
      message: "All disputes",
      success: true,
      status: 200,
      total: disputes.length,
      data: disputes
    });
  } catch (err) {
    res.send({ message: "Error fetching all disputes", success: false, status: 500, error: err.message });
  }
};

const updateDisputeStatus = async (req, res) => {
  try {
    const { disputeId, status, adminNotes } = req.body;
    if (!disputeId || !status) {
      return res.send({ message: "disputeId and status are required", success: false, status: 400 });
    }

    const dispute = await disputeModel.findById(disputeId);
    if (!dispute) {
      return res.send({ message: "Dispute not found", success: false, status: 404 });
    }

    dispute.status = status; // 'UNDER_REVIEW', 'RESOLVED', 'REJECTED'
    if (adminNotes) dispute.adminNotes = adminNotes;
    if (status === 'RESOLVED' || status === 'REJECTED') {
      dispute.resolvedAt = new Date();
    }

    await dispute.save();

    res.send({
      message: `Dispute updated to ${status}`,
      success: true,
      status: 200,
      data: dispute
    });
  } catch (err) {
    res.send({ message: "Error updating dispute", success: false, status: 500, error: err.message });
  }
};

module.exports = {
  createDispute,
  userDisputes,
  adminDisputes,
  updateDisputeStatus
};
