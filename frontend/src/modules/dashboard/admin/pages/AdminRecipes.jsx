import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  deleteRecipe,
  getRecipes,
  updateRecipe,
} from "../../../recipes/services/recipe.service";
import "../../vendor/index.css";
import "../index.css";

const levels = ["Beginner", "Intermediate", "Advanced", "Expert"];

const toEditForm = (recipe) => ({
  title: recipe.title || "",
  description: recipe.description || "",
  image: recipe.image || "",
  badge: recipe.badge || "",
  
  imageBadge: recipe.imageBadge || "",
  time: recipe.time || "",
  level: recipe.level || "Beginner",
  servings: recipe.servings || "",
  profile: recipe.profile || "Gluten-Free",
  category: recipe.category || "",
  filters: recipe.filters?.join(", ") || "",
  tip: recipe.tip || "",
  isFeatured: Boolean(recipe.isFeatured),
});

const toPayload = (form) => ({
  ...form,
  filters: form.filters
    .split(",")
    .map((filter) => filter.trim())
    .filter(Boolean),
});

export default function AdminRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const loadRecipes = () => {
    setLoading(true);
    getRecipes()
      .then((res) => {
        setRecipes(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.response?.data?.message || "Could not load recipes.");
        setLoading(false);
      });
  };

  useEffect(() => {
    loadRecipes();
  }, []);

  const startEdit = (recipe) => {
    setEditingId(recipe._id);
    setEditForm(toEditForm(recipe));
    setMessage("");
    setError("");
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const saveRecipe = async (id) => {
    try {
      const res = await updateRecipe(id, toPayload(editForm));
      setRecipes((prev) =>
        prev.map((recipe) => (recipe._id === id ? res.data : recipe))
      );
      setEditingId(null);
      setEditForm(null);
      setMessage("Recipe updated successfully.");
    } catch (err) {
      setError(err.response?.data?.message || "Could not update recipe.");
    }
  };

  const removeRecipe = async (id) => {
    const confirmed = window.confirm("Delete this recipe?");
    if (!confirmed) return;

    try {
      await deleteRecipe(id);
      setRecipes((prev) => prev.filter((recipe) => recipe._id !== id));
      setMessage("Recipe deleted successfully.");
    } catch (err) {
      setError(err.response?.data?.message || "Could not delete recipe.");
    }
  };

  return (
    <main className="dashboard-page">
      <div className="dashboard-shell dashboard-shell-wide">
        <div className="dashboard-top">
          <div>
            <div className="dashboard-kicker">Admin Dashboard</div>
            <h1 className="dashboard-title">Manage Recipes</h1>
            <p className="dashboard-subtitle">
              View, edit, or delete recipes from the public library.
            </p>
          </div>

          <Link to="/admin/recipes/new">
            <button className="dashboard-btn dashboard-btn-primary">Add Recipe</button>
          </Link>
        </div>

        {message && <div className="dashboard-message success">{message}</div>}
        {error && <div className="dashboard-message error">{error}</div>}

        <section className="dashboard-card">
          {loading ? (
            <p>Loading recipes...</p>
          ) : recipes.length === 0 ? (
            <p>No recipes found.</p>
          ) : (
            <div className="vendor-table">
              {recipes.map((recipe) => (
                <article key={recipe._id} className="vendor-product-row">
                  {editingId === recipe._id ? (
                    <>
                      <div className="vendor-edit-grid">
                        <input name="title" value={editForm.title} onChange={handleChange} />
                        <input name="category" value={editForm.category} onChange={handleChange} />
                        <input name="time" value={editForm.time} onChange={handleChange} />
                        <select name="level" value={editForm.level} onChange={handleChange}>
                          {levels.map((level) => (
                            <option key={level} value={level}>{level}</option>
                          ))}
                        </select>
                        <input name="servings" value={editForm.servings} onChange={handleChange} placeholder="Servings" />
                        <input name="profile" value={editForm.profile} onChange={handleChange} placeholder="Profile" />
                        <input name="badge" value={editForm.badge} onChange={handleChange} placeholder="Badge" />
                        <input name="imageBadge" value={editForm.imageBadge} onChange={handleChange} placeholder="Image badge" />
                        <input name="image" value={editForm.image} onChange={handleChange} placeholder="Image URL" />
                        <input name="filters" value={editForm.filters} onChange={handleChange} placeholder="Vegan, Dairy-Free" />
                        <textarea name="description" value={editForm.description} onChange={handleChange} />
                        <textarea name="tip" value={editForm.tip} onChange={handleChange} placeholder="Tip" />
                        <label className="admin-checkbox">
                          <input
                            type="checkbox"
                            name="isFeatured"
                            checked={editForm.isFeatured}
                            onChange={handleChange}
                          />
                          Featured recipe
                        </label>
                      </div>

                      <div className="vendor-row-actions">
                        <button className="dashboard-btn dashboard-btn-primary" onClick={() => saveRecipe(recipe._id)}>
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
                          style={recipe.image ? { backgroundImage: `url(${recipe.image})` } : undefined}
                        />
                        <div>
                          <h2>{recipe.title}</h2>
                          <p>{recipe.description}</p>
                          <div className="vendor-product-meta">
                            <span>{recipe.category}</span>
                            <span>{recipe.time}</span>
                            <span>{recipe.level}</span>
                            {recipe.isFeatured && <span>Featured</span>}
                          </div>
                        </div>
                      </div>

                      <div className="vendor-row-actions">
                        <button className="dashboard-btn dashboard-btn-secondary" onClick={() => startEdit(recipe)}>
                          Edit
                        </button>
                        <button className="dashboard-btn dashboard-btn-danger" onClick={() => removeRecipe(recipe._id)}>
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
