import React from "react";
import { Link } from "react-router-dom";

const Service = () => {
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
            Smart Parking Services
          </h4>
          <ol
            className="breadcrumb d-flex justify-content-center mb-0"
            data-aos="fade-down"
            data-aos-delay="300"
          >
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item active text-primary">
              Parking Services
            </li>
          </ol>
        </div>
      </div>
      {/* Header End */}

      {/* Service Start */}
      <div className="container-fluid service py-5">
        <div className="container py-5">

          {/* Heading */}
          <div
            className="text-center mx-auto pb-5"
            style={{ maxWidth: 800 }}
            data-aos="fade-up"
          >
            <h4 className="text-primary">Our Parking Services</h4>

            <h1 className="display-4 mb-4 fw-bold">
              Smart Parking Solutions For Modern Cities
            </h1>

            <p className="mb-0 text-muted">
              Our smart parking management system helps users easily find available
              parking spaces, book slots online, manage vehicles efficiently, and
              reduce traffic congestion using real-time parking technology and
              automated monitoring.
            </p>
          </div>

          {/* Cards */}
          <div className="row g-4">

            {/* Card 1 */}
            <div
              className="col-sm-6 col-lg-3"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div className="service-item bg-white rounded-4 shadow-sm h-100 overflow-hidden">
                <div className="service-img position-relative overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1506521781263-d8422e82f27a"
                    className="img-fluid rounded-top w-100"
                    alt="Real-Time Slot Tracking"
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="service-icon p-3">
                    <i className="fa fa-map-marker-alt fa-2x" />
                  </div>
                </div>

                <div className="service-content p-4">
                  <div className="service-content-inner">
                    <h5 className="fw-bold mb-3">
                      Real-Time Slot Tracking
                    </h5>

                    <p className="mb-4 text-muted">
                      Users can check live parking availability and find the nearest
                      free parking space instantly with GPS navigation.
                    </p>

                    <Link
                      className="btn btn-primary rounded-pill py-2 px-4"
                      to="/view"
                    >
                      Explore Slots
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div
              className="col-sm-6 col-lg-3"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="service-item bg-white rounded-4 shadow-sm h-100 overflow-hidden">
                <div className="service-img position-relative overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1503376780353-7e6692767b70"
                    className="img-fluid rounded-top w-100"
                    alt="Online Parking Booking"
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="service-icon p-3">
                    <i className="fa fa-calendar-check fa-2x" />
                  </div>
                </div>

                <div className="service-content p-4">
                  <div className="service-content-inner">
                    <h5 className="fw-bold mb-3">
                      Online Parking Booking
                    </h5>

                    <p className="mb-4 text-muted">
                      Reserve parking slots in advance through a smart digital
                      booking system with instant Razorpay confirmation.
                    </p>

                    <Link
                      className="btn btn-primary rounded-pill py-2 px-4"
                      to="/view"
                    >
                      Book Online
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div
              className="col-sm-6 col-lg-3"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <div className="service-item bg-white rounded-4 shadow-sm h-100 overflow-hidden">
                <div className="service-img position-relative overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1502877338535-766e1452684a"
                    className="img-fluid rounded-top w-100"
                    alt="Vehicle Management"
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="service-icon p-3">
                    <i className="fa fa-car fa-2x" />
                  </div>
                </div>

                <div className="service-content p-4">
                  <div className="service-content-inner">
                    <h5 className="fw-bold mb-3">
                      Vehicle & Pass System
                    </h5>

                    <p className="mb-4 text-muted">
                      Manage multiple vehicles, entry records, and digital QR parking
                      passes through an automated system.
                    </p>

                    <Link
                      className="btn btn-primary rounded-pill py-2 px-4"
                      to="/user/dashboard"
                    >
                      My Dashboard
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 4 */}
            <div
              className="col-sm-6 col-lg-3"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <div className="service-item bg-white rounded-4 shadow-sm h-100 overflow-hidden">
                <div className="service-img position-relative overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1549924231-f129b911e442"
                    className="img-fluid rounded-top w-100"
                    alt="Host & Admin Dashboard"
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="service-icon p-3">
                    <i className="fa fa-chart-line fa-2x" />
                  </div>
                </div>

                <div className="service-content p-4">
                  <div className="service-content-inner">
                    <h5 className="fw-bold mb-3">
                      Host & Admin Dashboard
                    </h5>

                    <p className="mb-4 text-muted">
                      Hosts and admins can track parking usage, earnings, withdrawals,
                      and slot analytics in real time.
                    </p>

                    <Link
                      className="btn btn-primary rounded-pill py-2 px-4"
                      to="/register"
                    >
                      Join Platform
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Explore Button */}
            <div
              className="col-12 text-center"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <Link
                className="btn btn-primary rounded-pill py-3 px-5 fw-semibold"
                to="/Feature"
              >
                Explore All Features
              </Link>
            </div>

          </div>
        </div>
      </div>
      {/* Service End */}
    </>
  );
};

export default Service;