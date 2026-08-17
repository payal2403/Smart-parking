import axios from "axios";
import React, { useState } from "react";
import { toast, Zoom } from "react-toastify";

const Register = () => {
    const [name, setname] = useState("");
    const [email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [Contact, setContact] = useState("");
    const [Adress, setAdress] = useState("");

    const handleForm = (e) => {
        e.preventDefault();
        
        let data = {
            name: name,
            email: email,
            password: Password,
            phone: Contact,
            Address: Adress
        };

        axios.post("http://localhost:5001/apis/Owner/add", data).then((res) => {
            console.log(res.data);

            if (res.data.success) {
                toast.success("Owner Added")

            } else {
                toast.warning(res.data.message)

            }

        })
            .catch((err) => {
                console.log(err);

                toast.error("There an error");
            });
    };

    return (
      <>
      <section className="register-bg">
  <div className="overlay">
    <div className="form-container">

      <form className="form" onSubmit={handleForm}>
        
        <p className="title">Register</p>
        <p className="message">Signup and manage your parking system easily.</p>

        <div className="row">
          
          <div className="col-md-6">
            <label>
              <input type="text" className="input"
                value={name}
                onChange={(e)=>setname(e.target.value)}
                required
              />
              <span>Name</span>
            </label>
          </div>

          <div className="col-md-6">
            <label>
              <input type="email" className="input"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                required
              />
              <span>Email</span>
            </label>
          </div>

          <div className="col-md-6">
            <label>
              <input type="password" className="input"
                value={Password}
                onChange={(e)=>setPassword(e.target.value)}
                required
              />
              <span>Password</span>
            </label>
          </div>

          <div className="col-md-6">
            <label>
              <input type="text" className="input"
                value={Contact}
                onChange={(e)=>setContact(e.target.value)}
                required
              />
              <span>Contact</span>
            </label>
          </div>

          <div className="col-md-12">
            <label>
              <input type="text" className="input"
                value={Adress}
                onChange={(e)=>setAdress(e.target.value)}
                required
              />
              <span>Address</span>
            </label>
          </div>

        </div>

        <button type="submit" className="submit">Register</button>

      </form>

    </div>
  </div>
</section>
      
      
      </>

    )
  }
  export default Register
   

  














