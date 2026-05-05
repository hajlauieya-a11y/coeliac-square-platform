import React from "react"

export default function Header() {
  return (
    <>
      <header className="cs-header">
        <div className="cs-logo">
          <div className="cs-logo-icon">🌿</div>
          <div>
            <div className="cs-logo-text">Coeliac</div>
            <div className="cs-logo-text">Square</div>
          </div>
        </div>
        <nav className="cs-header-nav">
          <a href="#">Événements</a>
          <a href="#">Boutique</a>
        </nav>
        <div className="cs-header-icons">
          <button className="cs-icon-btn">👤</button>
          <button className="cs-icon-btn">🛒</button>
          <div className="cs-search-box">
            <input type="text" placeholder="Lorem Ipsum" />
            <span>🔍</span>
          </div>
        </div>
      </header>
      <div className="cs-subnav">
        <button className="cs-subnav-item">A propos de nous</button>
        <button className="cs-subnav-item">Maladie Coeliaque</button>
        <button className="cs-subnav-item">Recherche</button>
        <button className="cs-subnav-item">Formations</button>
      </div>
    </>
  )
}