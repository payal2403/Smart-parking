import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast, Zoom } from "react-toastify";
import Apiservices from "../../../Apiservices";
import Switch from "react-switch";
import { useNavigate } from "react-router-dom";
import {RingLoader} from "react-spinners"

const Manageslot = () => {
  const [data, setdata] = useState([]);
   const[loading,setloading]=useState(false);

  const navigate = useNavigate();
  
  useEffect(() => {
    getslots();
  }, []);
  
  const getslots = async () => {
    setloading(true)
    try {
      const res = await Apiservices.ManageSlot();
      console.log(res.data.data);
      setdata(res.data.data);
    } catch (err) {
      console.log(err);
    }finally{
      setloading(false)
    }
  };

  // HARD DELETE
  const Deleteslot = (id) => {
    
    // console.log("HLO",id);
    
    const data = {
      _id: id,
    };
    
  
    Apiservices.Deleteslot(data)
      .then((res) => {
        console.log(res);

        if (res.data.success) {
          toast.success(res.data.message);
          getslots();
        } else {
          toast.warning(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      
  };

  
  const toggelStatus = async (id) => {
    setloading(true)
    
    setdata((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, status: !item.status } : item,
      ),
    );

    const data1 = {
      _id: id,
    };

    try {
    const res = await Apiservices.SoftDeleteSlot(data1);
      if (res.data.success) {
        toast.success(res.data.message);
      } else {
        toast.warning(res.data.message);
      }
    } catch (err) {
      console.log(err);
    }finally{
        setloading(false);
      }
  };
return(


     <>
     {/* contact section */ }
        < section className = "contact_section layout_padding" >
            <div className="container">
                <div className="heading_container">
                    <h1>
                        <span>Manageslot</span>
                    </h1>
                </div>
                <div className="layout_padding2-top">
                    <div className="row justify-content-center">
                        <div className="col-md-6 ">
                           
                                     
                                    <table className="table">
                    <thead>
                      <tr>
                        <th scope="col" className="=form-control" >Sno</th>
                        <th scope="col">slotType</th>
                        <th scope="col">maxVehicleCount</th>
                        <th scope="col">AreaUsed</th>
                        {/* <th scope="col">Image</th> */}
                        <th scope="col">Action</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((el, i) => (
                        <tr key={el._id}>
                          <th scope="row">{i + 1}</th>
                          <td>{el.slotType}</td>
                          <td>{el.maxVehicleCount}</td>
                          <td>{el.areaUsed}</td>
                          {/* <td>
                            <img
                              src={ el.image}
                              alt="Image"
                              width={50}
                            />
                          </td> */}

                          <td>
                            <Switch
                              checked={el.status}
                              onChange={() => toggelStatus(el._id)}
                            />
                          </td>

                         <td>
                            <button
                         className="btn btn-secondary"
                   onClick={() => navigate(`/owner/updateslots/${el._id}`)}
                     >Edit
                   </button>
</td>
<td>
                     
                            <button
                              onClick={() => {
                                Deleteslot(el._id);
                              }}
                              className="btn btn-danger"
                            >
                              Delete
                            </button>
                          </td>

                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    
  )
}

export default Manageslot