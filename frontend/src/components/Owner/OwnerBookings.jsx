import React, { useEffect, useState } from "react";
import Apiservices from "../../../Apiservices";
import { toast, Zoom } from "react-toastify";

const OwnerBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("");
  const [search, setSearch] = useState("");
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = await Apiservices.getOwnerBookings();
      if (res.data.success) {
        setBookings(res.data.data || []);
      }
    } catch (err) {
      toast.error("Failed to load owner bookings");
    } finally {
      setLoading(false);
    }
  };

  const handleCheckIn = async (bookingId) => {
    try {
      setActionLoading(true);
      const res = await Apiservices.ownerCheckIn({ bookingId });
      if (res.data.success) {
        toast.success(res.data.message, { transition: Zoom });
        fetchBookings();
      } else {
        toast.warning(res.data.message);
      }
    } catch (err) {
      toast.error("Check-in error");
    } finally {
      setActionLoading(false);
    }
  };

  const handleCheckout = async (bookingId) => {
    try {
      setActionLoading(true);
      const res = await Apiservices.ownerCheckout({ bookingId });
      if (res.data.success) {
        toast.success(res.data.message, { transition: Zoom });
        fetchBookings();
      } else {
        toast.warning(res.data.message);
      }
    } catch (err) {
      toast.error("Checkout error");
    } finally {
      setActionLoading(false);
    }
  };

  const filtered = bookings.filter(b => {
    if (statusFilter && b.bookingStatus !== statusFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      const bId = (b.bookingId || "").toLowerCase();
      const vNum = (b.vehicleNumber || "").toLowerCase();
      const uName = (b.userId?.name || "").toLowerCase();
      return bId.includes(q) || vNum.includes(q) || uName.includes(q);
    }
    return true;
  });

  return (
    <div className="container-fluid bg-light py-5 min-vh-100">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
          <div>
            <h2 className="fw-bold text-dark mb-1">
              <i className="fas fa-calendar-alt text-primary me-2"></i>
              Manage Reservations & Gate Log
            </h2>
            <p className="text-muted small mb-0">Total Bookings: {bookings.length}</p>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="card border-0 shadow-sm rounded-4 p-3 mb-4 bg-white">
          <div className="row g-2">
            <div className="col-md-6">
              <input
                type="text"
                className="form-control bg-light border-0 py-2"
                placeholder="Search by Pass ID, Driver Name, or Vehicle No..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <select
                className="form-select bg-light border-0 py-2"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="">All Statuses</option>
                <option value="CONFIRMED">CONFIRMED (Expected)</option>
                <option value="ACTIVE">ACTIVE (Parked Now)</option>
                <option value="COMPLETED">COMPLETED</option>
                <option value="CANCELLED">CANCELLED</option>
              </select>
            </div>
            <div className="col-md-2">
              <button
                className="btn btn-outline-secondary w-100 py-2"
                onClick={() => { setSearch(""); setStatusFilter(""); }}
              >
                Clear
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
          {loading ? (
            <div className="text-center py-5"><div className="spinner-border text-primary"></div></div>
          ) : filtered.length > 0 ? (
            <div className="table-responsive">
              <table className="table align-middle">
                <thead className="table-light">
                  <tr>
                    <th>Pass ID</th>
                    <th>Driver Info</th>
                    <th>Vehicle</th>
                    <th>Parking Space</th>
                    <th>Scheduled Window</th>
                    <th>Earnings (90%)</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(b => (
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
                        {new Date(b.startTime).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}
                        <br />
                        <span className="text-muted">to {new Date(b.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </td>
                      <td className="fw-bold text-success">₹{b.ownerEarnings || Math.round((b.totalAmount || 0) * 0.9)}</td>
                      <td>
                        <span className={`badge rounded-pill ${
                          b.bookingStatus === 'ACTIVE' ? 'bg-info text-dark' :
                          b.bookingStatus === 'CONFIRMED' ? 'bg-success' :
                          b.bookingStatus === 'COMPLETED' ? 'bg-secondary' : 'bg-danger'
                        }`}>
                          {b.bookingStatus}
                        </span>
                      </td>
                      <td>
                        {b.bookingStatus === 'CONFIRMED' && (
                          <button
                            className="btn btn-sm btn-success rounded-pill px-3 fw-semibold"
                            onClick={() => handleCheckIn(b._id)}
                            disabled={actionLoading}
                          >
                            Check In
                          </button>
                        )}
                        {b.bookingStatus === 'ACTIVE' && (
                          <button
                            className="btn btn-sm btn-warning text-dark rounded-pill px-3 fw-semibold"
                            onClick={() => handleCheckout(b._id)}
                            disabled={actionLoading}
                          >
                            Checkout
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-muted text-center py-4 mb-0">No matching bookings found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default OwnerBookings;
