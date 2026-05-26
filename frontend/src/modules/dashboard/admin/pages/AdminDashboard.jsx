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
          <Link to="/admin/events" className="dashboard-menu-item">
            <div>
              <h2>Manage Events</h2>
              <p>Create events, update details, and inspect secured tickets.</p>
            </div>
            <span>Open</span>
          </Link>

          <Link to="/admin/events/new" className="dashboard-menu-item">
            <div>
              <h2>Add Event</h2>
              <p>Create an event with capacity, date, price, and ticket reservations.</p>
            </div>
            <span>Open</span>
          </Link>

          <Link to="/admin/users" className="dashboard-menu-item">
            <div>
              <h2>Users & Role Requests</h2>
              <p>Confirm requested roles and manage permissions for experts, vendors, and formateurs.</p>
            </div>
            <span>Open</span>
          </Link>

          <Link to="/admin/recipes" className="dashboard-menu-item">
            <div>
              <h2>Manage Recipes</h2>
              <p>View, edit, or delete recipes from the public library.</p>
            </div>
            <span>Open</span>
          </Link>

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
