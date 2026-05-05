import React from "react"

export default function Footer() {
  return (
    <footer className="cs-footer">
      <div className="cs-footer-grid">
        <div className="cs-footer-brand">
          <div className="cs-logo">
            <div className="cs-logo-icon">🌿</div>
            <div>
              <div className="cs-logo-text">Coeliac</div>
              <div className="cs-logo-text">Square</div>
            </div>
          </div>
          <p>Book your trip in minute, get full Control for much longer.</p>
        </div>
        <div>
          <h5>Company</h5>
          <ul>
            <li><a href="#">About</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Mobile</a></li>
          </ul>
        </div>
        <div>
          <h5>Contact</h5>
          <ul>
            <li><a href="#">Help/FAQ</a></li>
            <li><a href="#">Press</a></li>
            <li><a href="#">Affilates</a></li>
          </ul>
        </div>
        <div>
          <h5>More</h5>
          <ul>
            <li><a href="#">Airlinefees</a></li>
            <li><a href="#">Airline</a></li>
            <li><a href="#">Low fare tips</a></li>
          </ul>
        </div>
        <div>
          <div className="cs-social">
            <a href="#">f</a>
            <a href="#">📷</a>
            <a href="#">🐦</a>
          </div>
          <h5>Discover our app</h5>
          <div className="cs-app-buttons">
            <a href="#" className="cs-app-btn">▶ Google Play</a>
            <a href="#" className="cs-app-btn">🍎 App Store</a>
          </div>
        </div>
      </div>
      <div className="cs-footer-bottom">
        All rights reserved@coeliacsquare.com
      </div>
    </footer>
  )
}