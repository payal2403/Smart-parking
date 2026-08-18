import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Apiservices from "../../Apiservices";
import { toast, Zoom } from "react-toastify";

const ParkingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [parking, setParking] = useState(null);
  const [loading, setLoading] = useState(true);

  // Booking Form State
  const [vehicleType, setVehicleType] = useState("Car");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [calcLoading, setCalcLoading] = useState(false);
  const [priceBreakdown, setPriceBreakdown] = useState(null);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [paymentModal, setPaymentModal] = useState(false);
  const [pendingBooking, setPendingBooking] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("UPI / Card");

  useEffect(() => {
    // Default start time: Now + 10 mins, end time: Now + 2 hours
    const now = new Date();
    now.setMinutes(now.getMinutes() + 10);
    const startStr = now.toISOString().slice(0, 16);
    now.setHours(now.getHours() + 2);
    const endStr = now.toISOString().slice(0, 16);

    setStartTime(startStr);
    setEndTime(endStr);

    fetchDetails();
  }, [id]);

  const fetchDetails = async () => {
    try {
      setLoading(true);
      const res = await Apiservices.getParkingDetails({ _id: id });
      if (res.data.success && res.data.data) {
        setParking(res.data.data);
      } else {
        toast.error("Parking space not found");
      }
    } catch (err) {
      toast.error("Failed to load parking details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (startTime && endTime && parking) {
      calculateLivePrice();
    }
  }, [startTime, endTime, vehicleType, parking]);

  const calculateLivePrice = async () => {
    if (!startTime || !endTime) return;
    try {
      setCalcLoading(true);
      const res = await Apiservices.calculatePrice({
        parkingId: id,
        vehicleType,
        startTime,
        endTime
      });
      if (res.data.success) {
        setPriceBreakdown(res.data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setCalcLoading(false);
    }
  };

  const openRazorpayCheckout = (booking) => {
    const amountInPaise = Math.round((booking.totalAmount || booking.baseAmount || 50) * 100);
    const userName = sessionStorage.getItem("name") || "Driver";
    const userEmail = sessionStorage.getItem("email") || "driver@parkease.com";

    const options = {
      key: "rzp_test_TDKU6vfIJHggqf",
      amount: amountInPaise.toString(),
      currency: "INR",
      name: "ParkEase Smart Parking",
      description: `Parking Pass Reservation #${booking.bookingId || booking._id}`,
      image: "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=150&q=80",
      handler: async function (response) {
        try {
          setBookingLoading(true);
          const paymentRes = await Apiservices.processPayment({
            bookingId: booking._id,
            paymentMethod: "Razorpay Online",
            transactionId: response.razorpay_payment_id || `RZP-${Date.now()}`
          });

          if (paymentRes.data.success) {
            toast.success("Payment Successful! Booking Confirmed 🎉", { transition: Zoom });
            setPaymentModal(false);
            navigate(`/booking-confirmation/${booking.bookingId || booking._id}`);
          } else {
            toast.error(paymentRes.data.message || "Payment verification failed");
          }
        } catch (err) {
          toast.error("Error confirming payment with server");
        } finally {
          setBookingLoading(false);
        }
      },
      prefill: {
        name: userName,
        email: userEmail,
        contact: "9876543210"
      },
      notes: {
        parkingName: parking?.title || "Parking Facility",
        vehicleNumber: vehicleNumber || ""
      },
      theme: {
        color: "#015fc9"
      }
    };

    if (window.Razorpay) {
      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", function (response) {
        toast.error(`Payment failed: ${response.error?.description || "Transaction cancelled"}`);
      });
      rzp.open();
    } else {
      // Fallback to Razorpay UI Modal if SDK script is loading
      setPaymentModal(true);
    }
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem("token");
    if (!token) {
      toast.info("Please login to reserve a parking spot", { transition: Zoom });
      navigate("/login");
      return;
    }

    if (!vehicleNumber.trim()) {
      toast.warning("Please enter your vehicle license plate number");
      return;
    }

    setBookingLoading(true);
    try {
      const res = await Apiservices.createBooking({
        parkingId: id,
        vehicleType,
        vehicleNumber,
        startTime,
        endTime
      });

      if (res.data.success) {
        const createdBooking = res.data.data;
        setPendingBooking(createdBooking);
        openRazorpayCheckout(createdBooking);
      } else {
        toast.error(res.data.message || "Failed to create booking reservation");
      }
    } catch (err) {
      toast.error("Booking error occurred");
    } finally {
      setBookingLoading(false);
    }
  };

  const handleConfirmPayment = async () => {
    if (!pendingBooking) return;
    if (window.Razorpay) {
      openRazorpayCheckout(pendingBooking);
      return;
    }

    try {
      setBookingLoading(true);
      const res = await Apiservices.processPayment({
        bookingId: pendingBooking._id,
        paymentMethod
      });

      if (res.data.success) {
        toast.success("Payment Successful! Booking Confirmed 🎉", { transition: Zoom });
        setPaymentModal(false);
        navigate(`/booking-confirmation/${pendingBooking.bookingId || pendingBooking._id}`);
      } else {
        toast.error(res.data.message || "Payment failed");
      }
    } catch (err) {
      toast.error("Payment processing error");
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container py-5 text-center min-vh-100">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-3 text-muted">Loading parking space details...</p>
      </div>
    );
  }

  if (!parking) {
    return (
      <div className="container py-5 text-center min-vh-100">
        <h3>Parking Space Not Found</h3>
        <Link to="/view" className="btn btn-primary rounded-pill px-4 mt-3">Back to Search</Link>
      </div>
    );
  }

  const mainImage = parking.images && parking.images.length > 0
    ? parking.images[0]
    : "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=1200&q=80";

  return (
    <div className="container-fluid bg-light py-5 min-vh-100">
      <div className="container">
        {/* Navigation breadcrumb */}
        <div className="mb-4">
          <Link to="/view" className="text-decoration-none text-muted small fw-semibold">
            <i className="fas fa-arrow-left me-1"></i> Back to Explore
          </Link>
        </div>

        <div className="row g-5">
          {/* Left Column: Details, Photos, Amenities */}
          <div className="col-lg-7">
            <div className="card border-0 shadow-sm rounded-4 overflow-hidden mb-4 bg-white">
              <img
                src={mainImage}
                alt={parking.title}
                className="w-100"
                style={{ maxHeight: "380px", objectFit: "cover" }}
              />

              {parking.images && parking.images.length > 1 && (
                <div className="d-flex gap-2 p-3 overflow-x-auto bg-light">
                  {parking.images.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt="Thumbnail"
                      className="rounded-3 border"
                      style={{ width: 80, height: 60, objectFit: "cover", cursor: "pointer" }}
                    />
                  ))}
                </div>
              )}

              <div className="card-body p-4">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <h2 className="fw-bold text-dark mb-1">{parking.title}</h2>
                  <span className={`badge rounded-pill px-3 py-2 ${
                    (parking.availableSlots || 0) > 0 ? "bg-success" : "bg-danger"
                  }`}>
                    {(parking.availableSlots || 0) > 0
                      ? `${parking.availableSlots} Slots Available`
                      : "Fully Booked"}
                  </span>
                </div>

                <p className="text-muted fs-6 mb-4">
                  <i className="fas fa-map-marker-alt text-danger me-2"></i>
                  {parking.address} {parking.city ? `, ${parking.city}` : ""}
                </p>

                <hr />

                {/* Key Features / Summary Badges */}
                <div className="row g-3 text-center my-3">
                  <div className="col-4">
                    <div className="p-3 bg-light rounded-3">
                      <i className="fas fa-layer-group text-primary fs-4 mb-2"></i>
                      <div className="small text-muted">Total Slots</div>
                      <div className="fw-bold fs-6">{parking.totalSlots || 10}</div>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="p-3 bg-light rounded-3">
                      <i className="fas fa-clock text-primary fs-4 mb-2"></i>
                      <div className="small text-muted">Open Hours</div>
                      <div className="fw-bold fs-6">24/7 Access</div>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="p-3 bg-light rounded-3">
                      <i className="fas fa-shield-alt text-primary fs-4 mb-2"></i>
                      <div className="small text-muted">Security</div>
                      <div className="fw-bold fs-6">Verified Host</div>
                    </div>
                  </div>
                </div>

                {/* Amenities */}
                <h5 className="fw-bold text-dark mt-4 mb-3">Facility Amenities</h5>
                <div className="d-flex flex-wrap gap-2 mb-4">
                  {parking.amenities && parking.amenities.length > 0 ? (
                    parking.amenities.map((a, i) => (
                      <span key={i} className="badge bg-primary-subtle text-primary border border-primary-subtle rounded-pill px-3 py-2 fs-6">
                        <i className="fas fa-check-circle me-1"></i> {a}
                      </span>
                    ))
                  ) : (
                    <span className="text-muted small">Standard parking amenities available</span>
                  )}
                </div>

                {/* Rules & Guidelines */}
                <h5 className="fw-bold text-dark mt-4 mb-2">Parking Rules & Policy</h5>
                <p className="text-muted small mb-0">
                  {parking.rules || "Please park inside marked slots only. Respect speed limits and display your digital booking pass if requested by security."}
                </p>
                <div className="alert alert-info border-0 rounded-3 mt-3 py-2 px-3 small">
                  <i className="fas fa-info-circle me-2"></i>
                  A <strong>15-minute grace period</strong> is provided free of penalty for check-in and checkout flexibility.
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Reservation & Live Price Calculation Card */}
          <div className="col-lg-5">
            <div className="card border-0 shadow-lg rounded-4 p-4 p-md-5 bg-white position-sticky" style={{ top: "90px" }}>
              <h4 className="fw-bold text-dark mb-1">Reserve Your Spot</h4>
              <p className="text-muted small mb-4">Instant guaranteed reservation with transparent pricing</p>

              <form onSubmit={handleBookingSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-semibold small text-secondary">Vehicle Type</label>
                  <select
                    className="form-select bg-light py-2"
                    value={vehicleType}
                    onChange={(e) => setVehicleType(e.target.value)}
                  >
                    <option value="Car">Car (₹{parking.pricing?.hourlyRate || 40}/hr)</option>
                    <option value="Bike">Bike / Two Wheeler (₹{parking.pricing?.twoWheelerHourlyRate || 20}/hr)</option>
                    <option value="SUV">SUV / Large Vehicle (₹{parking.pricing?.suvHourlyRate || 60}/hr)</option>
                    <option value="Scooter">Scooter (₹{parking.pricing?.twoWheelerHourlyRate || 20}/hr)</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold small text-secondary">Vehicle License Number</label>
                  <input
                    type="text"
                    className="form-control bg-light py-2 text-uppercase"
                    placeholder="e.g. DL01 AB 1234"
                    value={vehicleNumber}
                    onChange={(e) => setVehicleNumber(e.target.value)}
                    required
                  />
                </div>

                <div className="row g-2 mb-3">
                  <div className="col-6">
                    <label className="form-label fw-semibold small text-secondary">Entry Time</label>
                    <input
                      type="datetime-local"
                      className="form-control bg-light py-2 small"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-6">
                    <label className="form-label fw-semibold small text-secondary">Exit Time</label>
                    <input
                      type="datetime-local"
                      className="form-control bg-light py-2 small"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Price Breakdown Preview */}
                <div className="p-3 bg-light rounded-3 my-3">
                  {calcLoading ? (
                    <div className="text-center py-2">
                      <span className="spinner-border spinner-border-sm text-primary"></span>
                      <span className="small text-muted ms-2">Calculating rate...</span>
                    </div>
                  ) : priceBreakdown ? (
                    <div>
                      <div className="d-flex justify-content-between small text-muted mb-1">
                        <span>Duration</span>
                        <span>{priceBreakdown.durationHours} Hours</span>
                      </div>
                      <div className="d-flex justify-content-between small text-muted mb-1">
                        <span>Rate Applied</span>
                        <span>₹{priceBreakdown.hourlyRate} / hr</span>
                      </div>
                      <div className="d-flex justify-content-between small text-muted mb-2">
                        <span>Platform Convenience</span>
                        <span className="text-success">Free</span>
                      </div>
                      <hr className="my-2" />
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="fw-bold text-dark">Total Price:</span>
                        <span className="fs-4 fw-bold text-primary">₹{priceBreakdown.totalAmount}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="text-muted small">Estimated:</span>
                      <span className="fs-5 fw-bold text-primary">₹80</span>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100 py-3 fw-bold rounded-pill shadow-sm mt-2"
                  disabled={bookingLoading || (parking.availableSlots || 0) <= 0}
                >
                  {bookingLoading ? (
                    <span className="spinner-border spinner-border-sm me-2"></span>
                  ) : (
                    <i className="fas fa-ticket-alt me-2"></i>
                  )}
                  {(parking.availableSlots || 0) <= 0 ? "Fully Booked" : "Reserve & Pay Now"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Razorpay Authentic Checkout Modal UI */}
      {paymentModal && pendingBooking && (
        <div
          className="modal show d-block"
          style={{ backgroundColor: "rgba(10, 25, 47, 0.75)", backdropFilter: "blur(4px)", zIndex: 1060 }}
          tabIndex="-1"
        >
          <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: "520px" }}>
            <div className="modal-content border-0 shadow-2xl rounded-4 overflow-hidden" style={{ background: "#ffffff" }}>
              {/* Razorpay Brand Header */}
              <div
                className="p-4 text-white position-relative"
                style={{
                  background: "linear-gradient(135deg, #0c2340 0%, #1a365d 60%, #0284c7 100%)",
                }}
              >
                <button
                  type="button"
                  className="btn-close btn-close-white position-absolute top-0 end-0 m-3"
                  onClick={() => setPaymentModal(false)}
                ></button>

                <div className="d-flex align-items-center gap-3">
                  <div
                    className="bg-white rounded-3 p-2 shadow-sm d-flex align-items-center justify-content-center"
                    style={{ width: 48, height: 48 }}
                  >
                    <i className="fas fa-parking text-primary fs-3"></i>
                  </div>
                  <div>
                    <div className="d-flex align-items-center gap-2">
                      <h5 className="fw-bold mb-0 text-white">ParkEase Parking</h5>
                      <span className="badge bg-primary bg-opacity-75 rounded-pill small" style={{ fontSize: "10px" }}>
                        <i className="fas fa-check-circle me-1"></i> Razorpay Verified
                      </span>
                    </div>
                    <small className="text-white-50">Ref: {pendingBooking.bookingId || pendingBooking._id}</small>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-top border-white border-opacity-10 d-flex justify-content-between align-items-end">
                  <div>
                    <span className="small text-white-50 d-block">Amount Payable</span>
                    <h2 className="fw-bold text-white mb-0">
                      ₹{pendingBooking.totalAmount || pendingBooking.baseAmount}.00
                    </h2>
                  </div>
                  <div className="text-end">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/8/89/Razorpay_logo.svg"
                      alt="Razorpay"
                      style={{ height: "20px", filter: "brightness(0) invert(1)" }}
                    />
                  </div>
                </div>
              </div>

              {/* Razorpay Body & Payment Options */}
              <div className="modal-body p-4">
                <div className="row g-3">
                  {/* Left Column: Method List */}
                  <div className="col-5 border-end pe-3">
                    <div className="nav flex-column nav-pills gap-2" role="tablist">
                      <button
                        className={`nav-link text-start py-2 px-3 rounded-3 small fw-semibold ${
                          paymentMethod.includes("UPI") ? "active bg-primary text-white" : "text-dark bg-light"
                        }`}
                        onClick={() => setPaymentMethod("UPI (GPay / PhonePe / QR)")}
                        type="button"
                      >
                        <i className="fas fa-mobile-alt me-2"></i> UPI / QR
                      </button>

                      <button
                        className={`nav-link text-start py-2 px-3 rounded-3 small fw-semibold ${
                          paymentMethod.includes("Card") ? "active bg-primary text-white" : "text-dark bg-light"
                        }`}
                        onClick={() => setPaymentMethod("Cards (Credit / Debit)")}
                        type="button"
                      >
                        <i className="fas fa-credit-card me-2"></i> Cards
                      </button>

                      <button
                        className={`nav-link text-start py-2 px-3 rounded-3 small fw-semibold ${
                          paymentMethod.includes("Netbanking") ? "active bg-primary text-white" : "text-dark bg-light"
                        }`}
                        onClick={() => setPaymentMethod("Netbanking")}
                        type="button"
                      >
                        <i className="fas fa-university me-2"></i> Netbanking
                      </button>

                      <button
                        className={`nav-link text-start py-2 px-3 rounded-3 small fw-semibold ${
                          paymentMethod.includes("Wallet") ? "active bg-primary text-white" : "text-dark bg-light"
                        }`}
                        onClick={() => setPaymentMethod("Wallets")}
                        type="button"
                      >
                        <i className="fas fa-wallet me-2"></i> Wallets
                      </button>
                    </div>
                  </div>

                  {/* Right Column: Interactive Details */}
                  <div className="col-7 ps-2">
                    {paymentMethod.includes("UPI") && (
                      <div className="text-center">
                        <div className="border rounded-3 p-3 bg-light mb-3">
                          <img
                            src="https://api.qrserver.com/v1/create-qr-code/?size=130x130&data=upi://pay?pa=parkease@razorpay&pn=ParkEase&am=50&cu=INR"
                            alt="Scan QR"
                            className="img-fluid rounded shadow-sm bg-white p-2"
                            style={{ width: "120px", height: "120px" }}
                          />
                          <small className="d-block text-muted mt-2 fw-semibold" style={{ fontSize: "11px" }}>
                            Scan with GPay, PhonePe, Paytm
                          </small>
                        </div>
                        <div className="input-group input-group-sm mb-2">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter UPI ID (e.g. user@okhdfcbank)"
                            defaultValue="user@razorpay"
                          />
                          <button className="btn btn-outline-primary" type="button">Verify</button>
                        </div>
                      </div>
                    )}

                    {paymentMethod.includes("Card") && (
                      <div>
                        <div className="mb-2">
                          <label className="form-label small text-muted mb-1" style={{ fontSize: "11px" }}>Card Number</label>
                          <div className="input-group input-group-sm">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="4111 2222 3333 4444"
                              defaultValue="4111 •••• •••• 4242"
                            />
                            <span className="input-group-text bg-white">
                              <i className="fab fa-cc-visa text-primary"></i>
                            </span>
                          </div>
                        </div>
                        <div className="row g-2 mb-2">
                          <div className="col-6">
                            <label className="form-label small text-muted mb-1" style={{ fontSize: "11px" }}>Expiry</label>
                            <input type="text" className="form-control form-control-sm" placeholder="MM / YY" defaultValue="12/28" />
                          </div>
                          <div className="col-6">
                            <label className="form-label small text-muted mb-1" style={{ fontSize: "11px" }}>CVV</label>
                            <input type="password" className="form-control form-control-sm" placeholder="•••" defaultValue="123" />
                          </div>
                        </div>
                        <div className="form-check small" style={{ fontSize: "11px" }}>
                          <input className="form-check-input" type="checkbox" defaultChecked id="saveCard" />
                          <label className="form-check-label text-muted" htmlFor="saveCard">Save card as per RBI guidelines</label>
                        </div>
                      </div>
                    )}

                    {paymentMethod.includes("Netbanking") && (
                      <div>
                        <small className="text-muted d-block mb-2 fw-semibold" style={{ fontSize: "11px" }}>Popular Banks</small>
                        <div className="row g-2 text-center mb-2">
                          {["HDFC Bank", "ICICI Bank", "SBI", "Axis Bank"].map((bank, idx) => (
                            <div key={idx} className="col-6">
                              <button
                                type="button"
                                className="btn btn-outline-light text-dark border w-100 py-2 small fw-semibold"
                                style={{ fontSize: "11px" }}
                              >
                                <i className="fas fa-university text-primary me-1"></i> {bank}
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {paymentMethod.includes("Wallet") && (
                      <div>
                        <small className="text-muted d-block mb-2 fw-semibold" style={{ fontSize: "11px" }}>Linked Wallets</small>
                        <div className="d-flex flex-column gap-2">
                          {["Amazon Pay", "Mobikwik", "Freecharge"].map((w, idx) => (
                            <div key={idx} className="p-2 border rounded-3 d-flex justify-content-between align-items-center small">
                              <span><i className="fas fa-wallet text-warning me-2"></i>{w}</span>
                              <span className="badge bg-light text-primary border">Link & Pay</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Razorpay Footer & Action Button */}
              <div className="modal-footer bg-light border-top p-3 d-flex justify-content-between align-items-center">
                <div className="small text-muted d-flex align-items-center" style={{ fontSize: "11px" }}>
                  <i className="fas fa-shield-alt text-success me-1"></i>
                  Secured by <strong>Razorpay</strong>
                </div>

                <div className="d-flex gap-2">
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary rounded-pill px-3"
                    onClick={() => setPaymentModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm btn-primary rounded-pill px-4 fw-bold shadow-sm"
                    style={{ background: "#0c2340", borderColor: "#0c2340" }}
                    onClick={handleConfirmPayment}
                    disabled={bookingLoading}
                  >
                    {bookingLoading ? (
                      <span className="spinner-border spinner-border-sm me-1"></span>
                    ) : (
                      <i className="fas fa-lock me-1"></i>
                    )}
                    Pay ₹{pendingBooking.totalAmount || pendingBooking.baseAmount}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ParkingDetails;
