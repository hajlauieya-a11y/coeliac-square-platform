import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createProduct } from "../../../marketplace/services/marketplace.service";
import "../index.css";

const initialForm = {
  name: "",
  description: "",
  price: "",
  currency: "DT",
  category: "SNACKS",
  image: "",
  weight: "",
  variant: "GLUTEN-FREE",
  stock: "",
};

const categories = ["SNACKS", "TREATS", "BREAKFAST", "PASTRIES"];

export default function AddProduct() {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      await createProduct({
        ...form,
        price: Number(form.price),
        stock: Number(form.stock || 0),
      });

      setMessage("Product added successfully.");
      setForm(initialForm);
    } catch (err) {
      setError(err.response?.data?.message || "Could not add product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="dashboard-page">
      <div className="dashboard-shell">
        <div className="dashboard-top">
          <div>
            <div className="dashboard-kicker">Vendor Dashboard</div>
            <h1 className="dashboard-title">Add Product</h1>
            <p className="dashboard-subtitle">
              Create a marketplace product that will appear in the boutique after saving.
            </p>
          </div>

          <Link to="/marketplace">
            <button className="dashboard-btn dashboard-btn-secondary">View Marketplace</button>
          </Link>
        </div>

        <section className="dashboard-card">
          <form className="dashboard-form" onSubmit={handleSubmit}>
            {message && <div className="dashboard-message success">{message}</div>}
            {error && <div className="dashboard-message error">{error}</div>}

            <div className="dashboard-grid">
              <div className="dashboard-field">
                <label>Product Name</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Gluten-Free Almond Cookies"
                  required
                />
              </div>

              <div className="dashboard-field">
                <label>Category</label>
                <select name="category" value={form.category} onChange={handleChange}>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div className="dashboard-field dashboard-field-full">
                <label>Description</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Describe the product, texture, ingredients, and gluten-free value."
                  required
                />
              </div>

              <div className="dashboard-field">
                <label>Price</label>
                <input
                  name="price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={form.price}
                  onChange={handleChange}
                  placeholder="12"
                  required
                />
              </div>

              <div className="dashboard-field">
                <label>Currency</label>
                <input name="currency" value={form.currency} onChange={handleChange} required />
              </div>

              <div className="dashboard-field">
                <label>Weight</label>
                <input
                  name="weight"
                  value={form.weight}
                  onChange={handleChange}
                  placeholder="250G"
                />
              </div>

              <div className="dashboard-field">
                <label>Variant</label>
                <input name="variant" value={form.variant} onChange={handleChange} />
              </div>

              <div className="dashboard-field">
                <label>Stock</label>
                <input
                  name="stock"
                  type="number"
                  min="0"
                  value={form.stock}
                  onChange={handleChange}
                  placeholder="20"
                />
              </div>

              <div className="dashboard-field">
                <label>Image URL</label>
                <input
                  name="image"
                  value={form.image}
                  onChange={handleChange}
                  placeholder="https://..."
                />
              </div>
            </div>

            <div className="dashboard-actions">
              <button
                type="button"
                className="dashboard-btn dashboard-btn-secondary"
                onClick={() => setForm(initialForm)}
              >
                Reset
              </button>
              <button className="dashboard-btn dashboard-btn-primary" disabled={loading}>
                {loading ? "Saving..." : "Add Product"}
              </button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}
