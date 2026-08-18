import React, { useEffect, useState } from "react";
import Apiservices from "../../../Apiservices";
import { toast, Zoom } from "react-toastify";

const ManageWithdrawals = () => {
  const [withdrawals, setWithdrawals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("");
  const [actionLoading, setActionLoading] = useState(false);

  // Modals
  const [selectedItem, setSelectedItem] = useState(null);
  const [showProcessModal, setShowProcessModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [adminNotes, setAdminNotes] = useState("");
  const [rejectionReason, setRejectionReason] = useState("");

  useEffect(() => {
    fetchWithdrawals();
  }, [statusFilter]);

  const fetchWithdrawals = async () => {
    try {
      setLoading(true);
      const payload = statusFilter ? { status: statusFilter } : {};
      const res = await Apiservices.getAdminWithdrawals(payload);
      if (res.data.success) {
        setWithdrawals(res.data.data || []);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to load withdrawal requests");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (status, notes = "", reason = "") => {
    if (!selectedItem) return;
    try {
      setActionLoading(true);
      const res = await Apiservices.updateAdminWithdrawal({
        withdrawalId: selectedItem._id,
        status,
        adminNotes: notes,
        rejectionReason: reason
      });

      if (res.data.success) {
        toast.success(`Withdrawal marked as ${status}!`, { transition: Zoom });
        setShowProcessModal(false);
        setShowRejectModal(false);
        setAdminNotes("");
        setRejectionReason("");
        fetchWithdrawals();
      } else {
        toast.warning(res.data.message);
      }
    } catch (err) {
      toast.error("Error updating withdrawal request");
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
              <i className="fas fa-hand-holding-usd text-success me-2"></i>
              Host Payouts & Withdrawal Requests
            </h2>
            <p className="text-muted small mb-0">
              Disburse eligible host balances (90% booking earnings) to verified bank accounts
            </p>
          </div>
          <button onClick={fetchWithdrawals} className="btn btn-outline-secondary rounded-pill px-4">
            <i className="fas fa-sync-alt me-1"></i> Refresh
          </button>
        </div>

        {/* Filter */}
        <div className="card border-0 shadow-sm rounded-4 p-3 mb-4 bg-white">
          <div className="row g-3">
            <div className="col-md-6">
              <select
                className="form-select bg-light border-0 py-2"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="">All Withdrawal Statuses</option>
                <option value="PENDING">PENDING (Action Required)</option>
                <option value="PROCESSING">PROCESSING</option>
                <option value="COMPLETED">COMPLETED (Paid Out)</option>
                <option value="REJECTED">REJECTED</option>
              </select>
            </div>
          </div>
        </div>

        {/* Table */}
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status"></div>
            <p className="mt-3 text-muted">Loading withdrawal queue...</p>
          </div>
        ) : withdrawals.length === 0 ? (
          <div className="card border-0 shadow-sm rounded-4 p-5 text-center bg-white">
            <i className="fas fa-money-bill-wave text-muted fa-3x mb-3"></i>
            <h5 className="fw-bold text-dark">No Withdrawal Requests Found</h5>
            <p className="text-muted small">No payout requests match the selected status filter.</p>
          </div>
        ) : (
          <div className="card border-0 shadow-sm rounded-4 overflow-hidden bg-white">
            <div className="table-responsive">
              <table className="table align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th className="ps-4">Host Profile</th>
                    <th>Requested Amount</th>
                    <th>Bank Account Details</th>
                    <th>Requested On</th>
                    <th>Status</th>
                    <th className="text-end pe-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {withdrawals.map((w) => {
                    const host = w.ownerId || {};
                    const bank = w.bankDetails || {};
                    const status = w.status || "PENDING";

                    return (
                      <tr key={w._id}>
                        <td className="ps-4 py-3">
                          <div>
                            <h6 className="fw-bold text-dark mb-0">{host.name || "Host"}</h6>
                            <small className="text-muted">{host.email} • {host.phone}</small>
                          </div>
                        </td>

                        <td>
                          <h5 className="fw-bold text-success mb-0">₹{w.amount}</h5>
                        </td>

                        <td>
                          <div className="small">
                            <div><strong>Holder:</strong> {bank.accountHolder || host.name || "—"}</div>
                            <div><strong>A/C:</strong> {bank.accountNumber || "—"} ({bank.bankName || "Bank"})</div>
                            <div><strong>IFSC:</strong> {bank.ifsc || "—"}</div>
                          </div>
                        </td>

                        <td>
                          <small className="text-muted">
                            {new Date(w.createdAt).toLocaleDateString()}
                          </small>
                        </td>

                        <td>
                          <span
                            className={`badge rounded-pill px-3 py-2 ${
                              status === "COMPLETED"
                                ? "bg-success bg-opacity-10 text-success"
                                : status === "REJECTED"
                                ? "bg-danger bg-opacity-10 text-danger"
                                : "bg-warning bg-opacity-10 text-warning"
                            }`}
                          >
                            {status}
                          </span>
                          {w.adminNotes && (
                            <small className="d-block text-muted mt-1" style={{ maxWidth: "160px" }}>
                              Ref: {w.adminNotes}
                            </small>
                          )}
                          {w.rejectionReason && (
                            <small className="d-block text-danger mt-1" style={{ maxWidth: "160px" }}>
                              {w.rejectionReason}
                            </small>
                          )}
                        </td>

                        <td className="text-end pe-4">
                          {status === "PENDING" && (
                            <div className="btn-group">
                              <button
                                className="btn btn-sm btn-success rounded-pill px-3 me-1"
                                onClick={() => {
                                  setSelectedItem(w);
                                  setShowProcessModal(true);
                                }}
                              >
                                Complete Payout
                              </button>
                              <button
                                className="btn btn-sm btn-outline-danger rounded-pill px-3"
                                onClick={() => {
                                  setSelectedItem(w);
                                  setShowRejectModal(true);
                                }}
                              >
                                Reject
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Process Payout Modal */}
        {showProcessModal && selectedItem && (
          <div className="modal fade show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content border-0 shadow-lg rounded-4 p-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="fw-bold text-success mb-0">
                    <i className="fas fa-check-circle me-2"></i>
                    Confirm Host Payout
                  </h5>
                  <button type="button" className="btn-close" onClick={() => setShowProcessModal(false)}></button>
                </div>

                <div className="p-3 bg-light rounded-3 mb-3 small">
                  <div><strong>Host:</strong> {selectedItem.ownerId?.name}</div>
                  <div><strong>Disbursement Amount:</strong> ₹{selectedItem.amount}</div>
                  <div><strong>Bank Name:</strong> {selectedItem.bankDetails?.bankName}</div>
                  <div><strong>Account Number:</strong> {selectedItem.bankDetails?.accountNumber}</div>
                  <div><strong>IFSC Code:</strong> {selectedItem.bankDetails?.ifsc}</div>
                </div>

                <label className="form-label small fw-semibold text-secondary">
                  Bank Transfer Reference / UTR / Transaction Note
                </label>
                <input
                  type="text"
                  className="form-control bg-light py-2 mb-3"
                  placeholder="e.g. UTR-9832749234"
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                />

                <div className="d-flex justify-content-end gap-2">
                  <button className="btn btn-light rounded-pill px-4" onClick={() => setShowProcessModal(false)}>
                    Cancel
                  </button>
                  <button
                    className="btn btn-success rounded-pill px-4 fw-semibold"
                    onClick={() => handleUpdateStatus("COMPLETED", adminNotes)}
                    disabled={actionLoading}
                  >
                    Confirm & Complete Payout
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Reject Payout Modal */}
        {showRejectModal && selectedItem && (
          <div className="modal fade show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content border-0 shadow-lg rounded-4 p-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="fw-bold text-danger mb-0">
                    <i className="fas fa-times-circle me-2"></i>
                    Reject Payout Request
                  </h5>
                  <button type="button" className="btn-close" onClick={() => setShowRejectModal(false)}></button>
                </div>

                <p className="text-muted small">
                  Provide reason for rejecting payout request of <strong>₹{selectedItem.amount}</strong> for {selectedItem.ownerId?.name}.
                </p>

                <textarea
                  className="form-control bg-light py-2 mb-3"
                  rows={3}
                  placeholder="e.g. Invalid bank account number or mismatch in account holder name."
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
                    onClick={() => handleUpdateStatus("REJECTED", "", rejectionReason)}
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

export default ManageWithdrawals;
