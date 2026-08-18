import React, { useState } from "react";
import Apiservices from "../../Apiservices";
import { toast, Zoom } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [role, setRole] = useState("user"); // "user" or "owner"
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  // Vehicle details for driver
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [vehicleType, setVehicleType] = useState("Car");
  const [vehicleModel, setVehicleModel] = useState("");

  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (role === "user") {
        const payload = {
          name,
          email,
          password,
          phone,
          vehicleNumber,
          vehicleType,
          vehicleModel
        };
        const res = await Apiservices.registerUser(payload);
        if (res.data.success) {
          toast.success("Driver account created! Please sign in.", { transition: Zoom });
          nav("/login");
        } else {
          toast.warning(res.data.message || "Registration failed");
        }
      } else {
        const payload = {
          name,
          email,
          password,
          phone
        };
        const res = await Apiservices.registerOwner(payload);
        if (res.data.success) {
          toast.success("Owner account created! Sign in to list parking spaces.", { transition: Zoom });
          nav("/login");
        } else {
          toast.warning(res.data.message || "Owner registration failed");
        }
      }
    } catch (err) {
      toast.error("Error submitting registration form");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5 d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
      <div className="card border-0 shadow-lg rounded-4 p-4 p-md-5" style={{ maxWidth: "580px", width: "100%" }}>
        <div className="text-center mb-4">
          <h2 className="fw-bold text-dark mb-1">Create an Account</h2>
          <p className="text-muted small">Choose your account type to get started</p>

          {/* Role Pill Switcher */}
          <div className="btn-group w-100 mt-3 p-1 bg-light rounded-pill border" role="group">
            <button
              type="button"
              className={`btn rounded-pill py-2 fw-semibold ${role === "user" ? "btn-primary shadow-sm" : "btn-light text-muted"}`}
              onClick={() => setRole("user")}
            >
              <i className="fas fa-car me-2"></i> Driver / Vehicle User
            </button>
            <button
              type="button"
              className={`btn rounded-pill py-2 fw-semibold ${role === "owner" ? "btn-primary shadow-sm" : "btn-light text-muted"}`}
              onClick={() => setRole("owner")}
            >
              <i className="fas fa-store me-2"></i> Space Owner / Host
            </button>
          </div>
        </div>

        <form onSubmit={handleRegister}>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label fw-semibold small text-secondary">Full Name</label>
              <input
                type="text"
                className="form-control bg-light py-2"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label fw-semibold small text-secondary">Phone Number</label>
              <input
                type="tel"
                className="form-control bg-light py-2"
                placeholder="9876543210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

            <div className="col-12">
              <label className="form-label fw-semibold small text-secondary">Email Address</label>
              <input
                type="email"
                className="form-control bg-light py-2"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="col-12">
              <label className="form-label fw-semibold small text-secondary">Password</label>
              <input
                type="password"
                className="form-control bg-light py-2"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {role === "user" && (
              <div className="col-12 border-top pt-3 mt-3">
                <h6 className="fw-bold text-primary mb-3">
                  <i className="fas fa-car-side me-2"></i> Primary Vehicle (Optional)
                </h6>
                <div className="row g-2">
                  <div className="col-md-4">
                    <label className="form-label small text-muted">Vehicle Type</label>
                    <select
                      className="form-select bg-light"
                      value={vehicleType}
                      onChange={(e) => setVehicleType(e.target.value)}
                    >
                      <option value="Car">Car</option>
                      <option value="Bike">Bike</option>
                      <option value="SUV">SUV</option>
                      <option value="Scooter">Scooter</option>
                    </select>
                  </div>
                  <div className="col-md-4">
                    <label className="form-label small text-muted">Vehicle No.</label>
                    <input
                      type="text"
                      className="form-control bg-light text-uppercase"
                      placeholder="PB08 AB 1234"
                      value={vehicleNumber}
                      onChange={(e) => setVehicleNumber(e.target.value)}
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label small text-muted">Model / Brand</label>
                    <input
                      type="text"
                      className="form-control bg-light"
                      placeholder="Honda City"
                      value={vehicleModel}
                      onChange={(e) => setVehicleModel(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 py-2 fw-bold rounded-pill shadow-sm mt-4"
            disabled={loading}
          >
            {loading ? <span className="spinner-border spinner-border-sm me-2"></span> : <i className="fas fa-user-plus me-2"></i>}
            Register as {role === "user" ? "Driver" : "Parking Owner"}
          </button>
        </form>

        <div className="text-center mt-4 pt-3 border-top">
          <p className="text-muted small mb-0">
            Already have an account? <Link to="/login" className="text-primary fw-bold text-decoration-none">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;















