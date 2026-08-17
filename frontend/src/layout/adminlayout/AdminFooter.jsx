import { Link } from "react-router-dom";

const AdminFooter = () => {
  return (
    <>
      <div className="container-fluid footer py-5">
        <div className="container">
          <div className="row g-5">

            {/* Logo + About */}
            <div className="col-lg-4">
              <div className="footer-item">
                <h3 className="text-white mb-3">
                  <i className="fa fa-car me-2" /> ParkEase
                </h3>
                <p className="text-light">
                  Book parking spaces online before arrival and avoid unnecessary waiting time. 
                  Smart, fast and reliable parking system.
                </p>

                {/* Social */}
                <div className="d-flex mt-3">
                  <a className="btn btn-sm-square me-2" href="#"><i className="fab fa-facebook-f" /></a>
                  <a className="btn btn-sm-square me-2" href="#"><i className="fab fa-twitter" /></a>
                  <a className="btn btn-sm-square me-2" href="#"><i className="fab fa-instagram" /></a>
                  <a className="btn btn-sm-square" href="#"><i className="fab fa-linkedin-in" /></a>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="col-lg-3">
              <div className="footer-item">
                <h5 className="text-white mb-3">Quick Links</h5>

                <Link to="/" className="footer-link">Home</Link>
                <Link to="/admin/addcategory" className="footer-link">Add Category</Link>
                <Link to="/admin/managecategory" className="footer-link">Manage Category</Link>
                <Link to="/admin/managespace" className="footer-link">Manage Space</Link>
              </div>
            </div>

            {/* Contact */}
            <div className="col-lg-3">
              <div className="footer-item">
                <h5 className="text-white mb-3">Contact</h5>

                <p><i className="fa fa-map-marker-alt me-2" /> India</p>
                <p><i className="fa fa-envelope me-2" /> parkease@gmail.com</p>
                <p><i className="fa fa-phone me-2" /> +91 9876543210</p>
              </div>
            </div>

            {/* Newsletter */}
            <div className="col-lg-2">
              <div className="footer-item">
                <h5 className="text-white mb-3">Newsletter</h5>

                <input
                  type="email"
                  className="form-control mb-2"
                  placeholder="Email"
                />

                <button className="btn btn-primary w-100">
                  Subscribe
                </button>
              </div>
            </div>

          </div>

          {/* Bottom line */}
          <div className="text-center pt-4 mt-4 border-top border-secondary">
            <p className="mb-0 text-light">
              © 2026 ParkEase | All Rights Reserved
            </p>
          </div>

        </div>
      </div>
    </>
  );
};

export default AdminFooter;