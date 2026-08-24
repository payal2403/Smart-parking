import { Link } from 'react-router-dom';

const FAQ = () => {
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
            Frequently Asked Questions
          </h4>
          <ol
            className="breadcrumb d-flex justify-content-center mb-0"
            data-aos="fade-down"
            data-aos-delay="300"
          >
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item active text-primary">FAQs</li>
          </ol>
        </div>
      </div>
      {/* Header End */}

      {/* FAQs Start */}
      <div className="container-fluid faq-section bg-light py-5">
        <div className="container py-5">
          <div className="row g-5 align-items-center">

            <div className="col-xl-6" data-aos="fade-right" data-aos-duration="1000">
              <div className="h-100">

                <div className="mb-5">
                  <h4 className="text-primary">Some Important FAQs</h4>
                  <h1 className="display-5 fw-bold mb-0">
                    Commonly Asked Questions
                  </h1>
                </div>

                <div className="accordion" id="accordionExample">

                  <div className="accordion-item" data-aos="fade-up" data-aos-delay="100">
                    <h2 className="accordion-header" id="headingOne">
                      <button
                        className="accordion-button border-0"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseOne"
                        aria-expanded="true"
                        aria-controls="collapseOne"
                      >
                        Q: How does the Smart Parking System work?
                      </button>
                    </h2>

                    <div
                      id="collapseOne"
                      className="accordion-collapse collapse show active"
                      aria-labelledby="headingOne"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body rounded text-muted">
                        A: The Smart Parking System helps drivers find verified available
                        parking spaces easily. It shows real-time parking availability and
                        helps reduce the time spent searching for a parking spot with GPS navigation.
                      </div>
                    </div>
                  </div>

                  <div className="accordion-item" data-aos="fade-up" data-aos-delay="200">
                    <h2 className="accordion-header" id="headingTwo">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseTwo"
                        aria-expanded="false"
                        aria-controls="collapseTwo"
                      >
                        Q: Can I check parking space availability in real-time?
                      </button>
                    </h2>

                    <div
                      id="collapseTwo"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingTwo"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body text-muted">
                        A: Yes, the system allows users to check live available and
                        occupied parking spaces, view hourly pricing, and reserve instant passes.
                      </div>
                    </div>
                  </div>

                  <div className="accordion-item" data-aos="fade-up" data-aos-delay="300">
                    <h2 className="accordion-header" id="headingThree">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseThree"
                        aria-expanded="false"
                        aria-controls="collapseThree"
                      >
                        Q: What are the benefits of a Smart Parking System?
                      </button>
                    </h2>

                    <div
                      id="collapseThree"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingThree"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body text-muted">
                        A: It saves time and fuel, eliminates traffic congestion caused by cruising for
                        parking, provides guaranteed spots, and enables automated check-in.
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            <div className="col-xl-6" data-aos="fade-left" data-aos-duration="1000">
              <img
                src="https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=800&q=80"
                className="img-fluid w-100 rounded-4 shadow-sm"
                alt="Smart Parking System"
              />
            </div>

          </div>
        </div>
      </div>
      {/* FAQs End */}
    </>
  );
};

export default FAQ;