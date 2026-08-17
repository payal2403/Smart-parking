import React, { useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import Apiservices from "../../../Apiservices";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function UpdateSpace() {
   

    const navigate = useNavigate();

const {_id} = useParams();
  
  const [title, settitle] = useState("");
  const [address, setaddress] = useState("");
  const [latitude, setlatitude] = useState("");
  const [longitude, setlongitude] = useState("");
  const [totalArea, settotalArea] = useState("");
  const [parking_images, setparking_images] = useState(null);


  const getSinglespace = async () => {
    try {
      const res = await Apiservices.GetSinglespace({ _id:_id});

      if (res.data.success) {
        settitle(res.data.data.title);
        setaddress(res.data.data.address);
        setlatitude(res.data.data.latitude);
        setlongitude(res.data.data.longitude);
        settotalArea(res.data.data.totalArea);
       
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getSinglespace();
  }, []);

  const submit = async (e) =>{
      
    e.preventDefault();

    try{

    let formData= new FormData()

    formData.append("_id", _id);
    formData.append("title",title)
    formData.append("address",address)
    formData.append("latitude",latitude)
    formData.append("longitude",longitude)
    formData.append("totalArea",totalArea)
    // console.log(image);
    

    if(!!parking_images){

      formData.append("parking_images",parking_images)
    }

    //  if (image) {
    //     formData.append("image", image);
    //   }

    const res = await Apiservices.UpdateSpace(formData);
    if(res.data.success){
        toast.success(res.data.message)
        navigate("/owner/managespace");
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
        < section className = "contact_section layout_padding" >
            <div className="container">
                <div className="heading_container">
                    <h1>
                        <span>UpdateSpace</span>
                    </h1>
                </div>
                <div className="layout_padding2-top">
                    <div className="row justify-content-center">
                        <div className="col-md-6 ">
                           <form onSubmit={submit}>
                           <div>
                          {/* {name} */}
                          <input
                            type="text"
                            placeholder="title"
                            value={title}
                            onChange={(e) => {
                              settitle(e.target.value);
                            }}
                          />
                        </div>

                        <div>
                          <input
                            type="text"
                            placeholder="address"
                            value={address}
                            onChange={(e) => {
                              setaddress(e.target.value);
                            }}
                          />
                        </div>

                          <div>
                          <input
                            type="text"
                            placeholder="latitude"
                            value={latitude}
                            onChange={(e) => {
                              setlatitude(e.target.value);
                            }}
                          />
                        </div>

                          <div>
                          <input
                            type="text"
                            placeholder="longitude"
                            value={longitude}
                            onChange={(e) => {
                              setlongitude(e.target.value);
                            }}
                          />
                        </div>
                          <div>
                          <input
                            type="text"
                            placeholder="totalArea"
                            value={totalArea}
                            onChange={(e) => {
                              settotalArea(e.target.value);
                            }}
                          />
                        </div>


                        <div>
                          <input
                            type="file"
                            placeholder="Image"
                            onChange={(e) => {
                              setparking_images(e.target.files[0]);
                            }}
                          />
                        </div>
                        <div className="mt-5">
                          <button type="submit">Update</button>
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
export default UpdateSpace