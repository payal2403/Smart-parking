import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Apiservices from "../../../Apiservices";
import { toast } from "react-toastify";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("all");

  useEffect(() => {
    fetchStats();
  }, [timeRange]);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const res = await Apiservices.getAdminStats({ timeRange });
      if (res.data.success) {
        setStats(res.data.data);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to load platform statistics");
    } finally {
      setLoading(false);
    }
  };

  if (loading && !stats) {
    return (
      <div className="container py-5 text-center min-vh-100">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-3 text-muted">Loading Admin Overview...</p>
      </div>
    );
  }

  return (
    <div className="container-fluid bg-light py-5 min-vh-100">
      <div className="container">
        {/* Header Bar */}
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
          <div>
            <h2 className="fw-bold text-dark mb-1">
              <i className="fas fa-chart-line text-primary me-2"></i>
              Platform Administrator Command Center
            </h2>
            <p className="text-muted small mb-0">
              Overview of users, spaces, bookings, financial volume, and pending tasks
            </p>
          </div>

          <div className="d-flex align-items-center gap-2">
            <span className="text-muted small fw-semibold">Filter:</span>
            <select
              className="form-select form-select-sm bg-white border shadow-sm rounded-3"
              style={{ width: "150px" }}
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="this_week">This Week</option>
              <option value="this_month">This Month</option>
            </select>
            <button
              onClick={fetchStats}
              className="btn btn-sm btn-outline-primary rounded-3"
              title="Refresh"
            >
              <i className="fas fa-sync-alt"></i>
            </button>
          </div>
        </div>

        {/* Action Attention Alerts */}
        {((stats?.pendingOwners || 0) > 0 || (stats?.pendingSpaces || 0) > 0 || (stats?.openDisputes || 0) > 0 || (stats?.pendingWithdrawals || 0) > 0) && (
          <div className="row g-3 mb-4">
            {(stats?.pendingOwners || 0) > 0 && (
              <div className="col-md-3">
                <div className="alert alert-warning border-0 shadow-sm rounded-4 p-3 mb-0 d-flex justify-content-between align-items-center">
                  <div>
                    <span className="fw-bold d-block text-dark">
                      <i className="fas fa-user-clock me-1 text-warning"></i> {stats.pendingOwners} Owner Approvals
                    </span>
                    <small className="text-muted">Awaiting ID verification</small>
                  </div>
                  <Link to="/admin/owners" className="btn btn-sm btn-warning rounded-pill px-3 fw-semibold">
                    Review
                  </Link>
                </div>
              </div>
            )}

            {(stats?.pendingSpaces || 0) > 0 && (
              <div className="col-md-3">
                <div className="alert alert-info border-0 shadow-sm rounded-4 p-3 mb-0 d-flex justify-content-between align-items-center">
                  <div>
                    <span className="fw-bold d-block text-dark">
                      <i className="fas fa-parking me-1 text-info"></i> {stats.pendingSpaces} Space Approvals
                    </span>
                    <small className="text-muted">Awaiting space inspection</small>
                  </div>
                  <Link to="/admin/parkings" className="btn btn-sm btn-info text-white rounded-pill px-3 fw-semibold">
                    Review
                  </Link>
                </div>
              </div>
            )}

            {(stats?.pendingWithdrawals || 0) > 0 && (
              <div className="col-md-3">
                <div className="alert alert-success border-0 shadow-sm rounded-4 p-3 mb-0 d-flex justify-content-between align-items-center">
                  <div>
                    <span className="fw-bold d-block text-dark">
                      <i className="fas fa-hand-holding-usd me-1 text-success"></i> {stats.pendingWithdrawals} Payout Requests
                    </span>
                    <small className="text-muted">Owner bank settlements</small>
                  </div>
                  <Link to="/admin/withdrawals" className="btn btn-sm btn-success rounded-pill px-3 fw-semibold">
                    Payout
                  </Link>
                </div>
              </div>
            )}

            {(stats?.openDisputes || 0) > 0 && (
              <div className="col-md-3">
                <div className="alert alert-danger border-0 shadow-sm rounded-4 p-3 mb-0 d-flex justify-content-between align-items-center">
                  <div>
                    <span className="fw-bold d-block text-dark">
                      <i className="fas fa-exclamation-triangle me-1 text-danger"></i> {stats.openDisputes} Open Disputes
                    </span>
                    <small className="text-muted">User claims filed</small>
                  </div>
                  <Link to="/admin/disputes" className="btn btn-sm btn-danger rounded-pill px-3 fw-semibold">
                    Resolve
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Primary Metric KPI Cards */}
        <div className="row g-3 mb-4">
          <div className="col-lg-3 col-md-6">
            <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="text-muted small fw-semibold">Platform Revenue</span>
                <span className="badge bg-success bg-opacity-10 text-success rounded-pill px-3 py-1">
                  Gross
                </span>
              </div>
              <h3 className="fw-bold text-dark mb-1">₹{stats?.totalRevenue || 0}</h3>
              <small className="text-muted">
                Commission: <strong className="text-primary">₹{stats?.platformCommission || 0}</strong> (10%)
              </small>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="text-muted small fw-semibold">Host Earnings Share</span>
                <span className="badge bg-primary bg-opacity-10 text-primary rounded-pill px-3 py-1">
                  90% Net
                </span>
              </div>
              <h3 className="fw-bold text-dark mb-1">₹{stats?.ownerEarnings || 0}</h3>
              <small className="text-muted">
                Late Fees: <strong>₹{stats?.lateFeeCollected || 0}</strong>
              </small>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="text-muted small fw-semibold">Total Reservations</span>
                <span className="badge bg-info bg-opacity-10 text-info rounded-pill px-3 py-1">
                  Bookings
                </span>
              </div>
              <h3 className="fw-bold text-dark mb-1">{stats?.totalBookings || 0}</h3>
              <small className="text-muted">
                <span className="text-success">{stats?.completedBookings || 0} Done</span> • <span className="text-primary">{stats?.activeBookings || 0} Active</span>
              </small>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="text-muted small fw-semibold">Platform Users & Hosts</span>
                <span className="badge bg-secondary bg-opacity-10 text-secondary rounded-pill px-3 py-1">
                  Accounts
                </span>
              </div>
              <h3 className="fw-bold text-dark mb-1">
                {(stats?.totalUsers || 0) + (stats?.totalOwners || 0)}
              </h3>
              <small className="text-muted">
                {stats?.totalUsers || 0} Drivers • {stats?.totalOwners || 0} Hosts
              </small>
            </div>
          </div>
        </div>

        {/* Navigation Quick Access Grid */}
        <h5 className="fw-bold text-dark mb-3">Management Consoles</h5>
        <div className="row g-3 mb-4">
          <div className="col-lg-3 col-md-6">
            <Link to="/admin/owners" className="text-decoration-none">
              <div className="card border-0 shadow-sm rounded-4 p-4 bg-white h-100 hover-card">
                <div className="d-flex align-items-center gap-3">
                  <div className="rounded-circle bg-warning bg-opacity-10 text-warning p-3 d-flex align-items-center justify-content-center" style={{ width: 54, height: 54 }}>
                    <i className="fas fa-id-card fa-lg"></i>
                  </div>
                  <div>
                    <h6 className="fw-bold text-dark mb-1">Owner Verification</h6>
                    <small className="text-muted">Inspect documents & KYC</small>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          <div className="col-lg-3 col-md-6">
            <Link to="/admin/parkings" className="text-decoration-none">
              <div className="card border-0 shadow-sm rounded-4 p-4 bg-white h-100 hover-card">
                <div className="d-flex align-items-center gap-3">
                  <div className="rounded-circle bg-primary bg-opacity-10 text-primary p-3 d-flex align-items-center justify-content-center" style={{ width: 54, height: 54 }}>
                    <i className="fas fa-parking fa-lg"></i>
                  </div>
                  <div>
                    <h6 className="fw-bold text-dark mb-1">Parking Spaces</h6>
                    <small className="text-muted">Approve & audit listings</small>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          <div className="col-lg-3 col-md-6">
            <Link to="/admin/bookings" className="text-decoration-none">
              <div className="card border-0 shadow-sm rounded-4 p-4 bg-white h-100 hover-card">
                <div className="d-flex align-items-center gap-3">
                  <div className="rounded-circle bg-info bg-opacity-10 text-info p-3 d-flex align-items-center justify-content-center" style={{ width: 54, height: 54 }}>
                    <i className="fas fa-calendar-check fa-lg"></i>
                  </div>
                  <div>
                    <h6 className="fw-bold text-dark mb-1">All Bookings</h6>
                    <small className="text-muted">Gate monitor & force close</small>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          <div className="col-lg-3 col-md-6">
            <Link to="/admin/transactions" className="text-decoration-none">
              <div className="card border-0 shadow-sm rounded-4 p-4 bg-white h-100 hover-card">
                <div className="d-flex align-items-center gap-3">
                  <div className="rounded-circle bg-success bg-opacity-10 text-success p-3 d-flex align-items-center justify-content-center" style={{ width: 54, height: 54 }}>
                    <i className="fas fa-receipt fa-lg"></i>
                  </div>
                  <div>
                    <h6 className="fw-bold text-dark mb-1">Financial Ledger</h6>
                    <small className="text-muted">Payments & commission log</small>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          <div className="col-lg-3 col-md-6">
            <Link to="/admin/withdrawals" className="text-decoration-none">
              <div className="card border-0 shadow-sm rounded-4 p-4 bg-white h-100 hover-card">
                <div className="d-flex align-items-center gap-3">
                  <div className="rounded-circle bg-success bg-opacity-10 text-success p-3 d-flex align-items-center justify-content-center" style={{ width: 54, height: 54 }}>
                    <i className="fas fa-money-check-alt fa-lg"></i>
                  </div>
                  <div>
                    <h6 className="fw-bold text-dark mb-1">Owner Payouts</h6>
                    <small className="text-muted">Process withdrawal requests</small>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          <div className="col-lg-3 col-md-6">
            <Link to="/admin/disputes" className="text-decoration-none">
              <div className="card border-0 shadow-sm rounded-4 p-4 bg-white h-100 hover-card">
                <div className="d-flex align-items-center gap-3">
                  <div className="rounded-circle bg-danger bg-opacity-10 text-danger p-3 d-flex align-items-center justify-content-center" style={{ width: 54, height: 54 }}>
                    <i className="fas fa-gavel fa-lg"></i>
                  </div>
                  <div>
                    <h6 className="fw-bold text-dark mb-1">Dispute Claims</h6>
                    <small className="text-muted">Arbitrate customer disputes</small>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          <div className="col-lg-3 col-md-6">
            <Link to="/admin/late-fees" className="text-decoration-none">
              <div className="card border-0 shadow-sm rounded-4 p-4 bg-white h-100 hover-card">
                <div className="d-flex align-items-center gap-3">
                  <div className="rounded-circle bg-secondary bg-opacity-10 text-secondary p-3 d-flex align-items-center justify-content-center" style={{ width: 54, height: 54 }}>
                    <i className="fas fa-hourglass-half fa-lg"></i>
                  </div>
                  <div>
                    <h6 className="fw-bold text-dark mb-1">Late Fee Policy</h6>
                    <small className="text-muted">Grace period & rates</small>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          <div className="col-lg-3 col-md-6">
            <Link to="/admin/reports" className="text-decoration-none">
              <div className="card border-0 shadow-sm rounded-4 p-4 bg-white h-100 hover-card">
                <div className="d-flex align-items-center gap-3">
                  <div className="rounded-circle bg-primary bg-opacity-10 text-primary p-3 d-flex align-items-center justify-content-center" style={{ width: 54, height: 54 }}>
                    <i className="fas fa-file-invoice-dollar fa-lg"></i>
                  </div>
                  <div>
                    <h6 className="fw-bold text-dark mb-1">Analytics & Reports</h6>
                    <small className="text-muted">Periodic performance reports</small>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;