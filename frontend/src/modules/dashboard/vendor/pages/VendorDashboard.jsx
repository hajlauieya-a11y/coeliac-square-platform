import React from "react";
import { Link } from "react-router-dom";
import "../index.css";

export default function VendorDashboard() {
  return (
    <main className="dashboard-page">
      <div className="dashboard-shell">
        <div className="dashboard-top">
          <div>
            <div className="dashboard-kicker">Vendor Dashboard</div>
            <h1 className="dashboard-title">Manage Your Boutique</h1>
            <p className="dashboard-subtitle">
              Add products for the gluten-free marketplace. More vendor tools can live here later.
            </p>
          </div>

          <Link to="/marketplace">
            <button className="dashboard-btn dashboard-btn-secondary">View Marketplace</button>
          </Link>
        </div>

        <section className="dashboard-card dashboard-menu">
          <Link to="/vendor/products" className="dashboard-menu-item">
            <div>
              <h2>My Products</h2>
              <p>View, edit, or delete products you added to the boutique.</p>
            </div>
            <span>Open</span>
          </Link>

          <Link to="/vendor/products/new" className="dashboard-menu-item">
            <div>
              <h2>Add Product</h2>
              <p>Create a new marketplace product with price, category, image, and stock.</p>
            </div>
            <span>Open</span>
          </Link>

          <Link to="/vendor/orders" className="dashboard-menu-item">
            <div>
              <h2>Product Orders</h2>
              <p>See orders that include your marketplace products.</p>
            </div>
            <span>Open</span>
          </Link>
        </section>
      </div>
    </main>
  );
}
