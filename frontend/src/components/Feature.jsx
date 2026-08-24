const Feature=()=>{
    return(
        <>
 
 {/* Header Start */}
  <div className="container-fluid bg-breadcrumb">
    <div className="container text-center py-5" style={{ maxWidth: 900 }}>
      <h4
        className="text-white display-4 mb-4 wow fadeInDown"
        data-wow-delay="0.1s"
      >
        Our Features
      </h4>
      <ol
        className="breadcrumb d-flex justify-content-center mb-0 wow fadeInDown"
        data-wow-delay="0.3s"
      >
        <li className="breadcrumb-item">
          <a href="index.html">Home</a>
        </li>
        <li className="breadcrumb-item">
          <a href="#">Pages</a>
        </li>
        <li className="breadcrumb-item active text-primary">Feature</li>
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


 
  {/* Feature Start */}
 <div className="container-fluid feature bg-light py-5">
  <div className="container py-5">

    {/* Heading */}
    <div
      className="text-center mx-auto pb-5 wow fadeInUp"
      data-wow-delay="0.2s"
      style={{ maxWidth: 800 }}
    >
      <h4 className="text-primary">Our Features</h4>

      <h1 className="display-4 mb-4">
        Smart Features For Easy Parking
      </h1>

      <p className="mb-0">
        Our smart parking system makes parking simple by helping users find,
        book, and manage parking spaces easily through one convenient platform.
      </p>
    </div>

    {/* Features */}
    <div className="row g-4">

      {/* Feature 1 */}
      <div
        className="col-6 col-lg-3 wow fadeInUp"
        data-wow-delay="0.2s"
      >
        <div className="feature-item p-4 pt-0">

          <div className="feature-icon p-4 mb-4">
            <i className="far fa-handshake fa-3x" />
          </div>

          <h4 className="mb-4">Easy Parking</h4>

          <p className="mb-4">
            Find available parking spaces quickly and avoid the hassle of
            searching for a spot in busy areas.
          </p>

          <a
            className="btn btn-primary rounded-pill py-2 px-4"
            href="#"
          >
            Learn More
          </a>

        </div>
      </div>


      {/* Feature 2 */}
      <div
        className="col-6 col-lg-3 wow fadeInUp"
        data-wow-delay="0.4s"
      >
        <div className="feature-item p-4 pt-0">

          <div className="feature-icon p-4 mb-4">
            <i className="fa fa-dollar-sign fa-3x" />
          </div>

          <h4 className="mb-4">Secure Booking</h4>

          <p className="mb-4">
            Book your parking slot in advance and get a convenient and secure
            parking experience.
          </p>

          <a
            className="btn btn-primary rounded-pill py-2 px-4"
            href="#"
          >
            Learn More
          </a>

        </div>
      </div>


      {/* Feature 3 */}
      <div
        className="col-6 col-lg-3 wow fadeInUp"
        data-wow-delay="0.6s"
      >
        <div className="feature-item p-4 pt-0">

          <div className="feature-icon p-4 mb-4">
            <i className="fa fa-bullseye fa-3x" />
          </div>

          <h4 className="mb-4">Smart Management</h4>

          <p className="mb-4">
            Manage parking slots, vehicles, bookings, and records easily
            through one smart system.
          </p>

          <a
            className="btn btn-primary rounded-pill py-2 px-4"
            href="#"
          >
            Learn More
          </a>

        </div>
      </div>


      {/* Feature 4 */}
      <div
        className="col-6 col-lg-3 wow fadeInUp"
        data-wow-delay="0.8s"
      >
        <div className="feature-item p-4 pt-0">

          <div className="feature-icon p-4 mb-4">
            <i className="fa fa-headphones fa-3x" />
          </div>

          <h4 className="mb-4">24/7 Support</h4>

          <p className="mb-4">
            Get quick assistance whenever you need help with parking,
            bookings, or your account.
          </p>

          <a
            className="btn btn-primary rounded-pill py-2 px-4"
            href="#"
          >
            Learn More
          </a>

        </div>
      </div>

    </div>
  </div>
</div>

  {/* Feature End */}
  <p />



 
  
  
</>





    )
}

export default Feature;