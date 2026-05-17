import React from "react";
import Header from "../../shared/components/layout/Header";
import Footer from "../../shared/components/layout/Footer";
import "../index.css";

export default function Team() {
  return (
    <div className="tm-page">
      <Header />

      {/* HERO */}
      <section className="tm-hero">
        <div className="tm-hero-text">
          <div className="tm-eyebrow">NOTRE IMPACT AU QUOTIDIEN</div>
          <h1>Cultiver le<br />changement<br />durable.</h1>
          <p>De la recherche scientifique à l'accompagnement des familles, découvrez comment nous transformons la vie des personnes coeliaques.</p>
        </div>
        <div className="tm-hero-img-wrap">
          <div className="tm-hero-img" />
          <div className="tm-hero-badge">25+ ans<br /><small>d'engagement</small></div>
        </div>
      </section>

      {/* PILIERS */}
      <section className="tm-pillars">
        <h2>Piliers d'intervention</h2>
        <div className="tm-pillar-divider" />

        <div className="tm-pillars-row">
          {/* Recherche médicale */}
          <div className="tm-card tm-card-light">
            <div className="tm-card-icon">🔬</div>
            <h3>Soutien à la recherche médicale</h3>
            <p>Nous finançons des projets de recherche innovants pour améliorer le diagnostic précoce et explorer de nouvelles voies thérapeutiques au-delà du régime sans gluten.</p>
            <div className="tm-stats">
              <div><strong>2.4M DT</strong><span>INVESTIS EN 2023</span></div>
              <div><strong>12</strong><span>LABORATOIRES PARTENAIRES</span></div>
            </div>
            <div className="tm-card-img tm-card-img-libratore">
              <span>L<span className="tm-leaf">𝟂</span>BRATORE</span>
            </div>
          </div>

          {/* Education */}
          <div className="tm-card tm-card-green">
            <div className="tm-card-icon">📖</div>
            <h3>Éducation et Sensibilisation</h3>
            <p>Campagnes nationales d'information auprès du grand public et formations spécialisées pour les professionnels de la restauration et de la santé.</p>
            <div className="tm-divider-light" />
            <div className="tm-big-stat">
              <strong>450k</strong>
              <span>PERSONNES SENSIBILISÉES</span>
            </div>
            <button className="tm-btn-white">VOIR NOS GUIDES</button>
          </div>
        </div>

        <div className="tm-pillars-row tm-pillars-row-2">
          {/* Accompagnement */}
          <div className="tm-card tm-card-light tm-card-small">
            <div className="tm-card-icon">🤝</div>
            <h3>Accompagnement Patients</h3>
            <p>Ligne d'écoute, ateliers cuisine et groupes de parole pour ne plus jamais se sentir seul face au diagnostic.</p>
            <div className="tm-card-img tm-card-img-atelier">
              <em>Atelier cuisine</em>
            </div>
          </div>

          {/* Plaidoyer */}
          <div className="tm-card tm-card-dark">
            <div className="tm-card-icon">⚖</div>
            <h3>Plaidoyer Politique</h3>
            <p>Nous agissons auprès des pouvoirs publics pour une meilleure prise en charge des produits sans gluten et la reconnaissance du handicap invisible.</p>
            <a href="#" className="tm-link-light">Nos revendications actuelles →</a>
            <div className="tm-card-img tm-card-img-building" />
          </div>
        </div>
      </section>

      {/* PROJET */}
      <section className="tm-project">
        <div className="tm-project-info">
          <h2>Le Projet<br />"Pains de Demain"</h2>
          <p className="tm-project-quote">"Redonner le plaisir du goût sans compromis sur la santé, c'est notre engagement pour l'innovation boulangère."</p>
          <p>En partenariat avec des artisans boulangers et des chercheurs en agronomie, nous développons des farines sans gluten issues de cultures locales et durables, riches en nutriments.</p>
          <div className="tm-project-stats">
            <div><span>IMPACT</span><strong>85 Artisans formés</strong></div>
            <div><span>LOCALISATION</span><strong>Région Grand-Est</strong></div>
          </div>
        </div>
        <div className="tm-project-imgs">
          <div className="tm-project-img tm-project-img-1" />
          <div className="tm-project-img tm-project-img-2" />
        </div>
      </section>

      {/* CTA */}
      <section className="tm-cta">
        <h2>Prêt à soutenir nos actions ?</h2>
        <p>Chaque don, petit ou grand, nous permet d'étendre notre champ d'action et d'apporter des solutions concrètes à des milliers de personnes.</p>
        <div className="tm-cta-buttons">
          <button className="tm-btn-primary">Soutenir la Fondation</button>
          <button className="tm-btn-ghost">Devenir Partenaire</button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
