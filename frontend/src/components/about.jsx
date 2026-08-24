import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
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
            About Us
          </h4>
          <ol
            className="breadcrumb d-flex justify-content-center mb-0"
            data-aos="fade-down"
            data-aos-delay="300"
          >
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item active text-primary">About</li>
          </ol>
        </div>
      </div>
      {/* Header End */}

      {/* About Start */}
      <div className="container-fluid bg-light about py-5">
        <div className="container py-5">
          <div className="row g-5">
            <div className="col-xl-6" data-aos="fade-right" data-aos-duration="1000">
              <div className="about-item-content bg-white rounded p-5 h-100 shadow-sm">
                <h4 className="text-primary">About Our Platform</h4>
                <h1 className="display-5 mb-4 fw-bold">
                  Next-Generation Smart Parking Solutions
                </h1>
                <p className="text-muted">
                  We are revolutionizing urban mobility with state-of-the-art smart parking management. Our platform connects vehicle owners with available parking spots in real-time, eliminating the frustration of hunting for parking.
                </p>
                <p className="text-muted">
                  Whether you are looking for a spot or looking to monetize your unused parking spaces, our automated booking, contactless payments, and live navigation make parking seamless and stress-free.
                </p>
                <p className="text-dark">
                  <i className="fa fa-check text-primary me-3" />
                  Real-time slot availability and GPS navigation.
                </p>
                <p className="text-dark">
                  <i className="fa fa-check text-primary me-3" />
                  Automated contactless gate check-in & check-out.
                </p>
                <p className="text-dark mb-4">
                  <i className="fa fa-check text-primary me-3" />
                  Flexible hourly, daily, and monthly reservation plans.
                </p>
                <Link className="btn btn-primary rounded-pill py-3 px-5 fw-semibold" to="/view">
                  Explore Parking Spots
                </Link>
              </div>
            </div>
            <div className="col-xl-6" data-aos="fade-left" data-aos-duration="1000">
              <div className="bg-white rounded p-5 h-100 shadow-sm">
                <div className="row g-4 justify-content-center">
                  <div className="col-12" data-aos="zoom-in" data-aos-delay="200">
                    <div className="rounded bg-light overflow-hidden">
                      <img
                        src="https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=800&q=80"
                        className="img-fluid rounded w-100"
                        alt="Smart Parking System"
                        style={{ maxHeight: "250px", objectFit: "cover" }}
                      />
                    </div>
                  </div>
                  <div className="col-sm-6" data-aos="fade-up" data-aos-delay="100">
                    <div className="counter-item bg-light rounded p-3 h-100">
                      <div className="counter-counting">
                        <span className="text-primary fs-2 fw-bold">5,000+</span>
                      </div>
                      <h5 className="mb-0 text-dark">Verified Spots</h5>
                    </div>
                  </div>
                  <div className="col-sm-6" data-aos="fade-up" data-aos-delay="200">
                    <div className="counter-item bg-light rounded p-3 h-100">
                      <div className="counter-counting">
                        <span className="text-primary fs-2 fw-bold">99.9%</span>
                      </div>
                      <h5 className="mb-0 text-dark">Uptime & Accuracy</h5>
                    </div>
                  </div>
                  <div className="col-sm-6" data-aos="fade-up" data-aos-delay="300">
                    <div className="counter-item bg-light rounded p-3 h-100">
                      <div className="counter-counting">
                        <span className="text-primary fs-2 fw-bold">12,500+</span>
                      </div>
                      <h5 className="mb-0 text-dark">Happy Drivers</h5>
                    </div>
                  </div>
                  <div className="col-sm-6" data-aos="fade-up" data-aos-delay="400">
                    <div className="counter-item bg-light rounded p-3 h-100">
                      <div className="counter-counting">
                        <span className="text-primary fs-2 fw-bold">24/7</span>
                      </div>
                      <h5 className="mb-0 text-dark">Customer Support</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* About End */}
    </>
  );
};

export default About;