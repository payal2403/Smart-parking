import { useEffect, useState } from "react";
import Apiservices from "../../Apiservices";


export default function View() {
  const [parkings, setparkings] = useState([]);
  const [selectedParking, setSelectedParking] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchparkings = async () => {
    try {
      const res = await Apiservices.ManageSpace();

      if (res.data.success && Array.isArray(res.data.data)) {
        setparkings(res.data.data);
      } else {
        setparkings([]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchparkings();
  }, []);

  return (
    <div className="container-fluid bg-light py-5 " >
      <div className="container py-5">
        <div className="row  g-4 ">
          <h1 className="font fs-1 ">View space</h1>

          {parkings.length > 0 ? (
            parkings.map((el, index) => (
              <div key={index} className="col-4">

                <div className="custom-card ">

                  {/* Icon */}
                  <div className="icon-box">
                    <i className="fa fa-map-marker-alt"></i>
                  </div>

                
                  <h5>{el.title || "Parking Space"}</h5>

      
                  {/* <p>📍 {el.address || "No Address"}</p> */}

           
                  <p className="desc">
                    Parking space added by owner. Manage and monitor easily.
                  </p>

                  <button
                    className="btn-view"
                    onClick={() => {
                      setSelectedParking(el);
                      setShowModal(true);
                    }}
                  >
                    View Details
                  </button>

                </div>
              </div>
            ))
          ) : (
            <p className="text-center">No parking spaces available</p>
          )}

        </div>
      </div>

    
      {showModal && (
        <div className="custom-modal">
          <div className="modal-box">

            <h3>Parking Details</h3>

            <p><strong>Title:</strong> {selectedParking?.title}</p>
            <p><strong>📍Address:</strong> {selectedParking?.address}</p>

       
            {/* <p><strong>Area:</strong> {selectedParking?.totalArea}</p> */}
            {/* <p><strong>Type:</strong> {selectedParking?.parkingType}</p> */}

            <button
              className="my-close-btn"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>

          </div>
        </div>
      )}
    </div>
  );
}