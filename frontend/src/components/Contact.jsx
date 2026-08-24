import React from "react";
import { Link } from "react-router-dom";

const Contact = () => {
  return (
    <>
      {/* Breadcrumb */}
      <div className="container-fluid bg-breadcrumb">
        <div
          className="container text-center py-5"
          style={{ maxWidth: 900 }}
        >
          <h4
            className="text-white display-4 mb-4"
            data-aos="fade-down"
            data-aos-delay="100"
          >
            Contact Us
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
              Contact
            </li>
          </ol>
        </div>
      </div>

      {/* Contact Section */}
      <div className="container-fluid contact bg-light py-5">
        <div className="container py-5">

          {/* Heading */}
          <div
            className="text-center mx-auto pb-5"
            style={{ maxWidth: "800px" }}
            data-aos="fade-up"
          >
            <h4 className="text-primary">Contact Us</h4>

            <h1 className="display-4 mb-4">
              Have Any Questions About Smart Parking?
            </h1>

            <p className="mb-0 text-muted">
              Contact us for any questions, suggestions or information
              about our Smart Parking System.
            </p>
          </div>

          <div className="row g-5">

            {/* Image */}
            <div className="col-xl-6" data-aos="fade-right" data-aos-duration="1000">
              <div className="contact-img d-flex justify-content-center h-100 align-items-center">
                <div className="contact-img-inner w-100">
                  <img
                    src="https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=800&q=80"
                    className="img-fluid w-100 rounded-4 shadow-sm"
                    alt="Smart Parking"
                    style={{ maxHeight: "420px", objectFit: "cover" }}
                  />
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="col-xl-6" data-aos="fade-left" data-aos-duration="1000">
              <div className="bg-white p-4 p-md-5 rounded-4 shadow-sm">
                <h4 className="text-primary mb-3">
                  Send Your Message
                </h4>

                <p className="mb-4 text-muted">
                  Have a question about parking availability or our
                  smart parking system? Send us a message.
                </p>

                <form onSubmit={(e) => e.preventDefault()} className="contact-form">
                  <div className="row g-4">

                    {/* Name */}
                    <div className="col-md-6">
                      <div className="contact-field">
                        <input
                          type="text"
                          id="name"
                          placeholder="Your Name"
                          required
                        />
                        <label htmlFor="name">Your Name</label>
                      </div>
                    </div>

                    {/* Email */}
                    <div className="col-md-6">
                      <div className="contact-field">
                        <input
                          type="email"
                          id="email"
                          placeholder="Your Email"
                          required
                        />
                        <label htmlFor="email">Your Email</label>
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="col-md-6">
                      <div className="contact-field">
                        <input
                          type="tel"
                          id="phone"
                          placeholder="Your Phone"
                          required
                        />
                        <label htmlFor="phone">Your Phone</label>
                      </div>
                    </div>

                    {/* Parking Location */}
                    <div className="col-md-6">
                      <div className="contact-field">
                        <input
                          type="text"
                          id="parking"
                          placeholder="Parking Location"
                          required
                        />
                        <label htmlFor="parking">Parking Location</label>
                      </div>
                    </div>

                    {/* Subject */}
                    <div className="col-12">
                      <div className="contact-field">
                        <input
                          type="text"
                          id="subject"
                          placeholder="Subject"
                          required
                        />
                        <label htmlFor="subject">Subject</label>
                      </div>
                    </div>

                    {/* Message */}
                    <div className="col-12">
                      <div className="contact-field">
                        <textarea
                          id="message"
                          placeholder="Write your message here..."
                          rows="4"
                          required
                        ></textarea>
                        <label htmlFor="message">Message</label>
                      </div>
                    </div>

                    {/* Button */}
                    <div className="col-12">
                      <button type="submit" className="contact-submit w-100 py-3">
                        Send Message
                      </button>
                    </div>

                  </div>
                </form>
              </div>
            </div>

            {/* Contact Information */}
            <div className="col-12 mt-4">
              <div className="row g-4">

                {/* Address */}
                <div className="col-12 col-sm-6 col-lg-3" data-aos="fade-up" data-aos-delay="100">
                  <div className="contact-add-item bg-white p-4 rounded-4 shadow-sm text-center h-100">
                    <div className="text-primary mb-3">
                      <i className="fas fa-map-marker-alt fa-2x"></i>
                    </div>

                    <h5 className="fw-bold">Address</h5>

                    <p className="mb-0 text-muted">
                      Smart Parking Office, India
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="col-12 col-sm-6 col-lg-3" data-aos="fade-up" data-aos-delay="200">
                  <div className="contact-add-item bg-white p-4 rounded-4 shadow-sm text-center h-100">
                    <div className="text-primary mb-3">
                      <i className="fas fa-envelope fa-2x"></i>
                    </div>

                    <h5 className="fw-bold">Mail Us</h5>

                    <p className="mb-0 text-muted">
                      info@smartparking.com
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="col-12 col-sm-6 col-lg-3" data-aos="fade-up" data-aos-delay="300">
                  <div className="contact-add-item bg-white p-4 rounded-4 shadow-sm text-center h-100">
                    <div className="text-primary mb-3">
                      <i className="fas fa-phone-alt fa-2x"></i>
                    </div>

                    <h5 className="fw-bold">Telephone</h5>

                    <p className="mb-0 text-muted">
                      +91 98765 43210
                    </p>
                  </div>
                </div>

                {/* Smart Parking */}
                <div className="col-12 col-sm-6 col-lg-3" data-aos="fade-up" data-aos-delay="400">
                  <div className="contact-add-item bg-white p-4 rounded-4 shadow-sm text-center h-100">
                    <div className="text-primary mb-3">
                      <i className="fas fa-parking fa-2x"></i>
                    </div>

                    <h5 className="fw-bold">Smart Parking</h5>

                    <p className="mb-0 text-muted">
                      Easy &amp; Smart Parking
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Map */}
            <div className="col-12 mt-4 mb-5" data-aos="fade-up" data-aos-delay="200">
              <div className="rounded-4 overflow-hidden shadow-sm">
                <iframe
                  title="Parking Location"
                  className="rounded-4 w-100 border-0"
                  style={{ height: "350px" }}
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387191.33750346623!2d-73.97968099999999!3d40.6974881!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sbd!4v1694259649153!5m2!1sen!2sbd"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;