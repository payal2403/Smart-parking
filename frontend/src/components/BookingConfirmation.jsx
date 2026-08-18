import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Apiservices from "../../Apiservices";
import { toast, Zoom } from "react-toastify";

const BookingConfirmation = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    fetchBooking();
  }, [id]);

  const fetchBooking = async () => {
    try {
      setLoading(true);
      const res = await Apiservices.getSingleBooking({ _id: id, bookingId: id });
      if (res.data.success && res.data.data) {
        setBooking(res.data.data);
      } else {
        toast.error(res.data.message || "Booking details not found");
      }
    } catch (err) {
      toast.error("Failed to load booking details");
    } finally {
      setLoading(false);
    }
  };

  const handleCheckIn = async () => {
    try {
      setActionLoading(true);
      const res = await Apiservices.checkInBooking({ bookingId: booking._id });
      if (res.data.success) {
        toast.success(res.data.message, { transition: Zoom });
        fetchBooking();
      } else {
        toast.warning(res.data.message);
      }
    } catch (err) {
      toast.error("Check-in error occurred");
    } finally {
      setActionLoading(false);
    }
  };

  const handleCheckout = async () => {
    try {
      setActionLoading(true);
      const res = await Apiservices.checkoutBooking({ bookingId: booking._id });
      if (res.data.success) {
        toast.success(res.data.message, { transition: Zoom });
        fetchBooking();
      } else {
        toast.warning(res.data.message);
      }
    } catch (err) {
      toast.error("Checkout error occurred");
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container py-5 text-center min-vh-100">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-3 text-muted">Retrieving your digital parking pass...</p>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="container py-5 text-center min-vh-100">
        <h3>Booking Pass Not Found</h3>
        <Link to="/user/dashboard" className="btn btn-primary rounded-pill px-4 mt-3">My Bookings</Link>
      </div>
    );
  }

  const space = booking.parkingId || {};
  const navigationUrl = space.latitude && space.longitude
    ? `https://www.google.com/maps/dir/?api=1&destination=${space.latitude},${space.longitude}`
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(space.address || "Parking")}`;

  return (
    <div className="container-fluid bg-light py-5 min-vh-100">
      <div className="container" style={{ maxWidth: "680px" }}>
        {/* Top Success Banner */}
        <div className="text-center mb-4">
          <div className="rounded-circle bg-success bg-opacity-10 text-success mx-auto mb-3 d-flex align-items-center justify-content-center" style={{ width: 72, height: 72 }}>
            <i className="fas fa-check fa-2x"></i>
          </div>
          <h2 className="fw-bold text-dark mb-1">Booking Confirmed!</h2>
          <p className="text-muted small">Present this digital pass at the parking entrance</p>
        </div>

        {/* Digital Parking Pass Card */}
        <div className="card border-0 shadow-lg rounded-4 overflow-hidden bg-white mb-4">
          <div className="bg-primary text-white p-4 d-flex justify-content-between align-items-center">
            <div>
              <span className="badge bg-white text-primary px-3 py-1 rounded-pill fw-bold text-uppercase small mb-2">
                Digital Pass
              </span>
              <h4 className="fw-bold mb-0">{space.title || "Reserved Parking"}</h4>
              <p className="small text-white-50 mb-0">
                <i className="fas fa-map-marker-alt me-1"></i> {space.address}
              </p>
            </div>
            <div className="text-end">
              <div className="small text-white-50">Booking ID</div>
              <div className="fw-bold fs-6">{booking.bookingId}</div>
            </div>
          </div>

          <div className="card-body p-4">
            {/* QR Mockup & Vehicle details */}
            <div className="row g-4 align-items-center mb-4">
              <div className="col-md-5 text-center border-end-md">
                <div className="p-3 bg-light rounded-4 d-inline-block border">
                  {/* Simulated QR Code */}
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${booking.bookingId}`}
                    alt="Booking QR"
                    className="img-fluid rounded-3"
                    style={{ width: 140, height: 140 }}
                  />
                  <div className="small text-muted mt-2 fw-semibold">Scan for Gate Access</div>
                </div>
              </div>

              <div className="col-md-7">
                <div className="mb-3">
                  <span className="text-muted small d-block">Vehicle Assigned</span>
                  <span className="fw-bold text-dark fs-5">{booking.vehicleNumber}</span>
                  <span className="badge bg-light text-secondary border rounded-pill ms-2 px-2">
                    {booking.vehicleType}
                  </span>
                </div>

                <div className="row g-2">
                  <div className="col-6">
                    <span className="text-muted small d-block">Start Time</span>
                    <span className="fw-bold text-dark small">
                      {new Date(booking.startTime).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}
                    </span>
                  </div>
                  <div className="col-6">
                    <span className="text-muted small d-block">End Time</span>
                    <span className="fw-bold text-dark small">
                      {new Date(booking.endTime).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}
                    </span>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-top d-flex justify-content-between align-items-center">
                  <div>
                    <span className="text-muted small d-block">Amount Paid</span>
                    <span className="fw-bold text-success fs-5">₹{booking.totalAmount || booking.baseAmount}</span>
                  </div>
                  <span className={`badge rounded-pill px-3 py-2 ${
                    booking.bookingStatus === 'COMPLETED' ? 'bg-secondary' :
                    booking.bookingStatus === 'ACTIVE' ? 'bg-info text-dark' : 'bg-success'
                  }`}>
                    Status: {booking.bookingStatus}
                  </span>
                </div>
              </div>
            </div>

            {/* Check-In / Out Status Action */}
            <div className="p-3 bg-light rounded-3 d-flex flex-wrap gap-2 justify-content-between align-items-center mb-3">
              <div>
                <span className="fw-bold text-dark small d-block">On-Site Gate Actions:</span>
                <span className="text-muted small">
                  {booking.bookingStatus === 'CONFIRMED' && "Click 'Check In' once you reach the parking slot."}
                  {booking.bookingStatus === 'ACTIVE' && "Currently Parked. Click 'Checkout' upon leaving."}
                  {booking.bookingStatus === 'COMPLETED' && "Booking completed. Thank you for parking with us!"}
                </span>
              </div>
              <div>
                {booking.bookingStatus === 'CONFIRMED' && (
                  <button
                    className="btn btn-primary rounded-pill px-4 fw-bold"
                    onClick={handleCheckIn}
                    disabled={actionLoading}
                  >
                    {actionLoading ? <span className="spinner-border spinner-border-sm me-1"></span> : <i className="fas fa-sign-in-alt me-1"></i>}
                    Check In Now
                  </button>
                )}
                {booking.bookingStatus === 'ACTIVE' && (
                  <button
                    className="btn btn-warning rounded-pill px-4 fw-bold text-dark"
                    onClick={handleCheckout}
                    disabled={actionLoading}
                  >
                    {actionLoading ? <span className="spinner-border spinner-border-sm me-1"></span> : <i className="fas fa-sign-out-alt me-1"></i>}
                    Check Out Now
                  </button>
                )}
              </div>
            </div>

            {/* Navigation and Action Links */}
            <div className="d-flex flex-wrap gap-2 justify-content-center pt-2">
              <a
                href={navigationUrl}
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline-primary rounded-pill px-4 fw-semibold"
              >
                <i className="fas fa-directions me-2"></i> Navigate via Google Maps
              </a>
              <button
                className="btn btn-outline-secondary rounded-pill px-4 fw-semibold"
                onClick={() => window.print()}
              >
                <i className="fas fa-print me-2"></i> Print Pass
              </button>
              <Link to="/user/dashboard" className="btn btn-light rounded-pill px-4 fw-semibold">
                Go to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;
