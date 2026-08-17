import React from 'react'
const Contact=()=>{
    return(
        
 <>
 
   {/* Spinner Start */}
  {/* <div
    id="spinner"
    className="show bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center"
  >
    <div
      className="spinner-border text-primary"
      style={{ width: "3rem", height: "3rem" }}
      role="status"
    >
      <span className="sr-only">Loading...</span>
    </div>
  </div> */}
  {/* Spinner End */}
  {/* Topbar Start */}
 {/* Header Start */}
  <div className="container-fluid bg-breadcrumb">
    <div className="container text-center py-5" style={{ maxWidth: 900 }}>
      <h4
        className="text-white display-4 mb-4 wow fadeInDown"
        data-wow-delay="0.1s"
      >
        Contact Us
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
        <li className="breadcrumb-item active text-primary">Contact</li>
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
  
  {/* Contact Start */}
  <div className="container-fluid contact bg-light py-5">
    <div className="container py-5">
      <div
        className="text-center mx-auto pb-5 wow fadeInUp"
        data-wow-delay="0.2s"
        style={{ maxWidth: 800 }}
      >
        <h4 className="text-primary">Contact Us</h4>
        <h1 className="display-4 mb-4">
          If you have any comments please apply now
        </h1>
      </div>
      <div className="row g-5">
        <div className="col-xl-6 wow fadeInLeft" data-wow-delay="0.2s">
          <div className="contact-img d-flex justify-content-center">
            <div className="contact-img-inner">
              <img
                src="img/contact-img.png"
                className="img-fluid w-100"
                alt="Image"
              />
            </div>
          </div>
        </div>
        <div className="col-xl-6 wow fadeInRight" data-wow-delay="0.4s">
          <div>
            <h4 className="text-primary">Send Your Message</h4>
            <p className="mb-4">
              The contact form is currently inactive. Get a functional and
              working contact form with Ajax &amp; PHP in a few minutes. Just
              copy and paste the files, add a little code and you're done.{" "}
              <a
                className="text-primary fw-bold"
                href="https://htmlcodex.com/contact-form"
              >
                Download Now
              </a>
              .
            </p>
            <form>
              <div className="row g-3">
                <div className="col-lg-12 col-xl-6">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control border-0"
                      id="name"
                      placeholder="Your Name"
                    />
                    <label htmlFor="name">Your Name</label>
                  </div>
                </div>
                <div className="col-lg-12 col-xl-6">
                  <div className="form-floating">
                    <input
                      type="email"
                      className="form-control border-0"
                      id="email"
                      placeholder="Your Email"
                    />
                    <label htmlFor="email">Your Email</label>
                  </div>
                </div>
                <div className="col-lg-12 col-xl-6">
                  <div className="form-floating">
                    <input
                      type="phone"
                      className="form-control border-0"
                      id="phone"
                      placeholder="Phone"
                    />
                    <label htmlFor="phone">Your Phone</label>
                  </div>
                </div>
                <div className="col-lg-12 col-xl-6">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control border-0"
                      id="project"
                      placeholder="Project"
                    />
                    <label htmlFor="project">Your Project</label>
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control border-0"
                      id="subject"
                      placeholder="Subject"
                    />
                    <label htmlFor="subject">Subject</label>
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-floating">
                    <textarea
                      className="form-control border-0"
                      placeholder="Leave a message here"
                      id="message"
                      style={{ height: 120 }}
                      defaultValue={""}
                    />
                    <label htmlFor="message">Message</label>
                  </div>
                </div>
                <div className="col-12">
                  <button className="btn btn-primary w-100 py-3">
                    Send Message
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="col-12">
          <div>
            <div className="row g-4">
              <div
                className="col-md-6 col-lg-3 wow fadeInUp"
                data-wow-delay="0.2s"
              >
                <div className="contact-add-item">
                  <div className="contact-icon text-primary mb-4">
                    <i className="fas fa-map-marker-alt fa-2x" />
                  </div>
                  <div>
                    <h4>Address</h4>
                    <p className="mb-0">123 Street New York.USA</p>
                  </div>
                </div>
              </div>
              <div
                className="col-md-6 col-lg-3 wow fadeInUp"
                data-wow-delay="0.4s"
              >
                <div className="contact-add-item">
                  <div className="contact-icon text-primary mb-4">
                    <i className="fas fa-envelope fa-2x" />
                  </div>
                  <div>
                    <h4>Mail Us</h4>
                    <p className="mb-0">info@example.com</p>
                  </div>
                </div>
              </div>
              <div
                className="col-md-6 col-lg-3 wow fadeInUp"
                data-wow-delay="0.6s"
              >
                <div className="contact-add-item">
                  <div className="contact-icon text-primary mb-4">
                    <i className="fa fa-phone-alt fa-2x" />
                  </div>
                  <div>
                    <h4>Telephone</h4>
                    <p className="mb-0">(+012) 3456 7890</p>
                  </div>
                </div>
              </div>
              <div
                className="col-md-6 col-lg-3 wow fadeInUp"
                data-wow-delay="0.8s"
              >
                <div className="contact-add-item">
                  <div className="contact-icon text-primary mb-4">
                    <i className="fab fa-firefox-browser fa-2x" />
                  </div>
                  <div>
                    <h4>Yoursite@ex.com</h4>
                    <p className="mb-0">(+012) 3456 7890</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 wow fadeInUp" data-wow-delay="0.2s">
          <div className="rounded">
            <iframe
              className="rounded w-100"
              style={{ height: 400 }}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387191.33750346623!2d-73.97968099999999!3d40.6974881!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sbd!4v1694259649153!5m2!1sen!2sbd"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* Contact End */}
  
  {/* Copyright Start */}
  <div className="container-fluid copyright py-4">
    <div className="container">
      <div className="row g-4 align-items-center">
        <div className="col-md-6 text-center text-md-end mb-md-0">
          <span className="text-body">
            <a href="#" className="border-bottom text-white">
              <i className="fas fa-copyright text-light me-2" />
              Your Site Name
            </a>
            , All right reserved.
          </span>
        </div>
        <div className="col-md-6 text-center text-md-start text-body">
          {/*/*** This template is free as long as you keep the below author’s credit link/attribution link/backlink. *** /*/}
          {/*/*** If you'd like to use the template without the below author’s credit link/attribution link/backlink, *** /*/}
          {/*/*** you can purchase the Credit Removal License from "https://htmlcodex.com/credit-removal". *** /*/}
          Designed By{" "}
          <a className="border-bottom text-white" href="https://htmlcodex.com">
            HTML Codex
          </a>{" "}
          Distributed By{" "}
          <a className="border-bottom text-white" href="https://themewagon.com">
            ThemeWagon
          </a>
        </div>
      </div>
    </div>
  </div>
  {/* Copyright End */}
  {/* Back to Top */}
  <a
    href="#"
    className="btn btn-primary btn-lg-square rounded-circle back-to-top"
  >
    <i className="fa fa-arrow-up" />
  </a>
  <p />
</>




    )
}
export default Contact;