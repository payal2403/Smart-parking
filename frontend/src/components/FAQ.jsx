const FAQ=()=>{
    return(
        <>
  
  {/* Header Start */}
  <div className="container-fluid bg-breadcrumb">
    <div className="container text-center py-5" style={{ maxWidth: 900 }}>
      <h4
        className="text-white display-4 mb-4 wow fadeInDown"
        data-wow-delay="0.1s"
      >
        Frequently Asked Questions
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
        <li className="breadcrumb-item active text-primary">FAQs</li>
      </ol>
    </div>
  </div>
  {/* Header End */}
  <p />

  
  
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

  
 
   {/* FAQs Start */}
  <div className="container-fluid faq-section bg-light py-5">
    <div className="container py-5">
      <div className="row g-5 align-items-center">
        <div className="col-xl-6 wow fadeInLeft" data-wow-delay="0.2s">
          <div className="h-100">
            <div className="mb-5">
              <h4 className="text-primary">Some Important FAQ's</h4>
              <h1 className="display-4 mb-0">
                Common Frequently Asked Questions
              </h1>
            </div>
            <div className="accordion" id="accordionExample">
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingOne">
                  <button
                    className="accordion-button border-0"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne"
                    aria-expanded="true"
                    aria-controls="collapseOne"
                  >
                    Q: What happens during Freshers' Week?
                  </button>
                </h2>
                <div
                  id="collapseOne"
                  className="accordion-collapse collapse show active"
                  aria-labelledby="headingOne"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body rounded">
                    A: Leverage agile frameworks to provide a robust synopsis
                    for high level overviews. Iterative approaches to corporate
                    strategy foster collaborative thinking to further the
                    overall value proposition. Organically grow the holistic
                    world view of disruptive innovation via workplace diversity
                    and empowerment.
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingTwo">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseTwo"
                    aria-expanded="false"
                    aria-controls="collapseTwo"
                  >
                    Q: What is the transfer application process?
                  </button>
                </h2>
                <div
                  id="collapseTwo"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingTwo"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    A: Leverage agile frameworks to provide a robust synopsis
                    for high level overviews. Iterative approaches to corporate
                    strategy foster collaborative thinking to further the
                    overall value proposition. Organically grow the holistic
                    world view of disruptive innovation via workplace diversity
                    and empowerment.
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingThree">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseThree"
                    aria-expanded="false"
                    aria-controls="collapseThree"
                  >
                    Q: Why should I attend community college?
                  </button>
                </h2>
                <div
                  id="collapseThree"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingThree"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    A: Leverage agile frameworks to provide a robust synopsis
                    for high level overviews. Iterative approaches to corporate
                    strategy foster collaborative thinking to further the
                    overall value proposition. Organically grow the holistic
                    world view of disruptive innovation via workplace diversity
                    and empowerment.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-6 wow fadeInRight" data-wow-delay="0.4s">
          <img src="img/carousel-2.png" className="img-fluid w-100" alt="" />
        </div>
      </div>
    </div>
  </div>
  {/* FAQs End */}
  <p />
</>





    )
}
export default FAQ;