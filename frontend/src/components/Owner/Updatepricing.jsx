import React, { useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import Apiservices from "../../../Apiservices";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Updateprice() {
   

    const navigate = useNavigate();
   
    const{_id} = useParams();
  
  const [slotType, setslotType] = useState("");
  const [hourlyRate, sethourlyRate] = useState("");
  const [dailyRate, setdailyRate] = useState("");
  const [monthlyRate, setmonthlyRate] = useState("");

  console.log(_id);

  const GetSingleprice = async () => {
    try {
      const res = await Apiservices.GetSingleprice({ _id:_id});

      if (res.data.success) {
        setslotType(res.data.data.slotType);
        sethourlyRate(res.data.data.hourlyRate);
        setdailyRate(res.data.data.dailyRate);
        setmonthlyRate(res.data.data.monthlyRate);
      
       
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    GetSingleprice();
  }, []);

  const submit = async (e) =>{
      
    e.preventDefault();

    try{

    // let formData= new FormData()

    // formData.append("_id", _id);
    // formData.append("slotType",slotType)
    // formData.append("hourlyRate",hourlyRate)
    // // console.log(dailyRate);
    let data={
        _id,
        slotType:slotType,
        hourlyRate:hourlyRate,
        dailyRate:dailyRate,
        monthlyRate:monthlyRate,
    }
    

    // if(!!dailyRate){

    //   formData.append("dailyRate",dailyRate)
    // }

    //  if (dailyRate) {
    //     formData.append("dailyRate", dailyRate);
    //   }

    const res = await Apiservices.Updateprice(data);
    if(res.data.success){
        toast.success(res.data.message)
        navigate("/owner/manageprice");
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
                        <span>Updateprice</span>
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
                            placeholder="hourlyRate"
                            value={hourlyRate}
                            onChange={(e) => {
                              sethourlyRate(e.target.value);
                            }}
                          />
                        </div>

                          <div>
                          <input
                            type="text"
                            placeholder="dailyRate"
                            value={dailyRate}
                            onChange={(e) => {
                              setdailyRate(e.target.value);
                            }}
                          />
                        </div>

                         <div>
                          <input
                            type="text"
                            placeholder="monthlyRate"
                            value={monthlyRate}
                            onChange={(e) => {
                              setmonthlyRate(e.target.value);
                            }}
                          />
                        </div>
                       
                        
                        

                        {/* <div>
                          <input
                            type="file"
                            placeholder="Image"
                            onChange={(e) => {
                              setdailyRate(e.target.files[0]);
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
export default Updateprice