import React, { useEffect, useState } from "react";
import Apiservices from "../../../Apiservices";
import { toast, Zoom } from "react-toastify";

const ManageBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("");
  const [search, setSearch] = useState("");
  const [actionLoading, setActionLoading] = useState(false);

  // Modals
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showForceCloseModal, setShowForceCloseModal] = useState(false);
  const [forceCloseReason, setForceCloseReason] = useState("");

  useEffect(() => {
    fetchBookings();
  }, [statusFilter]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const payload = statusFilter ? { bookingStatus: statusFilter } : {};
      const res = await Apiservices.getAdminBookings(payload);
      if (res.data.success) {
        setBookings(res.data.data || []);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to load platform bookings");
    } finally {
      setLoading(false);
    }
  };

  const handleForceClose = async () => {
    if (!selectedBooking) return;
    try {
      setActionLoading(true);
      const res = await Apiservices.forceCloseAdminBooking({
        bookingId: selectedBooking._id,
        reason: forceCloseReason || "Force closed by administrator"
      });

      if (res.data.success) {
        toast.success("Booking force-closed successfully", { transition: Zoom });
        setShowForceCloseModal(false);
        setForceCloseReason("");
        fetchBookings();
      } else {
        toast.warning(res.data.message);
      }
    } catch (err) {
      toast.error("Failed to force close booking");
    } finally {
      setActionLoading(false);
    }
  };

  const filtered = bookings.filter((b) => {
    const bId = (b.bookingId || "").toLowerCase();
    const uName = (b.userId?.name || "").toLowerCase();
    const vNum = (b.vehicleNumber || "").toLowerCase();
    const pTitle = (b.parkingId?.title || "").toLowerCase();
    const q = search.toLowerCase();
    return bId.includes(q) || uName.includes(q) || vNum.includes(q) || pTitle.includes(q);
  });

  return (
    <div className="container-fluid bg-light py-5 min-vh-100">
      <div className="container">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
          <div>
            <h2 className="fw-bold text-dark mb-1">
              <i className="fas fa-calendar-check text-info me-2"></i>
              Platform Reservations & Bookings
            </h2>
            <p className="text-muted small mb-0">
              Real-time monitoring of active parking passes, check-ins, check-outs, and terminations
            </p>
          </div>
          <button onClick={fetchBookings} className="btn btn-outline-secondary rounded-pill px-4">
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
                  placeholder="Search by Pass ID, Driver, Vehicle No, or Parking Name..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-5">
              <select
                className="form-select bg-light border-0 py-2"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="">All Reservation Statuses</option>
                <option value="ACTIVE">ACTIVE (In Lot)</option>
                <option value="CONFIRMED">CONFIRMED (Upcoming)</option>
                <option value="COMPLETED">COMPLETED (Checked Out)</option>
                <option value="CANCELLED">CANCELLED</option>
                <option value="FORCE_CLOSED">FORCE_CLOSED</option>
                <option value="PENDING">PENDING Payment</option>
              </select>
            </div>
          </div>
        </div>

        {/* Table */}
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status"></div>
            <p className="mt-3 text-muted">Loading reservations...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="card border-0 shadow-sm rounded-4 p-5 text-center bg-white">
            <i className="fas fa-calendar-times text-muted fa-3x mb-3"></i>
            <h5 className="fw-bold text-dark">No Bookings Found</h5>
            <p className="text-muted small">No reservation records matched your criteria.</p>
          </div>
        ) : (
          <div className="card border-0 shadow-sm rounded-4 overflow-hidden bg-white">
            <div className="table-responsive">
              <table className="table align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th className="ps-4">Pass ID / Parking</th>
                    <th>Driver / Vehicle</th>
                    <th>Time Interval</th>
                    <th>Financials</th>
                    <th>Status</th>
                    <th className="text-end pe-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((b) => {
                    const status = b.bookingStatus || "PENDING";
                    const isPaid = b.paymentStatus === "PAID";

                    return (
                      <tr key={b._id}>
                        <td className="ps-4 py-3">
                          <div>
                            <span className="fw-bold text-primary d-block">{b.bookingId}</span>
                            <small className="text-dark fw-semibold">{b.parkingId?.title || "Parking Facility"}</small>
                            <small className="text-muted d-block">{b.parkingId?.city || "City"}</small>
                          </div>
                        </td>

                        <td>
                          <div>
                            <span className="d-block text-dark small fw-semibold">{b.userId?.name || "Driver"}</span>
                            <span className="badge bg-light text-dark border px-2 py-1">
                              {b.vehicleNumber || "Plate"} ({b.vehicleType || "Car"})
                            </span>
                          </div>
                        </td>

                        <td>
                          <div className="small">
                            <div><strong className="text-secondary">Start:</strong> {new Date(b.startTime).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}</div>
                            <div><strong className="text-secondary">End:</strong> {new Date(b.endTime).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}</div>
                          </div>
                        </td>

                        <td>
                          <div className="small">
                            <span className="fw-bold text-dark">₹{b.totalAmount || b.baseAmount || 0}</span>
                            <span className={`badge ms-2 ${isPaid ? "bg-success bg-opacity-10 text-success" : "bg-warning bg-opacity-10 text-warning"}`}>
                              {b.paymentStatus || "PENDING"}
                            </span>
                            {b.lateFee > 0 && (
                              <small className="d-block text-danger">+₹{b.lateFee} Late Fee</small>
                            )}
                          </div>
                        </td>

                        <td>
                          <span
                            className={`badge rounded-pill px-3 py-2 ${
                              status === "ACTIVE"
                                ? "bg-primary text-white"
                                : status === "COMPLETED"
                                ? "bg-success bg-opacity-10 text-success"
                                : status === "CANCELLED" || status === "FORCE_CLOSED"
                                ? "bg-danger bg-opacity-10 text-danger"
                                : "bg-warning bg-opacity-10 text-warning"
                            }`}
                          >
                            {status}
                          </span>
                        </td>

                        <td className="text-end pe-4">
                          <div className="btn-group">
                            <button
                              className="btn btn-sm btn-outline-info rounded-pill px-3 me-1"
                              onClick={() => {
                                setSelectedBooking(b);
                                setShowDetailModal(true);
                              }}
                            >
                              <i className="fas fa-eye me-1"></i> Details
                            </button>

                            {(status === "ACTIVE" || status === "CONFIRMED") && (
                              <button
                                className="btn btn-sm btn-outline-danger rounded-pill px-3"
                                onClick={() => {
                                  setSelectedBooking(b);
                                  setShowForceCloseModal(true);
                                }}
                              >
                                Force Close
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

        {/* Detail Modal */}
        {showDetailModal && selectedBooking && (
          <div className="modal fade show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content border-0 shadow-lg rounded-4 p-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="fw-bold text-dark mb-0">
                    <i className="fas fa-receipt text-primary me-2"></i>
                    Reservation {selectedBooking.bookingId}
                  </h5>
                  <button type="button" className="btn-close" onClick={() => setShowDetailModal(false)}></button>
                </div>

                <div className="p-3 bg-light rounded-3 small mb-3">
                  <div className="row g-2">
                    <div className="col-6"><strong>Driver:</strong> {selectedBooking.userId?.name}</div>
                    <div className="col-6"><strong>Contact:</strong> {selectedBooking.userId?.phone || selectedBooking.userId?.email}</div>
                    <div className="col-6"><strong>Vehicle:</strong> {selectedBooking.vehicleNumber} ({selectedBooking.vehicleType})</div>
                    <div className="col-6"><strong>Facility:</strong> {selectedBooking.parkingId?.title}</div>
                    <div className="col-6"><strong>Scheduled Start:</strong> {new Date(selectedBooking.startTime).toLocaleString()}</div>
                    <div className="col-6"><strong>Scheduled End:</strong> {new Date(selectedBooking.endTime).toLocaleString()}</div>
                    <div className="col-6"><strong>Actual Check-in:</strong> {selectedBooking.actualCheckInTime ? new Date(selectedBooking.actualCheckInTime).toLocaleString() : "Not checked in"}</div>
                    <div className="col-6"><strong>Actual Checkout:</strong> {selectedBooking.actualCheckOutTime ? new Date(selectedBooking.actualCheckOutTime).toLocaleString() : "Not checked out"}</div>
                  </div>
                </div>

                <div className="border p-3 rounded-3 mb-3 small">
                  <h6 className="fw-bold text-dark mb-2">Financial Accounting</h6>
                  <div className="d-flex justify-content-between py-1 border-bottom">
                    <span>Base Amount:</span>
                    <span>₹{selectedBooking.baseAmount}</span>
                  </div>
                  <div className="d-flex justify-content-between py-1 border-bottom">
                    <span>Late Penalty Fee:</span>
                    <span className="text-danger">₹{selectedBooking.lateFee || 0}</span>
                  </div>
                  <div className="d-flex justify-content-between py-1 border-bottom fw-bold">
                    <span>Gross Total Paid:</span>
                    <span>₹{selectedBooking.totalAmount}</span>
                  </div>
                  <div className="d-flex justify-content-between py-1 text-muted">
                    <span>Platform Commission (10%):</span>
                    <span>₹{selectedBooking.platformCommission}</span>
                  </div>
                  <div className="d-flex justify-content-between py-1 text-muted">
                    <span>Host Net Share (90%):</span>
                    <span>₹{selectedBooking.ownerEarnings}</span>
                  </div>
                </div>

                <div className="text-end">
                  <button className="btn btn-primary rounded-pill px-4" onClick={() => setShowDetailModal(false)}>
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Force Close Modal */}
        {showForceCloseModal && selectedBooking && (
          <div className="modal fade show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content border-0 shadow-lg rounded-4 p-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="fw-bold text-danger mb-0">
                    <i className="fas fa-exclamation-circle me-2"></i>
                    Force Close Reservation
                  </h5>
                  <button type="button" className="btn-close" onClick={() => setShowForceCloseModal(false)}></button>
                </div>

                <p className="text-muted small">
                  Terminating <strong>{selectedBooking.bookingId}</strong> will immediately free up the slot and mark the reservation as FORCE_CLOSED.
                </p>

                <textarea
                  className="form-control bg-light py-2 mb-3"
                  rows={3}
                  placeholder="Reason for administrative termination..."
                  value={forceCloseReason}
                  onChange={(e) => setForceCloseReason(e.target.value)}
                />

                <div className="d-flex justify-content-end gap-2">
                  <button className="btn btn-light rounded-pill px-4" onClick={() => setShowForceCloseModal(false)}>
                    Cancel
                  </button>
                  <button
                    className="btn btn-danger rounded-pill px-4 fw-semibold"
                    onClick={handleForceClose}
                    disabled={actionLoading}
                  >
                    Confirm Termination
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

export default ManageBookings;
