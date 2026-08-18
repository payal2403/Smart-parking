const usersModel = require("../Users/usersModel");
const OwnerModel = require("./OwnerModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { uploadImg } = require("../../utilities/helper");

const skey = "hahahaha@2403";

const register = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    if (!name || !email || !password) {
      return res.send({
        message: "Name, email, and password are required",
        success: false,
        status: 400
      });
    }

    const exist = await usersModel.findOne({ email });
    if (exist) {
      return res.send({
        message: "Owner with this email already exists",
        success: false,
        status: 409
      });
    }

    const userObj = new usersModel({
      name,
      email,
      phone,
      password: bcrypt.hashSync(password, 10),
      userType: "2", // Owner
      status: "ACTIVE"
    });

    const savedUser = await userObj.save();

    const ownerObj = new OwnerModel({
      userId: savedUser._id,
      verificationStatus: 'PENDING'
    });

    const savedOwner = await ownerObj.save();

    const payload = {
      userId: savedUser._id,
      email: savedUser.email,
      userType: savedUser.userType,
      name: savedUser.name
    };
    const token = jwt.sign(payload, skey, { expiresIn: '7d' });

    res.send({
      message: "Owner registered successfully",
      success: true,
      status: 201,
      data: { user: payload, owner: savedOwner },
      token
    });
  } catch (err) {
    res.send({
      message: "Error registering owner",
      success: false,
      status: 500,
      error: err.message
    });
  }
};

const getProfile = async (req, res) => {
  try {
    const userId = req.user?.userId || req.body.userId;
    const user = await usersModel.findById(userId).select("-password");
    if (!user) {
      return res.send({ message: "Owner not found", success: false, status: 404 });
    }

    let ownerProfile = await OwnerModel.findOne({ userId });
    if (!ownerProfile) {
      ownerProfile = new OwnerModel({ userId, verificationStatus: 'PENDING' });
      await ownerProfile.save();
    }

    res.send({
      message: "Owner profile fetched",
      success: true,
      status: 200,
      data: { user, ownerProfile }
    });
  } catch (err) {
    res.send({ message: "Error fetching owner profile", success: false, status: 500, error: err.message });
  }
};

const updateDocuments = async (req, res) => {
  try {
    const userId = req.user?.userId || req.body.userId;
    let ownerProfile = await OwnerModel.findOne({ userId });
    if (!ownerProfile) {
      ownerProfile = new OwnerModel({ userId });
    }

    // Handle files if uploaded via multer (idProof or addressProof)
    if (req.files) {
      if (req.files.idProof && req.files.idProof[0]) {
        ownerProfile.idProofImage = await uploadImg(req.files.idProof[0].buffer);
      }
      if (req.files.addressProof && req.files.addressProof[0]) {
        ownerProfile.addressProofImage = await uploadImg(req.files.addressProof[0].buffer);
      }
    } else if (req.file) {
      const url = await uploadImg(req.file.buffer);
      if (req.body.docType === 'addressProof') {
        ownerProfile.addressProofImage = url;
      } else {
        ownerProfile.idProofImage = url;
      }
    }

    if (req.body.idProofImage) ownerProfile.idProofImage = req.body.idProofImage;
    if (req.body.addressProofImage) ownerProfile.addressProofImage = req.body.addressProofImage;

    // Reset status to PENDING or UNDER_REVIEW on resubmission
    if (ownerProfile.verificationStatus === 'REJECTED') {
      ownerProfile.verificationStatus = 'UNDER_REVIEW';
      ownerProfile.rejectionReason = '';
    }

    await ownerProfile.save();
    res.send({
      message: "Documents updated successfully. Pending admin review.",
      success: true,
      status: 200,
      data: ownerProfile
    });
  } catch (err) {
    res.send({ message: "Error updating documents", success: false, status: 500, error: err.message });
  }
};

const updateBankDetails = async (req, res) => {
  try {
    const userId = req.user?.userId || req.body.userId;
    const { accountNumber, ifsc, bankName, accountHolder } = req.body;

    let ownerProfile = await OwnerModel.findOne({ userId });
    if (!ownerProfile) {
      ownerProfile = new OwnerModel({ userId });
    }

    ownerProfile.bankDetails = {
      accountNumber: accountNumber || ownerProfile.bankDetails?.accountNumber || '',
      ifsc: ifsc || ownerProfile.bankDetails?.ifsc || '',
      bankName: bankName || ownerProfile.bankDetails?.bankName || '',
      accountHolder: accountHolder || ownerProfile.bankDetails?.accountHolder || ''
    };

    await ownerProfile.save();
    res.send({
      message: "Bank details updated successfully",
      success: true,
      status: 200,
      data: ownerProfile.bankDetails
    });
  } catch (err) {
    res.send({ message: "Error updating bank details", success: false, status: 500, error: err.message });
  }
};

const all = async (req, res) => {
  try {
    const filter = {};
    if (req.body.verificationStatus) {
      filter.verificationStatus = req.body.verificationStatus;
    }

    const owners = await OwnerModel.find(filter)
      .populate("userId", "name email phone status createdAt")
      .sort({ createdAt: -1 });

    res.send({
      status: 200,
      message: "All Owners",
      success: true,
      total: owners.length,
      data: owners
    });
  } catch (err) {
    res.send({
      status: 500,
      message: "Internal Server Error",
      success: false,
      error: err.message
    });
  }
};

const verifyOwner = async (req, res) => {
  try {
    const { ownerId, verificationStatus, rejectionReason } = req.body;
    if (!ownerId || !verificationStatus) {
      return res.send({ message: "ownerId and verificationStatus are required", success: false, status: 400 });
    }

    const owner = await OwnerModel.findById(ownerId);
    if (!owner) {
      return res.send({ message: "Owner profile not found", success: false, status: 404 });
    }

    owner.verificationStatus = verificationStatus; // 'APPROVED', 'REJECTED', 'SUSPENDED', 'UNDER_REVIEW'
    if (rejectionReason) {
      owner.rejectionReason = rejectionReason;
    }

    await owner.save();
    res.send({
      message: `Owner verification status updated to ${verificationStatus}`,
      success: true,
      status: 200,
      data: owner
    });
  } catch (err) {
    res.send({ message: "Error updating owner status", success: false, status: 500, error: err.message });
  }
};

module.exports = {
  register,
  getProfile,
  updateDocuments,
  updateBankDetails,
  all,
  verifyOwner
};