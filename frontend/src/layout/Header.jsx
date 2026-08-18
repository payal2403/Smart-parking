import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, Zoom } from "react-toastify";

const Header = () => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  const userType = sessionStorage.getItem("userType");
  const userName = sessionStorage.getItem("name") || "Account";

  const handleLogout = () => {
    sessionStorage.clear();
    toast.info("You have been signed out", { transition: Zoom });
    navigate("/login");
  };

  return (
    <>
      {/* Topbar Start */}
      <div className="container-fluid topbar px-0 px-lg-4 bg-light py-2 d-none d-lg-block">
        <div className="container">
          <div className="row gx-0 align-items-center">
            <div className="col-lg-8 text-center text-lg-start mb-lg-0">
              <div className="d-flex flex-wrap">
                <div className="border-end border-primary pe-3">
                  <Link to="/view" className="text-muted small text-decoration-none">
                    <i className="fas fa-map-marker-alt text-primary me-2" />
                    Find Nearby Parking
                  </Link>
                </div>
                <div className="ps-3">
                  <a href="mailto:support@parkease.com" className="text-muted small text-decoration-none">
                    <i className="fas fa-envelope text-primary me-2" />
                    support@parkease.com
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-4 text-center text-lg-end">
              <div className="d-flex justify-content-end align-items-center">
                <div className="d-flex border-end border-primary pe-3">
                  <a className="btn p-0 text-primary me-3" href="#"><i className="fab fa-facebook-f" /></a>
                  <a className="btn p-0 text-primary me-3" href="#"><i className="fab fa-twitter" /></a>
                  <a className="btn p-0 text-primary me-3" href="#"><i className="fab fa-instagram" /></a>
                  <a className="btn p-0 text-primary me-0" href="#"><i className="fab fa-linkedin-in" /></a>
                </div>
                <div className="ms-3">
                  <small className="text-muted">
                    <i className="fas fa-headset text-primary me-1" /> 24/7 Smart Assistance
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Topbar End */}

      {/* Navbar Start */}
      <div className="container-fluid nav-bar px-0 px-lg-4 py-lg-0 bg-white shadow-sm sticky-top">
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light py-2">
            <Link to="/" className="navbar-brand p-0">
              <h2 className="text-primary mb-0 fw-bold">
                <i className="fas fa-parking me-2" /> ParkEase
              </h2>
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarCollapse"
            >
              <span className="fa fa-bars" />
            </button>
            <div className="collapse navbar-collapse" id="navbarCollapse">
              <div className="navbar-nav mx-0 mx-lg-auto">
                <Link to="/" className="nav-item nav-link fw-semibold">
                  Home
                </Link>
                <Link to="/view" className="nav-item nav-link fw-semibold">
                  <i className="fas fa-compass text-primary me-1" /> Find Parking
                </Link>
                <Link to="/about" className="nav-item nav-link fw-semibold">
                  About
                </Link>
                <Link to="/Service" className="nav-item nav-link fw-semibold">
                  Services
                </Link>
                <Link to="/FAQ" className="nav-item nav-link fw-semibold">
                  FAQs
                </Link>
                <Link to="/contact" className="nav-item nav-link fw-semibold">
                  Contact
                </Link>
              </div>

              <div className="d-flex align-items-center gap-2">
                {token ? (
                  <div className="d-flex align-items-center gap-2">
                    {userType === "1" && (
                      <Link to="/admin" className="btn btn-warning rounded-pill px-4 py-2 fw-semibold shadow-sm">
                        <i className="fas fa-shield-alt me-1" /> Admin Center
                      </Link>
                    )}
                    {userType === "2" && (
                      <Link to="/owner" className="btn btn-success rounded-pill px-4 py-2 fw-semibold shadow-sm">
                        <i className="fas fa-store me-1" /> Host Portal
                      </Link>
                    )}
                    {userType === "3" && (
                      <Link to="/user/dashboard" className="btn btn-primary rounded-pill px-4 py-2 fw-semibold shadow-sm">
                        <i className="fas fa-car me-1" /> My Bookings
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="btn btn-outline-danger rounded-pill px-3 py-2 fw-semibold"
                      title="Sign Out"
                    >
                      <i className="fas fa-sign-out-alt" />
                    </button>
                  </div>
                ) : (
                  <div className="d-flex align-items-center gap-2 flex-nowrap">
                    <Link
                      to="/login"
                      className="btn btn-outline-primary rounded-pill px-4 py-2 fw-semibold text-nowrap"
                      style={{ transition: "all 0.2s ease" }}
                    >
                      <i className="fas fa-sign-in-alt me-1"></i> Sign In
                    </Link>
                    <Link
                      to="/register"
                      className="btn btn-primary rounded-pill px-4 py-2 fw-semibold text-nowrap shadow-sm"
                      style={{ transition: "all 0.2s ease" }}
                    >
                      <i className="fas fa-user-plus me-1"></i> Register
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </nav>
        </div>
      </div>
      {/* Navbar End */}
    </>
  );
};

export default Header;