import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import { toast, Zoom } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Apiservices from "../../../Apiservices";
import "leaflet/dist/leaflet.css";

// Fix marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const AddSpace = () => {
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("Delhi");
  const [latitude, setLatitude] = useState(28.6139);
  const [longitude, setLongitude] = useState(77.2090);
  const [totalSlots, setTotalSlots] = useState(10);
  const [hourlyRate, setHourlyRate] = useState(40);
  const [twoWheelerHourlyRate, setTwoWheelerHourlyRate] = useState(20);
  const [suvHourlyRate, setSuvHourlyRate] = useState(60);
  const [rules, setRules] = useState("Park inside marked lines. Follow speed limits.");
  const [supportedVehicles, setSupportedVehicles] = useState(["Car", "Bike", "SUV", "Scooter"]);
  const [amenities, setAmenities] = useState(["CCTV", "Covered Parking", "24/7 Access"]);
  const [images, setImages] = useState([]);
  const [position, setPosition] = useState([28.6139, 77.2090]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function LocationPicker() {
    useMapEvents({
      click(e) {
        setLatitude(e.latlng.lat);
        setLongitude(e.latlng.lng);
        setPosition([e.latlng.lat, e.latlng.lng]);
      },
    });
    return null;
  }

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast.warning("Geolocation not supported");
      return;
    }
    navigator.geolocation.getCurrentPosition((pos) => {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;
      setLatitude(lat);
      setLongitude(lng);
      setPosition([lat, lng]);
      toast.info("Location detected from GPS");
    });
  };

  const handleVehicleToggle = (v) => {
    setSupportedVehicles((prev) =>
      prev.includes(v) ? prev.filter((item) => item !== v) : [...prev, v]
    );
  };

  const handleAmenityToggle = (a) => {
    setAmenities((prev) =>
      prev.includes(a) ? prev.filter((item) => item !== a) : [...prev, a]
    );
  };

  const handleForm = async (e) => {
    e.preventDefault();
    if (!title || !address) {
      toast.warning("Please enter space title and address");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("address", address);
      formData.append("city", city);
      formData.append("latitude", latitude);
      formData.append("longitude", longitude);
      formData.append("totalSlots", totalSlots);
      formData.append("hourlyRate", hourlyRate);
      formData.append("twoWheelerHourlyRate", twoWheelerHourlyRate);
      formData.append("suvHourlyRate", suvHourlyRate);
      formData.append("rules", rules);

      supportedVehicles.forEach((v) => formData.append("supportedVehicles[]", v));
      amenities.forEach((a) => formData.append("amenities[]", a));

      if (images && images.length > 0) {
        for (let i = 0; i < images.length; i++) {
          formData.append("images", images[i]);
        }
      }

      const res = await Apiservices.AddSpace(formData);
      if (res.data.success) {
        toast.success("Parking Space listed successfully! Pending admin approval.", { transition: Zoom });
        navigate("/owner/managespace");
      } else {
        toast.warning(res.data.message || "Failed to create space");
      }
    } catch (err) {
      toast.error("Error creating parking space");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid bg-light py-5 min-vh-100">
      <div className="container" style={{ maxWidth: "920px" }}>
        <div className="card border-0 shadow-sm rounded-4 p-4 p-md-5 bg-white">
          <h2 className="fw-bold text-dark mb-1">
            <i className="fas fa-plus-circle text-primary me-2"></i> List New Parking Space
          </h2>
          <p className="text-muted small mb-4">
            Provide location, slot capacity, rates, and amenities for drivers to find your listing.
          </p>

          <form onSubmit={handleForm}>
            <div className="row g-3">
              <div className="col-md-8">
                <label className="form-label small fw-semibold text-secondary">Parking Name / Title</label>
                <input
                  type="text"
                  className="form-control bg-light py-2"
                  placeholder="e.g. City Center Mall Underground Parking"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="col-md-4">
                <label className="form-label small fw-semibold text-secondary">City</label>
                <input
                  type="text"
                  className="form-control bg-light py-2"
                  placeholder="e.g. New Delhi"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                />
              </div>

              <div className="col-12">
                <label className="form-label small fw-semibold text-secondary">Complete Street Address</label>
                <input
                  type="text"
                  className="form-control bg-light py-2"
                  placeholder="e.g. Plot 45, Sector 18, Commercial Belt"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>

              {/* Map Picker */}
              <div className="col-12 mt-3">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <label className="form-label small fw-semibold text-secondary mb-0">
                    <i className="fas fa-map-marked-alt text-primary me-1"></i> Pin Accurate Location on Map (Click Map to Move Pin)
                  </label>
                  <button
                    type="button"
                    onClick={getCurrentLocation}
                    className="btn btn-sm btn-outline-primary rounded-pill px-3"
                  >
                    <i className="fas fa-location-arrow me-1"></i> Detect Current GPS
                  </button>
                </div>

                <div className="rounded-4 overflow-hidden border">
                  <MapContainer
                    center={position}
                    zoom={13}
                    style={{ height: "260px", width: "100%" }}
                  >
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <LocationPicker />
                    {position && <Marker position={position} />}
                  </MapContainer>
                </div>

                <div className="row g-2 mt-2">
                  <div className="col-6">
                    <input
                      type="text"
                      className="form-control form-control-sm bg-light"
                      placeholder="Latitude"
                      value={latitude}
                      readOnly
                    />
                  </div>
                  <div className="col-6">
                    <input
                      type="text"
                      className="form-control form-control-sm bg-light"
                      placeholder="Longitude"
                      value={longitude}
                      readOnly
                    />
                  </div>
                </div>
              </div>

              {/* Capacity & Rates */}
              <div className="col-md-3 mt-3">
                <label className="form-label small fw-semibold text-secondary">Total Slot Capacity</label>
                <input
                  type="number"
                  className="form-control bg-light py-2"
                  min="1"
                  value={totalSlots}
                  onChange={(e) => setTotalSlots(e.target.value)}
                  required
                />
              </div>

              <div className="col-md-3 mt-3">
                <label className="form-label small fw-semibold text-secondary">Car Rate (₹/hr)</label>
                <input
                  type="number"
                  className="form-control bg-light py-2"
                  min="5"
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(e.target.value)}
                  required
                />
              </div>

              <div className="col-md-3 mt-3">
                <label className="form-label small fw-semibold text-secondary">Bike Rate (₹/hr)</label>
                <input
                  type="number"
                  className="form-control bg-light py-2"
                  min="5"
                  value={twoWheelerHourlyRate}
                  onChange={(e) => setTwoWheelerHourlyRate(e.target.value)}
                  required
                />
              </div>

              <div className="col-md-3 mt-3">
                <label className="form-label small fw-semibold text-secondary">SUV Rate (₹/hr)</label>
                <input
                  type="number"
                  className="form-control bg-light py-2"
                  min="10"
                  value={suvHourlyRate}
                  onChange={(e) => setSuvHourlyRate(e.target.value)}
                  required
                />
              </div>

              {/* Supported Vehicles */}
              <div className="col-12 mt-3">
                <label className="form-label small fw-semibold text-secondary d-block">Supported Vehicle Types</label>
                <div className="d-flex flex-wrap gap-3">
                  {["Car", "Bike", "SUV", "Scooter"].map((v) => (
                    <div key={v} className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id={`veh-${v}`}
                        checked={supportedVehicles.includes(v)}
                        onChange={() => handleVehicleToggle(v)}
                      />
                      <label className="form-check-label small fw-semibold" htmlFor={`veh-${v}`}>
                        {v}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Amenities */}
              <div className="col-12 mt-3">
                <label className="form-label small fw-semibold text-secondary d-block">Facility Amenities</label>
                <div className="d-flex flex-wrap gap-3">
                  {["CCTV", "Covered Parking", "EV Charging", "24/7 Access", "Security Guard", "Restroom"].map((a) => (
                    <div key={a} className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id={`amen-${a}`}
                        checked={amenities.includes(a)}
                        onChange={() => handleAmenityToggle(a)}
                      />
                      <label className="form-check-label small fw-semibold" htmlFor={`amen-${a}`}>
                        {a}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Rules */}
              <div className="col-12 mt-3">
                <label className="form-label small fw-semibold text-secondary">Facility Rules & Access Instructions</label>
                <textarea
                  className="form-control bg-light"
                  rows="2"
                  value={rules}
                  onChange={(e) => setRules(e.target.value)}
                ></textarea>
              </div>

              {/* Photos */}
              <div className="col-12 mt-3">
                <label className="form-label small fw-semibold text-secondary">Upload Space Photos (Up to 5)</label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  className="form-control bg-light"
                  onChange={(e) => setImages(e.target.files)}
                />
              </div>
            </div>

            <div className="mt-4 pt-3 border-top d-flex gap-2">
              <button
                type="submit"
                className="btn btn-primary rounded-pill px-5 fw-bold shadow-sm"
                disabled={loading}
              >
                {loading ? <span className="spinner-border spinner-border-sm me-2"></span> : <i className="fas fa-save me-2"></i>}
                Submit Space for Approval
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddSpace;