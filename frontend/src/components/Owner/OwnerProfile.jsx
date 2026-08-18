import React, { useEffect, useState } from "react";
import Apiservices from "../../../Apiservices";
import { toast, Zoom } from "react-toastify";

const OwnerProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploadLoading, setUploadLoading] = useState(false);

  // Document files
  const [idProof, setIdProof] = useState(null);
  const [addressProof, setAddressProof] = useState(null);

  // Bank details form
  const [accountHolderName, setAccountHolderName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [ifscCode, setIfscCode] = useState("");
  const [bankName, setBankName] = useState("");
  const [upiId, setUpiId] = useState("");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const res = await Apiservices.getOwnerProfile();
      if (res.data.success && res.data.data) {
        const data = res.data.data;
        setProfile(data);
        if (data.bankDetails) {
          setAccountHolderName(data.bankDetails.accountHolderName || "");
          setAccountNumber(data.bankDetails.accountNumber || "");
          setIfscCode(data.bankDetails.ifscCode || "");
          setBankName(data.bankDetails.bankName || "");
          setUpiId(data.bankDetails.upiId || "");
        }
      }
    } catch (err) {
      toast.error("Failed to load owner profile");
    } finally {
      setLoading(false);
    }
  };

  const handleDocumentsUpload = async (e) => {
    e.preventDefault();
    if (!idProof && !addressProof) {
      toast.warning("Please select at least one document to upload");
      return;
    }

    try {
      setUploadLoading(true);
      const formData = new FormData();
      if (idProof) formData.append("idProof", idProof);
      if (addressProof) formData.append("addressProof", addressProof);

      const res = await Apiservices.updateOwnerDocuments(formData);
      if (res.data.success) {
        toast.success("Documents submitted for verification!", { transition: Zoom });
        fetchProfile();
      } else {
        toast.warning(res.data.message);
      }
    } catch (err) {
      toast.error("Document upload failed");
    } finally {
      setUploadLoading(false);
    }
  };

  const handleBankDetailsUpdate = async (e) => {
    e.preventDefault();
    try {
      setUploadLoading(true);
      const res = await Apiservices.updateOwnerBankDetails({
        accountHolderName,
        accountNumber,
        ifscCode,
        bankName,
        upiId
      });

      if (res.data.success) {
        toast.success("Bank details updated successfully!", { transition: Zoom });
        fetchProfile();
      } else {
        toast.warning(res.data.message);
      }
    } catch (err) {
      toast.error("Failed to update bank details");
    } finally {
      setUploadLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container py-5 text-center min-vh-100">
        <div className="spinner-border text-primary"></div>
      </div>
    );
  }

  const verStatus = profile?.verificationStatus || "PENDING";

  return (
    <div className="container-fluid bg-light py-5 min-vh-100">
      <div className="container" style={{ maxWidth: "880px" }}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="fw-bold text-dark mb-1">Owner Profile & Verification</h2>
            <p className="text-muted small mb-0">Manage your verified credentials, documents and payout accounts</p>
          </div>
          <span className={`badge rounded-pill px-4 py-2 fs-6 ${
            verStatus === 'APPROVED' ? 'bg-success' :
            verStatus === 'REJECTED' ? 'bg-danger' : 'bg-warning text-dark'
          }`}>
            Status: {verStatus}
          </span>
        </div>

        {verStatus === 'REJECTED' && (
          <div className="alert alert-danger rounded-4 p-4 mb-4">
            <h6 className="fw-bold"><i className="fas fa-exclamation-circle me-2"></i> Documents Rejected by Admin</h6>
            <p className="mb-0 small">{profile?.rejectionReason || "Please upload valid, clear copies of your ID and address proof."}</p>
          </div>
        )}

        <div className="row g-4">
          {/* Section 1: Verification Documents */}
          <div className="col-12">
            <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
              <h5 className="fw-bold text-dark mb-1">
                <i className="fas fa-id-badge text-primary me-2"></i>
                KYC Verification Documents
              </h5>
              <p className="text-muted small mb-4">
                Required to publish parking spaces and receive payouts. Government ID & Proof of Address.
              </p>

              <form onSubmit={handleDocumentsUpload}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label small fw-semibold text-secondary">
                      Identity Proof (Aadhaar / Passport / Driving License)
                    </label>
                    <input
                      type="file"
                      className="form-control bg-light"
                      accept="image/*,.pdf"
                      onChange={(e) => setIdProof(e.target.files[0])}
                    />
                    {profile?.idProof && (
                      <div className="mt-2 small">
                        <a href={profile.idProof} target="_blank" rel="noreferrer" className="text-primary text-decoration-none fw-semibold">
                          <i className="fas fa-external-link-alt me-1"></i> View Uploaded ID Proof
                        </a>
                      </div>
                    )}
                  </div>

                  <div className="col-md-6">
                    <label className="form-label small fw-semibold text-secondary">
                      Address Proof / Utility Bill / Property Tax
                    </label>
                    <input
                      type="file"
                      className="form-control bg-light"
                      accept="image/*,.pdf"
                      onChange={(e) => setAddressProof(e.target.files[0])}
                    />
                    {profile?.addressProof && (
                      <div className="mt-2 small">
                        <a href={profile.addressProof} target="_blank" rel="noreferrer" className="text-primary text-decoration-none fw-semibold">
                          <i className="fas fa-external-link-alt me-1"></i> View Uploaded Address Proof
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-4">
                  <button type="submit" className="btn btn-primary rounded-pill px-4 fw-semibold" disabled={uploadLoading}>
                    {uploadLoading ? <span className="spinner-border spinner-border-sm me-1"></span> : <i className="fas fa-upload me-1"></i>}
                    Submit Documents for Review
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Section 2: Payout Bank Details */}
          <div className="col-12">
            <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
              <h5 className="fw-bold text-dark mb-1">
                <i className="fas fa-university text-success me-2"></i>
                Bank Account & Payout Details
              </h5>
              <p className="text-muted small mb-4">
                Your 90% revenue share will be deposited into this account upon withdrawal requests.
              </p>

              <form onSubmit={handleBankDetailsUpdate}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label small fw-semibold text-secondary">Account Holder Name</label>
                    <input
                      type="text"
                      className="form-control bg-light"
                      placeholder="e.g. John Doe"
                      value={accountHolderName}
                      onChange={(e) => setAccountHolderName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label small fw-semibold text-secondary">Bank Name</label>
                    <input
                      type="text"
                      className="form-control bg-light"
                      placeholder="e.g. HDFC Bank"
                      value={bankName}
                      onChange={(e) => setBankName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label small fw-semibold text-secondary">Account Number</label>
                    <input
                      type="text"
                      className="form-control bg-light"
                      placeholder="123456789012"
                      value={accountNumber}
                      onChange={(e) => setAccountNumber(e.target.value)}
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label small fw-semibold text-secondary">IFSC Code</label>
                    <input
                      type="text"
                      className="form-control bg-light text-uppercase"
                      placeholder="HDFC0001234"
                      value={ifscCode}
                      onChange={(e) => setIfscCode(e.target.value)}
                      required
                    />
                  </div>

                  <div className="col-12">
                    <label className="form-label small fw-semibold text-secondary">UPI ID (Optional)</label>
                    <input
                      type="text"
                      className="form-control bg-light"
                      placeholder="name@okaxis"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <button type="submit" className="btn btn-success rounded-pill px-4 fw-semibold" disabled={uploadLoading}>
                    <i className="fas fa-save me-1"></i> Save Payout Information
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerProfile;
