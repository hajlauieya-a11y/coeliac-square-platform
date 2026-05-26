import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  deleteEvent,
  getEventTickets,
  getEvents,
  updateEvent,
} from "../../../event/services/event.service";
import "../../vendor/index.css";
import "../index.css";

const categories = ["CUISINE", "MEDICAL", "BIEN-ETRE", "CONFERENCES", "AUTRE"];

const toForm = (event) => ({
  title: event.title || "",
  description: event.description || "",
  category: event.category || "CUISINE",
  tag: event.tag || "",
  image: event.image || "",
  location: event.location || "",
  capacity: event.capacity || "",
  price: event.price || 0,
  currency: event.currency || "DT",
  startsAt: event.startsAt ? event.startsAt.slice(0, 16) : "",
  endsAt: event.endsAt ? event.endsAt.slice(0, 16) : "",
  isOnline: Boolean(event.isOnline),
  isFeatured: Boolean(event.isFeatured),
});

export default function AdminEvents() {
  const [events, setEvents] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState(null);
  const [ticketsByEvent, setTicketsByEvent] = useState({});
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const loadEvents = () => {
    setLoading(true);
    getEvents()
      .then((res) => {
        setEvents(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.response?.data?.message || "Could not load events.");
        setLoading(false);
      });
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const saveEvent = async (id) => {
    try {
      const res = await updateEvent(id, {
        ...editForm,
        startsAt: new Date(editForm.startsAt),
        endsAt: editForm.endsAt ? new Date(editForm.endsAt) : undefined,
        capacity: Number(editForm.capacity),
        price: Number(editForm.price || 0),
      });

      setEvents((prev) => prev.map((event) => (event._id === id ? res.data : event)));
      setEditingId(null);
      setEditForm(null);
      setMessage("Event updated successfully.");
    } catch (err) {
      setError(err.response?.data?.message || "Could not update event.");
    }
  };

  const removeEvent = async (id) => {
    const confirmed = window.confirm("Delete this event?");
    if (!confirmed) return;

    try {
      await deleteEvent(id);
      setEvents((prev) => prev.filter((event) => event._id !== id));
      setMessage("Event deleted successfully.");
    } catch (err) {
      setError(err.response?.data?.message || "Could not delete event.");
    }
  };

  const toggleTickets = async (id) => {
    if (ticketsByEvent[id]) {
      setTicketsByEvent((prev) => ({ ...prev, [id]: null }));
      return;
    }

    try {
      const res = await getEventTickets(id);
      setTicketsByEvent((prev) => ({ ...prev, [id]: res.data }));
    } catch (err) {
      setError(err.response?.data?.message || "Could not load tickets.");
    }
  };

  return (
    <main className="dashboard-page">
      <div className="dashboard-shell dashboard-shell-wide">
        <div className="dashboard-top">
          <div>
            <div className="dashboard-kicker">Admin Dashboard</div>
            <h1 className="dashboard-title">Manage Events</h1>
            <p className="dashboard-subtitle">Create, edit, delete events, and inspect secured tickets.</p>
          </div>

          <Link to="/admin/events/new">
            <button className="dashboard-btn dashboard-btn-primary">Add Event</button>
          </Link>
        </div>

        {message && <div className="dashboard-message success">{message}</div>}
        {error && <div className="dashboard-message error">{error}</div>}

        <section className="dashboard-card">
          {loading ? (
            <p>Loading events...</p>
          ) : events.length === 0 ? (
            <p>No events found.</p>
          ) : (
            <div className="vendor-table">
              {events.map((event) => (
                <article key={event._id} className="vendor-product-row">
                  {editingId === event._id ? (
                    <>
                      <div className="vendor-edit-grid">
                        <input name="title" value={editForm.title} onChange={handleChange} />
                        <select name="category" value={editForm.category} onChange={handleChange}>
                          {categories.map((category) => (
                            <option key={category} value={category}>{category}</option>
                          ))}
                        </select>
                        <input name="location" value={editForm.location} onChange={handleChange} />
                        <input name="tag" value={editForm.tag} onChange={handleChange} />
                        <input name="startsAt" type="datetime-local" value={editForm.startsAt} onChange={handleChange} />
                        <input name="endsAt" type="datetime-local" value={editForm.endsAt} onChange={handleChange} />
                        <input name="capacity" type="number" value={editForm.capacity} onChange={handleChange} />
                        <input name="price" type="number" value={editForm.price} onChange={handleChange} />
                        <input name="image" value={editForm.image} onChange={handleChange} placeholder="Image URL" />
                        <textarea name="description" value={editForm.description} onChange={handleChange} />
                        <label className="admin-checkbox">
                          <input type="checkbox" name="isOnline" checked={editForm.isOnline} onChange={handleChange} />
                          Online event
                        </label>
                        <label className="admin-checkbox">
                          <input type="checkbox" name="isFeatured" checked={editForm.isFeatured} onChange={handleChange} />
                          Featured event
                        </label>
                      </div>

                      <div className="vendor-row-actions">
                        <button className="dashboard-btn dashboard-btn-primary" onClick={() => saveEvent(event._id)}>Save</button>
                        <button className="dashboard-btn dashboard-btn-secondary" onClick={() => setEditingId(null)}>Cancel</button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="vendor-product-main">
                        <div className="vendor-product-img" style={event.image ? { backgroundImage: `url(${event.image})` } : undefined} />
                        <div>
                          <h2>{event.title}</h2>
                          <p>{event.description}</p>
                          <div className="vendor-product-meta">
                            <span>{event.category}</span>
                            <span>{new Date(event.startsAt).toLocaleString()}</span>
                            <span>{event.availableSeats}/{event.capacity} seats</span>
                            {event.isFeatured && <span>Featured</span>}
                          </div>
                        </div>
                      </div>

                      <div className="vendor-row-actions">
                        <button className="dashboard-btn dashboard-btn-secondary" onClick={() => {
                          setEditingId(event._id);
                          setEditForm(toForm(event));
                        }}>Edit</button>
                        <button className="dashboard-btn dashboard-btn-secondary" onClick={() => toggleTickets(event._id)}>
                          Tickets
                        </button>
                        <button className="dashboard-btn dashboard-btn-danger" onClick={() => removeEvent(event._id)}>Delete</button>
                      </div>

                      {ticketsByEvent[event._id] && (
                        <div className="dashboard-ticket-list">
                          {ticketsByEvent[event._id].length === 0 ? (
                            <p>No tickets yet.</p>
                          ) : (
                            ticketsByEvent[event._id].map((ticket) => (
                              <div key={ticket._id} className="dashboard-ticket-row">
                                <span>{ticket.user?.name || "User"}</span>
                                <span>{ticket.user?.email}</span>
                                <strong>{ticket.ticketCode}</strong>
                                <span>{ticket.status}</span>
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
