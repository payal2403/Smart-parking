import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Apiservices from "../../Apiservices";

export default function View() {
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get("search") || "";
  const initialVehicle = searchParams.get("vehicleType") || "";

  const [parkings, setParkings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(initialSearch);
  const [vehicleType, setVehicleType] = useState(initialVehicle);
  const [maxDistance, setMaxDistance] = useState(50);
  const [userLocation, setUserLocation] = useState(null);
  const [geoLoading, setGeoLoading] = useState(false);
  const [selectedAmenity, setSelectedAmenity] = useState("");

  const fetchParkings = async (coords = null) => {
    setLoading(true);
    try {
      const payload = {
        search,
        vehicleType,
        maxDistanceKm: maxDistance,
      };

      if (coords || userLocation) {
        const activeCoords = coords || userLocation;
        payload.latitude = activeCoords.latitude;
        payload.longitude = activeCoords.longitude;
      }

      const res = await Apiservices.searchNearbyParking(payload);
      if (res.data.success && Array.isArray(res.data.data)) {
        setParkings(res.data.data);
      } else {
        setParkings([]);
      }
    } catch (err) {
      console.error(err);
      setParkings([]);
    } finally {
      setLoading(false);
    }
  };

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }
    setGeoLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = {
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        };
        setUserLocation(coords);
        setGeoLoading(false);
        fetchParkings(coords);
      },
      (err) => {
        console.warn("Geolocation denied or error:", err.message);
        setGeoLoading(false);
        fetchParkings();
      }
    );
  };

  useEffect(() => {
    handleGetLocation();
  }, []);

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    fetchParkings();
  };

  const filteredParkings = parkings.filter((p) => {
    if (!selectedAmenity) return true;
    return p.amenities && p.amenities.includes(selectedAmenity);
  });

  return (
    <div className="container-fluid bg-light py-4 min-vh-100">
      <div className="container">
        {/* Header Title */}
        <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
          <div>
            <h2 className="fw-bold text-dark mb-1">
              <i className="fas fa-compass text-primary me-2"></i>
              Discover Parking Spaces
            </h2>
            <p className="text-muted small mb-0">
              Find verified slots with live distance and availability tracking
            </p>
          </div>
          <div>
            <button
              className={`btn btn-sm rounded-pill px-3 fw-semibold ${
                userLocation ? "btn-success" : "btn-outline-primary"
              }`}
              onClick={handleGetLocation}
              disabled={geoLoading}
            >
              {geoLoading ? (
                <span className="spinner-border spinner-border-sm me-1"></span>
              ) : (
                <i className="fas fa-location-arrow me-1"></i>
              )}
              {userLocation ? "Location Enabled" : "Use My Location"}
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="card border-0 shadow-sm rounded-4 p-3 mb-4 bg-white">
          <form onSubmit={handleFilterSubmit} className="row g-2 align-items-center">
            <div className="col-lg-4 col-md-6">
              <div className="input-group">
                <span className="input-group-text bg-light border-0">
                  <i className="fas fa-search text-muted"></i>
                </span>
                <input
                  type="text"
                  className="form-control bg-light border-0 py-2"
                  placeholder="Search city, area, or landmark..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <select
                className="form-select bg-light border-0 py-2"
                value={vehicleType}
                onChange={(e) => setVehicleType(e.target.value)}
              >
                <option value="">All Vehicle Types</option>
                <option value="Car">Car / 4-Wheeler</option>
                <option value="Bike">Bike / Two-Wheeler</option>
                <option value="SUV">SUV / Large</option>
                <option value="Scooter">Scooter</option>
              </select>
            </div>

            <div className="col-lg-3 col-md-6">
              <select
                className="form-select bg-light border-0 py-2"
                value={selectedAmenity}
                onChange={(e) => setSelectedAmenity(e.target.value)}
              >
                <option value="">All Amenities</option>
                <option value="CCTV">CCTV Surveillance</option>
                <option value="Covered Parking">Covered Parking</option>
                <option value="EV Charging">EV Charging Station</option>
                <option value="24/7 Access">24/7 Access</option>
                <option value="Security Guard">Security Guard</option>
              </select>
            </div>

            <div className="col-lg-2 col-md-6">
              <button type="submit" className="btn btn-primary w-100 py-2 fw-bold rounded-3">
                <i className="fas fa-filter me-1"></i> Apply Filters
              </button>
            </div>
          </form>
        </div>

        {/* Results Grid */}
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="text-muted mt-3">Finding parking spots near you...</p>
          </div>
        ) : filteredParkings.length > 0 ? (
          <div className="row g-4">
            {filteredParkings.map((p) => {
              const displayImg =
                p.images && p.images.length > 0
                  ? p.images[0]
                  : "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=600&q=80";

              return (
                <div key={p._id} className="col-lg-4 col-md-6">
                  <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden d-flex flex-column">
                    <div className="position-relative" style={{ height: "200px" }}>
                      <img
                        src={displayImg}
                        alt={p.title}
                        className="w-100 h-100 object-fit-cover"
                        style={{ objectFit: "cover" }}
                      />
                      {p.distanceKm !== undefined && (
                        <span className="position-absolute top-0 start-0 m-3 badge bg-dark bg-opacity-75 rounded-pill px-3 py-2">
                          <i className="fas fa-route text-warning me-1"></i>
                          {p.distanceKm} km away
                        </span>
                      )}
                      <span
                        className={`position-absolute top-0 end-0 m-3 badge rounded-pill px-3 py-2 ${
                          (p.availableSlots || 0) > 0 ? "bg-success" : "bg-danger"
                        }`}
                      >
                        {(p.availableSlots || 0) > 0
                          ? `${p.availableSlots} Slots Free`
                          : "Fully Booked"}
                      </span>
                    </div>

                    <div className="card-body p-4 d-flex flex-column">
                      <h5 className="fw-bold text-dark mb-1">{p.title}</h5>
                      <p className="text-muted small mb-2">
                        <i className="fas fa-map-marker-alt text-danger me-1"></i>
                        {p.address} {p.city ? `, ${p.city}` : ""}
                      </p>

                      {/* Amenities Pills */}
                      {p.amenities && p.amenities.length > 0 && (
                        <div className="d-flex flex-wrap gap-1 mb-3">
                          {p.amenities.slice(0, 3).map((a, idx) => (
                            <span
                              key={idx}
                              className="badge bg-light text-secondary border rounded-pill px-2 py-1 small"
                            >
                              <i className="fas fa-check text-success me-1"></i>
                              {a}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="mt-auto pt-3 border-top d-flex justify-content-between align-items-center">
                        <div>
                          <span className="text-muted small d-block">Starting from</span>
                          <span className="fs-5 fw-bold text-primary">
                            ₹{p.pricing?.hourlyRate || p.hourlyRate || 30}
                            <span className="fs-6 text-muted fw-normal"> / hr</span>
                          </span>
                        </div>
                        <Link
                          to={`/parking/${p._id}`}
                          className="btn btn-primary rounded-pill px-3 py-2 fw-semibold"
                        >
                          Book Slot <i className="fas fa-arrow-right ms-1"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-5 bg-white rounded-4 shadow-sm p-5">
            <div className="rounded-circle bg-light text-muted mx-auto mb-3 d-flex align-items-center justify-content-center" style={{ width: 72, height: 72 }}>
              <i className="fas fa-parking fa-3x"></i>
            </div>
            <h4 className="fw-bold text-dark">No Parking Spaces Found</h4>
            <p className="text-muted small mb-4">
              Try adjusting your search location, clearing filters, or increasing the search radius.
            </p>
            <button
              className="btn btn-outline-primary rounded-pill px-4"
              onClick={() => {
                setSearch("");
                setVehicleType("");
                setSelectedAmenity("");
                fetchParkings();
              }}
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}