const Testimonial=()=>{
    return(
        <>
 
 
  {/* Header Start */}
  <div className="container-fluid bg-breadcrumb">
    <div className="container text-center py-5" style={{ maxWidth: 900 }}>
      <h4
        className="text-white display-4 mb-4 wow fadeInDown"
        data-wow-delay="0.1s"
      >
        Our Testimonial
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
        <li className="breadcrumb-item active text-primary">Testimonial</li>
      </ol>
    </div>
  </div>
  {/* Header End */}


   <p> {/* Modal Search Start */}</p>
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

  {/* Testimonial Start */}
  <div className="container-fluid testimonial py-5">
    <div className="container py-5">
      <div
        className="text-center mx-auto pb-5 wow fadeInUp"
        data-wow-delay="0.2s"
        style={{ maxWidth: 800 }}
      >
        <h4 className="text-primary">Testimonial</h4>
        <h1 className="display-4 mb-4">What Our Customers Are Saying</h1>
        <p className="mb-0">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur
          adipisci facilis cupiditate recusandae aperiam temporibus corporis
          itaque quis facere, numquam, ad culpa deserunt sint dolorem autem
          obcaecati, ipsam mollitia hic.
        </p>
      </div>
      <div
        className="owl-carousel testimonial-carousel wow fadeInUp"
        data-wow-delay="0.2s"
      >
        <div className="testimonial-item bg-light rounded">
          <div className="row g-0">
            <div className="col-4  col-lg-4 col-xl-3">
              <div className="h-100">
                <img
                  src="img/testimonial-1.jpg"
                  className="img-fluid h-100 rounded"
                  style={{ objectFit: "cover" }}
                  alt=""
                />
              </div>
            </div>
            <div className="col-8 col-lg-8 col-xl-9">
              <div className="d-flex flex-column my-auto text-start p-4">
                <h4 className="text-dark mb-0">Client Name</h4>
                <p className="mb-3">Profession</p>
                <div className="d-flex text-primary mb-3">
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                </div>
                <p className="mb-0">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Enim
                  error molestiae aut modi corrupti fugit eaque rem nulla
                  incidunt temporibus quisquam,
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="testimonial-item bg-light rounded">
          <div className="row g-0">
            <div className="col-4  col-lg-4 col-xl-3">
              <div className="h-100">
                <img
                  src="img/testimonial-2.jpg"
                  className="img-fluid h-100 rounded"
                  style={{ objectFit: "cover" }}
                  alt=""
                />
              </div>
            </div>
            <div className="col-8 col-lg-8 col-xl-9">
              <div className="d-flex flex-column my-auto text-start p-4">
                <h4 className="text-dark mb-0">Client Name</h4>
                <p className="mb-3">Profession</p>
                <div className="d-flex text-primary mb-3">
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star text-body" />
                </div>
                <p className="mb-0">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Enim
                  error molestiae aut modi corrupti fugit eaque rem nulla
                  incidunt temporibus quisquam,
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="testimonial-item bg-light rounded">
          <div className="row g-0">
            <div className="col-4  col-lg-4 col-xl-3">
              <div className="h-100">
                <img
                  src="img/testimonial-3.jpg"
                  className="img-fluid h-100 rounded"
                  style={{ objectFit: "cover" }}
                  alt=""
                />
              </div>
            </div>
            <div className="col-8 col-lg-8 col-xl-9">
              <div className="d-flex flex-column my-auto text-start p-4">
                <h4 className="text-dark mb-0">Client Name</h4>
                <p className="mb-3">Profession</p>
                <div className="d-flex text-primary mb-3">
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star text-body" />
                  <i className="fas fa-star text-body" />
                </div>
                <p className="mb-0">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Enim
                  error molestiae aut modi corrupti fugit eaque rem nulla
                  incidunt temporibus quisquam,
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* Testimonial End */}
  <p />
</>

    )
}

export default Testimonial