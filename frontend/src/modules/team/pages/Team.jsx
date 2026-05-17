import React from "react";
import Header from "../../shared/components/layout/Header";
import Footer from "../../shared/components/layout/Footer";
import "../index.css";

const members = [
  { name: "Sarah Cohen", role: "DIRECTRICE DE LA COMMUNICATION", bio: "Experte en stratégie digitale, Sarah porte la voix des patients cœliaques sur la scène nationale et internationale.", bg: "#1f5a5a" },
  { name: "Thomas Durant", role: "CHEF DE PROJET NUTRITION", bio: "Diététicien de formation, Thomas développe des outils pédagogiques pour accompagner les familles dans leur transition sans gluten.", bg: "#1a1a1a" },
  { name: "Léa Rousseau", role: "COORDINATRICE DES PARTENARIATS", bio: "Léa assure le lien vital entre nos mécènes et nos projets de terrain, garantissant la pérennité de nos actions.", bg: "#2a3a2a" },
];

export default function Team() {
  return (
    <div className="tm-page">
      <Header />

      {/* HERO */}
      <section className="tm-hero">
        <div className="tm-hero-left">
          <div className="tm-eyebrow-pill">NOTRE CAPITAL HUMAIN</div>
          <h1>Le Visage de<br />notre Engagement</h1>
        </div>
        <div className="tm-hero-right">
          <p>Des experts passionnés, des chercheurs dévoués et des visionnaires unis par une mission commune : transformer la vie des personnes cœliaques à travers la science et la solidarité.</p>
        </div>
      </section>

      {/* TOP LEADERS */}
      <section className="tm-leaders">
        <div className="tm-leader">
          <div className="tm-leader-img tm-leader-img-1" />
          <h3 className="tm-leader-name tm-leader-name-green-dark">Dr. Élise Martineau</h3>
          <div className="tm-leader-role">DIRECTRICE DE LA RECHERCHE SCIENTIFIQUE</div>
          <p>Forte de 15 ans d'expérience en gastro-entérologie, Élise dirige nos initiatives de recherche fondamentale et clinique. Son approche humaniste guide chaque projet vers une amélioration concrète du quotidien des patients.</p>
        </div>
        <div className="tm-leader">
          <div className="tm-leader-img tm-leader-img-2" />
          <h3 className="tm-leader-name tm-leader-name-green">Marc Lefebvre</h3>
          <div className="tm-leader-role">RESPONSABLE DE L'INNOVATION SOCIALE</div>
          <p>Architecte de nos programmes de sensibilisation, Marc tisse des liens entre la fondation et les acteurs publics pour une meilleure inclusion alimentaire.</p>
        </div>
      </section>

      {/* MEMBERS */}
      <section className="tm-members">
        {members.map((m, i) => (
          <div key={i} className="tm-member">
            <div className="tm-member-img" style={{ background: m.bg }} />
            <h4 className="tm-member-name">{m.name}</h4>
            <div className="tm-member-role">{m.role}</div>
            <p>{m.bio}</p>
          </div>
        ))}
      </section>

      {/* CULTURE */}
      <section className="tm-culture">
        <div className="tm-culture-text">
          <h2>Une culture de l'excellence<br /><em>et de l'empathie.</em></h2>
          <p>Notre équipe ne se contente pas de gérer une fondation. Nous vivons notre mission : 40% de nos collaborateurs sont eux-mêmes touchés par la maladie cœliaque, apportant une perspective vécue unique à chaque décision.</p>
          <div className="tm-culture-stats">
            <div><strong>12</strong><span>EXPERTS DÉDIÉS</span></div>
            <div><strong>4</strong><span>PÔLES DE RECHERCHE</span></div>
            <div><strong>100%</strong><span>ENGAGÉS</span></div>
          </div>
        </div>
        <div className="tm-culture-img-wrap">
          <div className="tm-culture-img">
            <div className="tm-culture-title">L'ÉCLAIRE AU TRAVAIL</div>
            <div className="tm-culture-character">👨‍🔬</div>
          </div>
          <div className="tm-culture-quote">"L'union fait la force, la science fait le chemin."</div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
