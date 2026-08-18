import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, Zoom } from "react-toastify";

const Ownerheader = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.clear();
    toast.info("Logged out from Host Portal", { transition: Zoom });
    navigate("/login");
  };

  return (
    <>
      <div className="container-fluid topbar px-0 px-lg-4 bg-dark text-white py-2 d-none d-lg-block">
        <div className="container">
          <div className="row gx-0 align-items-center">
            <div className="col-lg-8 text-center text-lg-start">
              <span className="small text-white-50">
                <i className="fas fa-store text-success me-2" />
                Smart Parking Host & Facility Management Portal
              </span>
            </div>
            <div className="col-lg-4 text-center text-lg-end">
              <span className="small text-white-50">
                <i className="fas fa-user-check text-info me-1" /> Host Portal
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid nav-bar px-0 px-lg-4 py-lg-0 bg-white shadow-sm sticky-top">
        <div className="container">
          <nav className="navbar navbar-expand-xl navbar-light py-2">
            <Link to="/owner" className="navbar-brand p-0">
              <h2 className="text-primary mb-0 fw-bold">
                <i className="fas fa-parking me-2" /> ParkEase <span className="text-success small fs-6">Host</span>
              </h2>
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#ownerNavbar"
            >
              <span className="fa fa-bars" />
            </button>
            <div className="collapse navbar-collapse" id="ownerNavbar">
              <div className="navbar-nav mx-auto">
                <Link to="/owner" className="nav-item nav-link fw-semibold">
                  Dashboard
                </Link>

                <Link to="/owner/profile" className="nav-item nav-link fw-semibold">
                  Profile & KYC
                </Link>

                <div className="nav-item dropdown">
                  <span className="nav-link dropdown-toggle fw-semibold" role="button" data-bs-toggle="dropdown">
                    My Spaces
                  </span>
                  <div className="dropdown-menu border-0 shadow rounded-3">
                    <Link to="/owner/addspace" className="dropdown-item py-2">
                      <i className="fas fa-plus-circle text-primary me-2" /> Add New Space
                    </Link>
                    <Link to="/owner/managespace" className="dropdown-item py-2">
                      <i className="fas fa-list text-secondary me-2" /> Manage Spaces
                    </Link>
                  </div>
                </div>

                <div className="nav-item dropdown">
                  <span className="nav-link dropdown-toggle fw-semibold" role="button" data-bs-toggle="dropdown">
                    Slots
                  </span>
                  <div className="dropdown-menu border-0 shadow rounded-3">
                    <Link to="/owner/addslots" className="dropdown-item py-2">
                      <i className="fas fa-plus text-primary me-2" /> Add Slots
                    </Link>
                    <Link to="/owner/manageslots" className="dropdown-item py-2">
                      <i className="fas fa-th text-secondary me-2" /> Manage Slots
                    </Link>
                  </div>
                </div>

                <div className="nav-item dropdown">
                  <span className="nav-link dropdown-toggle fw-semibold" role="button" data-bs-toggle="dropdown">
                    Pricing
                  </span>
                  <div className="dropdown-menu border-0 shadow rounded-3">
                    <Link to="/owner/addprice" className="dropdown-item py-2">
                      <i className="fas fa-tag text-primary me-2" /> Set Rates
                    </Link>
                    <Link to="/owner/manageprice" className="dropdown-item py-2">
                      <i className="fas fa-money-bill text-secondary me-2" /> Manage Rates
                    </Link>
                  </div>
                </div>

                <Link to="/owner/bookings" className="nav-item nav-link fw-semibold">
                  Gate & Bookings
                </Link>

                <Link to="/owner/earnings" className="nav-item nav-link fw-semibold text-success">
                  <i className="fas fa-wallet me-1" /> Earnings
                </Link>
              </div>

              <div className="d-flex align-items-center gap-2">
                <Link to="/" className="btn btn-sm btn-outline-primary rounded-pill px-3">
                  <i className="fas fa-external-link-alt me-1" /> User Site
                </Link>
                <button
                  onClick={handleLogout}
                  className="btn btn-sm btn-danger rounded-pill px-4 fw-semibold shadow-sm"
                >
                  <i className="fas fa-sign-out-alt me-1" /> Logout
                </button>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Ownerheader;