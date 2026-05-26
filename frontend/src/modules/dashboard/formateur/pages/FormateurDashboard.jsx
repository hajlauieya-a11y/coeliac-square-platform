import React from "react";
import { Link } from "react-router-dom";
import "../../vendor/index.css";

export default function FormateurDashboard() {
  return (
    <main className="dashboard-page">
      <div className="dashboard-shell">
        <div className="dashboard-top">
          <div>
            <div className="dashboard-kicker">Formateur Dashboard</div>
            <h1 className="dashboard-title">Manage Your Formations</h1>
            <p className="dashboard-subtitle">
              Create workshops, update details, and view participant registrations.
            </p>
          </div>
        </div>

        <section className="dashboard-card dashboard-menu">
          <Link to="/formateur/workshops" className="dashboard-menu-item">
            <div>
              <h2>My Workshops</h2>
              <p>View, edit, delete, and inspect registrations for your workshops.</p>
            </div>
            <span>Open</span>
          </Link>

          <Link to="/formateur/workshops/new" className="dashboard-menu-item">
            <div>
              <h2>Add Workshop</h2>
              <p>Create a new formation with capacity, price, date, and included material.</p>
            </div>
            <span>Open</span>
          </Link>
        </section>
      </div>
    </main>
  );
}
