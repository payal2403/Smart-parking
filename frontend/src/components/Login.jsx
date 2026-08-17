import axios from 'axios'
import React, { useState } from 'react'
import Apiservices from "../../Apiservices"
import { toast, Zoom } from "react-toastify";
import { useNavigate } from 'react-router-dom';


const Login = () => {

  const [email, setEmail] = useState("admin@gmail.com")
  const [password, setPassword] = useState("123")
  const nav = useNavigate()

  const handleForm = (e) => {
    e.preventDefault();

    let data = { email, password };

    Apiservices.login(data)
      .then((res) => {
        if (res.data.success) {

          sessionStorage.setItem("userId", res.data.data.userId)
          sessionStorage.setItem("email", res.data.data.email)
          sessionStorage.setItem("userType", res.data.data.userType)
          sessionStorage.setItem("token", res.data.token)
          sessionStorage.setItem("isLogin", true)

          toast.success("Login Successfully", {
            position: "top-center",
            autoClose: 1000,
            transition: Zoom,
          });

          if (res.data.data.userType == 1) {
            nav("/admin")
          } else if (res.data.data.userType == 2) {
            nav("/owner")
          } else {
            nav("/")
          }

        } else {
          toast.warning(res.data.message);
        }
      })
      .catch(() => {
        toast.error("Something went wrong");
      });
  };

  return (
    <div className="login-bg">
      <div className="login-overlay">

        <form className="login-card" onSubmit={handleForm}>

          <h2>Login</h2>
          <p>Welcome back 👋</p>
        
          <input
            type="email" className='input'
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
         
       

          <input 
            type="password" className='input'
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Login</button>

        </form>

      </div>
    </div>
  )
}

export default Login;