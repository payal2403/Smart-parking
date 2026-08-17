import axios from "axios";
import React, { useState } from "react";
import { toast, Zoom } from "react-toastify";
import {RingLoader} from "react-spinners"


const AddCategory = () => {
  const [name, setname] = useState("");
  const [description, setdescription] = useState("");
  const [image, setimage] = useState("");

  const[loading,setloading]=useState(false);

  const handleForm = (e) => {
    e.preventDefault();
    setloading(true)
  
    const token=sessionStorage.getItem("token");

   
    const head={
        Authorization:token
    }
    

    // let data={
    //     name:name,
    //     description:description,
       
        
    // }


    let data=new FormData()
    data.append("name",name)
    data.append("description",description)
    data.append("image",image)
    
    axios
      .post("http://localhost:5001/apis/category/add", data)
      .then((res) => {
        console.log(res.data);

        if (res.data.success) {
          toast.success(res.data.message);
        } else {
          toast.warning(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);

        toast.error("There an error");
      }).finally(()=>{
        setloading(false)
      })
  };

  return (

    
    <>
        {loading &&(
         <div
         style={{
          position:"fixed",
          width:"100%",
          height:"100%",
          top:0,
          left:0,
          color:"#015FC9",
          backgroundColor:"rgba(0,0,0,0.5)",
          display:"flex",
          alignItems:"center",
          justifyContent:"center",
          zIndex:"9999"
         }
         
         }><RingLoader size={80} color="#fff" /></div>
        )}

   
     {/* contact section */ }
     <div className="addcat-bg">
  <div className="addcat-card">

    <h2>Add Category</h2>
< section className = "contact_section layout_padding" >
            <div className="container">
                
                <div className="layout_padding2-top">
                    <div className="row justify-content-center">
                        <div className="col-md-6 ">
                            <form onSubmit={handleForm}>
                                <div className="contact_form-container">
                                    <div>
                                     
                                     
                                          <table border="0" cellSpacing="0" cellPadding="10" width="100%">
                                            <tbody>
                                            <tr>
                                                <td>
                                                     <label htmlFor="text">Name:</label>
                                                </td>
                                                <td>
                                                     <input className="form-control"
                                                type="text"
                                                placeholder="name"
                                                value={name}
                                                onChange={(e) => {
                                                    setname(e.target.value);
                                                }}
                                            />
                                                </td>
                                            </tr>

                                            <tr>
                                                <td>
                                                 <label htmlFor="Numberl">Description:</label>
                                                </td>
                                                <td>
                                                     <input className="form-control"
                                                type="text"
                                                placeholder="description"
                                                value={description}
                                                onChange={(e) => {
                                                    setdescription(e.target.value);
                                                }}
                                            />
                                                </td>
                                            </tr>

                                            <tr>
                                                <td>
                                                 <label htmlFor="Numberl">Image:</label>
                                                </td>
                                                <td>
                                                     <input className="form-control"
                                                type="file"
                                                placeholder="image"
                                                
                                                onChange={(e) => {
                                                    setimage(e.target.files[0])
                                                }}
                                            />
                                                </td>
                                            </tr>

                                            {/* <tr>
                                                <td>
                                                 <label htmlFor="areaUSed">AreaUsed:</label>
                                                </td>
                                                <td>
                                                     <input className="area"
                                                type="text"
                                                placeholder="areaUsed"
                                                value={areaUsed}
                                                onChange={(e) => {
                                                    setareaUsed(e.target.value);
                                                }}
                                            />
                                                </td>
                                            </tr> */}
{/* 
                                            <tr>
                                                <td>
                                                 <label htmlFor="contact">Contact:</label>
                                                </td>
                                                <td>
                                                     <input className="contact"
                                                type="number"
                                                placeholder="Contact"
                                                value={Contact}
                                                onChange={(e) => {
                                                    setContact(e.target.value);
                                                }}
                                            />
                                                </td>
                                            </tr>

                                            <tr>
                                                <td>
                                                     <label htmlFor="address">Address:</label>
                                                </td>
                                                <td>
                                                     <input className="address"
                                                type="text"
                                                placeholder="Address"
                                                value={Adress}
                                                onChange={(e) => {
                                                    setAdress(e.target.value);
                                                }}
                                            />
                                                </td>
                                            </tr> */}
                                            </tbody>
                                          </table>
                                           
                                      
                                           
                                           
                                    
                                       

                                       
                                        
                                        

                                        <div className="mt-5">
                                            {/* <button type="submit" className="register" >Add</button> */}
                                             <button type="submit" className="btn btn-outline-primary">AddCategory
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    {/* end contact section */ }
            
  </div>
</div>
        
            </>

  )
}

       
export default AddCategory;
