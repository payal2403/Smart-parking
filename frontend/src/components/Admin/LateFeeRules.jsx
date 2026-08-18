import React, { useEffect, useState } from "react";
import Apiservices from "../../../Apiservices";
import { toast, Zoom } from "react-toastify";

const LateFeeRules = () => {
  const [rule, setRule] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Form State
  const [ruleName, setRuleName] = useState("Standard Platform Policy");
  const [gracePeriodMinutes, setGracePeriodMinutes] = useState(15);
  const [lateFeePerHour, setLateFeePerHour] = useState(50);
  const [maxLateFee, setMaxLateFee] = useState(500);

  // Live Simulator state
  const [simMinutesLate, setSimMinutesLate] = useState(45);

  useEffect(() => {
    fetchRule();
  }, []);

  const fetchRule = async () => {
    try {
      setLoading(true);
      const res = await Apiservices.getAdminLateFeeRules();
      if (res.data.success && res.data.data) {
        const data = res.data.data;
        setRule(data);
        setRuleName(data.ruleName || "Standard Platform Policy");
        setGracePeriodMinutes(data.gracePeriodMinutes ?? 15);
        setLateFeePerHour(data.lateFeePerHour ?? 50);
        setMaxLateFee(data.maxLateFee ?? 500);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to load late fee policy");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      const res = await Apiservices.updateAdminLateFeeRules({
        ruleName,
        gracePeriodMinutes: Number(gracePeriodMinutes),
        lateFeePerHour: Number(lateFeePerHour),
        maxLateFee: Number(maxLateFee)
      });

      if (res.data.success) {
        toast.success("Late fee policy updated successfully!", { transition: Zoom });
        fetchRule();
      } else {
        toast.warning(res.data.message);
      }
    } catch (err) {
      toast.error("Failed to update policy");
    } finally {
      setSaving(false);
    }
  };

  // Simulate calculation
  const simGrace = Number(gracePeriodMinutes) || 0;
  const simRate = Number(lateFeePerHour) || 0;
  const simMax = Number(maxLateFee) || 0;
  let simulatedFee = 0;
  if (simMinutesLate > simGrace) {
    const billableMins = simMinutesLate - simGrace;
    const hours = Math.ceil(billableMins / 60);
    simulatedFee = Math.min(hours * simRate, simMax);
  }

  if (loading) {
    return (
      <div className="container py-5 text-center min-vh-100">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-3 text-muted">Loading policy rules...</p>
      </div>
    );
  }

  return (
    <div className="container-fluid bg-light py-5 min-vh-100">
      <div className="container">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
          <div>
            <h2 className="fw-bold text-dark mb-1">
              <i className="fas fa-hourglass-half text-secondary me-2"></i>
              Late Fee & Overtime Policy Configuration
            </h2>
            <p className="text-muted small mb-0">
              Set automated overtime penalty rules applied seamlessly when drivers exceed reserved checkout time
            </p>
          </div>
        </div>

        <div className="row g-4">
          {/* Configuration Form */}
          <div className="col-lg-7">
            <div className="card border-0 shadow-sm rounded-4 p-4 p-md-5 bg-white">
              <h5 className="fw-bold text-dark mb-3">
                <i className="fas fa-sliders-h text-primary me-2"></i>
                Active Overstay Policy
              </h5>

              <form onSubmit={handleSave}>
                <div className="mb-3">
                  <label className="form-label small fw-semibold text-secondary">Policy Title</label>
                  <input
                    type="text"
                    className="form-control bg-light py-2"
                    value={ruleName}
                    onChange={(e) => setRuleName(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label small fw-semibold text-secondary">
                    Grace Period (Minutes)
                  </label>
                  <div className="input-group">
                    <input
                      type="number"
                      min="0"
                      max="120"
                      className="form-control bg-light py-2"
                      value={gracePeriodMinutes}
                      onChange={(e) => setGracePeriodMinutes(e.target.value)}
                      required
                    />
                    <span className="input-group-text bg-light border">Minutes</span>
                  </div>
                  <small className="text-muted">
                    No extra charge if driver checks out within this window past scheduled end time.
                  </small>
                </div>

                <div className="mb-3">
                  <label className="form-label small fw-semibold text-secondary">
                    Late Penalty Rate (₹ / Hour)
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-light border">₹</span>
                    <input
                      type="number"
                      min="0"
                      className="form-control bg-light py-2"
                      value={lateFeePerHour}
                      onChange={(e) => setLateFeePerHour(e.target.value)}
                      required
                    />
                    <span className="input-group-text bg-light border">/ Hour</span>
                  </div>
                  <small className="text-muted">
                    Charged for every hour (or fraction of an hour) beyond the grace period.
                  </small>
                </div>

                <div className="mb-4">
                  <label className="form-label small fw-semibold text-secondary">
                    Maximum Penalty Cap (₹)
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-light border">₹</span>
                    <input
                      type="number"
                      min="0"
                      className="form-control bg-light py-2"
                      value={maxLateFee}
                      onChange={(e) => setMaxLateFee(e.target.value)}
                      required
                    />
                  </div>
                  <small className="text-muted">
                    Upper boundary cap to prevent astronomical charges on long overstays.
                  </small>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary rounded-pill px-5 py-2 fw-semibold shadow-sm"
                  disabled={saving}
                >
                  {saving ? "Saving Policy..." : "Save Policy Configuration"}
                </button>
              </form>
            </div>
          </div>

          {/* Simulator & Live Preview */}
          <div className="col-lg-5">
            <div className="card border-0 shadow-sm rounded-4 p-4 bg-white mb-4">
              <h5 className="fw-bold text-dark mb-3">
                <i className="fas fa-calculator text-success me-2"></i>
                Late Fee Simulator
              </h5>
              <p className="text-muted small">
                Test how the automated rule will calculate fees for drivers checking out tardy.
              </p>

              <div className="mb-3">
                <label className="form-label small fw-semibold text-secondary">
                  Tardy Checkout Delay: <strong>{simMinutesLate} minutes</strong>
                </label>
                <input
                  type="range"
                  className="form-range"
                  min="0"
                  max="300"
                  step="5"
                  value={simMinutesLate}
                  onChange={(e) => setSimMinutesLate(Number(e.target.value))}
                />
                <div className="d-flex justify-content-between text-muted small">
                  <span>0 min</span>
                  <span>150 min (2.5h)</span>
                  <span>300 min (5h)</span>
                </div>
              </div>

              <div className="p-3 bg-light rounded-3 small">
                <div className="d-flex justify-content-between py-1 border-bottom">
                  <span>Grace Threshold:</span>
                  <span>{gracePeriodMinutes} mins</span>
                </div>
                <div className="d-flex justify-content-between py-1 border-bottom">
                  <span>Billable Overage:</span>
                  <span>{Math.max(0, simMinutesLate - gracePeriodMinutes)} mins</span>
                </div>
                <div className="d-flex justify-content-between py-1 border-bottom">
                  <span>Hourly Multiplier:</span>
                  <span>{Math.max(0, simMinutesLate - gracePeriodMinutes) === 0 ? 0 : Math.ceil((simMinutesLate - gracePeriodMinutes) / 60)} hrs × ₹{lateFeePerHour}</span>
                </div>
                <div className="d-flex justify-content-between py-2 fw-bold text-dark fs-6">
                  <span>Computed Late Penalty:</span>
                  <span className="text-danger">₹{simulatedFee}</span>
                </div>
              </div>
            </div>

            {/* Platform Policy Summary */}
            <div className="card border-0 shadow-sm rounded-4 p-4 bg-primary text-white">
              <h6 className="fw-bold mb-2">
                <i className="fas fa-info-circle me-2"></i> Automated Settlement
              </h6>
              <p className="small mb-0 opacity-75">
                During driver checkout on the mobile digital pass or host gate monitor, the late fee is dynamically evaluated and added to the gross transaction total, allocating 90% to host earnings and 10% to platform commission automatically.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LateFeeRules;
