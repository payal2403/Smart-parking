const parkingModel = require("./parkingModel");
const OwnerModel = require("../Owner_Profile/OwnerModel");
const pricingModel = require("../Pricing/pricingModel");
const paModel = require("../Parking_Availability/paModel");
const psModel = require("../Parking Slots/psModel");
const { uploadImg } = require("../../utilities/helper");

// Haversine formula for distance calculation in kilometers
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return parseFloat((R * c).toFixed(2));
}

const add = async (req, res) => {
  try {
    const ownerId = req.user?.userId || req.body.ownerProfileId;
    if (!ownerId) {
      return res.send({ message: "Owner authentication required", success: false, status: 401 });
    }

    // Check if owner is approved
    const ownerProfile = await OwnerModel.findOne({ userId: ownerId });
    if (!ownerProfile || ownerProfile.verificationStatus !== 'APPROVED') {
      return res.send({
        message: "Cannot create parking space. Your owner account is not yet verified and approved by Admin.",
        success: false,
        status: 403
      });
    }

    const {
      title,
      description,
      address,
      city,
      latitude,
      longitude,
      totalArea,
      parkingType,
      supportedVehicles,
      amenities,
      rules,
      totalSlots,
      hourlyRate,
      dailyRate,
      monthlyRate
    } = req.body;

    if (!title || !address) {
      return res.send({ message: "Title and address are required", success: false, status: 400 });
    }

    let mainImage = "";
    const imagesArray = [];

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const url = await uploadImg(file.buffer);
        imagesArray.push(url);
      }
      mainImage = imagesArray[0];
    } else if (req.file) {
      mainImage = await uploadImg(req.file.buffer);
      imagesArray.push(mainImage);
    } else if (req.body.parking_images) {
      mainImage = req.body.parking_images;
      imagesArray.push(mainImage);
    }

    const parsedVehicles = Array.isArray(supportedVehicles)
      ? supportedVehicles
      : supportedVehicles ? supportedVehicles.split(",").map(s => s.trim()) : ['Car', 'Bike', 'SUV'];

    const parsedAmenities = Array.isArray(amenities)
      ? amenities
      : amenities ? amenities.split(",").map(s => s.trim()) : ['CCTV', 'Security Guard'];

    const slotsCount = Number(totalSlots) || 10;

    const newSpace = new parkingModel({
      ownerProfileId: ownerId,
      title,
      description: description || '',
      address,
      city: city || '',
      latitude: Number(latitude) || 0,
      longitude: Number(longitude) || 0,
      totalArea: totalArea || '',
      parkingType: parkingType || 'Open',
      parking_images: mainImage,
      images: imagesArray,
      supportedVehicles: parsedVehicles,
      amenities: parsedAmenities,
      rules: rules || 'Park properly within boundaries.',
      totalSlots: slotsCount,
      availableSlots: slotsCount,
      Status: true,
      approvalStatus: 'PENDING'
    });

    const savedSpace = await newSpace.save();

    // Automatically create pricing record if rates are provided
    const newPricing = new pricingModel({
      parkingId: savedSpace._id,
      ownerId: ownerId,
      slotType: 'Car',
      hourlyRate: Number(hourlyRate) || 30,
      dailyRate: Number(dailyRate) || 200,
      monthlyRate: Number(monthlyRate) || 3000
    });
    await newPricing.save();

    // Automatically create default availability
    const newAvailability = new paModel({
      parkingId: savedSpace._id,
      daysOpen: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      openTime: '00:00',
      closeTime: '23:59',
      is24Hours: true
    });
    await newAvailability.save();

    // Create default slots
    for (let i = 1; i <= slotsCount; i++) {
      const slot = new psModel({
        parkingId: savedSpace._id,
        slotNumber: `S-${i}`,
        slotType: 'Car',
        isOccupied: false
      });
      await slot.save();
    }

    res.send({
      status: 201,
      message: "Parking space created successfully! Pending admin approval.",
      success: true,
      data: savedSpace
    });
  } catch (err) {
    res.send({
      status: 500,
      message: "Error creating parking space",
      success: false,
      error: err.message
    });
  }
};

