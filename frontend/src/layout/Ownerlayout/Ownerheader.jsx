import { Link } from "react-router-dom";

const Ownerheader=()=>{
    return(
        <>  <div className="container-fluid topbar px-0 px-lg-4 bg-light py-2 d-none d-lg-block">
    <div className="container">
      <div className="row gx-0 align-items-center">
        <div className="col-lg-8 text-center text-lg-start mb-lg-0">
          <div className="d-flex flex-wrap">
            <div className="border-end border-primary pe-3">
              <a href="#" className="text-muted small">
                <i className="fas fa-map-marker-alt text-primary me-2" />
                Find A Location
              </a>
            </div>
            <div className="ps-3">
              <a href="mailto:example@gmail.com" className="text-muted small">
                <i className="fas fa-envelope text-primary me-2" />
                example@gmail.com
              </a>
            </div>
          </div>
        </div>
        <div className="col-lg-4 text-center text-lg-end">
          <div className="d-flex justify-content-end">
            <div className="d-flex border-end border-primary pe-3">
              <a className="btn p-0 text-primary me-3" href="#">
                <i className="fab fa-facebook-f" />
              </a>
              <a className="btn p-0 text-primary me-3" href="#">
                <i className="fab fa-twitter" />
              </a>
              <a className="btn p-0 text-primary me-3" href="#">
                <i className="fab fa-instagram" />
              </a>
              <a className="btn p-0 text-primary me-0" href="#">
                <i className="fab fa-linkedin-in" />
              </a>
            </div>
            <div className="dropdown ms-3">
              <a
                href="#"
                className="dropdown-toggle text-dark"
                data-bs-toggle="dropdown"
              >
                <small>
                  <i className="fas fa-globe-europe text-primary me-2" />{" "}
                  English
                </small>
              </a>
              <div className="dropdown-menu rounded">
                <a href="#" className="dropdown-item">
                  English
                </a>
                <a href="#" className="dropdown-item">
                  Bangla
                </a>
                <a href="#" className="dropdown-item">
                  French
                </a>
                <a href="#" className="dropdown-item">
                  Spanish
                </a>
                <a href="#" className="dropdown-item">
                  Arabic
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* Topbar End */}
  {/* Navbar & Hero Start */}
  <div className="container-fluid nav-bar px-0 px-lg-4 py-lg-0">
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-light">
        <a href="#" className="navbar-brand p-0">
          <h1 className="text-primary mb-0" >
            <i className="fab fa-slack me-2" /> ParkEase
          </h1>
          {/* <img src="img/logo.png" alt="Logo"> */}
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
        >
          <span className="fa fa-bars" />
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <div className="navbar-nav mx-0 mx-lg-auto">
            <Link to={"/home"} className="nav-item nav-link">
              Home
            </Link>
            {/* <Link to={"/owner/addspace"} className="nav-item nav-link">
              AddSpace
            </Link>
            <Link to={"/owner/managespace"} className="nav-item nav-link">
              ManageSpace
            </Link> */}
              <div className="nav-item dropdown">
              <Link to="#" className="nav-link" data-bs-toggle="dropdown">
                <span className="dropdown-toggle">Space</span>
              </Link>
              <div className="dropdown-menu">
                <Link to={"/owner/addspace"} className="dropdown-item">
                  Addspace
                </Link> 
                <Link to={"/owner/managespace"} className="dropdown-item">
                  Managespace
                </Link>
                </div>
                </div>
                  <div className="nav-item dropdown">
              <Link to="#" className="nav-link" data-bs-toggle="dropdown">
                <span className="dropdown-toggle">Slots</span>
              </Link>
              <div className="dropdown-menu">
                <Link to={"/owner/addslots"} className="dropdown-item">
                  Addslots
                </Link> 
                <Link to={"/owner/manageslots"} className="dropdown-item">
                  Manageslots
                </Link>
                </div>
                </div>
            {/* <Link to={"/owner/addslots"} className="nav-item nav-link">
              AddSlots
            </Link>
             <Link to={"/owner/manageslots"} className="nav-item nav-link">
           ManageSlots
            </Link> */}
              {/* <Link to={"/owner/addprice"} className="nav-item nav-link">
           Addprice
            </Link> */}
            <div className="nav-item dropdown">
              <Link to="#" className="nav-link" data-bs-toggle="dropdown">
                <span className="dropdown-toggle">Price</span>
              </Link>
              <div className="dropdown-menu">
                <Link to={"/owner/addprice"} className="dropdown-item">
                  Addprice
                </Link> 
                <Link to={"/owner/manageprice"} className="dropdown-item">
                  Manageprice
                </Link>
                {/* <Link to={"/Testimonial"} className="dropdown-item">
                  
                </Link>
                <Link to={"/FAQ"} className="dropdown-item">
                  FAQs
                </Link>
                <a href="404.html" className="dropdown-item">
                  404 Page
                </a> */}
              </div>
            </div>
            <Link to={"/contact"} className="nav-item nav-link active">
              Contact
            </Link>
            <div className="nav-btn px-3">
                <Link
                to={"/register"}
                className="btn btn-primary rounded-pill py-2 px-4 ms-3 flex-shrink-0"
              >
               
                Register
              </Link>


              {/* <button
                className="btn-search btn btn-primary btn-md-square rounded-circle flex-shrink-0"
                data-bs-toggle="modal"
                data-bs-target="#searchModal"
              >
                <i className="fas fa-search" />
              </button> */}


              <Link
                to={"/login"}
                className="btn btn-primary rounded-pill py-2 px-4 ms-3 flex-shrink-0"
              >
               
                Login
              </Link>
            </div>
          </div>
        </div>
        <div className="d-none d-xl-flex flex-shrink-0 ps-4">
          <a
            href="#"
            className="btn btn-light btn-lg-square rounded-circle position-relative wow tada"
            data-wow-delay=".9s"
          >
            <i className="fa fa-phone-alt fa-2x" />
            <div className="position-absolute" style={{ top: 7, right: 12 }}>
              <span>
                <i className="fa fa-comment-dots text-secondary" />
              </span>
            </div>
          </a>
          {/* <div className="d-flex flex-column ms-3">
            <span>Call to Our Experts</span>
            <a href="tel:+ 0123 456 7890">
              <span className="text-dark">Free: + 0123 456 7890</span>
            </a>
          </div> */}
        </div>
      </nav>
    </div>
  </div>
  {/* Navbar & Hero End */}
       
        </>
    )
}
export default Ownerheader;