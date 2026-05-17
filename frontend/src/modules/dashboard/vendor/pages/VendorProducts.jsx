import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  deleteProduct,
  getVendorProducts,
  updateProduct,
} from "../../../marketplace/services/marketplace.service";
import "../index.css";

const categories = ["SNACKS", "TREATS", "BREAKFAST", "PASTRIES"];

const toEditableProduct = (product) => ({
  name: product.name || "",
  description: product.description || "",
  price: product.price || "",
  currency: product.currency || "DT",
  category: product.category || "SNACKS",
  image: product.image || "",
  weight: product.weight || "",
  variant: product.variant || "GLUTEN-FREE",
  stock: product.stock || 0,
});

export default function VendorProducts() {
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const loadProducts = () => {
    setLoading(true);
    getVendorProducts()
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.response?.data?.message || "Could not load products.");
        setLoading(false);
      });
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const startEdit = (product) => {
    setEditingId(product._id);
    setEditForm(toEditableProduct(product));
    setMessage("");
    setError("");
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const saveEdit = async (id) => {
    try {
      const res = await updateProduct(id, {
        ...editForm,
        price: Number(editForm.price),
        stock: Number(editForm.stock || 0),
      });

      setProducts((prev) =>
        prev.map((product) => (product._id === id ? res.data : product))
      );
      setEditingId(null);
      setEditForm(null);
      setMessage("Product updated successfully.");
    } catch (err) {
      setError(err.response?.data?.message || "Could not update product.");
    }
  };

  const removeProduct = async (id) => {
    const confirmed = window.confirm("Delete this product?");
    if (!confirmed) return;

    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((product) => product._id !== id));
      setMessage("Product deleted successfully.");
    } catch (err) {
      setError(err.response?.data?.message || "Could not delete product.");
    }
  };

  return (
    <main className="dashboard-page">
      <div className="dashboard-shell dashboard-shell-wide">
        <div className="dashboard-top">
          <div>
            <div className="dashboard-kicker">Vendor Dashboard</div>
            <h1 className="dashboard-title">My Products</h1>
            <p className="dashboard-subtitle">
              View, edit, or remove products you added to the marketplace.
            </p>
          </div>

          <Link to="/vendor/products/new">
            <button className="dashboard-btn dashboard-btn-primary">Add Product</button>
          </Link>
        </div>

        {message && <div className="dashboard-message success">{message}</div>}
        {error && <div className="dashboard-message error">{error}</div>}

        <section className="dashboard-card">
          {loading ? (
            <p>Loading products...</p>
          ) : products.length === 0 ? (
            <p>No products yet. Add your first product to see it here.</p>
          ) : (
            <div className="vendor-table">
              {products.map((product) => (
                <article key={product._id} className="vendor-product-row">
                  {editingId === product._id ? (
                    <>
                      <div className="vendor-edit-grid">
                        <input name="name" value={editForm.name} onChange={handleEditChange} />
                        <select name="category" value={editForm.category} onChange={handleEditChange}>
                          {categories.map((category) => (
                            <option key={category} value={category}>{category}</option>
                          ))}
                        </select>
                        <input name="price" type="number" value={editForm.price} onChange={handleEditChange} />
                        <input name="stock" type="number" value={editForm.stock} onChange={handleEditChange} />
                        <input name="weight" value={editForm.weight} onChange={handleEditChange} placeholder="Weight" />
                        <input name="variant" value={editForm.variant} onChange={handleEditChange} placeholder="Variant" />
                        <input name="image" value={editForm.image} onChange={handleEditChange} placeholder="Image URL" />
                        <textarea name="description" value={editForm.description} onChange={handleEditChange} />
                      </div>

                      <div className="vendor-row-actions">
                        <button className="dashboard-btn dashboard-btn-primary" onClick={() => saveEdit(product._id)}>
                          Save
                        </button>
                        <button className="dashboard-btn dashboard-btn-secondary" onClick={() => setEditingId(null)}>
                          Cancel
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="vendor-product-main">
                        <div
                          className="vendor-product-img"
                          style={product.image ? { backgroundImage: `url(${product.image})` } : undefined}
                        />
                        <div>
                          <h2>{product.name}</h2>
                          <p>{product.description}</p>
                          <div className="vendor-product-meta">
                            <span>{product.category}</span>
                            <span>{product.price} {product.currency || "DT"}</span>
                            <span>Stock: {product.stock}</span>
                          </div>
                        </div>
                      </div>

                      <div className="vendor-row-actions">
                        <button className="dashboard-btn dashboard-btn-secondary" onClick={() => startEdit(product)}>
                          Edit
                        </button>
                        <button className="dashboard-btn dashboard-btn-danger" onClick={() => removeProduct(product._id)}>
                          Delete
                        </button>
                      </div>
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
