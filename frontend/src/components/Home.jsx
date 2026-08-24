import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const [searchCity, setSearchCity] = useState("");
  const [vehicleType, setVehicleType] = useState("Car");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/view?search=${encodeURIComponent(searchCity)}&vehicleType=${vehicleType}`);
  };

  return (
    <>
      {/* Hero Section */}
      <div className="container-fluid bg-primary py-5 mb-5 hero-header" style={{
        background: "linear-gradient(135deg, #015fc9 0%, #002d62 100%)",
        color: "#fff",
        minHeight: "520px",
        display: "flex",
        alignItems: "center"
      }}>
        <div className="container py-5">
          <div className="row g-5 align-items-center">
            <div className="col-lg-7" data-aos="fade-right" data-aos-duration="1000">
              <span className="badge bg-light text-primary px-3 py-2 rounded-pill mb-3 fw-bold text-uppercase" data-aos="fade-down" data-aos-delay="100">
                <i className="fas fa-parking me-2"></i> Smart Urban Parking Solution
              </span>
              <h1 className="display-4 text-white fw-bold mb-4" data-aos="fade-up" data-aos-delay="200">
                Find, Reserve & Pay For Parking in Seconds
              </h1>
              <p className="lead text-white-50 mb-4 fs-5" data-aos="fade-up" data-aos-delay="300">
                Never stress about finding parking again. Locate verified, real-time available parking spaces near you with GPS navigation and seamless digital payments.
              </p>

              {/* Quick Search Box */}
              <div className="card border-0 shadow-lg p-3 rounded-4 bg-white text-dark" data-aos="zoom-in" data-aos-delay="400">
                <form onSubmit={handleSearch} className="row g-2 align-items-center">
                  <div className="col-md-5">
                    <div className="input-group">
                      <span className="input-group-text bg-light border-0">
                        <i className="fas fa-map-marker-alt text-primary"></i>
                      </span>
                      <input
                        type="text"
                        className="form-control bg-light border-0 py-2"
                        placeholder="Enter City, Area or Landmark"
                        value={searchCity}
                        onChange={(e) => setSearchCity(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="input-group">
                      <span className="input-group-text bg-light border-0">
                        <i className="fas fa-car text-primary"></i>
                      </span>
                      <select
                        className="form-select bg-light border-0 py-2"
                        value={vehicleType}
                        onChange={(e) => setVehicleType(e.target.value)}
                      >
                        <option value="Car">Car</option>
                        <option value="Bike">Bike / Two Wheeler</option>
                        <option value="SUV">SUV / Large</option>
                        <option value="Scooter">Scooter</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <button type="submit" className="btn btn-primary w-100 py-2 fw-bold rounded-3">
                      <i className="fas fa-search me-1"></i> Find Parking
                    </button>
                  </div>
                </form>
              </div>

              <div className="d-flex gap-3 mt-4" data-aos="fade-up" data-aos-delay="500">
                <Link to="/view" className="btn btn-light rounded-pill px-4 py-2 fw-semibold">
                  <i className="fas fa-compass me-2"></i> Explore Nearby
                </Link>
                <Link to="/register" className="btn btn-outline-light rounded-pill px-4 py-2 fw-semibold">
                  <i className="fas fa-store me-2"></i> Rent Out Your Space
                </Link>
              </div>
            </div>

            <div className="col-lg-5 text-center d-none d-lg-block" data-aos="fade-left" data-aos-duration="1000">
              <img
                src="https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=800&q=80"
                alt="Smart Parking"
                className="img-fluid rounded-4 shadow-lg border border-3 border-white"
                style={{ maxHeight: "380px", objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Counter Section */}
      <div className="container-fluid py-4 bg-light">
        <div className="container">
          <div className="row g-4 text-center">
            <div className="col-md-3 col-6" data-aos="fade-up" data-aos-delay="100">
              <div className="p-3 bg-white rounded-3 shadow-sm h-100">
                <h2 className="text-primary fw-bold mb-1">5,000+</h2>
                <p className="text-muted mb-0 small">Verified Parking Slots</p>
              </div>
            </div>
            <div className="col-md-3 col-6" data-aos="fade-up" data-aos-delay="200">
              <div className="p-3 bg-white rounded-3 shadow-sm h-100">
                <h2 className="text-primary fw-bold mb-1">99.9%</h2>
                <p className="text-muted mb-0 small">Guaranteed Reservation</p>
              </div>
            </div>
            <div className="col-md-3 col-6" data-aos="fade-up" data-aos-delay="300">
              <div className="p-3 bg-white rounded-3 shadow-sm h-100">
                <h2 className="text-primary fw-bold mb-1">15 Mins</h2>
                <p className="text-muted mb-0 small">Grace Period Allowed</p>
              </div>
            </div>
            <div className="col-md-3 col-6" data-aos="fade-up" data-aos-delay="400">
              <div className="p-3 bg-white rounded-3 shadow-sm h-100">
                <h2 className="text-primary fw-bold mb-1">24/7</h2>
                <p className="text-muted mb-0 small">Automated Check-in</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="container py-5">
        <div className="text-center mb-5" data-aos="fade-up">
          <span className="badge bg-primary-subtle text-primary px-3 py-2 rounded-pill fw-bold text-uppercase">
            How It Works
          </span>
          <h2 className="fw-bold display-6 mt-2">Park Easily in 4 Simple Steps</h2>
        </div>

        <div className="row g-4 text-center">
          <div className="col-md-3" data-aos="fade-up" data-aos-delay="100">
            <div className="card h-100 p-4 border-0 shadow-sm rounded-4">
              <div className="rounded-circle bg-primary bg-opacity-10 text-primary mx-auto mb-3 d-flex align-items-center justify-content-center" style={{ width: 64, height: 64 }}>
                <i className="fas fa-location-arrow fa-2x"></i>
              </div>
              <h5 className="fw-bold">1. Discover</h5>
              <p className="text-muted small">Enable GPS to find approved parking spaces nearest to your destination.</p>
            </div>
          </div>
          <div className="col-md-3" data-aos="fade-up" data-aos-delay="200">
            <div className="card h-100 p-4 border-0 shadow-sm rounded-4">
              <div className="rounded-circle bg-primary bg-opacity-10 text-primary mx-auto mb-3 d-flex align-items-center justify-content-center" style={{ width: 64, height: 64 }}>
                <i className="fas fa-calendar-check fa-2x"></i>
              </div>
              <h5 className="fw-bold">2. Reserve</h5>
              <p className="text-muted small">Choose your vehicle, select exact date & time, and see transparent pricing.</p>
            </div>
          </div>
          <div className="col-md-3" data-aos="fade-up" data-aos-delay="300">
            <div className="card h-100 p-4 border-0 shadow-sm rounded-4">
              <div className="rounded-circle bg-primary bg-opacity-10 text-primary mx-auto mb-3 d-flex align-items-center justify-content-center" style={{ width: 64, height: 64 }}>
                <i className="fas fa-credit-card fa-2x"></i>
              </div>
              <h5 className="fw-bold">3. Pay & Pass</h5>
              <p className="text-muted small">Complete instant payment and get a guaranteed digital booking pass with navigation.</p>
            </div>
          </div>
          <div className="col-md-3" data-aos="fade-up" data-aos-delay="400">
            <div className="card h-100 p-4 border-0 shadow-sm rounded-4">
              <div className="rounded-circle bg-primary bg-opacity-10 text-primary mx-auto mb-3 d-flex align-items-center justify-content-center" style={{ width: 64, height: 64 }}>
                <i className="fas fa-check-circle fa-2x"></i>
              </div>
              <h5 className="fw-bold">4. Check-in & Park</h5>
              <p className="text-muted small">Reach your assigned slot, check in with one click, and check out hassle-free.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;