import React from "react";
import Header from "../../shared/components/layout/Header";
import Footer from "../../shared/components/layout/Footer";
import "../index.css";

export default function Workshop() {
  return (
    <div className="wk-page">
      <Header />

      <section className="wk-detail-hero">
        <span className="wk-eyebrow">EXPÉRIENCE MASTERCLASS</span>
        <h1>Masterclass de<br />Boulangerie<br />Sans Gluten</h1>
        <div className="wk-detail-meta">
          <div>
            <small>DATE & HEURE</small>
            <p>15 Octobre, 2024 — 09:00</p>
          </div>
          <div>
            <small>LIEU</small>
            <p>Studio Provence, Lyon</p>
          </div>
        </div>
      </section>

      <section className="wk-detail-intro">
        <div>
          <h3>Redefining the architecture of gluten-free dough through science and soul.</h3>
          <p>Welcome to a transformative journey where we strip away the synthetic additives often found in commercial gluten-free products and return to the purity of grains. Our masterclass focuses on the alchemy of wild yeast and the biological science of alternative flours.</p>
          <p>You will explore the intricate hydration levels required for sorghum, teff, and buckwheat, mastering the delicate balance of elasticity and structure without the crutch of gluten. This is not just a cooking class, it is an editorial exploration of texture and heritage.</p>
        </div>
        <aside className="wk-detail-intro-card">
          <h5>CURATED TECHNIQUES</h5>
          <ul>
            <li>🧪 Molecular structure of ancient grains</li>
            <li>🌾 Cultivating a sustainable GF sourdough starter</li>
            <li>🔥 The physics of steam-injected baking</li>
          </ul>
        </aside>
      </section>

      <section className="wk-curator">
        <div className="wk-curator-img" />
        <div className="wk-curator-text">
          <small>THE CURATOR</small>
          <h2>Maître Marcelle<br />Vionnet</h2>
          <p>With two decades of excellence in Parisian patisseries, Marcelle transitioned to gluten-free research following a personal health discovery. Today, she leads the Artisanal Foundation's research into functional flours and enzymatic reactions in baking.</p>
          <div className="wk-curator-socials"><a href="#">↗</a><a href="#">in</a></div>
        </div>
      </section>

      <section className="wk-itinerary-wrap">
        <div className="wk-itinerary">
          <h3>Workshop Itinerary</h3>
          {[
            { time: "09:00 - 10:00", title: "The Chemistry of Hydration", desc: "Introduction to psyllium, flax, and grain moisture absorption rates." },
            { time: "10:00 - 12:30", title: "Dough Formulation", desc: "Hands-on mixing and shaping of your signature sourdough boule." },
            { time: "12:30 - 13:30", title: "Curated Lunch", desc: "A seasonal organic meal served in the studio garden." },
            { time: "13:30 - 16:00", title: "Baking & Texture Analysis", desc: "Mastering the crust and assessing crumb structural integrity." },
          ].map((it) => (
            <div key={it.time} className="wk-itinerary-item">
              <small>{it.time}</small>
              <div>
                <h5>{it.title}</h5>
                <p>{it.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <aside className="wk-included">
          <h3>What's Included</h3>
          <div className="wk-included-item"><span className="ic">🧰</span><div><h5>Sanctuary Kit</h5><p>Baking vessel, cultures, and a 50-year-old heirloom starter.</p></div></div>
          <div className="wk-included-item"><span className="ic">🍴</span><div><h5>Artisanal Lunch</h5><p>Three-course seasonal GF meal with pairings.</p></div></div>
          <div className="wk-included-item"><span className="ic">📘</span><div><h5>Digital Dossier</h5><p>Extended guide, video tutorials, and temperature logs.</p></div></div>
          <div className="wk-included-price">
            <small>INVESTMENT</small>
            <h2>245 DT</h2>
          </div>
        </aside>
      </section>

      <section className="wk-register">
        <form className="wk-register-form" onSubmit={(e) => e.preventDefault()}>
          <h3>Secure Your Place</h3>
          <p>Limited to 8 participants per session for an intimate experience.</p>
          <label>FULL NAME</label>
          <input type="text" placeholder="Jean-Luc Picard" />
          <label>EMAIL ADDRESS</label>
          <input type="email" placeholder="lumiere@gf.fr" />
          <button type="submit">FINALIZE REGISTRATION →</button>
          <small>ONLY 3 SEATS REMAINING FOR THIS DATE</small>
        </form>
        <div className="wk-studio">
          <h3>The Studio</h3>
          <p>26 Rue des Artisans</p>
          <p>69002 Lyon, France</p>
          <div className="wk-direction">◆ Get Directions</div>
          <div className="wk-studio-map" />
        </div>
      </section>

      <Footer />
    </div>
  );
}
