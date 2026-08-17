import { useEffect, useState } from "react";
import Apiservices from "../../Apiservices";
// import "/viewslots.css"

export default function Viewslots() {
  const [slots, setslots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchslots = async () => {
    try {
      const res = await Apiservices.ManageSlot();

      if (res.data.success && Array.isArray(res.data.data)) {
        setslots(res.data.data);
      } else {
        setslots([]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchslots();
  }, []);

  return (
    <div className="container-fluid bg-light py-5">
      <div className="container py-5">
        <div className="row d-flex g-4">

          {slots.length > 0 ? (
            slots.map((el, index) => (
              <div key={index} className="col-4">

                <div className="custom-card">

                  {/* Icon */}
                  <div className="icon-box">
                    <i className="fa fa-car"></i>
                  </div>

                
                  <h5>{el.slotType || "Parking Slot"}</h5>

                
                  
                  <p className="desc">
                    Owner-added slot. Manage and monitor easily.
                  </p>

                  
                  <button
                    className="btn-view"
                    onClick={() => {
                      setSelectedSlot(el);
                      setShowModal(true);
                    }}
                  >
                    View Details
                  </button>

                </div>
              </div>
            ))
          ) : (
            <p className="text-center">No slots available</p>
          )}

        </div>
      </div>

    
      {showModal && (
        <div className="custom-modal">
          <div className="modal-box">

            <h3>Slot Details</h3>

            <p><strong>Type:</strong> {selectedSlot?.slotType}</p>
            <p><strong>Max Vehicles:</strong> {selectedSlot?.maxVehicleCount}</p>
            <p><strong>Area Used:</strong> {selectedSlot?.areaUsed}</p>

            <button
              className="btn-close"
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