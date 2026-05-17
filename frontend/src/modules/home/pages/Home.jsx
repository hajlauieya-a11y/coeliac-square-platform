import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Header from "../../shared/components/layout/Header";
import Footer from "../../shared/components/layout/Footer";
import "../index.css";

const SERVICES = [
  {
    title: "Produits sans gluten",
    desc: "Découvrez notre sélection de produits sans gluten, soigneusement choisis pour leur qualité et leur goût.",
    cta: "En savoir plus",
    path: "/marketplace",
  },
  {
    title: "Recettes sans gluten",
    desc: "Explorez nos recettes savoureuses et faciles à préparer, adaptées à un régime sans gluten.",
    cta: "En savoir plus",
    path: "/recette",
  },
  {
    title: "Aide et conseils",
    desc: "Bénéficiez de conseils d'experts et d'un soutien pour mieux vivre avec la maladie coeliaque.",
    cta: "En savoir plus",
    path: "/maladie",
  },
];

const FAQS = [
  {
    q: "Comment savoir si vous souffrez de la maladie coeliaque ?",
    a: "La maladie coeliaque se diagnostique par une analyse de sang spécifique suivie d'une biopsie de l'intestin grêle. Consultez votre médecin si vous avez des symptômes persistants.",
  },
  { q: "Pourquoi est-il déconseillé de manger sans gluten ?", a: "" },
  { q: "Comment se manifeste la maladie coeliaque ?", a: "" },
];

