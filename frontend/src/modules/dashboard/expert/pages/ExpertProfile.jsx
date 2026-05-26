import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getExpertProfile, updateExpertProfile } from "../services/expert.service";
import "../../vendor/index.css";

const initialProfile = {
  specialty: "",
  bio: "",
  phone: "",
  image: "",
  location: "",
};

export default function ExpertProfile() {
  const [profile, setProfile] = useState(initialProfile);
  const [identity, setIdentity] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    getExpertProfile()
      .then((res) => {
        setIdentity({ name: res.data.name, email: res.data.email });
        setProfile({ ...initialProfile, ...(res.data.expertProfile || {}) });
        setLoading(false);
      })
      .catch((err) => {
        setError(err.response?.data?.message || "Could not load profile.");
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    setError("");

    try {
      const res = await updateExpertProfile(profile);
      setProfile({ ...initialProfile, ...(res.data.expertProfile || {}) });
      setMessage("Expert information updated successfully.");
    } catch (err) {
      setError(err.response?.data?.message || "Could not update profile.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="dashboard-page">
      <div className="dashboard-shell">
        <div className="dashboard-top">
          <div>
            <div className="dashboard-kicker">Expert Dashboard</div>
            <h1 className="dashboard-title">Expert Information</h1>
            <p className="dashboard-subtitle">
              This information appears with your educational content on the Maladie page.
            </p>
          </div>

          <Link to="/expert/dashboard">
            <button className="dashboard-btn dashboard-btn-secondary">Back to Dashboard</button>
          </Link>
        </div>

        <section className="dashboard-card">
          {loading ? (
            <p>Loading profile...</p>
          ) : (
            <form className="dashboard-form" onSubmit={handleSubmit}>
              {message && <div className="dashboard-message success">{message}</div>}
              {error && <div className="dashboard-message error">{error}</div>}

              <div className="dashboard-grid">
                <div className="dashboard-field">
                  <label>Name</label>
                  <input value={identity.name} disabled />
                </div>

                <div className="dashboard-field">
                  <label>Email</label>
                  <input value={identity.email} disabled />
                </div>

                <div className="dashboard-field">
                  <label>Specialty</label>
                  <input
                    name="specialty"
                    value={profile.specialty}
                    onChange={handleChange}
                    placeholder="Nutritionist, dietitian, doctor..."
                  />
                </div>

                <div className="dashboard-field">
                  <label>Phone</label>
                  <input name="phone" value={profile.phone} onChange={handleChange} />
                </div>

                <div className="dashboard-field">
                  <label>Location</label>
                  <input name="location" value={profile.location} onChange={handleChange} />
                </div>

                <div className="dashboard-field">
                  <label>Image URL</label>
                  <input name="image" value={profile.image} onChange={handleChange} placeholder="https://..." />
                </div>

                <div className="dashboard-field dashboard-field-full">
                  <label>Bio</label>
                  <textarea
                    name="bio"
                    value={profile.bio}
                    onChange={handleChange}
                    placeholder="Short presentation for patients and visitors."
                  />
                </div>
              </div>

              <div className="dashboard-actions">
                <button className="dashboard-btn dashboard-btn-primary" disabled={saving}>
                  {saving ? "Saving..." : "Save Information"}
                </button>
              </div>
            </form>
          )}
        </section>
      </div>
    </main>
  );
}
