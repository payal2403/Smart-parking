import React, { useEffect, useState } from "react";
import Apiservices from "../../../Apiservices";
import { toast, Zoom } from "react-toastify";

const ManageOwners = () => {
  const [owners, setOwners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("");
  const [search, setSearch] = useState("");
  const [actionLoading, setActionLoading] = useState(false);

  // Document modal
  const [selectedOwner, setSelectedOwner] = useState(null);
  const [showDocModal, setShowDocModal] = useState(false);

  // Reject modal
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");

  useEffect(() => {
    fetchOwners();
  }, [filterStatus]);

  const fetchOwners = async () => {
    try {
      setLoading(true);
      const payload = filterStatus ? { verificationStatus: filterStatus } : {};
      const res = await Apiservices.getAdminOwners(payload);
      if (res.data.success) {
        setOwners(res.data.data || []);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to load owner listings");
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (ownerId, verificationStatus, reason = "") => {
    try {
      setActionLoading(true);
      const res = await Apiservices.verifyAdminOwner({
        ownerId,
        verificationStatus,
        rejectionReason: reason
      });

      if (res.data.success) {
        toast.success(`Owner status updated to ${verificationStatus}!`, { transition: Zoom });
        setShowRejectModal(false);
        setShowDocModal(false);
        setRejectionReason("");
        fetchOwners();
      } else {
        toast.warning(res.data.message);
      }
    } catch (err) {
      toast.error("Error updating owner verification status");
    } finally {
      setActionLoading(false);
    }
  };

  const filtered = owners.filter(o => {
    const user = o.userId || {};
    const name = (user.name || "").toLowerCase();
    const email = (user.email || "").toLowerCase();
    const phone = (user.phone || "").toLowerCase();
    const q = search.toLowerCase();
    return name.includes(q) || email.includes(q) || phone.includes(q);
  });

  return (
    <div className="container-fluid bg-light py-5 min-vh-100">
      <div className="container">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
          <div>
            <h2 className="fw-bold text-dark mb-1">
              <i className="fas fa-user-shield text-warning me-2"></i>
              Owner Verification & Management
            </h2>
            <p className="text-muted small mb-0">
              Audit space host credentials, verify government IDs, and approve listings
            </p>
          </div>
          <button onClick={fetchOwners} className="btn btn-outline-secondary rounded-pill px-4">
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
                  placeholder="Search by owner name, email, or contact number..."
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
                <option value="">All Verification Statuses</option>
                <option value="PENDING">Pending Review</option>
                <option value="UNDER_REVIEW">Under Review</option>
                <option value="APPROVED">Approved Hosts</option>
                <option value="REJECTED">Rejected Applications</option>
                <option value="SUSPENDED">Suspended Hosts</option>
              </select>
            </div>
          </div>
        </div>

        {/* Table */}
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status"></div>
            <p className="mt-3 text-muted">Loading host profiles...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="card border-0 shadow-sm rounded-4 p-5 text-center bg-white">
            <i className="fas fa-user-check text-muted fa-3x mb-3"></i>
            <h5 className="fw-bold text-dark">No Space Owners Found</h5>
            <p className="text-muted small">No host profiles match the selected filter criteria.</p>
          </div>
        ) : (
          <div className="card border-0 shadow-sm rounded-4 overflow-hidden bg-white">
            <div className="table-responsive">
              <table className="table align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th className="ps-4">Host Details</th>
                    <th>Contact</th>
                    <th>Documents</th>
                    <th>Bank Details</th>
                    <th>Status</th>
                    <th className="text-end pe-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((item) => {
                    const user = item.userId || {};
                    const status = item.verificationStatus || "PENDING";
                    const hasDocs = item.idProofImage || item.addressProofImage;

                    return (
                      <tr key={item._id}>
                        <td className="ps-4 py-3">
                          <div className="d-flex align-items-center gap-3">
                            <div className="rounded-circle bg-primary bg-opacity-10 text-primary fw-bold d-flex align-items-center justify-center" style={{ width: 44, height: 44, display: "flex", justifyContent: "center" }}>
                              {user.name ? user.name[0].toUpperCase() : "O"}
                            </div>
                            <div>
                              <h6 className="fw-bold mb-0 text-dark">{user.name || "Unnamed Host"}</h6>
                              <small className="text-muted">Registered: {new Date(item.createdAt).toLocaleDateString()}</small>
                            </div>
                          </div>
                        </td>

                        <td>
                          <div>
                            <span className="d-block text-dark small">{user.email || "—"}</span>
                            <small className="text-muted">{user.phone || "No phone provided"}</small>
                          </div>
                        </td>

                        <td>
                          {hasDocs ? (
                            <button
                              className="btn btn-sm btn-outline-info rounded-pill px-3"
                              onClick={() => {
                                setSelectedOwner(item);
                                setShowDocModal(true);
                              }}
                            >
                              <i className="fas fa-file-alt me-1"></i> View IDs
                            </button>
                          ) : (
                            <span className="badge bg-secondary bg-opacity-10 text-secondary rounded-pill px-3 py-2">
                              No Uploads
                            </span>
                          )}
                        </td>

                        <td>
                          {item.bankDetails?.accountNumber ? (
                            <small className="d-block text-muted">
                              <strong>{item.bankDetails.bankName || "Bank"}</strong><br />
                              A/C: ****{item.bankDetails.accountNumber.slice(-4)}
                            </small>
                          ) : (
                            <small className="text-muted">Not added</small>
                          )}
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
                            {status !== "APPROVED" && (
                              <button
                                className="btn btn-sm btn-success rounded-pill px-3 me-1"
                                onClick={() => handleVerify(item._id, "APPROVED")}
                                disabled={actionLoading}
                              >
                                <i className="fas fa-check me-1"></i> Approve
                              </button>
                            )}

                            {status !== "REJECTED" && (
                              <button
                                className="btn btn-sm btn-outline-danger rounded-pill px-3 me-1"
                                onClick={() => {
                                  setSelectedOwner(item);
                                  setShowRejectModal(true);
                                }}
                                disabled={actionLoading}
                              >
                                <i className="fas fa-times me-1"></i> Reject
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

                            {status === "SUSPENDED" && (
                              <button
                                className="btn btn-sm btn-outline-success rounded-pill px-3"
                                onClick={() => handleVerify(item._id, "APPROVED")}
                                disabled={actionLoading}
                              >
                                Reactivate
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

        {/* View Document Modal */}
        {showDocModal && selectedOwner && (
          <div className="modal fade show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
            <div className="modal-dialog modal-lg modal-dialog-centered">
              <div className="modal-content border-0 shadow-lg rounded-4 p-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="fw-bold text-dark mb-0">
                    <i className="fas fa-id-card text-primary me-2"></i>
                    Verification Documents — {selectedOwner.userId?.name}
                  </h5>
                  <button type="button" className="btn-close" onClick={() => setShowDocModal(false)}></button>
                </div>

                <div className="row g-4 my-2">
                  <div className="col-md-6">
                    <h6 className="fw-bold text-secondary mb-2">1. ID Proof (Aadhaar / Passport / License)</h6>
                    {selectedOwner.idProofImage ? (
                      <a href={selectedOwner.idProofImage} target="_blank" rel="noopener noreferrer">
                        <img
                          src={selectedOwner.idProofImage}
                          alt="ID Proof"
                          className="img-fluid rounded-3 border shadow-sm w-100"
                          style={{ maxHeight: "260px", objectFit: "contain", backgroundColor: "#f8f9fa" }}
                        />
                      </a>
                    ) : (
                      <div className="p-4 bg-light rounded-3 text-center text-muted">
                        No ID Proof uploaded yet
                      </div>
                    )}
                  </div>

                  <div className="col-md-6">
                    <h6 className="fw-bold text-secondary mb-2">2. Address Proof / Utility Bill</h6>
                    {selectedOwner.addressProofImage ? (
                      <a href={selectedOwner.addressProofImage} target="_blank" rel="noopener noreferrer">
                        <img
                          src={selectedOwner.addressProofImage}
                          alt="Address Proof"
                          className="img-fluid rounded-3 border shadow-sm w-100"
                          style={{ maxHeight: "260px", objectFit: "contain", backgroundColor: "#f8f9fa" }}
                        />
                      </a>
                    ) : (
                      <div className="p-4 bg-light rounded-3 text-center text-muted">
                        No Address Proof uploaded yet
                      </div>
                    )}
                  </div>
                </div>

                <div className="d-flex justify-content-end gap-2 mt-4 pt-3 border-top">
                  <button
                    className="btn btn-outline-danger rounded-pill px-4"
                    onClick={() => {
                      setShowDocModal(false);
                      setShowRejectModal(true);
                    }}
                  >
                    Reject Application
                  </button>
                  <button
                    className="btn btn-success rounded-pill px-4 fw-semibold"
                    onClick={() => handleVerify(selectedOwner._id, "APPROVED")}
                  >
                    Verify & Approve Owner
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Reject Reason Modal */}
        {showRejectModal && selectedOwner && (
          <div className="modal fade show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content border-0 shadow-lg rounded-4 p-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="fw-bold text-danger mb-0">
                    <i className="fas fa-times-circle me-2"></i>
                    Reject Owner Verification
                  </h5>
                  <button type="button" className="btn-close" onClick={() => setShowRejectModal(false)}></button>
                </div>

                <p className="text-muted small">
                  Please provide a clear reason for rejecting <strong>{selectedOwner.userId?.name}</strong>. This feedback will be displayed to the host so they can re-upload valid documents.
                </p>

                <textarea
                  className="form-control bg-light py-2 mb-3"
                  rows={4}
                  placeholder="e.g. ID proof image is blurred or expired. Please upload a clear copy of your government ID."
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
                    onClick={() => handleVerify(selectedOwner._id, "REJECTED", rejectionReason)}
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

export default ManageOwners;
