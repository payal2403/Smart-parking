import React, { useEffect, useState } from "react";
import Apiservices from "../../../Apiservices";
import { toast, Zoom } from "react-toastify";

const ManageDisputes = () => {
  const [disputes, setDisputes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("");
  const [actionLoading, setActionLoading] = useState(false);

  // Resolution Modal
  const [selectedDispute, setSelectedDispute] = useState(null);
  const [showResolveModal, setShowResolveModal] = useState(false);
  const [resolutionStatus, setResolutionStatus] = useState("RESOLVED");
  const [adminNotes, setAdminNotes] = useState("");

  useEffect(() => {
    fetchDisputes();
  }, [statusFilter]);

  const fetchDisputes = async () => {
    try {
      setLoading(true);
      const payload = statusFilter ? { status: statusFilter } : {};
      const res = await Apiservices.getAdminDisputes(payload);
      if (res.data.success) {
        setDisputes(res.data.data || []);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to load dispute claims");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async () => {
    if (!selectedDispute) return;
    try {
      setActionLoading(true);
      const res = await Apiservices.updateAdminDispute({
        disputeId: selectedDispute._id,
        status: resolutionStatus,
        adminNotes
      });

      if (res.data.success) {
        toast.success(`Dispute marked as ${resolutionStatus}!`, { transition: Zoom });
        setShowResolveModal(false);
        setAdminNotes("");
        fetchDisputes();
      } else {
        toast.warning(res.data.message);
      }
    } catch (err) {
      toast.error("Failed to update dispute");
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="container-fluid bg-light py-5 min-vh-100">
      <div className="container">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
          <div>
            <h2 className="fw-bold text-dark mb-1">
              <i className="fas fa-gavel text-danger me-2"></i>
              Dispute Claims & Arbitration
            </h2>
            <p className="text-muted small mb-0">
              Investigate driver complaints, review photo evidence, and resolve claims
            </p>
          </div>
          <button onClick={fetchDisputes} className="btn btn-outline-secondary rounded-pill px-4">
            <i className="fas fa-sync-alt me-1"></i> Refresh
          </button>
        </div>

        {/* Filters */}
        <div className="card border-0 shadow-sm rounded-4 p-3 mb-4 bg-white">
          <div className="row g-3">
            <div className="col-md-6">
              <select
                className="form-select bg-light border-0 py-2"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="">All Dispute Statuses</option>
                <option value="OPEN">OPEN (Requires Attention)</option>
                <option value="UNDER_REVIEW">UNDER_REVIEW</option>
                <option value="RESOLVED">RESOLVED</option>
                <option value="REJECTED">REJECTED</option>
              </select>
            </div>
          </div>
        </div>

        {/* Table */}
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status"></div>
            <p className="mt-3 text-muted">Loading dispute records...</p>
          </div>
        ) : disputes.length === 0 ? (
          <div className="card border-0 shadow-sm rounded-4 p-5 text-center bg-white">
            <i className="fas fa-shield-alt text-muted fa-3x mb-3"></i>
            <h5 className="fw-bold text-dark">No Disputes Found</h5>
            <p className="text-muted small">No customer disputes match the current filter.</p>
          </div>
        ) : (
          <div className="card border-0 shadow-sm rounded-4 overflow-hidden bg-white">
            <div className="table-responsive">
              <table className="table align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th className="ps-4">Dispute & Booking</th>
                    <th>Complainant (Driver)</th>
                    <th>Facility & Host</th>
                    <th>Evidence</th>
                    <th>Status</th>
                    <th className="text-end pe-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {disputes.map((d) => {
                    const status = d.status || "OPEN";
                    return (
                      <tr key={d._id}>
                        <td className="ps-4 py-3">
                          <div>
                            <span className="fw-bold text-dark d-block">
                              Pass: {d.bookingId?.bookingId || "—"}
                            </span>
                            <small className="text-danger fw-semibold d-block mt-1" style={{ maxWidth: "220px" }}>
                              "{d.reason}"
                            </small>
                            <small className="text-muted">
                              Filed: {new Date(d.createdAt).toLocaleDateString()}
                            </small>
                          </div>
                        </td>

                        <td>
                          <div>
                            <span className="small text-dark fw-semibold d-block">
                              {d.raisedBy?.name || "Driver"}
                            </span>
                            <small className="text-muted">{d.raisedBy?.email}</small>
                          </div>
                        </td>

                        <td>
                          <div>
                            <span className="small text-dark fw-semibold d-block">
                              {d.parkingId?.title || "Parking Facility"}
                            </span>
                            <small className="text-muted">{d.ownerId?.name || "Host"}</small>
                          </div>
                        </td>

                        <td>
                          {d.evidenceImage ? (
                            <a href={d.evidenceImage} target="_blank" rel="noopener noreferrer">
                              <img
                                src={d.evidenceImage}
                                alt="Evidence"
                                className="rounded-2 border shadow-sm"
                                style={{ width: 50, height: 50, objectFit: "cover" }}
                              />
                            </a>
                          ) : (
                            <span className="text-muted small">None</span>
                          )}
                        </td>

                        <td>
                          <span
                            className={`badge rounded-pill px-3 py-2 ${
                              status === "RESOLVED"
                                ? "bg-success bg-opacity-10 text-success"
                                : status === "REJECTED"
                                ? "bg-secondary bg-opacity-10 text-secondary"
                                : "bg-danger bg-opacity-10 text-danger"
                            }`}
                          >
                            {status}
                          </span>
                          {d.adminNotes && (
                            <small className="d-block text-muted mt-1" style={{ maxWidth: "160px" }}>
                              {d.adminNotes}
                            </small>
                          )}
                        </td>

                        <td className="text-end pe-4">
                          <button
                            className="btn btn-sm btn-outline-primary rounded-pill px-3"
                            onClick={() => {
                              setSelectedDispute(d);
                              setResolutionStatus(d.status === "OPEN" ? "UNDER_REVIEW" : "RESOLVED");
                              setAdminNotes(d.adminNotes || "");
                              setShowResolveModal(true);
                            }}
                          >
                            Arbitrate
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Arbitrate Modal */}
        {showResolveModal && selectedDispute && (
          <div className="modal fade show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content border-0 shadow-lg rounded-4 p-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="fw-bold text-dark mb-0">
                    <i className="fas fa-gavel text-danger me-2"></i>
                    Dispute Arbitration
                  </h5>
                  <button type="button" className="btn-close" onClick={() => setShowResolveModal(false)}></button>
                </div>

                <div className="p-3 bg-light rounded-3 mb-3 small">
                  <div><strong>Booking:</strong> {selectedDispute.bookingId?.bookingId}</div>
                  <div><strong>Complainant:</strong> {selectedDispute.raisedBy?.name}</div>
                  <div><strong>Facility:</strong> {selectedDispute.parkingId?.title}</div>
                  <div><strong>Claim Reason:</strong> {selectedDispute.reason}</div>
                  {selectedDispute.evidenceImage && (
                    <div className="mt-2">
                      <strong>Photo Evidence:</strong>
                      <div className="mt-1">
                        <img
                          src={selectedDispute.evidenceImage}
                          alt="Evidence"
                          className="img-fluid rounded border"
                          style={{ maxHeight: "140px" }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label small fw-semibold text-secondary">Update Status</label>
                  <select
                    className="form-select bg-light py-2"
                    value={resolutionStatus}
                    onChange={(e) => setResolutionStatus(e.target.value)}
                  >
                    <option value="UNDER_REVIEW">Under Review</option>
                    <option value="RESOLVED">Resolved (Issue Addressed / Refund Authorized)</option>
                    <option value="REJECTED">Rejected (Claim Invalid / Unsubstantiated)</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label small fw-semibold text-secondary">
                    Admin Resolution Notes
                  </label>
                  <textarea
                    className="form-control bg-light py-2"
                    rows={3}
                    placeholder="Enter final arbitration verdict or resolution notes..."
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                  />
                </div>

                <div className="d-flex justify-content-end gap-2">
                  <button className="btn btn-light rounded-pill px-4" onClick={() => setShowResolveModal(false)}>
                    Cancel
                  </button>
                  <button
                    className="btn btn-primary rounded-pill px-4 fw-semibold"
                    onClick={handleUpdateStatus}
                    disabled={actionLoading}
                  >
                    Save Arbitration
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

export default ManageDisputes;
