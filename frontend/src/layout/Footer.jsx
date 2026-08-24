 import { Link } from "react-router-dom";
 const Footer=()=>{
    return(
        <>
        {/* Footer Start */}
 <div className="container-fluid footer py-4" data-aos="fade-down-right">
  <div className="container">

    <div className="row g-4">

     
      <div className="col-lg-8">
        <div className="row g-4">

          {/* About */}
          <div className="col-md-6">
            <h4 className="text-white mb-3">
              <i className="fas fa-parking me-2"></i>
              ParkEase
            </h4>

            <p className="text-white-50 mb-3">
              Find available parking spaces quickly and easily.
              Park your vehicle safely and save your valuable time.
            </p>

            <div className="d-flex">
              <a href="#" className="btn btn-sm btn-primary rounded-circle me-2">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="btn btn-sm btn-primary rounded-circle me-2">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="btn btn-sm btn-primary rounded-circle me-2">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="btn btn-sm btn-primary rounded-circle">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-md-3">
            <h5 className="text-white mb-3">Quick Links</h5>

            <Link to="/" className="d-block text-white-50 text-decoration-none mb-2">
              Home
            </Link>
            <Link to="/about" className="d-block text-white-50 text-decoration-none mb-2">
              About Us
            </Link>
            <Link to="/view" className="d-block text-white-50 text-decoration-none mb-2">
              Find Parking
            </Link>
            
            <Link to="/Service" className="d-block text-white-50 text-decoration-none mb-2">
              Services
            </Link>

             <Link to="/Service" className="d-block text-white-50 text-decoration-none mb-2">
              FAQ
            </Link>

            <Link to="/contact" className="d-block text-white-50 text-decoration-none">
              Contact
            </Link>
          </div>

          {/* Services */}
          <div className="col-md-3">
            <h5 className="text-white mb-3">Services</h5>

            <p className="text-white-50 mb-2">
              <i className="fas fa-check text-primary me-2"></i>
              Find Parking
            </p>

            <p className="text-white-50 mb-2">
              <i className="fas fa-check text-primary me-2"></i>
              Book Parking
            </p>

            <p className="text-white-50 mb-2">
              <i className="fas fa-check text-primary me-2"></i>
              Secure Parking
            </p>

            <p className="text-white-50 mb-0">
              <i className="fas fa-check text-primary me-2"></i>
              Save Time
            </p>
          </div>

        </div>
      </div>


      {/* Right Side - Email */}
      <div className="col-lg-4">
        <div className="bg-dark rounded p-4 h-100">

          <h5 className="text-white mb-3">
            Stay Connected
          </h5>

          <p className="text-white-50 small mb-3">
            Subscribe to get updates about new parking locations
            and useful parking information.
          </p>

          <div className="input-group mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Your email"
            />

            <button className="btn btn-primary">
              Subscribe
            </button>
          </div>

          <p className="text-white-50 small mb-0">
            <i className="fas fa-envelope text-primary me-2"></i>
            support@parkease.com
          </p>

        </div>
      </div>

    </div>


    {/* Bottom */}
    <div className="border-top border-secondary mt-4 pt-3">
      <div className="row">

        <div className="col-md-6">
          <p className="text-white-50 small mb-0">
            © 2026 ParkEase. All Rights Reserved.
          </p>
        </div>

        <div className="col-md-6 text-md-end">
          <a href="#" className="text-white-50 small text-decoration-none me-3">
            Privacy Policy
          </a>

          <a href="#" className="text-white-50 small text-decoration-none">
            Terms & Conditions
          </a>
        </div>

      </div>
    </div>

  </div>
</div>


  {/* Footer End */}
        </>
    )
}
export default Footer;