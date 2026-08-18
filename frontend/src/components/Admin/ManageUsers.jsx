import React, { useEffect, useState } from "react";
import Apiservices from "../../../Apiservices";
import { toast, Zoom } from "react-toastify";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [showVehicleModal, setShowVehicleModal] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await Apiservices.getAdminUsers();
      if (res.data.success) {
        setUsers(res.data.data || []);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to load user records");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async (userId, currentStatus) => {
    try {
      const nextStatus = currentStatus === "ACTIVE" ? "SUSPENDED" : "ACTIVE";
      const res = await Apiservices.toggleAdminUserStatus({
        userId,
        status: nextStatus
      });

      if (res.data.success) {
        toast.success(`User status changed to ${nextStatus}`, { transition: Zoom });
        fetchUsers();
      } else {
        toast.warning(res.data.message);
      }
    } catch (err) {
      toast.error("Failed to update user status");
    }
  };

  const filtered = users.filter((u) => {
    const name = (u.name || "").toLowerCase();
    const email = (u.email || "").toLowerCase();
    const phone = (u.phone || "").toLowerCase();
    const q = search.toLowerCase();
    const vehicleMatch = (u.vehicles || []).some(
      (v) =>
        (v.vehicleNumber || "").toLowerCase().includes(q) ||
        (v.model || "").toLowerCase().includes(q)
    );
    return name.includes(q) || email.includes(q) || phone.includes(q) || vehicleMatch;
  });

  return (
    <div className="container-fluid bg-light py-5 min-vh-100">
      <div className="container">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
          <div>
            <h2 className="fw-bold text-dark mb-1">
              <i className="fas fa-users text-primary me-2"></i>
              Driver & User Management
            </h2>
            <p className="text-muted small mb-0">
              Audit driver accounts, view registered vehicles, and manage system access
            </p>
          </div>
          <button onClick={fetchUsers} className="btn btn-outline-secondary rounded-pill px-4">
            <i className="fas fa-sync-alt me-1"></i> Refresh
          </button>
        </div>

        {/* Search */}
        <div className="card border-0 shadow-sm rounded-4 p-3 mb-4 bg-white">
          <div className="input-group">
            <span className="input-group-text bg-light border-0">
              <i className="fas fa-search text-muted"></i>
            </span>
            <input
              type="text"
              className="form-control bg-light border-0 py-2"
              placeholder="Search by driver name, email, phone, or vehicle number..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Table */}
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status"></div>
            <p className="mt-3 text-muted">Loading user accounts...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="card border-0 shadow-sm rounded-4 p-5 text-center bg-white">
            <i className="fas fa-user-slash text-muted fa-3x mb-3"></i>
            <h5 className="fw-bold text-dark">No Drivers Found</h5>
            <p className="text-muted small">No user records matched your search query.</p>
          </div>
        ) : (
          <div className="card border-0 shadow-sm rounded-4 overflow-hidden bg-white">
            <div className="table-responsive">
              <table className="table align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th className="ps-4">Driver Name</th>
                    <th>Email & Contact</th>
                    <th>Registered Vehicles</th>
                    <th>Joined On</th>
                    <th>Account Status</th>
                    <th className="text-end pe-4">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((user) => {
                    const vehicles = user.vehicles || [];
                    const status = user.status || "ACTIVE";

                    return (
                      <tr key={user._id}>
                        <td className="ps-4 py-3">
                          <div className="d-flex align-items-center gap-3">
                            <div className="rounded-circle bg-primary bg-opacity-10 text-primary fw-bold d-flex align-items-center justify-content-center" style={{ width: 44, height: 44 }}>
                              {user.name ? user.name[0].toUpperCase() : "U"}
                            </div>
                            <div>
                              <h6 className="fw-bold mb-0 text-dark">{user.name}</h6>
                              <small className="text-muted">Driver Account</small>
                            </div>
                          </div>
                        </td>

                        <td>
                          <div>
                            <span className="d-block text-dark small">{user.email}</span>
                            <small className="text-muted">{user.phone || "No phone"}</small>
                          </div>
                        </td>

                        <td>
                          {vehicles.length > 0 ? (
                            <button
                              className="btn btn-sm btn-outline-primary rounded-pill px-3 py-1"
                              onClick={() => {
                                setSelectedUser(user);
                                setShowVehicleModal(true);
                              }}
                            >
                              <i className="fas fa-car me-1"></i> {vehicles.length} Vehicle{vehicles.length > 1 ? "s" : ""}
                            </button>
                          ) : (
                            <span className="text-muted small">None registered</span>
                          )}
                        </td>

                        <td>
                          <small className="text-muted">
                            {new Date(user.createdAt).toLocaleDateString()}
                          </small>
                        </td>

                        <td>
                          <span
                            className={`badge rounded-pill px-3 py-2 ${
                              status === "ACTIVE"
                                ? "bg-success bg-opacity-10 text-success"
                                : "bg-danger bg-opacity-10 text-danger"
                            }`}
                          >
                            {status}
                          </span>
                        </td>

                        <td className="text-end pe-4">
                          <button
                            className={`btn btn-sm rounded-pill px-3 fw-semibold ${
                              status === "ACTIVE" ? "btn-outline-danger" : "btn-outline-success"
                            }`}
                            onClick={() => handleToggleStatus(user._id, status)}
                          >
                            {status === "ACTIVE" ? "Suspend Account" : "Activate Account"}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Vehicles Modal */}
        {showVehicleModal && selectedUser && (
          <div className="modal fade show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content border-0 shadow-lg rounded-4 p-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="fw-bold text-dark mb-0">
                    <i className="fas fa-car text-primary me-2"></i>
                    Vehicles for {selectedUser.name}
                  </h5>
                  <button type="button" className="btn-close" onClick={() => setShowVehicleModal(false)}></button>
                </div>

                <div className="d-flex flex-column gap-2 my-3">
                  {(selectedUser.vehicles || []).map((v, idx) => (
                    <div key={idx} className="p-3 bg-light rounded-3 d-flex justify-content-between align-items-center">
                      <div>
                        <h6 className="fw-bold mb-0 text-dark">{v.vehicleNumber}</h6>
                        <small className="text-muted">
                          {v.vehicleType} {v.model ? `• ${v.model}` : ""} {v.color ? `• ${v.color}` : ""}
                        </small>
                      </div>
                      <span className="badge bg-primary bg-opacity-10 text-primary rounded-pill px-3 py-1">
                        {v.vehicleType || "Car"}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="text-end mt-3">
                  <button className="btn btn-primary rounded-pill px-4" onClick={() => setShowVehicleModal(false)}>
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageUsers;