const all = async (req, res) => {
  try {
    const filter = {};
    if (req.user?.userType === "2") {
      filter.ownerProfileId = req.user.userId;
    } else if (req.body.ownerProfileId) {
      filter.ownerProfileId = req.body.ownerProfileId;
    }

    if (req.body.approvalStatus) {
      filter.approvalStatus = req.body.approvalStatus;
    }
    if (req.body.Status !== undefined) {
      filter.Status = req.body.Status;
    }

    const spaces = await parkingModel.find(filter)
      .populate("ownerProfileId", "name email phone")
      .sort({ createdAt: -1 });

    res.send({
      status: 200,
      message: "All Parking Spaces",
      success: true,
      totalspace: spaces.length,
      data: spaces
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

const discovery = async (req, res) => {
  try {
    const { lat, lng, vehicleType, maxPrice, amenity, search, sortBy } = req.body;

    // Only return approved and active parking spaces
    const query = {
      approvalStatus: 'APPROVED',
      Status: true
    };

    if (vehicleType && vehicleType !== 'All') {
      query.supportedVehicles = vehicleType;
    }
    if (amenity) {
      query.amenities = amenity;
    }
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { address: { $regex: search, $options: 'i' } },
        { city: { $regex: search, $options: 'i' } }
      ];
    }

    const spaces = await parkingModel.find(query)
      .populate("ownerProfileId", "name email phone");

    // Enhance spaces with pricing and calculated distance
    const enhancedSpaces = await Promise.all(
      spaces.map(async (sp) => {
        const spObj = sp.toObject();

        const pricing = await pricingModel.findOne({ parkingId: sp._id }) || {
          hourlyRate: 30,
          dailyRate: 200,
          monthlyRate: 3000
        };
        const availability = await paModel.findOne({ parkingId: sp._id });

        spObj.pricing = pricing;
        spObj.availability = availability;

        if (lat && lng && sp.latitude && sp.longitude) {
          spObj.distanceKm = calculateDistance(
            Number(lat),
            Number(lng),
            Number(sp.latitude),
            Number(sp.longitude)
          );
        } else {
          spObj.distanceKm = null;
        }

        return spObj;
      })
    );

    let filtered = enhancedSpaces;
    if (maxPrice) {
      filtered = filtered.filter(s => s.pricing.hourlyRate <= Number(maxPrice));
    }

    if (sortBy === 'distance' && lat && lng) {
      filtered.sort((a, b) => (a.distanceKm || 99999) - (b.distanceKm || 99999));
    } else if (sortBy === 'price_asc') {
      filtered.sort((a, b) => a.pricing.hourlyRate - b.pricing.hourlyRate);
    } else if (sortBy === 'price_desc') {
      filtered.sort((a, b) => b.pricing.hourlyRate - a.pricing.hourlyRate);
    } else if (sortBy === 'availability') {
      filtered.sort((a, b) => b.availableSlots - a.availableSlots);
    }

    res.send({
      status: 200,
      message: "Nearby parkings found",
      success: true,
      total: filtered.length,
      data: filtered
    });
  } catch (err) {
    res.send({
      status: 500,
      message: "Error fetching nearby parkings",
      success: false,
      error: err.message
    });
  }
};

const single = async (req, res) => {
  try {
    const spaceId = req.body._id || req.body.parkingId;
    if (!spaceId) {
      return res.send({ status: 400, message: "_id is required", success: false });
    }

    const space = await parkingModel.findById(spaceId)
      .populate("ownerProfileId", "name email phone");

    if (!space) {
      return res.send({ status: 404, message: "Parking space not found", success: false });
    }

    const pricing = await pricingModel.findOne({ parkingId: spaceId }) || {
      hourlyRate: 30,
      dailyRate: 200,
      monthlyRate: 3000
    };
    const availability = await paModel.findOne({ parkingId: spaceId });
    const slots = await psModel.find({ parkingId: spaceId });

    res.send({
      status: 200,
      message: "Found",
      success: true,
      data: {
        ...space.toObject(),
        pricing,
        availability,
        slots
      }
    });
  } catch (err) {
    res.send({ status: 500, message: "Internal Server Error", success: false, error: err.message });
  }
};

const Updatespace = async (req, res) => {
  try {
    const spaceId = req.body._id;
    if (!spaceId) {
      return res.send({ status: 400, message: "_id is required", success: false });
    }

    const space = await parkingModel.findById(spaceId);
    if (!space) {
      return res.send({ status: 404, message: "Space not found", success: false });
    }

    if (req.body.title) space.title = req.body.title;
    if (req.body.description) space.description = req.body.description;
    if (req.body.address) space.address = req.body.address;
    if (req.body.city) space.city = req.body.city;
    if (req.body.latitude) space.latitude = Number(req.body.latitude);
    if (req.body.longitude) space.longitude = Number(req.body.longitude);
    if (req.body.totalArea) space.totalArea = req.body.totalArea;
    if (req.body.parkingType) space.parkingType = req.body.parkingType;
    if (req.body.rules) space.rules = req.body.rules;
    if (req.body.totalSlots) {
      space.totalSlots = Number(req.body.totalSlots);
    }
    if (req.body.supportedVehicles) {
      space.supportedVehicles = Array.isArray(req.body.supportedVehicles)
        ? req.body.supportedVehicles
        : req.body.supportedVehicles.split(",").map(s => s.trim());
    }
    if (req.body.amenities) {
      space.amenities = Array.isArray(req.body.amenities)
        ? req.body.amenities
        : req.body.amenities.split(",").map(s => s.trim());
    }

    if (req.file) {
      const url = await uploadImg(req.file.buffer);
      space.parking_images = url;
      space.images = [url, ...(space.images || [])];
    }

    const updated = await space.save();
    res.send({ status: 200, message: "Parking space updated", success: true, data: updated });
  } catch (err) {
    res.send({ status: 500, message: "Internal server error", success: false, error: err.message });
  }
};

const toggleStatus = async (req, res) => {
  try {
    const spaceId = req.body._id;
    const space = await parkingModel.findById(spaceId);
    if (!space) {
      return res.send({ status: 404, message: "Space not found", success: false });
    }
    space.Status = !space.Status;
    await space.save();
    res.send({
      status: 200,
      message: `Parking space ${space.Status ? 'Enabled' : 'Disabled'}`,
      success: true,
      data: space
    });
  } catch (err) {
    res.send({ status: 500, message: "Error toggling status", success: false, error: err.message });
  }
};

const verifyParking = async (req, res) => {
  try {
    const { parkingId, approvalStatus, rejectionReason } = req.body;
    if (!parkingId || !approvalStatus) {
      return res.send({ status: 400, message: "parkingId and approvalStatus are required", success: false });
    }

    const space = await parkingModel.findById(parkingId);
    if (!space) {
      return res.send({ status: 404, message: "Parking space not found", success: false });
    }

    space.approvalStatus = approvalStatus; // 'APPROVED', 'REJECTED', 'SUSPENDED'
    if (rejectionReason) space.rejectionReason = rejectionReason;

    await space.save();
    res.send({
      status: 200,
      message: `Parking space status updated to ${approvalStatus}`,
      success: true,
      data: space
    });
  } catch (err) {
    res.send({ status: 500, message: "Error verifying parking", success: false, error: err.message });
  }
};

const DeleteOne = async (req, res) => {
  try {
    const spaceId = req.body._id;
    await parkingModel.findByIdAndDelete(spaceId);
    await pricingModel.deleteMany({ parkingId: spaceId });
    await paModel.deleteMany({ parkingId: spaceId });
    await psModel.deleteMany({ parkingId: spaceId });

    res.send({ status: 200, message: "Parking space deleted successfully", success: true });
  } catch (err) {
    res.send({ status: 500, message: "Internal server error", success: false, error: err.message });
  }
};

module.exports = {
  add,
  all,
  discovery,
  single,
  Updatespace,
  toggleStatus,
  verifyParking,
  DeleteOne
};

