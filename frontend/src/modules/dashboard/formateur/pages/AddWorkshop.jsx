import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createWorkshop } from "../../../workshop/services/workshop.service";
import "../../vendor/index.css";

const initialForm = {
  title: "",
  description: "",
  image: "",
  category: "BAKERY",
  location: "",
  isOnline: false,
  startsAt: "",
  endsAt: "",
  capacity: "",
  price: "0",
  currency: "DT",
  techniques: "",
  included: "",
};

const categories = ["BAKERY", "COOKING", "NUTRITION", "WELLNESS", "OTHER"];

const toList = (value) =>
  value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);

export default function AddWorkshop() {
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
      await createWorkshop({
        ...form,
        startsAt: new Date(form.startsAt),
        endsAt: form.endsAt ? new Date(form.endsAt) : undefined,
        capacity: Number(form.capacity),
        price: Number(form.price || 0),
        techniques: toList(form.techniques),
        included: toList(form.included),
      });

      setMessage("Workshop added successfully.");
      setForm(initialForm);
    } catch (err) {
      setError(err.response?.data?.message || "Could not add workshop.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="dashboard-page">
      <div className="dashboard-shell">
        <div className="dashboard-top">
          <div>
            <div className="dashboard-kicker">Formateur Dashboard</div>
            <h1 className="dashboard-title">Add Workshop</h1>
            <p className="dashboard-subtitle">Create a formation and secure its registrations.</p>
          </div>

          <Link to="/formateur/workshops">
            <button className="dashboard-btn dashboard-btn-secondary">My Workshops</button>
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

              <div className="dashboard-field dashboard-field-full">
                <label>Techniques</label>
                <textarea name="techniques" value={form.techniques} onChange={handleChange} placeholder={"One technique per line"} />
              </div>

              <div className="dashboard-field dashboard-field-full">
                <label>Included</label>
                <textarea name="included" value={form.included} onChange={handleChange} placeholder={"One included item per line"} />
              </div>

              <label className="admin-checkbox">
                <input type="checkbox" name="isOnline" checked={form.isOnline} onChange={handleChange} />
                Online workshop
              </label>
            </div>

            <div className="dashboard-actions">
              <button type="button" className="dashboard-btn dashboard-btn-secondary" onClick={() => setForm(initialForm)}>
                Reset
              </button>
              <button className="dashboard-btn dashboard-btn-primary" disabled={loading}>
                {loading ? "Saving..." : "Add Workshop"}
              </button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}
