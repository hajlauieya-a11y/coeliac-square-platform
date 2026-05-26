import React from "react";
import { Link } from "react-router-dom";
import "../../vendor/index.css";

export default function ExpertDashboard() {
  return (
    <main className="dashboard-page">
      <div className="dashboard-shell">
        <div className="dashboard-top">
          <div>
            <div className="dashboard-kicker">Expert Dashboard</div>
            <h1 className="dashboard-title">Manage Educational Content</h1>
            <p className="dashboard-subtitle">
              Publish articles, videos, and practical information that will appear directly on the Maladie page.
            </p>
          </div>

          <Link to="/maladie">
            <button className="dashboard-btn dashboard-btn-secondary">View Maladie Page</button>
          </Link>
        </div>

        <section className="dashboard-card dashboard-menu">
          <Link to="/expert/contents" className="dashboard-menu-item">
            <div>
              <h2>My Educational Content</h2>
              <p>Create, edit, publish, or remove your articles, videos, and info cards.</p>
            </div>
            <span>Open</span>
          </Link>

          <Link to="/expert/profile" className="dashboard-menu-item">
            <div>
              <h2>Expert Information</h2>
              <p>Update your specialty, bio, image, location, and contact details.</p>
            </div>
            <span>Open</span>
          </Link>
        </section>
      </div>
    </main>
  );
}
