import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import { toast } from "react-toastify";
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
  const [title, settitle] = useState("");
  const [address, setaddress] = useState("");
  const [latitude, setlatitude] = useState("");
  const [longitude, setlongitude] = useState("");
  const [totalArea, settotalArea] = useState("");
  const [parking_images, setparking_images] = useState("");
  const [position, setPosition] = useState(null);

  // 📍 Map Click Handler
  function LocationPicker() {
    useMapEvents({
      click(e) {
        const lat = e.latlng.lat;
        const lng = e.latlng.lng;

        setlatitude(lat);
        setlongitude(lng);
        setPosition([lat, lng]);
      },
    });
    return null;
  }

  // 📍 Get Current Location
  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;

      setlatitude(lat);
      setlongitude(lng);
      setPosition([lat, lng]);
    });
  };

  // 📤 Submit Form
  const handleForm = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("address", address);
    formData.append("latitude", latitude);
    formData.append("longitude", longitude);
    formData.append("totalArea", totalArea);
    formData.append("parking_images", parking_images);

    Apiservices.AddSpace(formData)
      .then((res) => {
        if (res.data.success) {
          toast.success("Space Successfully added");
        } else {
          toast.warning(res.data.message);
        }
      })
      .catch(() => {
        toast.error("Error occurred");
      });
  };

  return (
    <div className="container mt-4">
      <h2>Add Space</h2>

      {/* 🗺️ MAP */}
      <MapContainer
        center={[28.61, 77.20]}
        zoom={10}
        style={{ height: "300px", marginBottom: "20px" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <LocationPicker />
        {position && <Marker position={position} />}
      </MapContainer>

      {/* 📍 Button */}
      <button onClick={getCurrentLocation} className="btn btn-primary mb-3">
        Use Current Location
      </button>

      {/* 📝 FORM */}
      <form onSubmit={handleForm}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => settitle(e.target.value)}
          className="form-control mb-2"
        />

        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setaddress(e.target.value)}
          className="form-control mb-2"
        />

        <input
          type="text"
          placeholder="Latitude"
          value={latitude}
          readOnly
          className="form-control mb-2"
        />

        <input
          type="text"
          placeholder="Longitude"
          value={longitude}
          readOnly
          className="form-control mb-2"
        />

        <input
          type="number"
          placeholder="Total Area"
          value={totalArea}
          onChange={(e) => settotalArea(e.target.value)}
          className="form-control mb-2"
        />

        <input
          type="file"
          onChange={(e) => setparking_images(e.target.files[0])}
          className="form-control mb-2"
        />

        <button type="submit" className="btn btn-success">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddSpace;