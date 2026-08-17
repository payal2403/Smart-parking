import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast, Zoom } from "react-toastify";
import Apiservices from "../../../Apiservices";
import Switch from "react-switch";
import { useNavigate } from "react-router-dom";
import {RingLoader} from "react-spinners"

const ManageSpace = () => {
  const [data, setdata] = useState([]);
   const[loading,setloading]=useState(false);

  const navigate = useNavigate();
  
  useEffect(() => {
    fatch();
  }, []);
  
  const fatch = async () => {
    setloading(true)
    try {
      const res = await Apiservices.ManageSpace();
      console.log(res.data.data);
      setdata(res.data.data);
    } catch (err) {
      console.log(err);
    }finally{
      setloading(false)
    }
  };

  // HARD DELETE
  const deletespace = (id) => {
    
    // console.log("HLO",id);
    
    const data1 = {
      _id: id,
    };
    
  
    Apiservices.DeleteSpace(data1)
      .then((res) => {
        console.log(res);

        if (res.data.success) {
          toast.success(res.data.message);
          fatch();
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

    const res = await Apiservices.SoftDeleteSpace(data1);
    try {
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
                        <span>ManageSpace</span>
                    </h1>
                </div>
                <div className="layout_padding2-top">
                    <div className="row justify-content-center">
                        <div className="col-md-6 ">
                           
                                     
                                    <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">Sno</th>
                        <th scope="col">title</th>
                        <th scope="col">address</th>
                        <th scope="col">latitude</th>
                        <th scope="col">longitude</th>
                        <th scope="col">totalArea</th>
                        <th scope="col">Image</th>
                        <th scope="col">Action</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((el, i) => (
                        <tr key={el._id}>
                          <th scope="row">{i + 1}</th>
                          <td>{el.title}</td>
                          <td>{el.address}</td>
                          <td>{el.latitude}</td>
                          <td>{el.longitude}</td>
                          <td>{el.totalArea}</td>
                          <td>
                            <img
                              src={ el.parking_images}
                              alt="Image"
                              width={50}
                            />
                          </td>

                          <td>
                            <Switch
                              checked={el.status}
                              onChange={() => toggelStatus(el._id, el.status)}
                            />
                          </td>

                         <td>
                            <button
                         className="btn btn-secondary"
                   onClick={() => navigate(`/owner/updateSpace/${el._id}`)}
                     >Edit
                   </button>
</td>
<td>
                     
                            <button
                              onClick={() => {
                                deletespace(el._id);
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
          <div class="service-content p-4">
                        <div class="service-content-inner">
                            <a href="#" class="d-inline-block h4 mb-4">Nearest Parking Finder</a>
                            <p class="mb-4">Locate nearby parking spaces quickly using smart GPS tracking.</p>
                            <a class="btn btn-primary rounded-pill py-2 px-4" href="#">Read More</a>
                        </div>
                    </div>
      </>
    
  )
}

export default ManageSpace