import React from "react";
import { Link } from "react-router-dom";
import Header from "../../shared/components/layout/Header";
import Footer from "../../shared/components/layout/Footer";
import "../index.css";

const filters = ["TOUS", "CUISINE", "MÉDICAL", "BIEN-ÊTRE", "CONFÉRENCES"];

const events = [
  { id: "diner-gala", tag: "GOURMET", title: "Dîner de Gala Automnal", desc: "Une soirée gastronomique 100% sans gluten orchestrée par des chefs étoilés au profit de la...", meta: ["📅 18.11.24", "📍 Paris"] },
  { id: "retraite-yoga", tag: "BIEN-ÊTRE", title: "Retraite Yoga & Nutrition", desc: "Un week-end pour reconnecter son corps et son alimentation. Ateliers nutritionnels et séances de...", meta: ["📅 02.12.24", "📍 Annecy"] },
  { id: "webinaire-microbiote", tag: "MÉDICAL", title: "Webinaire: Microbiote & Coeliaque", desc: "Comprendre les dernières avancées scientifiques sur le rôle du microbiote dans la maladie coeliaque.", meta: ["🎓 En ligne", "🕐 19h00"] },
];

export default function Event() {
  return (
    <div className="evt-page">
      <Header />

      <section className="evt-hero">
        <span className="evt-hero-badge">SAISON 2024</span>
        <h1>Expériences &<br />Ateliers</h1>
        <p>L'art de vivre sans compromis. Rejoignez notre cercle de passionnés pour des moments d'apprentissage et de partage d'exception.</p>
      </section>

      <div className="evt-filters">
        {filters.map((f, i) => (
          <button key={f} className={`evt-filter ${i === 0 ? "active" : ""}`}>{f}</button>
        ))}
      </div>

      <section className="evt-featured">
        <div className="evt-featured-img-wrap">
          <div className="evt-featured-img" />
          <div className="evt-featured-date">
            <div className="evt-eyebrow-mini">PROCHAIN ÉVÉNEMENT</div>
            <h4>12 Octobre, 2024</h4>
            <p>Un voyage sensoriel au cœur de la boulangerie traditionnelle, réinventée sans gluten.</p>
            <div className="evt-loc">📍 Paris, Studio Gastronomique</div>
          </div>
        </div>
        <div className="evt-featured-text">
          <div className="evt-eyebrow">— Masterclass Premium</div>
          <h2>Masterclass<br />de Boulangerie<br />Sans Gluten</h2>
          <p>Découvrez les secrets des farines alternatives avec notre chef invité. Apprenez à maîtriser l'élasticité, la complexité parfaite et les saveurs authentiques du pain de campagne sans gluten. Un atelier immersif limité à 8 participants pour une attention personnalisée.</p>
          <Link to="/workshop/$workshopId" params={{ workshopId: "boulangerie" }}>
            <button className="evt-btn-dark">Réserver ma place →</button>
          </Link>
        </div>
      </section>

      <section className="evt-calendar">
        <div className="evt-calendar-head">
          <div>
            <h2>Calendrier des Événements</h2>
            <p>Explorez nos prochaines retraites, dîners et conférences exclusives.</p>
          </div>
          <a href="#" className="evt-calendar-link">Tout voir →</a>
        </div>
        <div className="evt-calendar-grid">
          {events.map((e) => (
            <Link key={e.id} to="/workshop/$workshopId" params={{ workshopId: e.id }} className="evt-card-link">
              <div className="evt-card">
                <div className="evt-card-img"><span className="evt-card-tag">{e.tag}</span></div>
                <div className="evt-card-body">
                  <h4>{e.title}</h4>
                  <p>{e.desc}</p>
                  <div className="evt-card-meta">{e.meta.map((m, i) => <span key={i}>{m}</span>)}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="evt-quote">
        <div className="evt-quote-mark">"</div>
        <p>"Ces ateliers ne sont pas seulement des cours de cuisine, ce sont des moments où l'on cesse de se sentir différent pour simplement savourer l'instant."</p>
        <div className="evt-quote-author">
          <div className="evt-quote-avatar" />
          <span>SONIA NASRI</span>
          <small>Membre depuis 2021</small>
        </div>
      </section>

      <section className="evt-newsletter">
        <h2>Ne manquez aucun<br />événement</h2>
        <p>Soyez les premiers informés de nos prochains ateliers, conférences et masterclasses privées.</p>
        <form className="evt-newsletter-form" onSubmit={(e) => e.preventDefault()}>
          <input type="email" placeholder="votre@email.com" />
          <button type="submit">S'inscrire</button>
        </form>
        <small>EN VOUS INSCRIVANT VOUS ACCEPTEZ NOTRE POLITIQUE DE CONFIDENTIALITÉ</small>
      </section>

      <Footer />
    </div>
  );
}
