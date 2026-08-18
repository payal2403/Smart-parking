import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, Zoom } from "react-toastify";

const AdminHeader = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.clear();
    toast.info("Logged out from Admin Console", { transition: Zoom });
    navigate("/login");
  };

  return (
    <>
      <div className="container-fluid topbar px-0 px-lg-4 bg-dark text-white py-2 d-none d-lg-block">
        <div className="container">
          <div className="row gx-0 align-items-center">
            <div className="col-lg-8 text-center text-lg-start">
              <span className="small text-white-50">
                <i className="fas fa-shield-alt text-warning me-2" />
                Smart Parking Platform Administration Console
              </span>
            </div>
            <div className="col-lg-4 text-center text-lg-end">
              <span className="small text-white-50">
                <i className="fas fa-user-shield text-info me-1" /> Logged in as Administrator
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid nav-bar px-0 px-lg-4 py-lg-0 bg-white shadow-sm sticky-top">
        <div className="container">
          <nav className="navbar navbar-expand-xl navbar-light py-2">
            <Link to="/admin" className="navbar-brand p-0">
              <h2 className="text-primary mb-0 fw-bold">
                <i className="fas fa-parking me-2" /> ParkEase <span className="text-dark small fs-6">Admin</span>
              </h2>
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#adminNavbar"
            >
              <span className="fa fa-bars" />
            </button>
            <div className="collapse navbar-collapse" id="adminNavbar">
              <div className="navbar-nav mx-auto">
                <Link to="/admin" className="nav-item nav-link fw-semibold">
                  Dashboard
                </Link>

                <div className="nav-item dropdown">
                  <span className="nav-link dropdown-toggle fw-semibold" role="button" data-bs-toggle="dropdown">
                    Approvals
                  </span>
                  <div className="dropdown-menu border-0 shadow rounded-3">
                    <Link to="/admin/owners" className="dropdown-item py-2">
                      <i className="fas fa-id-card text-warning me-2" /> Owner Verification
                    </Link>
                    <Link to="/admin/parkings" className="dropdown-item py-2">
                      <i className="fas fa-parking text-primary me-2" /> Parking Spaces
                    </Link>
                  </div>
                </div>

                <div className="nav-item dropdown">
                  <span className="nav-link dropdown-toggle fw-semibold" role="button" data-bs-toggle="dropdown">
                    Operations
                  </span>
                  <div className="dropdown-menu border-0 shadow rounded-3">
                    <Link to="/admin/bookings" className="dropdown-item py-2">
                      <i className="fas fa-calendar-check text-info me-2" /> Bookings & Passes
                    </Link>
                    <Link to="/admin/users" className="dropdown-item py-2">
                      <i className="fas fa-users text-secondary me-2" /> Drivers & Users
                    </Link>
                    <Link to="/admin/disputes" className="dropdown-item py-2">
                      <i className="fas fa-gavel text-danger me-2" /> Dispute Claims
                    </Link>
                  </div>
                </div>

                <div className="nav-item dropdown">
                  <span className="nav-link dropdown-toggle fw-semibold" role="button" data-bs-toggle="dropdown">
                    Finance
                  </span>
                  <div className="dropdown-menu border-0 shadow rounded-3">
                    <Link to="/admin/transactions" className="dropdown-item py-2">
                      <i className="fas fa-receipt text-success me-2" /> Financial Ledger
                    </Link>
                    <Link to="/admin/withdrawals" className="dropdown-item py-2">
                      <i className="fas fa-hand-holding-usd text-success me-2" /> Owner Payouts
                    </Link>
                    <Link to="/admin/late-fees" className="dropdown-item py-2">
                      <i className="fas fa-hourglass-half text-secondary me-2" /> Late Fee Policy
                    </Link>
                  </div>
                </div>

                <Link to="/admin/reports" className="nav-item nav-link fw-semibold">
                  Reports
                </Link>

                <div className="nav-item dropdown">
                  <span className="nav-link dropdown-toggle fw-semibold" role="button" data-bs-toggle="dropdown">
                    Categories
                  </span>
                  <div className="dropdown-menu border-0 shadow rounded-3">
                    <Link to="/admin/addcategory" className="dropdown-item py-2">
                      Add Category
                    </Link>
                    <Link to="/admin/managecategory" className="dropdown-item py-2">
                      Manage Category
                    </Link>
                  </div>
                </div>
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

export default AdminHeader;