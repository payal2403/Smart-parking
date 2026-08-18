import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, Zoom } from "react-toastify";
import Apiservices from "../../../Apiservices";
import Switch from "react-switch";

const ManageSpace = () => {
  const [spaces, setSpaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSpaces();
  }, []);

  const fetchSpaces = async () => {
    setLoading(true);
    try {
      const res = await Apiservices.getOwnerSpaces();
      if (res.data.success) {
        setSpaces(res.data.data || []);
      }
    } catch (err) {
      toast.error("Failed to load spaces");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this parking space?")) return;
    try {
      const res = await Apiservices.deleteOwnerSpace({ _id: id });
      if (res.data.success) {
        toast.success("Parking space deleted", { transition: Zoom });
        fetchSpaces();
      } else {
        toast.warning(res.data.message);
      }
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    try {
      const res = await Apiservices.toggleSpaceStatus({ _id: id });
      if (res.data.success) {
        toast.success(res.data.message, { transition: Zoom });
        fetchSpaces();
      } else {
        toast.warning(res.data.message);
      }
    } catch (err) {
      toast.error("Status toggle failed");
    }
  };

  return (
    <div className="container-fluid bg-light py-5 min-vh-100">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
          <div>
            <h2 className="fw-bold text-dark mb-1">
              <i className="fas fa-parking text-primary me-2"></i> Manage Parking Spaces
            </h2>
            <p className="text-muted small mb-0">Total Listed: {spaces.length}</p>
          </div>
          <Link to="/owner/addspace" className="btn btn-primary rounded-pill px-4 fw-semibold shadow-sm mt-2 mt-md-0">
            <i className="fas fa-plus me-1"></i> Add New Space
          </Link>
        </div>

        <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
          {loading ? (
            <div className="text-center py-5"><div className="spinner-border text-primary"></div></div>
          ) : spaces.length > 0 ? (
            <div className="table-responsive">
              <table className="table align-middle">
                <thead className="table-light">
                  <tr>
                    <th>Photo</th>
                    <th>Title & Address</th>
                    <th>Slots Free / Total</th>
                    <th>Pricing</th>
                    <th>Admin Approval</th>
                    <th>Listing Active</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {spaces.map((s) => {
                    const img = s.images && s.images.length > 0 ? s.images[0] : (s.parking_images || "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=200&q=80");
                    const isApproved = s.approvalStatus === "APPROVED";

                    return (
                      <tr key={s._id}>
                        <td>
                          <img
                            src={img}
                            alt={s.title}
                            className="rounded-3 border object-fit-cover"
                            style={{ width: 64, height: 48, objectFit: "cover" }}
                          />
                        </td>
                        <td>
                          <div className="fw-bold text-dark">{s.title}</div>
                          <div className="small text-muted">{s.address} {s.city ? `, ${s.city}` : ""}</div>
                        </td>
                        <td>
                          <span className="badge bg-light text-dark border px-3 py-2">
                            {s.availableSlots || 0} / {s.totalSlots || 0} Free
                          </span>
                        </td>
                        <td>
                          <span className="fw-bold text-primary">₹{s.hourlyRate || s.pricing?.hourlyRate || 40}/hr</span>
                        </td>
                        <td>
                          <span className={`badge rounded-pill ${
                            s.approvalStatus === 'APPROVED' ? 'bg-success' :
                            s.approvalStatus === 'REJECTED' ? 'bg-danger' : 'bg-warning text-dark'
                          }`}>
                            {s.approvalStatus || 'PENDING'}
                          </span>
                        </td>
                        <td>
                          <Switch
                            checked={Boolean(s.Status !== false)}
                            onChange={() => handleToggleStatus(s._id, s.Status)}
                            onColor="#015fc9"
                            uncheckedIcon={false}
                            checkedIcon={false}
                            height={22}
                            width={44}
                          />
                        </td>
                        <td>
                          <div className="d-flex gap-2">
                            <button
                              className="btn btn-sm btn-outline-secondary rounded-pill px-3"
                              onClick={() => navigate(`/owner/updateSpace/${s._id}`)}
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-sm btn-outline-danger rounded-pill px-3"
                              onClick={() => handleDelete(s._id)}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-5">
              <i className="fas fa-parking fa-3x text-muted mb-3"></i>
              <h5 className="fw-bold text-dark">No Parking Spaces Listed Yet</h5>
              <p className="text-muted small mb-3">Add your first parking facility to start accepting drivers.</p>
              <Link to="/owner/addspace" className="btn btn-primary rounded-pill px-4">Create Listing</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageSpace;