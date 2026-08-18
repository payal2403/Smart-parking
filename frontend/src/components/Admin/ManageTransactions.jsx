import React, { useEffect, useState } from "react";
import Apiservices from "../../../Apiservices";
import { toast } from "react-toastify";

const ManageTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [typeFilter, setTypeFilter] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchTransactions();
  }, [typeFilter]);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const payload = typeFilter ? { type: typeFilter } : {};
      const res = await Apiservices.getAdminTransactions(payload);
      if (res.data.success) {
        setTransactions(res.data.data || []);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to load platform transaction ledger");
    } finally {
      setLoading(false);
    }
  };

  const filtered = transactions.filter((t) => {
    const txnId = (t.transactionId || "").toLowerCase();
    const uName = (t.userId?.name || "").toLowerCase();
    const oName = (t.ownerId?.name || "").toLowerCase();
    const q = search.toLowerCase();
    return txnId.includes(q) || uName.includes(q) || oName.includes(q);
  });

  return (
    <div className="container-fluid bg-light py-5 min-vh-100">
      <div className="container">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
          <div>
            <h2 className="fw-bold text-dark mb-1">
              <i className="fas fa-receipt text-success me-2"></i>
              Financial Transactions Ledger
            </h2>
            <p className="text-muted small mb-0">
              Audit booking payments, late fee levies, platform commissions, and payout movements
            </p>
          </div>
          <button onClick={fetchTransactions} className="btn btn-outline-secondary rounded-pill px-4">
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
                  placeholder="Search by Transaction Ref, Driver name, or Host name..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-5">
              <select
                className="form-select bg-light border-0 py-2"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
              >
                <option value="">All Transaction Types</option>
                <option value="BOOKING_PAYMENT">Booking Payments</option>
                <option value="LATE_FEE">Late Penalty Fees</option>
                <option value="REFUND">Refunds</option>
                <option value="WITHDRAWAL">Host Withdrawals</option>
              </select>
            </div>
          </div>
        </div>

        {/* Table */}
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status"></div>
            <p className="mt-3 text-muted">Loading financial ledger...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="card border-0 shadow-sm rounded-4 p-5 text-center bg-white">
            <i className="fas fa-receipt text-muted fa-3x mb-3"></i>
            <h5 className="fw-bold text-dark">No Transactions Found</h5>
            <p className="text-muted small">No transactions matched your search query.</p>
          </div>
        ) : (
          <div className="card border-0 shadow-sm rounded-4 overflow-hidden bg-white">
            <div className="table-responsive">
              <table className="table align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th className="ps-4">Transaction Ref</th>
                    <th>User / Driver</th>
                    <th>Host Profile</th>
                    <th>Gross Amount</th>
                    <th>Platform (10%)</th>
                    <th>Host (90%)</th>
                    <th>Method</th>
                    <th className="text-end pe-4">Timestamp</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((t) => (
                    <tr key={t._id}>
                      <td className="ps-4 py-3">
                        <div>
                          <span className="fw-bold text-dark d-block">{t.transactionId}</span>
                          <span className="badge bg-success bg-opacity-10 text-success rounded-pill px-2">
                            {t.type || "BOOKING_PAYMENT"}
                          </span>
                        </div>
                      </td>

                      <td>
                        <span className="small text-dark fw-semibold d-block">
                          {t.userId?.name || "Driver"}
                        </span>
                        <small className="text-muted">{t.userId?.email || ""}</small>
                      </td>

                      <td>
                        <span className="small text-dark fw-semibold d-block">
                          {t.ownerId?.name || "Host"}
                        </span>
                        <small className="text-muted">{t.ownerId?.email || ""}</small>
                      </td>

                      <td>
                        <strong className="text-dark">₹{t.amount}</strong>
                      </td>

                      <td>
                        <span className="text-primary fw-semibold">₹{t.platformCommission || 0}</span>
                      </td>

                      <td>
                        <span className="text-success fw-semibold">₹{t.ownerEarnings || 0}</span>
                      </td>

                      <td>
                        <span className="badge bg-light text-dark border px-2 py-1">
                          {t.paymentMethod || "Online"}
                        </span>
                      </td>

                      <td className="text-end pe-4">
                        <small className="text-muted d-block">
                          {new Date(t.createdAt).toLocaleDateString()}
                        </small>
                        <small className="text-muted">
                          {new Date(t.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </small>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageTransactions;
