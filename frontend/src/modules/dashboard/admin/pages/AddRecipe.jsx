import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createRecipe } from "../../../recipes/services/recipe.service";
import "../../vendor/index.css";
import "../index.css";

const initialForm = {
  title: "",
  description: "",
  image: "",
  badge: "BEGINNER",
  imageBadge: "",
  time: "",
  level: "Beginner",
  servings: "",
  profile: "Gluten-Free",
  category: "Bakery",
  filters: "",
  ingredients: "",
  steps: "",
  tip: "",
  isFeatured: false,
};

const levels = ["Beginner", "Intermediate", "Advanced", "Expert"];

const parseLines = (value, mapper) => {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map(mapper)
    .filter(Boolean);
};

export default function AddRecipe() {
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
      const filters = form.filters
        .split(",")
        .map((filter) => filter.trim())
        .filter(Boolean);

      const ingredients = parseLines(form.ingredients, (line) => {
        const [name, qty = ""] = line.split("|").map((part) => part.trim());
        return { name, qty: qty || "As needed" };
      });

      const steps = parseLines(form.steps, (line, index) => {
        const [title, text = "", image = ""] = line.split("|").map((part) => part.trim());
        if (!text) {
          return {
            title: `Step ${index + 1}`,
            text: title,
            image: "",
          };
        }

        return { title, text, image };
      });

      if (steps.length === 0) {
        setError("Please add at least one recipe step.");
        setLoading(false);
        return;
      }

      await createRecipe({
        ...form,
        filters,
        ingredients,
        steps,
      });

      setMessage("Recipe added successfully.");
      setForm(initialForm);
    } catch (err) {
      setError(err.response?.data?.message || "Could not add recipe.");
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
            <h1 className="dashboard-title">Add Recipe</h1>
            <p className="dashboard-subtitle">
              Create a recipe for the public library. Ingredients and steps use one item per line.
            </p>
          </div>

          <Link to="/recette">
            <button className="dashboard-btn dashboard-btn-secondary">View Recipes</button>
          </Link>
        </div>

        <section className="dashboard-card">
          <form className="dashboard-form" onSubmit={handleSubmit}>
            {message && <div className="dashboard-message success">{message}</div>}
            {error && <div className="dashboard-message error">{error}</div>}

            <div className="dashboard-grid">
              <div className="dashboard-field">
                <label>Recipe Title</label>
                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Gluten-Free Banana Pancakes"
                  required
                />
              </div>

              <div className="dashboard-field">
                <label>Category</label>
                <input name="category" value={form.category} onChange={handleChange} required />
              </div>

              <div className="dashboard-field dashboard-field-full">
                <label>Description</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Short recipe introduction."
                  required
                />
              </div>

              <div className="dashboard-field">
                <label>Time</label>
                <input name="time" value={form.time} onChange={handleChange} placeholder="20 min" required />
              </div>

              <div className="dashboard-field">
                <label>Level</label>
                <select name="level" value={form.level} onChange={handleChange}>
                  {levels.map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
              </div>

              <div className="dashboard-field">
                <label>Servings</label>
                <input name="servings" value={form.servings} onChange={handleChange} placeholder="8 Pancakes" />
              </div>

              <div className="dashboard-field">
                <label>Profile</label>
                <input name="profile" value={form.profile} onChange={handleChange} />
              </div>

              <div className="dashboard-field">
                <label>Badge</label>
                <input name="badge" value={form.badge} onChange={handleChange} placeholder="BEGINNER" />
              </div>

              <div className="dashboard-field">
                <label>Image Badge</label>
                <input name="imageBadge" value={form.imageBadge} onChange={handleChange} placeholder="VEGAN OPTION" />
              </div>

              <div className="dashboard-field dashboard-field-full">
                <label>Image URL</label>
                <input name="image" value={form.image} onChange={handleChange} placeholder="https://..." />
              </div>

              <div className="dashboard-field dashboard-field-full">
                <label>Filters</label>
                <input
                  name="filters"
                  value={form.filters}
                  onChange={handleChange}
                  placeholder="Vegan, Dairy-Free, Under 30 Mins"
                />
              </div>

              <div className="dashboard-field dashboard-field-full">
                <label>Ingredients</label>
                <textarea
                  name="ingredients"
                  value={form.ingredients}
                  onChange={handleChange}
                  placeholder={"Ripe Bananas | 2\nGluten-Free Flour | 120g"}
                  required
                />
                <p className="admin-recipe-helper">Format: ingredient name | quantity</p>
              </div>

              <div className="dashboard-field dashboard-field-full">
                <label>Steps</label>
                <textarea
                  name="steps"
                  value={form.steps}
                  onChange={handleChange}
                  placeholder={"Mash | Mash the bananas until smooth.\nCook | Cook pancakes until golden."}
                  required
                />
                <p className="admin-recipe-helper">Format: step title | step text | optional image URL</p>
              </div>

              <div className="dashboard-field dashboard-field-full">
                <label>Tip</label>
                <textarea name="tip" value={form.tip} onChange={handleChange} placeholder="Optional recipe tip." />
              </div>

              <label className="admin-checkbox">
                <input
                  type="checkbox"
                  name="isFeatured"
                  checked={form.isFeatured}
                  onChange={handleChange}
                />
                Feature this recipe
              </label>
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
                {loading ? "Saving..." : "Add Recipe"}
              </button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}
