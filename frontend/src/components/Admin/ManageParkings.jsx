import React, { useEffect, useState } from "react";
import Apiservices from "../../../Apiservices";
import { toast, Zoom } from "react-toastify";

const ManageParkings = () => {
  const [parkings, setParkings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("");
  const [search, setSearch] = useState("");
  const [actionLoading, setActionLoading] = useState(false);

  // Details Modal
  const [selectedParking, setSelectedParking] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  // Reject Modal
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");

  useEffect(() => {
    fetchParkings();
  }, [filterStatus]);

  const fetchParkings = async () => {
    try {
      setLoading(true);
      const payload = filterStatus ? { approvalStatus: filterStatus } : {};
      const res = await Apiservices.getAdminParkings(payload);
      if (res.data.success) {
        setParkings(res.data.data || []);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to load parking spaces");
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (parkingId, approvalStatus, reason = "") => {
    try {
      setActionLoading(true);
      const res = await Apiservices.verifyAdminParking({
        parkingId,
        approvalStatus,
        rejectionReason: reason
      });

      if (res.data.success) {
        toast.success(`Parking space ${approvalStatus}!`, { transition: Zoom });
        setShowRejectModal(false);
        setShowDetailModal(false);
        setRejectionReason("");
        fetchParkings();
      } else {
        toast.warning(res.data.message);
      }
    } catch (err) {
      toast.error("Failed to update parking space status");
    } finally {
      setActionLoading(false);
    }
  };

  const handleToggleStatus = async (spaceId) => {
    try {
      const res = await Apiservices.toggleSpaceStatus({ _id: spaceId });
      if (res.data.success) {
        toast.success(res.data.message, { transition: Zoom });
        fetchParkings();
      }
    } catch (err) {
      toast.error("Error toggling parking status");
    }
  };

  const filtered = parkings.filter(p => {
    const title = (p.title || "").toLowerCase();
    const city = (p.city || "").toLowerCase();
    const address = (p.address || "").toLowerCase();
    const ownerName = (p.ownerProfileId?.name || "").toLowerCase();
    const q = search.toLowerCase();
    return title.includes(q) || city.includes(q) || address.includes(q) || ownerName.includes(q);
  });

  return (
    <div className="container-fluid bg-light py-5 min-vh-100">
      <div className="container">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
          <div>
            <h2 className="fw-bold text-dark mb-1">
              <i className="fas fa-parking text-primary me-2"></i>
              Parking Spaces Audit & Approval
            </h2>
            <p className="text-muted small mb-0">
              Verify listing accuracy, audit capacity & amenities, and control public visibility
            </p>
          </div>
          <button onClick={fetchParkings} className="btn btn-outline-secondary rounded-pill px-4">
            <i className="fas fa-sync-alt me-1"></i> Refresh
          </button>
        </div>

        {/* Filters */}
        <div className="card border-0 shadow-sm rounded-4 p-3 mb-4 bg-white">
          <div className="row g-3">
            <div className="col-md-7">
              <div className="input-group">
                <span className="input-group-text bg-light border-0">
                  <i className="fas fa-search text-muted"></i>
                </span>
                <input
                  type="text"
                  className="form-control bg-light border-0 py-2"
                  placeholder="Search by space title, address, city, or host..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-5">
              <select
                className="form-select bg-light border-0 py-2"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="">All Approval Statuses</option>
                <option value="PENDING">Pending Review</option>
                <option value="APPROVED">Approved & Live</option>
                <option value="REJECTED">Rejected Listings</option>
                <option value="SUSPENDED">Suspended Listings</option>
              </select>
            </div>
          </div>
        </div>

        {/* Table */}
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status"></div>
            <p className="mt-3 text-muted">Loading parking spaces...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="card border-0 shadow-sm rounded-4 p-5 text-center bg-white">
            <i className="fas fa-parking text-muted fa-3x mb-3"></i>
            <h5 className="fw-bold text-dark">No Parking Spaces Found</h5>
            <p className="text-muted small">No spaces match the search and filter criteria.</p>
          </div>
        ) : (
          <div className="card border-0 shadow-sm rounded-4 overflow-hidden bg-white">
            <div className="table-responsive">
              <table className="table align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th className="ps-4">Parking Facility</th>
                    <th>Host / Location</th>
                    <th>Slots / Type</th>
                    <th>Online State</th>
                    <th>Approval</th>
                    <th className="text-end pe-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((item) => {
                    const status = item.approvalStatus || "PENDING";
                    const isLive = item.Status && status === "APPROVED";

                    return (
                      <tr key={item._id}>
                        <td className="ps-4 py-3">
                          <div className="d-flex align-items-center gap-3">
                            <img
                              src={
                                item.parking_images ||
                                (item.images && item.images[0]) ||
                                "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=150&q=80"
                              }
                              alt={item.title}
                              className="rounded-3 shadow-sm object-fit-cover"
                              style={{ width: 56, height: 56, objectFit: "cover" }}
                            />
                            <div>
                              <h6 className="fw-bold mb-0 text-dark">{item.title}</h6>
                              <small className="text-muted">
                                <i className="fas fa-map-marker-alt me-1 text-danger"></i>
                                {item.city || "Urban Center"}
                              </small>
                            </div>
                          </div>
                        </td>

                        <td>
                          <div>
                            <span className="d-block text-dark small fw-semibold">
                              {item.ownerProfileId?.name || "Host"}
                            </span>
                            <small className="text-muted text-truncate d-block" style={{ maxWidth: "200px" }}>
                              {item.address}
                            </small>
                          </div>
                        </td>

                        <td>
                          <div>
                            <span className="badge bg-light text-dark border px-2 py-1 me-1">
                              {item.availableSlots ?? item.totalSlots} / {item.totalSlots} Slots
                            </span>
                            <small className="d-block text-muted mt-1">{item.parkingType || "Open"} Lot</small>
                          </div>
                        </td>

                        <td>
                          <button
                            className={`btn btn-sm rounded-pill px-3 py-1 fw-semibold ${
                              item.Status ? "btn-success bg-opacity-10 text-success border-0" : "btn-secondary bg-opacity-10 text-secondary border-0"
                            }`}
                            onClick={() => handleToggleStatus(item._id)}
                            title="Click to toggle Host Online switch"
                          >
                            <i className={`fas fa-circle me-1 ${item.Status ? "text-success" : "text-muted"}`} style={{ fontSize: "8px" }}></i>
                            {item.Status ? "Enabled" : "Disabled"}
                          </button>
                        </td>

                        <td>
                          <span
                            className={`badge rounded-pill px-3 py-2 ${
                              status === "APPROVED"
                                ? "bg-success bg-opacity-10 text-success"
                                : status === "REJECTED"
                                ? "bg-danger bg-opacity-10 text-danger"
                                : status === "SUSPENDED"
                                ? "bg-dark text-white"
                                : "bg-warning bg-opacity-10 text-warning"
                            }`}
                          >
                            {status}
                          </span>
                          {status === "REJECTED" && item.rejectionReason && (
                            <small className="d-block text-danger mt-1" style={{ maxWidth: "160px" }}>
                              {item.rejectionReason}
                            </small>
                          )}
                        </td>

                        <td className="text-end pe-4">
                          <div className="btn-group">
                            <button
                              className="btn btn-sm btn-outline-info rounded-pill px-3 me-1"
                              onClick={() => {
                                setSelectedParking(item);
                                setShowDetailModal(true);
                              }}
                            >
                              <i className="fas fa-eye me-1"></i> Inspect
                            </button>

                            {status !== "APPROVED" && (
                              <button
                                className="btn btn-sm btn-success rounded-pill px-3 me-1"
                                onClick={() => handleVerify(item._id, "APPROVED")}
                                disabled={actionLoading}
                              >
                                Approve
                              </button>
                            )}

                            {status !== "REJECTED" && (
                              <button
                                className="btn btn-sm btn-outline-danger rounded-pill px-3 me-1"
                                onClick={() => {
                                  setSelectedParking(item);
                                  setShowRejectModal(true);
                                }}
                                disabled={actionLoading}
                              >
                                Reject
                              </button>
                            )}

                            {status === "APPROVED" && (
                              <button
                                className="btn btn-sm btn-outline-dark rounded-pill px-3"
                                onClick={() => handleVerify(item._id, "SUSPENDED")}
                                disabled={actionLoading}
                              >
                                Suspend
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Detailed Inspection Modal */}
        {showDetailModal && selectedParking && (
          <div className="modal fade show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
            <div className="modal-dialog modal-lg modal-dialog-centered">
              <div className="modal-content border-0 shadow-lg rounded-4 p-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="fw-bold text-dark mb-0">
                    <i className="fas fa-parking text-primary me-2"></i>
                    {selectedParking.title}
                  </h5>
                  <button type="button" className="btn-close" onClick={() => setShowDetailModal(false)}></button>
                </div>

                <div className="row g-3 my-2">
                  <div className="col-md-6">
                    <img
                      src={
                        selectedParking.parking_images ||
                        (selectedParking.images && selectedParking.images[0]) ||
                        "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=600&q=80"
                      }
                      alt="Parking"
                      className="img-fluid rounded-4 shadow-sm w-100"
                      style={{ maxHeight: "240px", objectFit: "cover" }}
                    />

                    {selectedParking.images && selectedParking.images.length > 1 && (
                      <div className="d-flex gap-2 mt-2 overflow-auto">
                        {selectedParking.images.map((img, i) => (
                          <img
                            key={i}
                            src={img}
                            alt="thumb"
                            className="rounded-2 border"
                            style={{ width: 60, height: 45, objectFit: "cover" }}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="col-md-6">
                    <h6 className="fw-bold text-dark mb-1">Space Information</h6>
                    <p className="text-muted small mb-2">{selectedParking.description || "No description provided."}</p>

                    <div className="p-3 bg-light rounded-3 mb-2 small">
                      <div><strong>Address:</strong> {selectedParking.address}</div>
                      <div><strong>City:</strong> {selectedParking.city || "—"}</div>
                      <div><strong>Host:</strong> {selectedParking.ownerProfileId?.name} ({selectedParking.ownerProfileId?.email})</div>
                      <div><strong>GPS Coordinates:</strong> {selectedParking.latitude}, {selectedParking.longitude}</div>
                      <div><strong>Total Capacity:</strong> {selectedParking.totalSlots} slots ({selectedParking.availableSlots} free)</div>
                      <div><strong>Parking Type:</strong> {selectedParking.parkingType}</div>
                    </div>

                    <div className="mb-2">
                      <strong className="small d-block text-secondary mb-1">Supported Vehicles:</strong>
                      <div className="d-flex flex-wrap gap-1">
                        {(selectedParking.supportedVehicles || ['Car']).map((v, i) => (
                          <span key={i} className="badge bg-primary bg-opacity-10 text-primary rounded-pill">{v}</span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <strong className="small d-block text-secondary mb-1">Amenities:</strong>
                      <div className="d-flex flex-wrap gap-1">
                        {(selectedParking.amenities || ['CCTV']).map((a, i) => (
                          <span key={i} className="badge bg-secondary bg-opacity-10 text-secondary rounded-pill">{a}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-light rounded-3 mt-3">
                  <strong className="small text-secondary d-block mb-1">Rules & Policies:</strong>
                  <p className="text-muted small mb-0">{selectedParking.rules || "Standard parking rules apply."}</p>
                </div>

                <div className="d-flex justify-content-end gap-2 mt-4 pt-3 border-top">
                  <button
                    className="btn btn-outline-danger rounded-pill px-4"
                    onClick={() => {
                      setShowDetailModal(false);
                      setShowRejectModal(true);
                    }}
                  >
                    Reject Space
                  </button>
                  <button
                    className="btn btn-success rounded-pill px-4 fw-semibold"
                    onClick={() => handleVerify(selectedParking._id, "APPROVED")}
                  >
                    Approve Space Listing
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Reject Reason Modal */}
        {showRejectModal && selectedParking && (
          <div className="modal fade show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content border-0 shadow-lg rounded-4 p-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="fw-bold text-danger mb-0">
                    <i className="fas fa-times-circle me-2"></i>
                    Reject Parking Space
                  </h5>
                  <button type="button" className="btn-close" onClick={() => setShowRejectModal(false)}></button>
                </div>

                <p className="text-muted small">
                  Provide reason for rejecting <strong>{selectedParking.title}</strong> so the host can rectify the listing.
                </p>

                <textarea
                  className="form-control bg-light py-2 mb-3"
                  rows={4}
                  placeholder="e.g. Unclear photos of entry gate / incorrect address provided."
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  required
                />

                <div className="d-flex justify-content-end gap-2">
                  <button className="btn btn-light rounded-pill px-4" onClick={() => setShowRejectModal(false)}>
                    Cancel
                  </button>
                  <button
                    className="btn btn-danger rounded-pill px-4 fw-semibold"
                    onClick={() => handleVerify(selectedParking._id, "REJECTED", rejectionReason)}
                    disabled={!rejectionReason.trim()}
                  >
                    Confirm Rejection
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageParkings;
