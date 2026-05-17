import { useNavigate, Link } from "react-router-dom";
import React, { useContext } from "react";
import { AuthContext } from "../../../../context/AuthContext";

export default function Header() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const dashboardPath = user?.role === "admin"
    ? "/admin/dashboard"
    : user?.role === "vendor"
      ? "/vendor/dashboard"
      : null;

  const dashboardLabel = user?.role === "admin"
    ? "Admin Dashboard"
    : user?.role === "vendor"
      ? "Vendor Dashboard"
      : "";

  return (
    <>
      <header className="cs-header">
        <div 
          className="cs-logo" 
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
        >
          <div className="cs-logo-icon">🌿</div>
          <div>
            <div className="cs-logo-text">Coeliac</div>
            <div className="cs-logo-text">Square</div>
          </div>
        </div>

        <nav className="cs-header-nav">
          <Link to="/actions">Événements</Link>
          <Link to="/marketplace">Boutique</Link>
        </nav>

        <div className="cs-header-icons">
          {dashboardPath && (
            <button
              className="cs-dashboard-btn"
              onClick={() => navigate(dashboardPath)}
            >
              {dashboardLabel}
            </button>
          )}

          <button 
            className="cs-icon-btn"
            onClick={() => navigate("/auth")}
            title="Compte"
          >
            👤
          </button>
          
          <button 
            className="cs-icon-btn"
            onClick={() => navigate("/cart")}
            title="Panier"
          >
            🛒
          </button>

          <div className="cs-search-box">
            <input type="text" placeholder="Rechercher..." />
            <span>🔍</span>
          </div>
        </div>
      </header>

      <div className="cs-subnav">
        <button 
          className="cs-subnav-item"
          onClick={() => navigate("/mission")}
        >
          À propos de nous
        </button>
        
        <button 
          className="cs-subnav-item"
          onClick={() => navigate("/maladie")}
        >
          Maladie Coeliaque
        </button>
        
        <button 
          className="cs-subnav-item"
          onClick={() => navigate("/recette")}
        >
          Recettes
        </button>
        
        <button 
          className="cs-subnav-item"
          onClick={() => navigate("/workshop")}
        >
          Formations
        </button>
      </div>
    </>
  );
}
