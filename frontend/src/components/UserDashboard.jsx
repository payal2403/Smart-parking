import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Apiservices from "../../Apiservices";
import { toast, Zoom } from "react-toastify";

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState("bookings");
  const [bookings, setBookings] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [disputes, setDisputes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  // New vehicle form
  const [newVehicleNumber, setNewVehicleNumber] = useState("");
  const [newVehicleType, setNewVehicleType] = useState("Car");
  const [newVehicleModel, setNewVehicleModel] = useState("");

  // Dispute form modal
  const [showDisputeModal, setShowDisputeModal] = useState(false);
  const [disputeBookingId, setDisputeBookingId] = useState("");
  const [disputeReason, setDisputeReason] = useState("");
  const [disputeFile, setDisputeFile] = useState(null);

  const userName = sessionStorage.getItem("name") || "Driver";
  const userEmail = sessionStorage.getItem("email") || "";

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [bookingsRes, profileRes, disputesRes] = await Promise.all([
        Apiservices.getUserBookings(),
        Apiservices.getUserProfile(),
        Apiservices.getUserDisputes()
      ]);

      if (bookingsRes.data.success) {
        setBookings(bookingsRes.data.data || []);
      }
      if (profileRes.data.success && profileRes.data.data) {
        setVehicles(profileRes.data.data.vehicles || []);
      }
      if (disputesRes.data.success) {
        setDisputes(disputesRes.data.data || []);
      }
    } catch (err) {
      console.error(err);
      toast.error("Error loading dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const handleCheckIn = async (bookingId) => {
    try {
      setActionLoading(true);
      const res = await Apiservices.checkInBooking({ bookingId });
      if (res.data.success) {
        toast.success(res.data.message, { transition: Zoom });
        fetchDashboardData();
      } else {
        toast.warning(res.data.message);
      }
    } catch (err) {
      toast.error("Check-in failed");
    } finally {
      setActionLoading(false);
    }
  };

  const handleCheckout = async (bookingId) => {
    try {
      setActionLoading(true);
      const res = await Apiservices.checkoutBooking({ bookingId });
      if (res.data.success) {
        toast.success(res.data.message, { transition: Zoom });
        fetchDashboardData();
      } else {
        toast.warning(res.data.message);
      }
    } catch (err) {
      toast.error("Checkout failed");
    } finally {
      setActionLoading(false);
    }
  };

  const handleCancel = async (bookingId) => {
    if (!window.confirm("Are you sure you want to cancel this booking reservation?")) return;
    try {
      setActionLoading(true);
      const res = await Apiservices.cancelBooking({ bookingId, reason: "Cancelled by User" });
      if (res.data.success) {
        toast.success("Booking cancelled successfully", { transition: Zoom });
        fetchDashboardData();
      } else {
        toast.warning(res.data.message);
      }
    } catch (err) {
      toast.error("Cancel failed");
    } finally {
      setActionLoading(false);
    }
  };

  const handleAddVehicle = async (e) => {
    e.preventDefault();
    if (!newVehicleNumber.trim()) return;

    try {
      setActionLoading(true);
      const res = await Apiservices.addVehicle({
        vehicleNumber: newVehicleNumber,
        vehicleType: newVehicleType,
        model: newVehicleModel
      });

      if (res.data.success) {
        toast.success("Vehicle registered successfully!", { transition: Zoom });
        setNewVehicleNumber("");
        setNewVehicleModel("");
        fetchDashboardData();
      } else {
        toast.warning(res.data.message);
      }
    } catch (err) {
      toast.error("Failed to add vehicle");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteVehicle = async (vehicleId) => {
    try {
      const res = await Apiservices.deleteVehicle({ vehicleId });
      if (res.data.success) {
        toast.success("Vehicle removed", { transition: Zoom });
        fetchDashboardData();
      }
    } catch (err) {
      toast.error("Failed to remove vehicle");
    }
  };

  const handleOpenDispute = (booking) => {
    setDisputeBookingId(booking._id);
    setDisputeReason("");
    setDisputeFile(null);
    setShowDisputeModal(true);
  };

  const handleSubmitDispute = async (e) => {
    e.preventDefault();
    if (!disputeReason.trim()) {
      toast.warning("Please describe your issue");
      return;
    }

    try {
      setActionLoading(true);
      const formData = new FormData();
      formData.append("bookingId", disputeBookingId);
      formData.append("reason", disputeReason);
      if (disputeFile) {
        formData.append("evidenceImage", disputeFile);
      }

      const res = await Apiservices.createDispute(formData);
      if (res.data.success) {
        toast.success("Dispute filed successfully! Our team will review it.", { transition: Zoom });
        setShowDisputeModal(false);
        fetchDashboardData();
      } else {
        toast.warning(res.data.message);
      }
    } catch (err) {
      toast.error("Failed to submit dispute");
    } finally {
      setActionLoading(false);
    }
  };

  const activeBookings = bookings.filter(b => b.bookingStatus === 'CONFIRMED' || b.bookingStatus === 'ACTIVE');
  const pastBookings = bookings.filter(b => b.bookingStatus === 'COMPLETED' || b.bookingStatus === 'CANCELLED');

  return (
    <div className="container-fluid bg-light py-5 min-vh-100">
      <div className="container">
        {/* User Profile Banner */}
        <div className="card border-0 shadow-sm rounded-4 p-4 bg-white mb-4">
          <div className="d-flex flex-wrap justify-content-between align-items-center">
            <div className="d-flex align-items-center gap-3">
              <div className="rounded-circle bg-primary bg-opacity-10 text-primary d-flex align-items-center justify-content-center" style={{ width: 64, height: 64 }}>
                <i className="fas fa-user-circle fa-2x"></i>
              </div>
              <div>
                <h4 className="fw-bold text-dark mb-0">{userName}</h4>
                <p className="text-muted small mb-0">{userEmail}</p>
                <span className="badge bg-success bg-opacity-10 text-success rounded-pill px-3 py-1 small mt-1">
                  Active Driver Account
                </span>
              </div>
            </div>
            <div className="d-flex gap-2 mt-3 mt-md-0">
              <Link to="/view" className="btn btn-primary rounded-pill px-4 fw-semibold">
                <i className="fas fa-search me-1"></i> Find Parking
              </Link>
            </div>
          </div>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="d-flex gap-2 border-bottom pb-3 mb-4 overflow-x-auto">
          <button
            className={`btn rounded-pill px-4 py-2 fw-semibold ${activeTab === 'bookings' ? 'btn-primary' : 'btn-light text-muted'}`}
            onClick={() => setActiveTab('bookings')}
          >
            <i className="fas fa-calendar-check me-2"></i> Active Passes ({activeBookings.length})
          </button>
          <button
            className={`btn rounded-pill px-4 py-2 fw-semibold ${activeTab === 'history' ? 'btn-primary' : 'btn-light text-muted'}`}
            onClick={() => setActiveTab('history')}
          >
            <i className="fas fa-history me-2"></i> Booking History ({pastBookings.length})
          </button>
          <button
            className={`btn rounded-pill px-4 py-2 fw-semibold ${activeTab === 'vehicles' ? 'btn-primary' : 'btn-light text-muted'}`}
            onClick={() => setActiveTab('vehicles')}
          >
            <i className="fas fa-car me-2"></i> My Vehicles ({vehicles.length})
          </button>
          <button
            className={`btn rounded-pill px-4 py-2 fw-semibold ${activeTab === 'disputes' ? 'btn-primary' : 'btn-light text-muted'}`}
            onClick={() => setActiveTab('disputes')}
          >
            <i className="fas fa-shield-alt me-2"></i> Support & Disputes ({disputes.length})
          </button>
        </div>

        {/* Tab 1: Active & Upcoming Bookings */}
        {activeTab === 'bookings' && (
          <div>
            {loading ? (
              <div className="text-center py-5"><div className="spinner-border text-primary"></div></div>
            ) : activeBookings.length > 0 ? (
              <div className="row g-4">
                {activeBookings.map(b => {
                  const space = b.parkingId || {};
                  const navUrl = space.latitude && space.longitude
                    ? `https://www.google.com/maps/dir/?api=1&destination=${space.latitude},${space.longitude}`
                    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(space.address || "Parking")}`;

                  return (
                    <div key={b._id} className="col-lg-6">
                      <div className="card border-0 shadow-sm rounded-4 overflow-hidden bg-white h-100">
                        <div className="bg-primary bg-opacity-10 p-3 px-4 d-flex justify-content-between align-items-center">
                          <div>
                            <span className="fw-bold text-primary">{b.bookingId}</span>
                            <span className="text-muted small ms-2">
                              {b.vehicleType} • {b.vehicleNumber}
                            </span>
                          </div>
                          <span className={`badge rounded-pill px-3 py-2 ${
                            b.bookingStatus === 'ACTIVE' ? 'bg-info text-dark' : 'bg-success'
                          }`}>
                            {b.bookingStatus === 'ACTIVE' ? 'Currently Parked' : 'Confirmed'}
                          </span>
                        </div>

                        <div className="card-body p-4">
                          <h5 className="fw-bold text-dark mb-1">{space.title || "Parking Space"}</h5>
                          <p className="text-muted small mb-3">
                            <i className="fas fa-map-marker-alt text-danger me-1"></i> {space.address}
                          </p>

                          <div className="row g-2 mb-3 bg-light p-3 rounded-3">
                            <div className="col-6">
                              <span className="text-muted small d-block">Scheduled Entry</span>
                              <span className="fw-bold text-dark small">
                                {new Date(b.startTime).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}
                              </span>
                            </div>
                            <div className="col-6">
                              <span className="text-muted small d-block">Scheduled Exit</span>
                              <span className="fw-bold text-dark small">
                                {new Date(b.endTime).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}
                              </span>
                            </div>
                          </div>

                          <div className="d-flex flex-wrap gap-2 justify-content-between align-items-center pt-2">
                            <div className="d-flex gap-2">
                              <Link to={`/booking-confirmation/${b.bookingId || b._id}`} className="btn btn-sm btn-outline-primary rounded-pill px-3">
                                <i className="fas fa-qrcode me-1"></i> Pass
                              </Link>
                              <a href={navUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-outline-secondary rounded-pill px-3">
                                <i className="fas fa-location-arrow me-1"></i> GPS
                              </a>
                            </div>

                            <div className="d-flex gap-2">
                              {b.bookingStatus === 'CONFIRMED' && (
                                <>
                                  <button
                                    className="btn btn-sm btn-outline-danger rounded-pill px-3"
                                    onClick={() => handleCancel(b._id)}
                                    disabled={actionLoading}
                                  >
                                    Cancel
                                  </button>
                                  <button
                                    className="btn btn-sm btn-success rounded-pill px-3 fw-bold"
                                    onClick={() => handleCheckIn(b._id)}
                                    disabled={actionLoading}
                                  >
                                    Check In
                                  </button>
                                </>
                              )}

                              {b.bookingStatus === 'ACTIVE' && (
                                <button
                                  className="btn btn-sm btn-warning text-dark rounded-pill px-4 fw-bold"
                                  onClick={() => handleCheckout(b._id)}
                                  disabled={actionLoading}
                                >
                                  Checkout
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-5 bg-white rounded-4 p-5">
                <i className="fas fa-ticket-alt fa-3x text-muted mb-3"></i>
                <h5 className="fw-bold text-dark">No Active Parking Passes</h5>
                <p className="text-muted small mb-3">Find and book parking spaces anywhere near your destination.</p>
                <Link to="/view" className="btn btn-primary rounded-pill px-4">Explore Parking</Link>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Booking History */}
        {activeTab === 'history' && (
          <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
            <h5 className="fw-bold text-dark mb-3">Completed & Past Bookings</h5>
            {pastBookings.length > 0 ? (
              <div className="table-responsive">
                <table className="table align-middle">
                  <thead className="table-light">
                    <tr>
                      <th>Booking ID</th>
                      <th>Location</th>
                      <th>Vehicle</th>
                      <th>Times</th>
                      <th>Paid Amount</th>
                      <th>Late Fee</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pastBookings.map(b => (
                      <tr key={b._id}>
                        <td className="fw-bold small">{b.bookingId}</td>
                        <td>{b.parkingId?.title || "Parking Space"}</td>
                        <td>{b.vehicleNumber} ({b.vehicleType})</td>
                        <td className="small">
                          {new Date(b.startTime).toLocaleDateString()}
                        </td>
                        <td className="fw-bold text-success">₹{b.totalAmount || b.baseAmount}</td>
                        <td>{b.lateFee > 0 ? <span className="badge bg-danger">₹{b.lateFee}</span> : "₹0"}</td>
                        <td>
                          <span className={`badge rounded-pill ${b.bookingStatus === 'COMPLETED' ? 'bg-secondary' : 'bg-danger'}`}>
                            {b.bookingStatus}
                          </span>
                        </td>
                        <td>
                          <button
                            className="btn btn-sm btn-outline-warning text-dark rounded-pill px-3"
                            onClick={() => handleOpenDispute(b)}
                          >
                            Dispute
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-muted text-center py-4 mb-0">No past bookings yet.</p>
            )}
          </div>
        )}

        {/* Tab 3: My Vehicles */}
        {activeTab === 'vehicles' && (
          <div className="row g-4">
            <div className="col-lg-5">
              <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
                <h5 className="fw-bold text-dark mb-1">Add New Vehicle</h5>
                <p className="text-muted small mb-3">Save your vehicles for 1-click booking</p>

                <form onSubmit={handleAddVehicle}>
                  <div className="mb-3">
                    <label className="form-label small fw-semibold text-secondary">Vehicle Type</label>
                    <select
                      className="form-select bg-light"
                      value={newVehicleType}
                      onChange={(e) => setNewVehicleType(e.target.value)}
                    >
                      <option value="Car">Car / 4-Wheeler</option>
                      <option value="Bike">Bike / Two-Wheeler</option>
                      <option value="SUV">SUV / Large Vehicle</option>
                      <option value="Scooter">Scooter</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label small fw-semibold text-secondary">License Plate Number</label>
                    <input
                      type="text"
                      className="form-control bg-light text-uppercase"
                      placeholder="e.g. DL01 AB 1234"
                      value={newVehicleNumber}
                      onChange={(e) => setNewVehicleNumber(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="form-label small fw-semibold text-secondary">Model / Make (Optional)</label>
                    <input
                      type="text"
                      className="form-control bg-light"
                      placeholder="e.g. Hyundai Creta"
                      value={newVehicleModel}
                      onChange={(e) => setNewVehicleModel(e.target.value)}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary w-100 py-2 fw-bold rounded-pill"
                    disabled={actionLoading}
                  >
                    Save Vehicle
                  </button>
                </form>
              </div>
            </div>

            <div className="col-lg-7">
              <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
                <h5 className="fw-bold text-dark mb-3">Saved Vehicles</h5>
                {vehicles.length > 0 ? (
                  <div className="d-flex flex-column gap-3">
                    {vehicles.map((v, i) => (
                      <div key={i} className="p-3 border rounded-3 d-flex justify-content-between align-items-center bg-light">
                        <div className="d-flex align-items-center gap-3">
                          <div className="rounded-circle bg-primary bg-opacity-10 text-primary p-3">
                            <i className="fas fa-car fa-lg"></i>
                          </div>
                          <div>
                            <h6 className="fw-bold text-dark mb-0">{v.vehicleNumber}</h6>
                            <span className="text-muted small">{v.vehicleType} {v.model ? `• ${v.model}` : ""}</span>
                          </div>
                        </div>
                        <button
                          className="btn btn-sm btn-outline-danger rounded-pill px-3"
                          onClick={() => handleDeleteVehicle(v._id)}
                        >
                          <i className="fas fa-trash-alt me-1"></i> Remove
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted text-center py-4 mb-0">No vehicles saved yet. Add one from the form.</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Disputes */}
        {activeTab === 'disputes' && (
          <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
            <h5 className="fw-bold text-dark mb-3">Support & Dispute Requests</h5>
            {disputes.length > 0 ? (
              <div className="table-responsive">
                <table className="table align-middle">
                  <thead className="table-light">
                    <tr>
                      <th>Dispute Date</th>
                      <th>Booking Ref</th>
                      <th>Reason / Complaint</th>
                      <th>Status</th>
                      <th>Admin Resolution Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {disputes.map(d => (
                      <tr key={d._id}>
                        <td className="small">{new Date(d.createdAt).toLocaleDateString()}</td>
                        <td className="fw-bold small">{d.bookingId?.bookingId || "Booking"}</td>
                        <td>{d.reason}</td>
                        <td>
                          <span className={`badge rounded-pill ${
                            d.status === 'RESOLVED' ? 'bg-success' :
                            d.status === 'REJECTED' ? 'bg-danger' : 'bg-warning text-dark'
                          }`}>
                            {d.status}
                          </span>
                        </td>
                        <td className="small text-muted">{d.adminNotes || "Under review by support team"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-muted text-center py-4 mb-0">No disputes filed.</p>
            )}
          </div>
        )}
      </div>

      {/* Dispute Filing Modal */}
      {showDisputeModal && (
        <div className="modal show d-block" style={{ backgroundColor: "rgba(0,0,0,0.6)" }} tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content rounded-4 border-0 shadow-lg p-3">
              <div className="modal-header border-0 pb-0">
                <h5 className="modal-title fw-bold text-dark">
                  <i className="fas fa-shield-alt text-warning me-2"></i>
                  File Booking Dispute / Complaint
                </h5>
                <button type="button" className="btn-close" onClick={() => setShowDisputeModal(false)}></button>
              </div>
              <form onSubmit={handleSubmitDispute}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label small fw-semibold text-secondary">Explain the issue</label>
                    <textarea
                      className="form-control bg-light"
                      rows="4"
                      placeholder="e.g. Slot was occupied by another vehicle, or owner charged extra money..."
                      value={disputeReason}
                      onChange={(e) => setDisputeReason(e.target.value)}
                      required
                    ></textarea>
                  </div>

                  <div className="mb-3">
                    <label className="form-label small fw-semibold text-secondary">Evidence Photo (Optional)</label>
                    <input
                      type="file"
                      className="form-control bg-light"
                      accept="image/*"
                      onChange={(e) => setDisputeFile(e.target.files[0])}
                    />
                  </div>
                </div>
                <div className="modal-footer border-0 pt-0">
                  <button type="button" className="btn btn-light rounded-pill px-4" onClick={() => setShowDisputeModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-danger rounded-pill px-4 fw-bold" disabled={actionLoading}>
                    {actionLoading ? <span className="spinner-border spinner-border-sm me-1"></span> : null}
                    Submit Dispute
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
