 import React from 'react'
const About=()=>{
    return(
        <>


 
   {/* Header Start */}
  <div className="container-fluid bg-breadcrumb">
    <div className="container text-center py-5" style={{ maxWidth: 900 }}>
      <h4
        className="text-white display-4 mb-4 wow fadeInDown"
        data-wow-delay="0.1s"
      >
        About Us
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
        <li className="breadcrumb-item active text-primary">About</li>
      </ol>
    </div>
  </div>
  {/* Header End */}
  <p />


  
  {/* About Start */}
  <div className="container-fluid bg-light about py-5">
    <div className="container py-5">
      <div className="row g-5">
        <div className="col-xl-6 wow fadeInLeft" data-wow-delay="0.2s">
          <div className="about-item-content bg-white rounded p-5 h-100">
            <h4 className="text-primary">About Our Company</h4>
            <h1 className="display-4 mb-4">
              High Range of Exploring Protection
            </h1>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sunt
              debitis sint tempora. Corporis consequatur illo blanditiis
              voluptates aperiam quos aliquam totam aliquid rem explicabo,
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae
              praesentium recusandae eligendi modi hic
            </p>
            <p className="text-dark">
              <i className="fa fa-check text-primary me-3" />
              We can save your money.
            </p>
            <p className="text-dark">
              <i className="fa fa-check text-primary me-3" />
              Production or trading of good
            </p>
            <p className="text-dark mb-4">
              <i className="fa fa-check text-primary me-3" />
              Our life insurance is flexible
            </p>
            <a className="btn btn-primary rounded-pill py-3 px-5" href="#">
              More Information
            </a>
          </div>
        </div>
        <div className="col-xl-6 wow fadeInRight" data-wow-delay="0.2s">
          <div className="bg-white rounded p-5 h-100">
            <div className="row g-4 justify-content-center">
              <div className="col-12">
                <div className="rounded bg-light">
                  <img
                    src="img/about-1.png"
                    className="img-fluid rounded w-100"
                    alt=""
                  />
                </div>
              </div>
              <div className="col-sm-6">
                <div className="counter-item bg-light rounded p-3 h-100">
                  <div className="counter-counting">
                    <span
                      className="text-primary fs-2 fw-bold"
                      data-toggle="counter-up"
                    >
                      129
                    </span>
                    <span className="h1 fw-bold text-primary">+</span>
                  </div>
                  <h4 className="mb-0 text-dark">Insurance Policies</h4>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="counter-item bg-light rounded p-3 h-100">
                  <div className="counter-counting">
                    <span
                      className="text-primary fs-2 fw-bold"
                      data-toggle="counter-up"
                    >
                      99
                    </span>
                    <span className="h1 fw-bold text-primary">+</span>
                  </div>
                  <h4 className="mb-0 text-dark">Awards WON</h4>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="counter-item bg-light rounded p-3 h-100">
                  <div className="counter-counting">
                    <span
                      className="text-primary fs-2 fw-bold"
                      data-toggle="counter-up"
                    >
                      556
                    </span>
                    <span className="h1 fw-bold text-primary">+</span>
                  </div>
                  <h4 className="mb-0 text-dark">Skilled Agents</h4>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="counter-item bg-light rounded p-3 h-100">
                  <div className="counter-counting">
                    <span
                      className="text-primary fs-2 fw-bold"
                      data-toggle="counter-up"
                    >
                      967
                    </span>
                    <span className="h1 fw-bold text-primary">+</span>
                  </div>
                  <h4 className="mb-0 text-dark">Team Members</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* About End */}
  <p />
</>

  


    )
}

export default About;