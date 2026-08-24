import React from 'react';
import { Link } from 'react-router-dom';

const Team = () => {
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
            Our Team
          </h4>
          <ol
            className="breadcrumb d-flex justify-content-center mb-0"
            data-aos="fade-down"
            data-aos-delay="300"
          >
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item active text-primary">Team</li>
          </ol>
        </div>
      </div>
      {/* Header End */}

      {/* Team Start */}
      <div className="container-fluid team py-5">
        <div className="container py-5">
          <div
            className="text-center mx-auto pb-5"
            style={{ maxWidth: 800 }}
            data-aos="fade-up"
          >
            <h4 className="text-primary">Our Team</h4>
            <h1 className="display-4 mb-4 fw-bold">Meet Our Smart Mobility Experts</h1>
            <p className="mb-0 text-muted">
              Our dedicated engineering and operations team works round the clock to build seamless parking solutions and manage urban mobility with next-gen technology.
            </p>
          </div>
          <div className="row g-4">
            <div
              className="col-md-6 col-lg-6 col-xl-3"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div className="team-item bg-white rounded-4 shadow-sm overflow-hidden text-center">
                <div className="team-img position-relative overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80"
                    className="img-fluid rounded-top w-100"
                    alt="Operations Lead"
                    style={{ height: "240px", objectFit: "cover" }}
                  />
                </div>
                <div className="team-title p-4">
                  <h5 className="mb-1 fw-bold">Payal Sharma</h5>
                  <p className="mb-0 text-muted small">Project Lead & Architect</p>
                </div>
              </div>
            </div>
            <div
              className="col-md-6 col-lg-6 col-xl-3"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="team-item bg-white rounded-4 shadow-sm overflow-hidden text-center">
                <div className="team-img position-relative overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=80"
                    className="img-fluid rounded-top w-100"
                    alt="Lead Engineer"
                    style={{ height: "240px", objectFit: "cover" }}
                  />
                </div>
                <div className="team-title p-4">
                  <h5 className="mb-1 fw-bold">David Chen</h5>
                  <p className="mb-0 text-muted small">Lead Cloud Engineer</p>
                </div>
              </div>
            </div>
            <div
              className="col-md-6 col-lg-6 col-xl-3"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <div className="team-item bg-white rounded-4 shadow-sm overflow-hidden text-center">
                <div className="team-img position-relative overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=500&q=80"
                    className="img-fluid rounded-top w-100"
                    alt="Product Designer"
                    style={{ height: "240px", objectFit: "cover" }}
                  />
                </div>
                <div className="team-title p-4">
                  <h5 className="mb-1 fw-bold">Sarah Jenkins</h5>
                  <p className="mb-0 text-muted small">Head of Product Design</p>
                </div>
              </div>
            </div>
            <div
              className="col-md-6 col-lg-6 col-xl-3"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <div className="team-item bg-white rounded-4 shadow-sm overflow-hidden text-center">
                <div className="team-img position-relative overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=80"
                    className="img-fluid rounded-top w-100"
                    alt="Operations Lead"
                    style={{ height: "240px", objectFit: "cover" }}
                  />
                </div>
                <div className="team-title p-4">
                  <h5 className="mb-1 fw-bold">Marcus Vance</h5>
                  <p className="mb-0 text-muted small">Host Operations Director</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Team End */}
    </>
  );
};

export default Team;