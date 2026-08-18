import axios from "axios";

const baseUrl = "http://localhost:5001/apis/";
const ownerUrl = "http://localhost:5001/owner/";
const userUrl = "http://localhost:5001/users/";

class Apiservices {
  getToken() {
    const token = sessionStorage.getItem("token");
    const head = {
      Authorization: token ,
    };
   
    
    return { headers: head };
  }

  getMultipartHeader() {
    const token = sessionStorage.getItem("token");
    return {
      headers: {
        Authorization: token ,
        "Content-Type": "multipart/form-data",
      },
    };
  }

  // --- Auth ---
  login(data) {
    return axios.post(baseUrl + "Users/login", data);
  }

  registerUser(data) {
    return axios.post(baseUrl + "Users/register", data);
  }

  registerOwner(data) {
    return axios.post(baseUrl + "Owner/add", data);
  }

  // --- User Profile & Vehicles ---
  getUserProfile() {
    return axios.post(userUrl + "profile", {}, this.getToken());
  }

  updateUserProfile(data) {
    return axios.post(userUrl + "profile/update", data, this.getToken());
  }

  addVehicle(data) {
    return axios.post(userUrl + "vehicle/add", data, this.getToken());
  }

  deleteVehicle(data) {
    return axios.post(userUrl + "vehicle/delete", data, this.getToken());
  }

  // --- Parking Discovery & Details ---
  searchNearbyParking(data) {
    return axios.post(userUrl + "parkingspace/discovery", data);
  }

  getParkingDetails(data) {
    return axios.post(userUrl + "parkingspace/single", data);
  }

  // --- Booking Lifecycle ---
  calculatePrice(data) {
    return axios.post(userUrl + "bookings/calculate", data);
  }

  createBooking(data) {
    return axios.post(userUrl + "bookings/create", data, this.getToken());
  }

  getUserBookings(data = {}) {
    return axios.post(userUrl + "bookings/my-bookings", data, this.getToken());
  }

  getSingleBooking(data) {
    return axios.post(userUrl + "bookings/single", data, this.getToken());
  }

  checkInBooking(data) {
    return axios.post(userUrl + "bookings/check-in", data, this.getToken());
  }

  checkoutBooking(data) {
    return axios.post(userUrl + "bookings/checkout", data, this.getToken());
  }

  cancelBooking(data) {
    return axios.post(userUrl + "bookings/cancel", data, this.getToken());
  }

  // --- Payment ---
  processPayment(data) {
    return axios.post(userUrl + "payments/process", data, this.getToken());
  }

  // --- User Disputes ---
  createDispute(formData) {
    return axios.post(userUrl + "disputes/create", formData, this.getMultipartHeader());
  }

  getUserDisputes() {
    return axios.post(userUrl + "disputes/my-disputes", {}, this.getToken());
  }

  // --- Owner APIs ---
  getOwnerProfile() {
    return axios.post(ownerUrl + "profile", {}, this.getToken());
  }

  updateOwnerDocuments(formData) {
    return axios.post(ownerUrl + "profile/documents", formData, this.getMultipartHeader());
  }

  updateOwnerBankDetails(data) {
    return axios.post(ownerUrl + "profile/bank", data, this.getToken());
  }

  addOwnerSpace(formData) {
    return axios.post(ownerUrl + "parkingspace/add", formData, this.getMultipartHeader());
  }

  getOwnerSpaces(data = {}) {
    return axios.post(ownerUrl + "parkingspace/all", data, this.getToken());
  }

  getSingleSpace(data) {
    return axios.post(ownerUrl + "parkingspace/single", data, this.getToken());
  }

  updateOwnerSpace(formData) {
    return axios.post(ownerUrl + "parkingspace/Updatespace", formData, this.getMultipartHeader());
  }

  deleteOwnerSpace(data) {
    return axios.post(ownerUrl + "parkingspace/deleteOne", data, this.getToken());
  }

  toggleSpaceStatus(data) {
    return axios.post(ownerUrl + "parkingspace/toggle-status", data, this.getToken());
  }

  // Owner Slots
  addOwnerSlot(data) {
    return axios.post(ownerUrl + "parkingslots/add", data, this.getToken());
  }

  getOwnerSlots(data = {}) {
    return axios.post(ownerUrl + "parkingslots/all", data, this.getToken());
  }

  deleteOwnerSlot(data) {
    return axios.post(ownerUrl + "parkingslots/deleteOne", data, this.getToken());
  }

  // Owner Pricing
  addOwnerPricing(data) {
    return axios.post(ownerUrl + "pricing/add", data, this.getToken());
  }

  getOwnerPricing(data = {}) {
    return axios.post(ownerUrl + "pricing/all", data, this.getToken());
  }

  updateOwnerPricing(data) {
    return axios.post(ownerUrl + "pricing/Updatepricing", data, this.getToken());
  }

