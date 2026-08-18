import React, { useEffect, useState } from "react";
import Apiservices from "../../../Apiservices";
import { toast } from "react-toastify";

const AdminReports = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("all");

  useEffect(() => {
    fetchReports();
  }, [timeRange]);

  const fetchReports = async () => {
    try {
      setLoading(true);
      const res = await Apiservices.getAdminReports({ timeRange });
      if (res.data.success) {
        setStats(res.data.data);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to generate analytics report");
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading && !stats) {
    return (
      <div className="container py-5 text-center min-vh-100">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-3 text-muted">Compiling financial and operational reports...</p>
      </div>
    );
  }

  const completionRate = stats?.totalBookings
    ? Math.round(((stats.completedBookings || 0) / stats.totalBookings) * 100)
    : 0;

  return (
    <div className="container-fluid bg-light py-5 min-vh-100">
      <div className="container">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
          <div>
            <h2 className="fw-bold text-dark mb-1">
              <i className="fas fa-chart-pie text-primary me-2"></i>
              Platform Business & Analytics Reports
            </h2>
            <p className="text-muted small mb-0">
              Aggregated financial statements, capacity metrics, and booking fulfillment rates
            </p>
          </div>

          <div className="d-flex align-items-center gap-2">
            <select
              className="form-select form-select-sm bg-white border shadow-sm rounded-3"
              style={{ width: "160px" }}
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <option value="all">All Time History</option>
              <option value="today">Today</option>
              <option value="this_week">This Week</option>
              <option value="this_month">This Month</option>
            </select>
            <button onClick={handlePrint} className="btn btn-sm btn-outline-dark rounded-3">
              <i className="fas fa-print me-1"></i> Print / PDF
            </button>
          </div>
        </div>

        {/* Financial Summary */}
        <div className="row g-3 mb-4">
          <div className="col-md-3">
            <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
              <span className="text-muted small fw-semibold">Gross Booking Volume</span>
              <h3 className="fw-bold text-dark mt-2 mb-0">₹{stats?.totalRevenue || 0}</h3>
              <small className="text-muted">{stats?.totalBookings || 0} Total Reservations</small>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
              <span className="text-muted small fw-semibold">Platform Commission (10%)</span>
              <h3 className="fw-bold text-primary mt-2 mb-0">₹{stats?.platformCommission || 0}</h3>
              <small className="text-muted">Net Platform Revenue</small>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
              <span className="text-muted small fw-semibold">Host Disbursed Earnings</span>
              <h3 className="fw-bold text-success mt-2 mb-0">₹{stats?.ownerEarnings || 0}</h3>
              <small className="text-muted">90% Partner Share</small>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
              <span className="text-muted small fw-semibold">Late Overtime Penalties</span>
              <h3 className="fw-bold text-danger mt-2 mb-0">₹{stats?.lateFeeCollected || 0}</h3>
              <small className="text-muted">Automated Late Fees</small>
            </div>
          </div>
        </div>

        {/* Detailed Breakdown Grids */}
        <div className="row g-4 mb-4">
          {/* Reservation Fulfillment */}
          <div className="col-lg-6">
            <div className="card border-0 shadow-sm rounded-4 p-4 bg-white h-100">
              <h5 className="fw-bold text-dark mb-3">
                <i className="fas fa-tasks text-info me-2"></i>
                Reservation Fulfillment Performance
              </h5>

              <div className="mb-4">
                <div className="d-flex justify-content-between text-muted small mb-1">
                  <span>Fulfillment Rate ({stats?.completedBookings || 0} completed)</span>
                  <span className="fw-bold text-success">{completionRate}%</span>
                </div>
                <div className="progress" style={{ height: "10px" }}>
                  <div
                    className="progress-bar bg-success"
                    role="progressbar"
                    style={{ width: `${completionRate}%` }}
                  ></div>
                </div>
              </div>

              <div className="p-3 bg-light rounded-3 small d-flex flex-column gap-2">
                <div className="d-flex justify-content-between">
                  <span>Completed (Successfully Parked):</span>
                  <strong className="text-success">{stats?.completedBookings || 0}</strong>
                </div>
                <div className="d-flex justify-content-between">
                  <span>Active Now (In Lot):</span>
                  <strong className="text-primary">{stats?.activeBookings || 0}</strong>
                </div>
                <div className="d-flex justify-content-between">
                  <span>Cancelled (Prior to arrival):</span>
                  <strong className="text-danger">{stats?.cancelledBookings || 0}</strong>
                </div>
                <div className="d-flex justify-content-between border-top pt-2 fw-bold text-dark">
                  <span>Total Volume:</span>
                  <span>{stats?.totalBookings || 0}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Infrastructure & Network Capacity */}
          <div className="col-lg-6">
            <div className="card border-0 shadow-sm rounded-4 p-4 bg-white h-100">
              <h5 className="fw-bold text-dark mb-3">
                <i className="fas fa-network-wired text-primary me-2"></i>
                Inventory & Host Network Capacity
              </h5>

              <div className="row g-3">
                <div className="col-6">
                  <div className="p-3 bg-light rounded-3 text-center">
                    <h4 className="fw-bold text-dark mb-0">{stats?.totalSpaces || 0}</h4>
                    <small className="text-muted">Total Facilities</small>
                  </div>
                </div>
                <div className="col-6">
                  <div className="p-3 bg-light rounded-3 text-center">
                    <h4 className="fw-bold text-success mb-0">{stats?.approvedSpaces || 0}</h4>
                    <small className="text-muted">Approved & Live</small>
                  </div>
                </div>
                <div className="col-6">
                  <div className="p-3 bg-light rounded-3 text-center">
                    <h4 className="fw-bold text-primary mb-0">{stats?.totalOwners || 0}</h4>
                    <small className="text-muted">Registered Hosts</small>
                  </div>
                </div>
                <div className="col-6">
                  <div className="p-3 bg-light rounded-3 text-center">
                    <h4 className="fw-bold text-info mb-0">{stats?.totalUsers || 0}</h4>
                    <small className="text-muted">Registered Drivers</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminReports;
