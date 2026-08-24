import React from 'react';
import { Link } from 'react-router-dom';

const Testimonial = () => {
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
            Customer Reviews
          </h4>
          <ol
            className="breadcrumb d-flex justify-content-center mb-0"
            data-aos="fade-down"
            data-aos-delay="300"
          >
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item active text-primary">Testimonial</li>
          </ol>
        </div>
      </div>
      {/* Header End */}

      {/* Testimonial Start */}
      <div className="container-fluid testimonial py-5 bg-light">
        <div className="container py-5">
          <div
            className="text-center mx-auto pb-5"
            style={{ maxWidth: 800 }}
            data-aos="fade-up"
          >
            <h4 className="text-primary">What Drivers Say</h4>
            <h1 className="display-4 mb-4 fw-bold">Verified User Experiences</h1>
            <p className="mb-0 text-muted">
              Discover how our smart parking system has transformed daily commuting and parking spot management for thousands of drivers and hosts.
            </p>
          </div>

          <div className="row g-4">
            <div className="col-lg-4" data-aos="fade-up" data-aos-delay="100">
              <div className="testimonial-item bg-white p-4 rounded-4 shadow-sm h-100">
                <div className="d-flex align-items-center mb-3">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
                    className="rounded-circle me-3"
                    style={{ width: "55px", height: "55px", objectFit: "cover" }}
                    alt="Riya Sen"
                  />
                  <div>
                    <h5 className="text-dark mb-0 fw-bold">Riya Sen</h5>
                    <p className="mb-0 text-muted small">Daily Commuter (Delhi)</p>
                  </div>
                </div>
                <div className="d-flex text-warning mb-3">
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                </div>
                <p className="mb-0 text-muted">
                  "Saved me at least 25 minutes of circling around Connaught Place every morning. Booking ahead and navigating straight to my spot is life changing!"
                </p>
              </div>
            </div>

            <div className="col-lg-4" data-aos="fade-up" data-aos-delay="200">
              <div className="testimonial-item bg-white p-4 rounded-4 shadow-sm h-100">
                <div className="d-flex align-items-center mb-3">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
                    className="rounded-circle me-3"
                    style={{ width: "55px", height: "55px", objectFit: "cover" }}
                    alt="Amit Verma"
                  />
                  <div>
                    <h5 className="text-dark mb-0 fw-bold">Amit Verma</h5>
                    <p className="mb-0 text-muted small">Commercial Host (Mumbai)</p>
                  </div>
                </div>
                <div className="d-flex text-warning mb-3">
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                </div>
                <p className="mb-0 text-muted">
                  "Listing our basement parking slots was super simple. The automated check-in and instantaneous UPI payouts make managing our space effortless."
                </p>
              </div>
            </div>

            <div className="col-lg-4" data-aos="fade-up" data-aos-delay="300">
              <div className="testimonial-item bg-white p-4 rounded-4 shadow-sm h-100">
                <div className="d-flex align-items-center mb-3">
                  <img
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
                    className="rounded-circle me-3"
                    style={{ width: "55px", height: "55px", objectFit: "cover" }}
                    alt="Rohit Kapoor"
                  />
                  <div>
                    <h5 className="text-dark mb-0 fw-bold">Rohit Kapoor</h5>
                    <p className="mb-0 text-muted small">Weekend Traveler (Bangalore)</p>
                  </div>
                </div>
                <div className="d-flex text-warning mb-3">
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star-half-alt" />
                </div>
                <p className="mb-0 text-muted">
                  "The live navigation directions and digital QR check-in pass worked like a charm. No cash or disputes, highly recommended!"
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Testimonial End */}
    </>
  );
};

export default Testimonial;