import React, { useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import Apiservices from "../../../Apiservices";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function UpdateSlots() {
   

    const navigate = useNavigate();

const {_id} = useParams();
  
  const [slotType, setslotType] = useState("");
  const [maxVehicleCount, setmaxVehicleCount] = useState("");
  const [areaUsed, setareaUsed] = useState(null);


  const getSingleslot = async () => {
    try {
      const res = await Apiservices.GetSingleslot({ _id:_id});

      if (res.data.success) {
        setslotType(res.data.data.slotType);
        setmaxVehicleCount(res.data.data.maxVehicleCount);
        setareaUsed(res.data.data.areaUsed);
       
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getSingleslot();
  }, []);

  const submit = async (e) =>{
      
    e.preventDefault();

    try{

    // let formData= new FormData()

    // formData.append("_id", _id);
    // formData.append("slotType",slotType)
    // formData.append("maxVehicleCount",maxVehicleCount)
    // // console.log(areaUsed);
    let data={
      _id,
        slotType:slotType,
        maxVehicleCount:maxVehicleCount,
        areaUsed:"pending"
    }
    

    // if(!!areaUsed){

    //   formData.append("areaUsed",areaUsed)
    // }

    //  if (areaUsed) {
    //     formData.append("areaUsed", areaUsed);
    //   }

    const res = await Apiservices.UpdateSlot(data);
    if(res.data.success){
        toast.success(res.data.message)
        navigate("/owner/manageslots");
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
                        <span>UpdateSlots</span>
                    </h1>
                </div>
                <div className="layout_padding2-top">
                    <div className="row justify-content-center">
                        <div className="col-md-6 ">
                           <form onSubmit={submit}>
                           <div>
                          {/* {slotType} */}
                          <input
                            type="text"
                            placeholder="slotType"
                            value={slotType}
                            onChange={(e) => {
                              setslotType(e.target.value);
                            }}
                          />
                        </div>

                        <div>
                          <input
                            type="text"
                            placeholder="maxVehicleCount"
                            value={maxVehicleCount}
                            onChange={(e) => {
                              setmaxVehicleCount(e.target.value);
                            }}
                          />
                        </div>

                        {/* <div>
                          <input
                            type="file"
                            placeholder="Image"
                            onChange={(e) => {
                              setareaUsed(e.target.files[0]);
                            }}
                          />
                        </div> */}
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
export default UpdateSlots