  // Owner Availability
  addOwnerAvailability(data) {
    return axios.post(ownerUrl + "availabilities/add", data, this.getToken());
  }

  getOwnerAvailability(data = {}) {
    return axios.post(ownerUrl + "availabilities/all", data, this.getToken());
  }

  updateOwnerAvailability(data) {
    return axios.post(ownerUrl + "availabilities/Updateavailability", data, this.getToken());
  }

  // Owner Bookings & Check-in Monitor
  getOwnerBookings(data = {}) {
    return axios.post(ownerUrl + "bookings/all", data, this.getToken());
  }

  ownerCheckIn(data) {
    return axios.post(ownerUrl + "bookings/check-in", data, this.getToken());
  }

  ownerCheckout(data) {
    return axios.post(ownerUrl + "bookings/checkout", data, this.getToken());
  }

  // Owner Earnings & Withdrawals
  getOwnerEarningsSummary() {
    return axios.post(ownerUrl + "earnings/summary", {}, this.getToken());
  }

  requestWithdrawal(data) {
    return axios.post(ownerUrl + "withdrawals/request", data, this.getToken());
  }

  getOwnerWithdrawalHistory() {
    return axios.post(ownerUrl + "withdrawals/history", {}, this.getToken());
  }

  // --- Admin APIs ---
  getAdminStats(data = {}) {
    return axios.post(baseUrl + "admin/stats", data, this.getToken());
  }

  getAdminReports(data = {}) {
    return axios.post(baseUrl + "admin/reports", data, this.getToken());
  }

  getAdminOwners(data = {}) {
    return axios.post(baseUrl + "admin/owners", data, this.getToken());
  }

  verifyAdminOwner(data) {
    return axios.post(baseUrl + "admin/owner/verify", data, this.getToken());
  }

  getAdminUsers() {
    return axios.post(baseUrl + "admin/users", {}, this.getToken());
  }

  toggleAdminUserStatus(data) {
    return axios.post(baseUrl + "admin/user/toggle-status", data, this.getToken());
  }

  getAdminParkings(data = {}) {
    return axios.post(baseUrl + "admin/parkings", data, this.getToken());
  }

  verifyAdminParking(data) {
    return axios.post(baseUrl + "admin/parking/verify", data, this.getToken());
  }

  getAdminBookings(data = {}) {
    return axios.post(baseUrl + "admin/bookings", data, this.getToken());
  }

  forceCloseAdminBooking(data) {
    return axios.post(baseUrl + "admin/booking/force-close", data, this.getToken());
  }

  getAdminTransactions(data = {}) {
    return axios.post(baseUrl + "admin/transactions", data, this.getToken());
  }

  getAdminWithdrawals(data = {}) {
    return axios.post(baseUrl + "admin/withdrawals", data, this.getToken());
  }

  updateAdminWithdrawal(data) {
    return axios.post(baseUrl + "admin/withdrawal/update", data, this.getToken());
  }

  getAdminDisputes(data = {}) {
    return axios.post(baseUrl + "admin/disputes", data, this.getToken());
  }

  updateAdminDispute(data) {
    return axios.post(baseUrl + "admin/dispute/update", data, this.getToken());
  }

  getAdminLateFeeRules() {
    return axios.post(baseUrl + "admin/late-fee-rules", {}, this.getToken());
  }

  updateAdminLateFeeRules(data) {
    return axios.post(baseUrl + "admin/late-fee-rules/update", data, this.getToken());
  }

  // --- Category APIs (Admin) ---
  AddCategory(data) {
    return axios.post(baseUrl + "category/add", data, this.getMultipartHeader());
  }
  ManageCategory(data = {}) {
    return axios.post(baseUrl + "category/all", data, this.getToken());
  }
  DeleteCategory(data) {
    return axios.post(baseUrl + "category/deleteOne", data, this.getToken());
  }
  UpdateCategory(data) {
    return axios.post(baseUrl + "category/UpdateCategory", data, this.getMultipartHeader());
  }
  GetSingleCate(data) {
    return axios.post(baseUrl + "category/single", data, this.getToken());
  }

  // Backwards compatibility aliases
  AddSpace(data) { return this.addOwnerSpace(data); }
  ManageSpace(data) { return this.getOwnerSpaces(data); }
  DeleteSpace(data) { return this.deleteOwnerSpace(data); }
  GetSinglespace(data) { return this.getSingleSpace(data); }
  UpdateSpace(data) { return this.updateOwnerSpace(data); }
  Addslots(data) { return this.addOwnerSlot(data); }
  ManageSlot(data) { return this.getOwnerSlots(data); }
  Deleteslot(data) { return this.deleteOwnerSlot(data); }
  Addprice(data) { return this.addOwnerPricing(data); }
  Manageprice(data) { return this.getOwnerPricing(data); }
  Deleteprice(data) { return this.deleteOwnerPricing(data); }
  Updateprice(data) { return this.updateOwnerPricing(data); }
}

export default new Apiservices();

