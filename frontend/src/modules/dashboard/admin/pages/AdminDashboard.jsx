import React from "react";
import { Link } from "react-router-dom";
import "../../vendor/index.css";
import "../index.css";

export default function AdminDashboard() {
  return (
    <main className="dashboard-page">
      <div className="dashboard-shell">
        <div className="dashboard-top">
          <div>
            <div className="dashboard-kicker">Admin Dashboard</div>
            <h1 className="dashboard-title">Manage Platform Content</h1>
            <p className="dashboard-subtitle">
              Add recipes for the public library. Marketplace moderation and user tools can come next.
            </p>
          </div>

          <Link to="/recette">
            <button className="dashboard-btn dashboard-btn-secondary">View Recipes</button>
          </Link>
        </div>

        <section className="dashboard-card dashboard-menu">
          <Link to="/admin/recipes/new" className="dashboard-menu-item">
            <div>
              <h2>Add Recipe</h2>
              <p>Create a new recipe with ingredients, steps, filters, and featured status.</p>
            </div>
            <span>Open</span>
          </Link>
        </section>
      </div>
    </main>
  );
}
