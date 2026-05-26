import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  deleteWorkshop,
  getFormateurWorkshops,
  getWorkshopRegistrations,
  updateWorkshop,
} from "../../../workshop/services/workshop.service";
import "../../vendor/index.css";
import "../../admin/index.css";

const categories = ["BAKERY", "COOKING", "NUTRITION", "WELLNESS", "OTHER"];

const toForm = (workshop) => ({
  title: workshop.title || "",
  description: workshop.description || "",
  image: workshop.image || "",
  category: workshop.category || "BAKERY",
  location: workshop.location || "",
  isOnline: Boolean(workshop.isOnline),
  startsAt: workshop.startsAt ? workshop.startsAt.slice(0, 16) : "",
  endsAt: workshop.endsAt ? workshop.endsAt.slice(0, 16) : "",
  capacity: workshop.capacity || "",
  price: workshop.price || 0,
  currency: workshop.currency || "DT",
  techniques: workshop.techniques?.join("\n") || "",
  included: workshop.included?.join("\n") || "",
});

const toList = (value) =>
  value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);

export default function FormateurWorkshops() {
  const [workshops, setWorkshops] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState(null);
  const [registrationsByWorkshop, setRegistrationsByWorkshop] = useState({});
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const loadWorkshops = () => {
    setLoading(true);
    getFormateurWorkshops()
      .then((res) => {
        setWorkshops(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.response?.data?.message || "Could not load workshops.");
        setLoading(false);
      });
  };

  useEffect(() => {
    loadWorkshops();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const saveWorkshop = async (id) => {
    try {
      const res = await updateWorkshop(id, {
        ...editForm,
        startsAt: new Date(editForm.startsAt),
        endsAt: editForm.endsAt ? new Date(editForm.endsAt) : undefined,
        capacity: Number(editForm.capacity),
        price: Number(editForm.price || 0),
        techniques: toList(editForm.techniques),
        included: toList(editForm.included),
      });

      setWorkshops((prev) => prev.map((workshop) => (workshop._id === id ? res.data : workshop)));
      setEditingId(null);
      setEditForm(null);
      setMessage("Workshop updated successfully.");
    } catch (err) {
      setError(err.response?.data?.message || "Could not update workshop.");
    }
  };

  const removeWorkshop = async (id) => {
    const confirmed = window.confirm("Delete this workshop?");
    if (!confirmed) return;

    try {
      await deleteWorkshop(id);
      setWorkshops((prev) => prev.filter((workshop) => workshop._id !== id));
      setMessage("Workshop deleted successfully.");
    } catch (err) {
      setError(err.response?.data?.message || "Could not delete workshop.");
    }
  };

  const toggleRegistrations = async (id) => {
    if (registrationsByWorkshop[id]) {
      setRegistrationsByWorkshop((prev) => ({ ...prev, [id]: null }));
      return;
    }

    try {
      const res = await getWorkshopRegistrations(id);
      setRegistrationsByWorkshop((prev) => ({ ...prev, [id]: res.data }));
    } catch (err) {
      setError(err.response?.data?.message || "Could not load registrations.");
    }
  };

  return (
    <main className="dashboard-page">
      <div className="dashboard-shell dashboard-shell-wide">
        <div className="dashboard-top">
          <div>
            <div className="dashboard-kicker">Formateur Dashboard</div>
            <h1 className="dashboard-title">My Workshops</h1>
            <p className="dashboard-subtitle">Manage your formations and view participant registrations.</p>
          </div>

          <Link to="/formateur/workshops/new">
            <button className="dashboard-btn dashboard-btn-primary">Add Workshop</button>
          </Link>
        </div>

        {message && <div className="dashboard-message success">{message}</div>}
        {error && <div className="dashboard-message error">{error}</div>}

        <section className="dashboard-card">
          {loading ? (
            <p>Loading workshops...</p>
          ) : workshops.length === 0 ? (
            <p>No workshops yet.</p>
          ) : (
            <div className="vendor-table">
              {workshops.map((workshop) => (
                <article key={workshop._id} className="vendor-product-row">
                  {editingId === workshop._id ? (
                    <>
                      <div className="vendor-edit-grid">
                        <input name="title" value={editForm.title} onChange={handleChange} />
                        <select name="category" value={editForm.category} onChange={handleChange}>
                          {categories.map((category) => (
                            <option key={category} value={category}>{category}</option>
                          ))}
                        </select>
                        <input name="location" value={editForm.location} onChange={handleChange} />
                        <input name="startsAt" type="datetime-local" value={editForm.startsAt} onChange={handleChange} />
                        <input name="endsAt" type="datetime-local" value={editForm.endsAt} onChange={handleChange} />
                        <input name="capacity" type="number" value={editForm.capacity} onChange={handleChange} />
                        <input name="price" type="number" value={editForm.price} onChange={handleChange} />
                        <input name="image" value={editForm.image} onChange={handleChange} placeholder="Image URL" />
                        <textarea name="description" value={editForm.description} onChange={handleChange} />
                        <textarea name="techniques" value={editForm.techniques} onChange={handleChange} />
                        <textarea name="included" value={editForm.included} onChange={handleChange} />
                        <label className="admin-checkbox">
                          <input type="checkbox" name="isOnline" checked={editForm.isOnline} onChange={handleChange} />
                          Online workshop
                        </label>
                      </div>

                      <div className="vendor-row-actions">
                        <button className="dashboard-btn dashboard-btn-primary" onClick={() => saveWorkshop(workshop._id)}>Save</button>
                        <button className="dashboard-btn dashboard-btn-secondary" onClick={() => setEditingId(null)}>Cancel</button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="vendor-product-main">
                        <div className="vendor-product-img" style={workshop.image ? { backgroundImage: `url(${workshop.image})` } : undefined} />
                        <div>
                          <h2>{workshop.title}</h2>
                          <p>{workshop.description}</p>
                          <div className="vendor-product-meta">
                            <span>{workshop.category}</span>
                            <span>{new Date(workshop.startsAt).toLocaleString()}</span>
                            <span>{workshop.availableSeats}/{workshop.capacity} seats</span>
                            <span>{workshop.price} {workshop.currency}</span>
                          </div>
                        </div>
                      </div>

                      <div className="vendor-row-actions">
                        <button className="dashboard-btn dashboard-btn-secondary" onClick={() => {
                          setEditingId(workshop._id);
                          setEditForm(toForm(workshop));
                        }}>Edit</button>
                        <button className="dashboard-btn dashboard-btn-secondary" onClick={() => toggleRegistrations(workshop._id)}>
                          Registrations
                        </button>
                        <button className="dashboard-btn dashboard-btn-danger" onClick={() => removeWorkshop(workshop._id)}>Delete</button>
                      </div>

                      {registrationsByWorkshop[workshop._id] && (
                        <div className="dashboard-ticket-list">
                          {registrationsByWorkshop[workshop._id].length === 0 ? (
                            <p>No registrations yet.</p>
                          ) : (
                            registrationsByWorkshop[workshop._id].map((registration) => (
                              <div key={registration._id} className="dashboard-ticket-row">
                                <span>{registration.user?.name || "User"}</span>
                                <span>{registration.user?.email}</span>
                                <strong>{registration.registrationCode}</strong>
                                <span>{registration.status}</span>
                              </div>
                            ))
                          )}
                        </div>
                      )}
                    </>
                  )}
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
