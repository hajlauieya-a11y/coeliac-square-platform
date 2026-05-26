import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  createExpertContent,
  deleteExpertContent,
  getMyExpertContent,
  updateExpertContent,
} from "../services/expert.service";
import "../../vendor/index.css";
import "../index.css";

const initialForm = {
  title: "",
  type: "article",
  summary: "",
  body: "",
  mediaUrl: "",
  status: "published",
};

export default function ExpertContents() {
  const [contents, setContents] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const loadContents = () => {
    setLoading(true);
    getMyExpertContent()
      .then((res) => {
        setContents(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.response?.data?.message || "Could not load content.");
        setLoading(false);
      });
  };

  useEffect(() => {
    loadContents();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setForm(initialForm);
    setEditingId(null);
  };

  const startEdit = (content) => {
    setEditingId(content._id);
    setForm({
      title: content.title || "",
      type: content.type || "article",
      summary: content.summary || "",
      body: content.body || "",
      mediaUrl: content.mediaUrl || "",
      status: content.status || "published",
    });
    setMessage("");
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    setError("");

    try {
      if (editingId) {
        await updateExpertContent(editingId, form);
        setMessage("Content updated successfully.");
      } else {
        await createExpertContent(form);
        setMessage("Content published successfully.");
      }

      resetForm();
      loadContents();
    } catch (err) {
      setError(err.response?.data?.message || "Could not save content.");
    } finally {
      setSaving(false);
    }
  };

  const removeContent = async (id) => {
    const confirmed = window.confirm("Delete this educational content?");
    if (!confirmed) return;

    try {
      await deleteExpertContent(id);
      setContents((prev) => prev.filter((content) => content._id !== id));
      setMessage("Content deleted successfully.");
    } catch (err) {
      setError(err.response?.data?.message || "Could not delete content.");
    }
  };

  return (
    <main className="dashboard-page">
      <div className="dashboard-shell dashboard-shell-wide">
        <div className="dashboard-top">
          <div>
            <div className="dashboard-kicker">Expert Dashboard</div>
            <h1 className="dashboard-title">Educational Content</h1>
            <p className="dashboard-subtitle">
              Manage the articles, videos, and information cards shown on the Maladie page.
            </p>
          </div>

          <Link to="/expert/profile">
            <button className="dashboard-btn dashboard-btn-secondary">Expert Information</button>
          </Link>
        </div>

        {message && <div className="dashboard-message success">{message}</div>}
        {error && <div className="dashboard-message error">{error}</div>}

        <div className="expert-content-layout">
          <section className="dashboard-card">
            <form className="dashboard-form" onSubmit={handleSubmit}>
              <h2 className="expert-panel-title">{editingId ? "Edit content" : "Add content"}</h2>

              <div className="dashboard-grid">
                <div className="dashboard-field dashboard-field-full">
                  <label>Title</label>
                  <input name="title" value={form.title} onChange={handleChange} required />
                </div>

                <div className="dashboard-field">
                  <label>Type</label>
                  <select name="type" value={form.type} onChange={handleChange}>
                    <option value="article">Article</option>
                    <option value="video">Video</option>
                    <option value="info">Info</option>
                  </select>
                </div>

                <div className="dashboard-field">
                  <label>Status</label>
                  <select name="status" value={form.status} onChange={handleChange}>
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>

                <div className="dashboard-field dashboard-field-full">
                  <label>Summary</label>
                  <textarea name="summary" value={form.summary} onChange={handleChange} required />
                </div>

                <div className="dashboard-field dashboard-field-full">
                  <label>Content</label>
                  <textarea name="body" value={form.body} onChange={handleChange} required />
                </div>

                <div className="dashboard-field dashboard-field-full">
                  <label>Video or Article URL</label>
                  <input name="mediaUrl" value={form.mediaUrl} onChange={handleChange} placeholder="https://..." />
                </div>
              </div>

              <div className="dashboard-actions">
                <button type="button" className="dashboard-btn dashboard-btn-secondary" onClick={resetForm}>
                  Reset
                </button>
                <button className="dashboard-btn dashboard-btn-primary" disabled={saving}>
                  {saving ? "Saving..." : editingId ? "Save Changes" : "Publish Content"}
                </button>
              </div>
            </form>
          </section>

          <section className="dashboard-card">
            <h2 className="expert-panel-title">My content</h2>

            {loading ? (
              <p>Loading content...</p>
            ) : contents.length === 0 ? (
              <p>No educational content yet.</p>
            ) : (
              <div className="expert-content-list">
                {contents.map((content) => (
                  <article key={content._id} className="expert-content-row">
                    <div>
                      <div className="expert-meta">
                        <span>{content.type}</span>
                        <span>{content.status}</span>
                      </div>
                      <h3>{content.title}</h3>
                      <p>{content.summary}</p>
                    </div>

                    <div className="vendor-row-actions">
                      <button className="dashboard-btn dashboard-btn-secondary" onClick={() => startEdit(content)}>
                        Edit
                      </button>
                      <button className="dashboard-btn dashboard-btn-danger" onClick={() => removeContent(content._id)}>
                        Delete
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
