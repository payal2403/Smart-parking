import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast, Zoom } from "react-toastify";
import Apiservices from "../../../Apiservices";
import Switch from "react-switch";
import { useNavigate } from "react-router-dom";
import { RingLoader } from "react-spinners"

const ManageCategory = () => {
  const [data, setdata] = useState([]);
  const [loading, setloading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fatch();
  }, []);

  const fatch = async () => {
    setloading(true)
    try {
      const res = await Apiservices.ManageCategory();
      console.log(res.data.data);
      setdata(res.data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setloading(false)
    }
  };

  // HARD DELETE
  const deleteCate = (id) => {

    // console.log("HLO",id);

    const data1 = {
      _id: id,
    };


    Apiservices.DeleteCategory(data1)
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

    const res = await Apiservices.SoftDeleteCategory(data1);
    try {
      if (res.data.success) {
        toast.success(res.data.message);
      } else {
        toast.warning(res.data.message);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setloading(false);
    }
  };
  return (


    <>
      {/* contact section */}
      < section className="manage_section layout_padding" >
       <h1>
              <span style={{
                 fontFamily: "Poppins, sans-serif",
                  fontSize: "28px",
                    color: "#333",
              }} >ManageCategory</span>
            </h1>
        <div className="container">
          <div className="heading_container">
           
                    </div>
          <div className="layout_padding2-top">
            <div className="row justify-content-center">
              <div className="col-md-6 ">


                <table class="table" >
                  <thead>
                    <tr>
                      <th className="text-center" scope="col">Sno</th>
                      <th className="text-center" scope="col">Name</th>
                      <th className="text-center" scope="col">Description</th>
                      <th className="text-center" scope="col">Image</th>
                      <th className="text-center"scope="col">Action</th>
                      <th className="text-center"scope="col">Edit</th>
                      <th className="text-center"scope="col">Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((el, i) => (
                      <tr key={el._id}>
                        <th  className="text-center" scope="row">{i + 1}</th>
                        <td className="text-center">{el.name}</td>
                        <td className="text-center">{el.description}</td>
                        <td className="text-center">
                          <img
                            src={el.image}
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
                            onClick={() => navigate(`/admin/updateCategory/${el._id}`)}
                            >Edit
                          </button>
                        </td>
                        <td>

                          <button
                            onClick={() => {
                              deleteCate(el._id);
                            }}
                            class="btn btn-danger"
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

export default ManageCategory