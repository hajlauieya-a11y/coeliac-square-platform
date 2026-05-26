import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../context/AuthContext";
import "./Header.css";

const navGroups = [
  {
    label: "Maladie coeliaque",
    links: [
      { label: "Comprendre la maladie", path: "/maladie" },
      { label: "Confidentialite", path: "/confidential" },
    ],
  },
  {
    label: "Vivre sans gluten",
    links: [
      { label: "Recettes", path: "/recette" },
      { label: "Boutique", path: "/marketplace" },
      { label: "Formations", path: "/workshop" },
    ],
  },
  {
    label: "Soutien et services",
    links: [
      { label: "Actions", path: "/actions" },
      { label: "Evenements", path: "/event" },
      { label: "Mission", path: "/mission" },
    ],
  },
  {
    label: "A propos",
    links: [
      { label: "Notre mission", path: "/mission" },
      { label: "Equipe", path: "/team" },
      { label: "Nous joindre", path: "/confidential" },
    ],
  },
];

export default function Header() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const dashboardPath = user?.role === "admin"
    ? "/admin/dashboard"
    : user?.role === "vendor"
      ? "/vendor/dashboard"
      : user?.role === "formateur"
        ? "/formateur/dashboard"
        : user?.role === "expert"
          ? "/expert/dashboard"
          : null;

  const dashboardLabel = user?.role === "admin"
    ? "Admin Dashboard"
    : user?.role === "vendor"
      ? "Vendor Dashboard"
      : user?.role === "formateur"
        ? "Formateur Dashboard"
        : user?.role === "expert"
          ? "Expert Dashboard"
          : "";

  return (
    <header className="cq-header">
      <div className="cq-mainbar">
        <button className="cq-logo" onClick={() => navigate("/")}>
          <span className="cq-logo-mark">🌿</span>
          <span>
            <strong>Coeliac</strong>
            <strong>Square</strong>
          </span>
        </button>

        <nav className="cq-topnav">
          <Link to="/event">Evenements</Link>
          <Link to="/marketplace">Boutique</Link>
          {user && <Link to="/orders">Orders</Link>}
          {user && <Link to="/tickets">Tickets</Link>}
        </nav>

        <div className="cq-header-actions">
          {dashboardPath && (
            <button className="cq-dashboard-btn" onClick={() => navigate(dashboardPath)}>
              {dashboardLabel}
            </button>
          )}

          <button className="cq-icon-btn" onClick={() => navigate("/auth")} title="Compte">
            👤
          </button>
          <button className="cq-icon-btn" onClick={() => navigate("/cart")} title="Panier">
            🛒
          </button>
          <div className="cq-search-box">
            <input type="text" placeholder="Rechercher..." />
            <span>🔍</span>
          </div>
        </div>
      </div>

      <nav className="cq-subnav" aria-label="Main navigation">
          {navGroups.map((group) => (
            <div key={group.label} className="cq-nav-group">
              <button className="cq-nav-trigger">{group.label}</button>
              <div className="cq-dropdown">
                {group.links.map((link) => (
                  <Link key={`${group.label}-${link.path}`} to={link.path}>
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
      </nav>
    </header>
  );
}
