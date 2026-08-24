import React from "react";

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
              <a href="/">Home</a>
            </li>

            <li className="breadcrumb-item">
              <a href="#">Pages</a>
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
          >
            <h4 className="text-primary">Contact Us</h4>

            <h1 className="display-4 mb-4">
              Have Any Questions About Smart Parking?
            </h1>

            <p className="mb-0">
              Contact us for any questions, suggestions or information
              about our Smart Parking System.
            </p>
          </div>

          <div className="row g-5">

            {/* Image */}
            <div className="col-xl-6">
              <div className="contact-img d-flex justify-content-center">
                <div className="contact-img-inner">
                  <img
                    src="img/contact-img.png"
                    className="img-fluid w-100"
                    alt="Smart Parking"
                  />
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="col-xl-6">
              <h4 className="text-primary mb-3">
                Send Your Message
              </h4>

              <p className="mb-4">
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
          rows="5"
          required
        ></textarea>
        <label htmlFor="message">Message</label>
      </div>
    </div>

    {/* Button */}
    <div className="col-12">
      <button type="submit" className="contact-submit">
        Send Message
      </button>
    </div>

  </div>
</form>
            </div>

            {/* Contact Information */}
            <div className="col-12 mt-4">
              <div className="row g-4">

                {/* Address */}
                <div className="col-12 col-sm-6 col-lg-3">
                  <div className="contact-add-item">
                    <div className="text-primary mb-3">
                      <i className="fas fa-map-marker-alt fa-2x"></i>
                    </div>

                    <h4>Address</h4>

                    <p className="mb-0">
                      Smart Parking Office, India
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="col-12 col-sm-6 col-lg-3">
                  <div className="contact-add-item">
                    <div className="text-primary mb-3">
                      <i className="fas fa-envelope fa-2x"></i>
                    </div>

                    <h4>Mail Us</h4>

                    <p className="mb-0">
                      info@smartparking.com
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="col-12 col-sm-6 col-lg-3">
                  <div className="contact-add-item">
                    <div className="text-primary mb-3">
                      <i className="fas fa-phone-alt fa-2x"></i>
                    </div>

                    <h4>Telephone</h4>

                    <p className="mb-0">
                      +91 98765 43210
                    </p>
                  </div>
                </div>

                {/* Smart Parking */}
                <div className="col-12 col-sm-6 col-lg-3">
                  <div className="contact-add-item">
                    <div className="text-primary mb-3">
                      <i className="fas fa-parking fa-2x"></i>
                    </div>

                    <h4>Smart Parking</h4>

                    <p className="mb-0">
                      Easy &amp; Smart Parking
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Map */}
            <div className="col-12 mt-4 mb-5">
              <div className="rounded overflow-hidden">
                <iframe
                  title="Parking Location"
                  className="rounded w-100 border-0"
                  style={{ height: "400px" }}
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