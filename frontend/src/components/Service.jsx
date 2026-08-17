const Service=()=>{
    return(


        <>
 
   {/* Header Start */}
  <div className="container-fluid bg-breadcrumb">
    <div className="container text-center py-5" style={{ maxWidth: 900 }}>
      <h4
        className="text-white display-4 mb-4 wow fadeInDown"
        data-wow-delay="0.1s"
      >
        Smart Parking Services
      </h4>
      <ol
        className="breadcrumb d-flex justify-content-center mb-0 wow fadeInDown"
        data-wow-delay="0.3s"
      >
        <li className="breadcrumb-item">
          <a href="index.html">Home</a>
        </li>
        <li className="breadcrumb-item">
          <a href="#">Solutions</a>
        </li>
        <li className="breadcrumb-item active text-primary">
          Parking Services
        </li>
      </ol>
    </div>
  </div>
  {/* Header End */}


   {/* Modal Search Start */}
  <div
    className="modal fade"
    id="searchModal"
    tabIndex={-1}
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div className="modal-dialog modal-fullscreen">
      <div className="modal-content rounded-0">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">
            Search by keyword
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          />
        </div>
        <div className="modal-body d-flex align-items-center bg-primary">
          <div className="input-group w-75 mx-auto d-flex">
            <input
              type="search"
              className="form-control p-3"
              placeholder="keywords"
              aria-describedby="search-icon-1"
            />
            <span
              id="search-icon-1"
              className="btn bg-light border nput-group-text p-3"
            >
              <i className="fa fa-search" />
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* Modal Search End */}
  <p />



  {/* Service Start */}
  <div className="container-fluid service py-5">
    <div className="container py-5">
      <div
        className="text-center mx-auto pb-5 wow fadeInUp"
        data-wow-delay="0.2s"
        style={{ maxWidth: 800 }}
      >
        <h4 className="text-primary">Our Parking Services</h4>
        <h1 className="display-4 mb-4">
          Smart Parking Solutions For Modern Cities
        </h1>
        <p className="mb-0">
          Our smart parking management system helps users easily find available
          parking spaces, book slots online, manage vehicles efficiently, and
          reduce traffic congestion using real-time parking technology and
          automated monitoring.
        </p>
      </div>
      <div className="row g-4 justify-content-center">
        <div
          className="col-md-6 col-lg-6 col-xl-3 wow fadeInUp"
          data-wow-delay="0.2s"
        >
          <div className="service-item">
            <div className="service-img">
              <img
                src="https://images.unsplash.com/photo-1506521781263-d8422e82f27a"
                className="img-fluid rounded-top w-100"
                alt=""
              />
              <div className="service-icon p-3">
                <i className="fa fa-map-marker-alt fa-2x" />
              </div>
            </div>
            <div className="service-content p-4">
              <div className="service-content-inner">
                <a href="#" className="d-inline-block h4 mb-4">
                  Real-Time Slot Tracking
                </a>
                <p className="mb-4">
                  Users can check live parking availability and find the nearest
                  free parking space instantly.
                </p>
                <a className="btn btn-primary rounded-pill py-2 px-4" href="#">
                  Read More
                </a>
              </div>
            </div>
          </div>
        </div>
        <div
          className="col-md-6 col-lg-6 col-xl-3 wow fadeInUp"
          data-wow-delay="0.4s"
        >
          <div className="service-item">
            <div className="service-img">
              <img
                src="https://images.unsplash.com/photo-1503376780353-7e6692767b70"
                className="img-fluid rounded-top w-100"
                alt=""
              />
              <div className="service-icon p-3">
                <i className="fa fa-calendar-check fa-2x" />
              </div>
            </div>
            <div className="service-content p-4">
              <div className="service-content-inner">
                <a href="#" className="d-inline-block h4 mb-4">
                  Online Parking Booking
                </a>
                <p className="mb-4">
                  Reserve parking slots in advance through a smart digital
                  booking system for convenience.
                </p>
                <a className="btn btn-primary rounded-pill py-2 px-4" href="#">
                  Read More
                </a>
              </div>
            </div>
          </div>
        </div>
        <div
          className="col-md-6 col-lg-6 col-xl-3 wow fadeInUp"
          data-wow-delay="0.6s"
        >
          <div className="service-item">
            <div className="service-img">
              <img
                src="https://images.unsplash.com/photo-1502877338535-766e1452684a"
                className="img-fluid rounded-top w-100"
                alt=""
              />
              <div className="service-icon p-3">
                <i className="fa fa-car fa-2x" />
              </div>
            </div>
            <div className="service-content p-4">
              <div className="service-content-inner">
                <a href="#" className="d-inline-block h4 mb-4">
                  Vehicle Management
                </a>
                <p className="mb-4">
                  Manage multiple vehicles, entry records, and parking history
                  through an automated system.
                </p>
                <a className="btn btn-primary rounded-pill py-2 px-4" href="#">
                  Read More
                </a>
              </div>
            </div>
          </div>
        </div>
        <div
          className="col-md-6 col-lg-6 col-xl-3 wow fadeInUp"
          data-wow-delay="0.8s"
        >
          <div className="service-item">
            <div className="service-img">
              <img
                src="https://images.unsplash.com/photo-1549924231-f129b911e442"
                className="img-fluid rounded-top w-100"
                alt=""
              />
              <div className="service-icon p-3">
                <i className="fa fa-chart-line fa-2x" />
              </div>
            </div>
            <div className="service-content p-4">
              <div className="service-content-inner">
                <a href="#" className="d-inline-block h4 mb-4">
                  Admin Monitoring Dashboard
                </a>
                <p className="mb-4">
                  Admins can track parking usage, bookings, revenue, and slot
                  analytics in real time.
                </p>
                <a className="btn btn-primary rounded-pill py-2 px-4" href="#">
                  Read More
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 text-center wow fadeInUp" data-wow-delay="0.2s">
          <a className="btn btn-primary rounded-pill py-3 px-5" href="#">
            Explore All Features
          </a>
        </div>
      </div>
    </div>
  </div>
  {/* Service End */}
  <p />
</>


    )
}
export default Service;