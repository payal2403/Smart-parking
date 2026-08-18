import React, { useState } from "react";
import Apiservices from "../../Apiservices";
import { toast, Zoom } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("admin@gmail.com");
  const [password, setPassword] = useState("123");
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const handleForm = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await Apiservices.login({ email, password });
      if (res.data.success) {
        sessionStorage.setItem("userId", res.data.data.userId);
        sessionStorage.setItem("email", res.data.data.email);
        sessionStorage.setItem("name", res.data.data.name || "");
        sessionStorage.setItem("userType", res.data.data.userType);
        sessionStorage.setItem("token", res.data.token);
        sessionStorage.setItem("isLogin", "true");

        toast.success(`Welcome back, ${res.data.data.name || "User"}!`, {
          position: "top-center",
          autoClose: 1200,
          transition: Zoom,
        });

        if (res.data.data.userType === "1") {
          nav("/admin");
        } else if (res.data.data.userType === "2") {
          nav("/owner");
        } else {
          nav("/user/dashboard");
        }
      } else {
        toast.warning(res.data.message || "Invalid credentials");
      }
    } catch (err) {
      toast.error("Failed to connect to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5 d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
      <div className="card border-0 shadow-lg rounded-4 p-4 p-md-5" style={{ maxWidth: "480px", width: "100%" }}>
        <div className="text-center mb-4">
          <div className="rounded-circle bg-primary bg-opacity-10 text-primary mx-auto mb-3 d-flex align-items-center justify-content-center" style={{ width: 64, height: 64 }}>
            <i className="fas fa-lock fa-2x"></i>
          </div>
          <h2 className="fw-bold text-dark mb-1">Account Login</h2>
          <p className="text-muted small">Sign in to manage your parking, bookings or listings</p>
        </div>

        {/* Quick Demo Fill Buttons */}
        <div className="d-flex justify-content-center gap-2 mb-3">
          <button
            type="button"
            className="btn btn-sm btn-outline-secondary rounded-pill px-3"
            onClick={() => { setEmail("admin@gmail.com"); setPassword("123"); }}
          >
            Admin Demo
          </button>
        </div>

        <form onSubmit={handleForm}>
          <div className="mb-3">
            <label className="form-label fw-semibold small text-secondary">Email Address</label>
            <div className="input-group">
              <span className="input-group-text bg-light border-end-0">
                <i className="fas fa-envelope text-muted"></i>
              </span>
              <input
                type="email"
                className="form-control bg-light border-start-0 py-2"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold small text-secondary">Password</label>
            <div className="input-group">
              <span className="input-group-text bg-light border-end-0">
                <i className="fas fa-key text-muted"></i>
              </span>
              <input
                type="password"
                className="form-control bg-light border-start-0 py-2"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 py-2 fw-bold rounded-pill shadow-sm"
            disabled={loading}
          >
            {loading ? <span className="spinner-border spinner-border-sm me-2"></span> : <i className="fas fa-sign-in-alt me-2"></i>}
            Sign In
          </button>
        </form>

        <div className="text-center mt-4 pt-3 border-top">
          <p className="text-muted small mb-0">
            Don't have an account? <Link to="/register" className="text-primary fw-bold text-decoration-none">Register Now</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;