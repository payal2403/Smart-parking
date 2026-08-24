import React from 'react';
import { Link } from 'react-router-dom';

const Feature = () => {
  return (
    <>
      {/* Header Start */}
      <div className="container-fluid bg-breadcrumb">
        <div className="container text-center py-5" style={{ maxWidth: 900 }}>
          <h4
            className="text-white display-4 mb-4"
            data-aos="fade-down"
            data-aos-delay="100"
          >
            Our Features
          </h4>
          <ol
            className="breadcrumb d-flex justify-content-center mb-0"
            data-aos="fade-down"
            data-aos-delay="300"
          >
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item active text-primary">Feature</li>
          </ol>
        </div>
      </div>
      {/* Header End */}

      {/* Feature Start */}
      <div className="container-fluid feature bg-light py-5">
        <div className="container py-5">

          {/* Heading */}
          <div
            className="text-center mx-auto pb-5"
            style={{ maxWidth: 800 }}
            data-aos="fade-up"
          >
            <h4 className="text-primary">Our Features</h4>

            <h1 className="display-4 mb-4 fw-bold">
              Smart Features For Easy Parking
            </h1>

            <p className="mb-0 text-muted">
              Our smart parking system makes parking simple by helping users find,
              book, and manage parking spaces easily through one convenient platform.
            </p>
          </div>

          {/* Features */}
          <div className="row g-4">

            {/* Feature 1 */}
            <div
              className="col-6 col-lg-3"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div className="feature-item p-4 pt-0 bg-white rounded-4 shadow-sm h-100">
                <div className="feature-icon p-4 mb-4 text-primary">
                  <i className="far fa-handshake fa-3x" />
                </div>

                <h4 className="mb-4 fw-bold">Easy Parking</h4>

                <p className="mb-4 text-muted">
                  Find available parking spaces quickly and avoid the hassle of
                  searching for a spot in busy areas.
                </p>

                <Link
                  className="btn btn-primary rounded-pill py-2 px-4"
                  to="/view"
                >
                  Explore Now
                </Link>
              </div>
            </div>

            {/* Feature 2 */}
            <div
              className="col-6 col-lg-3"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="feature-item p-4 pt-0 bg-white rounded-4 shadow-sm h-100">
                <div className="feature-icon p-4 mb-4 text-primary">
                  <i className="fa fa-dollar-sign fa-3x" />
                </div>

                <h4 className="mb-4 fw-bold">Secure Booking</h4>

                <p className="mb-4 text-muted">
                  Book your parking slot in advance and get a convenient, transparent, and secure
                  parking experience.
                </p>

                <Link
                  className="btn btn-primary rounded-pill py-2 px-4"
                  to="/view"
                >
                  Reserve Slot
                </Link>
              </div>
            </div>

            {/* Feature 3 */}
            <div
              className="col-6 col-lg-3"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <div className="feature-item p-4 pt-0 bg-white rounded-4 shadow-sm h-100">
                <div className="feature-icon p-4 mb-4 text-primary">
                  <i className="fa fa-bullseye fa-3x" />
                </div>

                <h4 className="mb-4 fw-bold">Smart Management</h4>

                <p className="mb-4 text-muted">
                  Manage parking slots, vehicles, bookings, and records easily
                  through our automated owner and admin dashboards.
                </p>

                <Link
                  className="btn btn-primary rounded-pill py-2 px-4"
                  to="/register"
                >
                  Join as Host
                </Link>
              </div>
            </div>

            {/* Feature 4 */}
            <div
              className="col-6 col-lg-3"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <div className="feature-item p-4 pt-0 bg-white rounded-4 shadow-sm h-100">
                <div className="feature-icon p-4 mb-4 text-primary">
                  <i className="fa fa-headphones fa-3x" />
                </div>

                <h4 className="mb-4 fw-bold">24/7 Support</h4>

                <p className="mb-4 text-muted">
                  Get quick assistance whenever you need help with parking,
                  check-in, pass verification, or disputes.
                </p>

                <Link
                  className="btn btn-primary rounded-pill py-2 px-4"
                  to="/contact"
                >
                  Contact Support
                </Link>
              </div>
            </div>

          </div>
        </div>
      </div>
      {/* Feature End */}
    </>
  );
};

export default Feature;