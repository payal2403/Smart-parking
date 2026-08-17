import React, { useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import Apiservices from "../../../Apiservices";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function UpdateCategory() {
   

    const navigate = useNavigate();

const {_id} = useParams();
  
  const [name, setname] = useState("");
  const [description, setdescription] = useState("");
  const [parking_images, setparking_images] = useState(null);


  const getSingleCat = async () => {
    try {
      const res = await Apiservices.GetSingleCate({ _id:_id});

      if (res.data.success) {
        setname(res.data.data.name);
        setdescription(res.data.data.description);
       
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getSingleCat();
  }, []);

  const submit = async (e) =>{
      
    e.preventDefault();

    try{

    let formData= new FormData()

    formData.append("_id", _id);
    formData.append("name",name)
    formData.append("description",description)
    // console.log(parking_images);
    

    if(!!parking_images){

      formData.append("parking_images",parking_images)
    }

    //  if (parking_images) {
    //     formData.append("parking_images", parking_images);
    //   }

    const res = await Apiservices.UpdateCategory(formData);
    if(res.data.success){
        toast.success(res.data.message)
        navigate("/admin/manageCategory");
    }
    else{
        toast.error(res.data.message)
    }

    }
    catch(err){
      console.log(err);
    }
  }
  return(


     <>
     {/* contact section */ }
        < section className = "update_section layout_padding" >
            <div className="container">
                <div className="Update_container">
                    <h1>
                        <span>UpdateCategory</span>
                    </h1>
                </div>
                <div className="layout_padding2-top">
                    <div className="row justify-content-center">
                        <div className="col-md-6 ">
                           <form onSubmit={submit}>
                  
                        <div>
                          <input  className='form-control'
                            type="text"
                            placeholder="name"
                            value={name}
                            onChange={(e) => {
                              setname(e.target.value);
                            }}
                          />
                        </div>

                        <div>
                          <input className='form-control'
                            type="text"
                            placeholder="Description"
                            value={description}
                            onChange={(e) => {
                              setdescription(e.target.value);
                            }}
                          />
                        </div>

                        <div>
                          <input className='form-control'
                            type="file"
                            placeholder="Image"
                            onChange={(e) => {
                              setparking_images(e.target.files[0]);
                            }}
                          />
                        </div>
                        <div className="mt-5">
                          {/* <button type="submit" >Update</button> */}
                          <button type="button" class="btn btn-outline-primary">Update</button>

                        </div>
                        </form> 
                                     
                        
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    
  )
}
export default UpdateCategory