export default function Home() {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <div className="cs-app">
      <Header />

      {/* HERO */}
      <section className="hp-hero">
        <div className="hp-hero-left">
          <div className="hp-eyebrow">BIENVENUE</div>
          <h1 className="hp-hero-title">
            Votre <br />
            Sanctuaire pour <br />
            une <span className="hp-accent">Vie Sans</span> <br />
            <span className="hp-accent">Gluten.</span>
          </h1>
          <p className="hp-hero-text">
            Lorem ipsum dolor sit amet consectetur. Magna et placerat eget orci.
            Aliquam et lectus eu suspendisse vehicula vel.
          </p>
          <div className="hp-hero-actions">
            <button 
              className="cs-btn-primary"
              onClick={() => navigate("/marketplace")}
            >
              Découvrir nos produits
            </button>
            <button 
              className="hp-btn-ghost"
              onClick={() => navigate("/mission")}
            >
              En savoir plus
            </button>
          </div>
        </div>
        <div className="hp-hero-right">
          <div className="hp-hero-img" />
          <div className="hp-hero-quote">
            <div className="hp-quote-author">
              <div className="hp-quote-avatar" />
              <strong>Lorem Ipsum</strong>
            </div>
            <p>
              "Lorem ipsum dolor sit amet consectetur. Magna et placerat eget orci."
            </p>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="hp-services">
        <h2 className="hp-services-title">Que Vous Propose Ce Site Web ?</h2>
        <div className="hp-services-grid">
          {SERVICES.map((s) => (
            <div key={s.title} className="hp-service-card">
              <div className="hp-service-avatar" />
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <button 
                className="hp-service-link"
                onClick={() => navigate(s.path)}
              >
                {s.cta} →
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* MALADIE COELIAQUE */}
      <section className="hp-disease">
        <div className="hp-disease-img" />
        <div className="hp-disease-info">
          <h2>Comprendre La Maladie Coeliaque</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur. Magna et placerat eget orci.
            Aliquam et lectus eu suspendisse vehicula vel.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur. Magna et placerat eget orci.
            Aliquam et lectus eu suspendisse vehicula vel.
          </p>
          <button 
            className="cs-btn-primary"
            onClick={() => navigate("/maladie")}
          >
            En savoir plus
          </button>
        </div>
      </section>

      {/* VIDEO BANNER */}
      <section className="hp-video">
        <div className="hp-video-img" />
        <div className="hp-video-overlay">
          <div className="hp-video-text">
            <h2>Lorem Ipsum<br />Has Been</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur. Magna et placerat eget orci.
              Aliquam et lectus eu suspendisse vehicula vel.
            </p>
          </div>
          <button className="hp-play" aria-label="Play video">▶</button>
        </div>
      </section>

      {/* BOUTIQUE */}
      <section className="hp-boutique">
        <div className="hp-section-head">
          <div>
            <h2>La Boutique Artisanale</h2>
            <p>Lorem ipsum dolor sit amet consectetur.</p>
          </div>
          <button 
            className="cs-view-all"
            onClick={() => navigate("/marketplace")}
          >
            Voir plus →
          </button>
        </div>

        <div className="hp-boutique-grid">
          <div className="hp-boutique-feature">
            <div className="hp-boutique-feature-img" />
            <div className="hp-boutique-feature-info">
              <h3>Sélection Boulangerie</h3>
              <p>Lorem ipsum dolor sit amet consectetur.</p>
              <button 
                className="cs-btn-primary"
                onClick={() => navigate("/marketplace")}
              >
                Acheter
              </button>
            </div>
          </div>

          <div className="hp-boutique-side">
            <div className="hp-boutique-card">
              <div className="hp-boutique-card-img" />
              <div className="hp-boutique-card-info">
                <h4>Lorem ipsum dolor sit amet</h4>
                <p>Lorem ipsum dolor sit amet</p>
                <strong>14 DT</strong>
              </div>
            </div>
            <div className="hp-boutique-card">
              <div className="hp-boutique-card-img" />
              <div className="hp-boutique-card-info">
                <h4>Pain de Campagne</h4>
                <p>Lorem ipsum dolor sit amet</p>
                <strong>12 DT</strong>
              </div>
            </div>

            <div className="hp-boutique-promo">
              <div>
                <h4>Tout fait maison</h4>
                <p>Lorem ipsum dolor sit amet consectetur.</p>
              </div>
              <button 
                className="cs-btn-primary"
                onClick={() => navigate("/marketplace")}
              >
                Acheter
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* RECETTES */}
      <section className="hp-recipes">
        <div className="hp-section-head">
          <div>
            <h2>L'Atelier des Recettes</h2>
            <p>Lorem ipsum dolor sit amet consectetur.</p>
          </div>
          <button 
            className="cs-view-all"
            onClick={() => navigate("/recette")}
          >
            Voir plus →
          </button>
        </div>

        <div className="hp-recipes-grid">
          <div className="hp-recipe-feature">
            <div className="hp-recipe-feature-text">
              <span className="hp-recipe-badge">RECETTE</span>
              <h3>Tarte aux Fraises</h3>
              <p>Lorem ipsum dolor sit amet consectetur.</p>
              <button 
                className="cs-btn-primary"
                onClick={() => navigate("/recette")}
              >
                Voir la recette
              </button>
            </div>
            <div className="hp-recipe-feature-img" />
          </div>
          <div className="hp-recipe-card">
            <div className="hp-recipe-card-img" />
            <div className="hp-recipe-card-info">
              <h4>Pâtes Sans Gluten</h4>
              <p>Lorem ipsum dolor sit amet consectetur.</p>
            </div>
          </div>
        </div>
      </section>

      {/* WORKSHOPS */}
      <section className="hp-workshop">
        <div className="hp-workshop-info">
          <h2>Workshops for the<br />Modern Maker.</h2>
          <p>Lorem ipsum dolor sit amet consectetur.</p>
          <ul className="hp-workshop-list">
            <li>
              <strong>01</strong>
              <div>
                <h4>Sourdough Masterclass</h4>
                <p>Lorem ipsum dolor sit amet consectetur.</p>
              </div>
            </li>
            <li>
              <strong>02</strong>
              <div>
                <h4>Vegan Baking</h4>
                <p>Lorem ipsum dolor sit amet consectetur.</p>
              </div>
            </li>
          </ul>
          <button 
            className="cs-btn-primary"
            onClick={() => navigate("/workshop")}
          >
            En savoir plus
          </button>
        </div>
        <div className="hp-workshop-img" />
      </section>

      {/* FAQ */}
      <section className="hp-faq">
        <h2>Questions Fréquemment Posées</h2>
        <div className="hp-faq-list">
          {FAQS.map((f, i) => (
            <div
              key={i}
              className={`hp-faq-item ${openFaq === i ? "open" : ""}`}
              onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
            >
              <div className="hp-faq-q">
                <span>{f.q}</span>
                <span>{openFaq === i ? "−" : "+"}</span>
              </div>
              {openFaq === i && f.a && <p className="hp-faq-a">{f.a}</p>}
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}