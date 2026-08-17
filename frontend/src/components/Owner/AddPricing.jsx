import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast, Zoom } from "react-toastify";
import {RingLoader} from "react-spinners"
import Apiservices from "../../../Apiservices";


const SetPrice = () => {
  const [slotType, setslotType] = useState("");
  const [hourlyRate, sethourlyRate] = useState("");
  const [dailyRate, setdailyRate] = useState("");
  const [monthlyRate, setmonthlyRate] = useState("");


   const [data, setdata] = useState([]);


  
  useEffect(() => {
    fetch();
  }, []);
  
  const fetch = async () => {
    setloading(true)
    try {
      const res = await Apiservices.Addprice();

    
      console.log(res);
      setdata(res.data.data);
    } catch (err) {
      console.log(err);
    }finally{
      setloading(false)
    }
  };

  const[loading,setloading]=useState(false);

  const handleForm = (e) => {
    e.preventDefault();
    setloading(true)
  
    const token=sessionStorage.getItem("token");

   
    const head={
        Authorization:token
    }
    

    let data={
        slotType:slotType,
        dailyRate:dailyRate,
        hourlyRate:hourlyRate,
        monthlyRate:monthlyRate
       
        
    }


    // let data=new FormData()
    // data.append("slotType",slotType)
    // data.append("hourlyRate",hourlyRate)
    // data.append("monthlyRate",monthlyRate)
    
    
      Apiservices.Addprice(data)
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
         
          backgroundColor:"rgba(131, 136, 182, 0.4)",
          display:"flex",
          alignItems:"center",
          justifyContent:"center",
          zIndex:"9999"
         }
         
         }><RingLoader size={100} color="#015FC9" /></div>
        )}

   
     {/* contact section */ }
        < section className = "contact_section layout_padding" >
            <div className="container">
                <div className="heading_container">
                    <h1>
                        <span>SetPrice Here</span>
                    </h1>
                </div>
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
                                                     <label htmlFor="text">SlotType:</label>
                                                </td>
                                                <td>
                                                     {/* <input className="slotType"
                                                type="text"
                                                placeholder="slotType"
                                                value={slotType}
                                                onChange={(e) => {
                                                    setslotType(e.target.value);
                                                }}
                                            /> */}

                                            <select  value={slotType}
                                                onChange={(e) => {
                                                    setslotType(e.target.value);
                                                }} className="form-control" name="" id="">
                                                <option value="">Chosse One</option>
                                                <option value="car">Car</option>
                                                <option value="Bike">Bike</option>
                                                <option value="Cycle">Cycle</option>
                                            </select>
                                                </td>
                                            </tr>

                                            <tr>
                                                <td>
                                                 <label htmlFor="Numberl">HourlyRate:</label>
                                                </td>
                                                <td>
                                                     <input className=" form-control"
                                                type="Number"
                                                placeholder="hourlyRate"
                                                value={hourlyRate}
                                                onChange={(e) => {
                                                    sethourlyRate(e.target.value);
                                                }}
                                            />
                                                </td>
                                            </tr>
                                              <tr>
                                                <td>
                                                 <label htmlFor="Numberl">MonthlyRate:</label>
                                                </td>
                                                <td>
                                                     <input className=" form-control"
                                                type="Number"
                                                placeholder="monthlyRate"
                                                value={monthlyRate}
                                                onChange={(e) => {
                                                    setmonthlyRate(e.target.value);
                                                }}
                                            />
                                                </td>
                                            </tr>

                                              <tr>
                                                <td>
                                                 <label htmlFor="Numberl">DailyRate:</label>
                                                </td>
                                                <td>
                                                     <input className=" form-control"
                                                type="Number"
                                                placeholder="dailyRate"
                                                value={dailyRate}
                                                onChange={(e) => {
                                                    setdailyRate(e.target.value);
                                                }}
                                            />
                                                </td>
                                            </tr>

                                              


                                            {/* <tr>
                                                <td>
                                                 <label htmlFor="Numberl">MonthlyRate:</label>
                                                </td>
                                                <td>
                                                   <select className="form-control" value={dailyRate}
                                                onChange={(e) => {
                                                    setdailyRate(e.target.value);
                                                }} name="" id="">
                                                    <option value="">Choose One</option>
                                               
                                                    {
                                                        
                                                        data.map((el)=>{
                                                            return  <option value={el._id}>{el.monthlyRate}</option>
                                                        })
                                                    }
                                                   </select>
                                                </td>
                                            </tr> */}

                                            {/* <tr>
                                                <td>
                                                 <label htmlFor="Numberl">AreaUsed</label>
                                                </td>
                                                <td>
                                                     <input className="max"
                                                type="text"
                                                placeholder="monthlyRate"
                                                
                                                onChange={(e) => {
                                                    setmonthlyRate(e.target.files[0])
                                                }}
                                            />
                                                </td>
                                            </tr> */}

                                            {/* <tr>
                                                <td>
                                                 <label htmlFor="areaUSed">AreaUsed:</label>
                                                </td>
                                                <td>
                                                     <input className="area"
                                                type="text"
                                                placeholder="monthlyRate"
                                                value={monthlyRate}
                                                onChange={(e) => {
                                                    setmonthlyRate(e.target.value);
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
                                            <button type="submit" className="register" >AddPrice</button>
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
            
            </>

  )
}

       
export default SetPrice;
