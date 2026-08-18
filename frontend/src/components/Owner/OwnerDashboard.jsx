import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Apiservices from "../../../Apiservices";
import { toast } from "react-toastify";

const OwnerDashboard = () => {
  const [profile, setProfile] = useState(null);
  const [earnings, setEarnings] = useState(null);
  const [spaces, setSpaces] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      const [profRes, earnRes, spacesRes, bookRes] = await Promise.all([
        Apiservices.getOwnerProfile(),
        Apiservices.getOwnerEarningsSummary(),
        Apiservices.getOwnerSpaces(),
        Apiservices.getOwnerBookings()
      ]);

      if (profRes.data.success) setProfile(profRes.data.data);
      if (earnRes.data.success) setEarnings(earnRes.data.data);
      if (spacesRes.data.success) setSpaces(spacesRes.data.data || []);
      if (bookRes.data.success) setBookings(bookRes.data.data || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load owner dashboard");
    } finally {
      setLoading(false);
    }
  };

  const handleCheckIn = async (bookingId) => {
    try {
      const res = await Apiservices.ownerCheckIn({ bookingId });
      if (res.data.success) {
        toast.success(res.data.message);
        fetchDashboard();
      } else {
        toast.warning(res.data.message);
      }
    } catch (err) {
      toast.error("Check-in error");
    }
  };

  const handleCheckout = async (bookingId) => {
    try {
      const res = await Apiservices.ownerCheckout({ bookingId });
      if (res.data.success) {
        toast.success(res.data.message);
        fetchDashboard();
      } else {
        toast.warning(res.data.message);
      }
    } catch (err) {
      toast.error("Checkout error");
    }
  };

  if (loading) {
    return (
      <div className="container py-5 text-center min-vh-100">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-3 text-muted">Loading Owner Portal...</p>
      </div>
    );
  }

  const verStatus = profile?.verificationStatus || "PENDING";
  const activeBookings = bookings.filter(b => b.bookingStatus === 'ACTIVE' || b.bookingStatus === 'CONFIRMED');

  return (
    <div className="container-fluid bg-light py-5 min-vh-100">
      <div className="container">
        {/* Verification Alert Banner */}
        {verStatus !== "APPROVED" && (
          <div className={`alert ${verStatus === 'REJECTED' ? 'alert-danger' : 'alert-warning'} border-0 shadow-sm rounded-4 p-4 mb-4 d-flex justify-content-between align-items-center flex-wrap`}>
            <div>
              <h5 className="fw-bold mb-1">
                <i className={`fas ${verStatus === 'REJECTED' ? 'fa-times-circle' : 'fa-exclamation-triangle'} me-2`}></i>
                Owner Account Status: {verStatus}
              </h5>
              <p className="small mb-0">
                {verStatus === 'REJECTED'
                  ? `Reason: ${profile?.rejectionReason || 'Documents rejected. Please re-upload verified IDs.'}`
                  : "Please upload your ID proof and Address proof for Admin verification to activate your parking listings."}
              </p>
            </div>
            <Link to="/owner/profile" className="btn btn-dark rounded-pill px-4 fw-semibold mt-2 mt-md-0">
              Submit Documents
            </Link>
          </div>
        )}

        {/* Header Title & Actions */}
        <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
          <div>
            <h2 className="fw-bold text-dark mb-1">
              <i className="fas fa-chart-line text-primary me-2"></i>
              Host & Owner Dashboard
            </h2>
            <p className="text-muted small mb-0">Welcome back, {profile?.name || "Host"} • Manage spaces & track revenue</p>
          </div>
          <div className="d-flex gap-2 mt-2 mt-md-0">
            <Link to="/owner/addspace" className="btn btn-primary rounded-pill px-4 fw-semibold shadow-sm">
              <i className="fas fa-plus me-1"></i> Add New Space
            </Link>
            <Link to="/owner/earnings" className="btn btn-outline-success rounded-pill px-4 fw-semibold">
              <i className="fas fa-wallet me-1"></i> Withdrawals
            </Link>
          </div>
        </div>

        {/* Financial & Operational Metric Cards */}
        <div className="row g-3 mb-4">
          <div className="col-lg-3 col-md-6">
            <div className="card border-0 shadow-sm rounded-4 p-3 bg-white">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <span className="text-muted small fw-semibold">Total Revenue (90%)</span>
                <div className="rounded-circle bg-success bg-opacity-10 text-success p-2">
                  <i className="fas fa-rupee-sign fa-lg"></i>
                </div>
              </div>
              <h3 className="fw-bold text-dark mb-0">₹{earnings?.totalEarnings || 0}</h3>
              <span className="text-muted small">Platform gross earnings</span>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <div className="card border-0 shadow-sm rounded-4 p-3 bg-white">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <span className="text-muted small fw-semibold">Today's Earnings</span>
                <div className="rounded-circle bg-primary bg-opacity-10 text-primary p-2">
                  <i className="fas fa-calendar-day fa-lg"></i>
                </div>
              </div>
              <h3 className="fw-bold text-dark mb-0">₹{earnings?.todayEarnings || 0}</h3>
              <span className="text-muted small">Generated today</span>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <div className="card border-0 shadow-sm rounded-4 p-3 bg-white">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <span className="text-muted small fw-semibold">Withdrawable Balance</span>
                <div className="rounded-circle bg-warning bg-opacity-10 text-warning p-2">
                  <i className="fas fa-money-check-alt fa-lg"></i>
                </div>
              </div>
              <h3 className="fw-bold text-dark mb-0">₹{earnings?.withdrawableBalance || 0}</h3>
              <span className="text-muted small">Ready for payout</span>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <div className="card border-0 shadow-sm rounded-4 p-3 bg-white">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <span className="text-muted small fw-semibold">Managed Spaces</span>
                <div className="rounded-circle bg-info bg-opacity-10 text-info p-2">
                  <i className="fas fa-parking fa-lg"></i>
                </div>
              </div>
              <h3 className="fw-bold text-dark mb-0">{spaces.length}</h3>
              <span className="text-muted small">{activeBookings.length} Active Bookings</span>
            </div>
          </div>
        </div>

        {/* Active Bookings Live Gate Monitor */}
        <div className="card border-0 shadow-sm rounded-4 p-4 bg-white mb-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="fw-bold text-dark mb-0">
              <i className="fas fa-shield-alt text-primary me-2"></i>
              Live Gate & Slot Monitor ({activeBookings.length})
            </h5>
            <Link to="/owner/bookings" className="btn btn-sm btn-link text-primary text-decoration-none fw-semibold">
              View All Bookings &rarr;
            </Link>
          </div>

          {activeBookings.length > 0 ? (
            <div className="table-responsive">
              <table className="table align-middle">
                <thead className="table-light">
                  <tr>
                    <th>Pass ID</th>
                    <th>Driver Name / Phone</th>
                    <th>Vehicle</th>
                    <th>Parking Location</th>
                    <th>Slot Window</th>
                    <th>Current Status</th>
                    <th>Gate Action</th>
                  </tr>
                </thead>
                <tbody>
                  {activeBookings.map(b => (
                    <tr key={b._id}>
                      <td className="fw-bold small">{b.bookingId}</td>
                      <td>
                        <div className="fw-semibold text-dark">{b.userId?.name || "Driver"}</div>
                        <div className="small text-muted">{b.userId?.phone || b.userId?.email}</div>
                      </td>
                      <td>
                        <span className="badge bg-light text-dark border">
                          {b.vehicleNumber} ({b.vehicleType})
                        </span>
                      </td>
                      <td className="small">{b.parkingId?.title || "Parking Space"}</td>
                      <td className="small">
                        {new Date(b.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {new Date(b.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </td>
                      <td>
                        <span className={`badge rounded-pill ${b.bookingStatus === 'ACTIVE' ? 'bg-info text-dark' : 'bg-success'}`}>
                          {b.bookingStatus === 'ACTIVE' ? 'Parked' : 'Expected'}
                        </span>
                      </td>
                      <td>
                        {b.bookingStatus === 'CONFIRMED' && (
                          <button
                            className="btn btn-sm btn-success rounded-pill px-3 fw-semibold"
                            onClick={() => handleCheckIn(b._id)}
                          >
                            Allow In
                          </button>
                        )}
                        {b.bookingStatus === 'ACTIVE' && (
                          <button
                            className="btn btn-sm btn-warning text-dark rounded-pill px-3 fw-semibold"
                            onClick={() => handleCheckout(b._id)}
                          >
                            Check Out
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-muted text-center py-4 mb-0">No active vehicles currently parked or expected.</p>
          )}
        </div>

        {/* Quick Links Grid */}
        <div className="row g-3">
          <div className="col-md-3">
            <Link to="/owner/managespace" className="card border-0 shadow-sm rounded-4 p-4 text-decoration-none bg-white text-center h-100 hover-shadow">
              <i className="fas fa-parking fa-2x text-primary mb-2"></i>
              <h6 className="fw-bold text-dark mb-1">Manage Spaces</h6>
              <p className="text-muted small mb-0">Edit photos, total slots, rules & active toggle</p>
            </Link>
          </div>
          <div className="col-md-3">
            <Link to="/owner/managepricing" className="card border-0 shadow-sm rounded-4 p-4 text-decoration-none bg-white text-center h-100 hover-shadow">
              <i className="fas fa-tags fa-2x text-success mb-2"></i>
              <h6 className="fw-bold text-dark mb-1">Rate Cards & Pricing</h6>
              <p className="text-muted small mb-0">Set hourly, daily, and monthly rates</p>
            </Link>
          </div>
          <div className="col-md-3">
            <Link to="/owner/earnings" className="card border-0 shadow-sm rounded-4 p-4 text-decoration-none bg-white text-center h-100 hover-shadow">
              <i className="fas fa-hand-holding-usd fa-2x text-warning mb-2"></i>
              <h6 className="fw-bold text-dark mb-1">Payouts & Withdrawals</h6>
              <p className="text-muted small mb-0">Request bank payouts and view transaction receipts</p>
            </Link>
          </div>
          <div className="col-md-3">
            <Link to="/owner/profile" className="card border-0 shadow-sm rounded-4 p-4 text-decoration-none bg-white text-center h-100 hover-shadow">
              <i className="fas fa-id-card fa-2x text-info mb-2"></i>
              <h6 className="fw-bold text-dark mb-1">Host Verification</h6>
              <p className="text-muted small mb-0">Upload documents and manage bank account</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerDashboard;