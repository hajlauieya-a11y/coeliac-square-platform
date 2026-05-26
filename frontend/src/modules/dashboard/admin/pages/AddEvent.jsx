import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createEvent } from "../../../event/services/event.service";
import "../../vendor/index.css";
import "../index.css";

const initialForm = {
  title: "",
  description: "",
  category: "CUISINE",
  tag: "",
  image: "",
  location: "",
  isOnline: false,
  startsAt: "",
  endsAt: "",
  capacity: "",
  price: "0",
  currency: "DT",
  isFeatured: false,
};

const categories = ["CUISINE", "MEDICAL", "BIEN-ETRE", "CONFERENCES", "AUTRE"];

export default function AddEvent() {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      await createEvent({
        ...form,
        startsAt: new Date(form.startsAt),
        endsAt: form.endsAt ? new Date(form.endsAt) : undefined,
        capacity: Number(form.capacity),
        price: Number(form.price || 0),
      });

      setMessage("Event added successfully.");
      setForm(initialForm);
    } catch (err) {
      setError(err.response?.data?.message || "Could not add event.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="dashboard-page">
      <div className="dashboard-shell">
        <div className="dashboard-top">
          <div>
            <div className="dashboard-kicker">Admin Dashboard</div>
            <h1 className="dashboard-title">Add Event</h1>
            <p className="dashboard-subtitle">
              Create an event and secure its tickets with backend reservations.
            </p>
          </div>

          <Link to="/admin/events">
            <button className="dashboard-btn dashboard-btn-secondary">Manage Events</button>
          </Link>
        </div>

        <section className="dashboard-card">
          <form className="dashboard-form" onSubmit={handleSubmit}>
            {message && <div className="dashboard-message success">{message}</div>}
            {error && <div className="dashboard-message error">{error}</div>}

            <div className="dashboard-grid">
              <div className="dashboard-field">
                <label>Title</label>
                <input name="title" value={form.title} onChange={handleChange} required />
              </div>

              <div className="dashboard-field">
                <label>Category</label>
                <select name="category" value={form.category} onChange={handleChange}>
                  {categories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div className="dashboard-field dashboard-field-full">
                <label>Description</label>
                <textarea name="description" value={form.description} onChange={handleChange} required />
              </div>

              <div className="dashboard-field">
                <label>Tag</label>
                <input name="tag" value={form.tag} onChange={handleChange} placeholder="GOURMET" />
              </div>

              <div className="dashboard-field">
                <label>Location</label>
                <input name="location" value={form.location} onChange={handleChange} required />
              </div>

              <div className="dashboard-field">
                <label>Starts At</label>
                <input name="startsAt" type="datetime-local" value={form.startsAt} onChange={handleChange} required />
              </div>

              <div className="dashboard-field">
                <label>Ends At</label>
                <input name="endsAt" type="datetime-local" value={form.endsAt} onChange={handleChange} />
              </div>

              <div className="dashboard-field">
                <label>Capacity</label>
                <input name="capacity" type="number" min="1" value={form.capacity} onChange={handleChange} required />
              </div>

              <div className="dashboard-field">
                <label>Price</label>
                <input name="price" type="number" min="0" step="0.01" value={form.price} onChange={handleChange} />
              </div>

              <div className="dashboard-field dashboard-field-full">
                <label>Image URL</label>
                <input name="image" value={form.image} onChange={handleChange} placeholder="https://..." />
              </div>

              <label className="admin-checkbox">
                <input type="checkbox" name="isOnline" checked={form.isOnline} onChange={handleChange} />
                Online event
              </label>

              <label className="admin-checkbox">
                <input type="checkbox" name="isFeatured" checked={form.isFeatured} onChange={handleChange} />
                Featured event
              </label>
            </div>

            <div className="dashboard-actions">
              <button type="button" className="dashboard-btn dashboard-btn-secondary" onClick={() => setForm(initialForm)}>
                Reset
              </button>
              <button className="dashboard-btn dashboard-btn-primary" disabled={loading}>
                {loading ? "Saving..." : "Add Event"}
              </button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}
