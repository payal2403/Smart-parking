import React, { useEffect, useState } from "react";
import Apiservices from "../../../Apiservices";
import { toast, Zoom } from "react-toastify";

const OwnerEarnings = () => {
  const [summary, setSummary] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    fetchEarnings();
  }, []);

  const fetchEarnings = async () => {
    try {
      setLoading(true);
      const [sumRes, histRes] = await Promise.all([
        Apiservices.getOwnerEarningsSummary(),
        Apiservices.getOwnerWithdrawalHistory()
      ]);

      if (sumRes.data.success) setSummary(sumRes.data.data);
      if (histRes.data.success) setHistory(histRes.data.data || []);
    } catch (err) {
      toast.error("Failed to load earnings data");
    } finally {
      setLoading(false);
    }
  };

  const handleRequestWithdrawal = async (e) => {
    e.preventDefault();
    const amount = Number(withdrawAmount);
    if (!amount || amount <= 0) {
      toast.warning("Please enter a valid withdrawal amount");
      return;
    }

    if (summary && amount > summary.withdrawableBalance) {
      toast.warning(`Maximum withdrawable balance is ₹${summary.withdrawableBalance}`);
      return;
    }

    try {
      setActionLoading(true);
      const res = await Apiservices.requestWithdrawal({ amount });
      if (res.data.success) {
        toast.success("Withdrawal request submitted! Admin will process payment.", { transition: Zoom });
        setShowModal(false);
        setWithdrawAmount("");
        fetchEarnings();
      } else {
        toast.warning(res.data.message);
      }
    } catch (err) {
      toast.error("Withdrawal request failed");
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container py-5 text-center min-vh-100">
        <div className="spinner-border text-primary"></div>
      </div>
    );
  }

  return (
    <div className="container-fluid bg-light py-5 min-vh-100">
      <div className="container">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
          <div>
            <h2 className="fw-bold text-dark mb-1">
              <i className="fas fa-wallet text-success me-2"></i>
              Earnings & Payout Requests
            </h2>
            <p className="text-muted small mb-0">Platform commission: 10% • Host payout share: 90%</p>
          </div>
          <button
            className="btn btn-success rounded-pill px-4 fw-semibold mt-2 mt-md-0 shadow-sm"
            onClick={() => setShowModal(true)}
            disabled={(summary?.withdrawableBalance || 0) <= 0}
          >
            <i className="fas fa-hand-holding-usd me-1"></i> Request Payout
          </button>
        </div>

        {/* Summary Metric Cards */}
        <div className="row g-3 mb-4">
          <div className="col-md-3">
            <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
              <span className="text-muted small fw-semibold">Total Revenue (90%)</span>
              <h3 className="fw-bold text-dark mt-2 mb-0">₹{summary?.totalEarnings || 0}</h3>
              <span className="text-muted small">{summary?.totalBookings || 0} Paid Bookings</span>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
              <span className="text-muted small fw-semibold">Withdrawable Balance</span>
              <h3 className="fw-bold text-success mt-2 mb-0">₹{summary?.withdrawableBalance || 0}</h3>
              <span className="text-muted small">Available for immediate payout</span>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
              <span className="text-muted small fw-semibold">Pending Processing</span>
              <h3 className="fw-bold text-warning mt-2 mb-0">₹{summary?.pendingWithdrawal || 0}</h3>
              <span className="text-muted small">Under admin review</span>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
              <span className="text-muted small fw-semibold">Total Paid Out</span>
              <h3 className="fw-bold text-primary mt-2 mb-0">₹{summary?.totalWithdrawn || 0}</h3>
              <span className="text-muted small">Transferred to bank</span>
            </div>
          </div>
        </div>

        {/* Withdrawal History Table */}
        <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
          <h5 className="fw-bold text-dark mb-3">Payout & Withdrawal History</h5>
          {history.length > 0 ? (
            <div className="table-responsive">
              <table className="table align-middle">
                <thead className="table-light">
                  <tr>
                    <th>Request Date</th>
                    <th>Requested Amount</th>
                    <th>Bank Details</th>
                    <th>Status</th>
                    <th>Notes / Rejection Reason</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map(item => (
                    <tr key={item._id}>
                      <td className="small">{new Date(item.createdAt).toLocaleDateString()}</td>
                      <td className="fw-bold text-dark">₹{item.amount}</td>
                      <td className="small">
                        {item.bankDetails?.bankName ? `${item.bankDetails.bankName} (••${String(item.bankDetails.accountNumber).slice(-4)})` : "Registered Bank"}
                      </td>
                      <td>
                        <span className={`badge rounded-pill ${
                          item.status === 'COMPLETED' ? 'bg-success' :
                          item.status === 'REJECTED' ? 'bg-danger' : 'bg-warning text-dark'
                        }`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="small text-muted">
                        {item.rejectionReason || item.adminNotes || "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-muted text-center py-4 mb-0">No withdrawal requests filed yet.</p>
          )}
        </div>
      </div>

      {/* Payout Request Modal */}
      {showModal && (
        <div className="modal show d-block" style={{ backgroundColor: "rgba(0,0,0,0.6)" }} tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content rounded-4 border-0 shadow-lg p-3">
              <div className="modal-header border-0 pb-0">
                <h5 className="modal-title fw-bold text-dark">
                  <i className="fas fa-hand-holding-usd text-success me-2"></i>
                  Request Bank Payout
                </h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <form onSubmit={handleRequestWithdrawal}>
                <div className="modal-body">
                  <div className="p-3 bg-light rounded-3 mb-3">
                    <span className="text-muted small d-block">Available Withdrawable Balance:</span>
                    <span className="fs-4 fw-bold text-success">₹{summary?.withdrawableBalance || 0}</span>
                  </div>

                  <div className="mb-3">
                    <label className="form-label small fw-semibold text-secondary">Payout Amount (₹)</label>
                    <input
                      type="number"
                      className="form-control bg-light py-2"
                      placeholder="Enter amount to withdraw"
                      min="1"
                      max={summary?.withdrawableBalance || 0}
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(e.target.value)}
                      required
                    />
                  </div>

                  <div className="alert alert-info border-0 rounded-3 small mb-0 py-2">
                    <i className="fas fa-info-circle me-1"></i> Funds will be transferred to your registered bank account upon Admin review.
                  </div>
                </div>

                <div className="modal-footer border-0 pt-0">
                  <button type="button" className="btn btn-light rounded-pill px-4" onClick={() => setShowModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-success rounded-pill px-4 fw-bold" disabled={actionLoading}>
                    {actionLoading ? <span className="spinner-border spinner-border-sm me-1"></span> : null}
                    Confirm Request
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

export default OwnerEarnings;
