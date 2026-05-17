import React from "react";
import Header from "../../shared/components/layout/Header";
import Footer from "../../shared/components/layout/Footer";
import "../index.css";

export default function Mission() {
  return (
    <div className="ms-page">
      <Header />

      {/* HERO */}
      <section className="ms-hero">
        <div className="ms-hero-text">
          <div className="ms-eyebrow">NOTRE RAISON D'ÊTRE</div>
          <h1>Nourrir<br />l'espoir,<br />cultiver la<br />santé.</h1>
          <p>La Fondation Cœliaque s'engage à transformer la vie des personnes touchées par l'intolérance au gluten à travers l'éducation, la recherche et le plaidoyer.</p>
        </div>
        <div className="ms-hero-img-wrap">
          <div className="ms-hero-img" />
        </div>
      </section>

      {/* VISION */}
      <section className="ms-vision">
        <div className="ms-vision-img-wrap">
          <div className="ms-vision-img" />
          <div className="ms-vision-quote">"Innover aujourd'hui pour une vie sans compromis demain."</div>
        </div>
        <div className="ms-vision-text">
          <div className="ms-vision-eyebrow">VISION 2030</div>
          <h2>Un monde où la maladie cœliaque ne dicte plus le menu de la vie.</h2>
          <p>Nous aspirons à un futur où le diagnostic est précoce, où les options alimentaires sont universelles et où la recherche médicale offre une solution définitive.</p>
          <p>Notre vision transcende la simple restriction alimentaire pour embrasser une liberté gastronomique et sociale totale pour chaque individu cœliaque.</p>
        </div>
      </section>

      {/* VALEURS */}
      <section className="ms-values">
        <div className="ms-values-head">
          <div className="ms-eyebrow ms-center">NOS PILIERS</div>
          <h2>Valeurs Fondamentales</h2>
        </div>

        <div className="ms-values-row">
          <div className="ms-card ms-card-light ms-card-tall">
            <div className="ms-card-icon">🤝</div>
            <h3>Empathie & Proximité</h3>
            <p>Nous plaçons l'humain au cœur de nos actions, en écoutant et en accompagnant chaque patient dans son parcours unique vers le bien-être.</p>
            <div className="ms-card-img ms-card-img-empathy" />
          </div>
          <div className="ms-card ms-card-green">
            <div className="ms-card-icon">⚗</div>
            <h3>Rigueur Scientifique</h3>
            <p>L'excellence et la vérité scientifique guident chacune de nos recommandations et soutiens à la recherche.</p>
          </div>
        </div>

        <div className="ms-values-row ms-values-row-2">
          <div className="ms-card ms-card-light">
            <div className="ms-card-icon">📣</div>
            <h3>Plaidoyer Impactant</h3>
            <p>Porter la voix des cœliaques auprès des institutions pour garantir des droits et une sécurité alimentaire accrue.</p>
          </div>
          <div className="ms-card ms-card-white">
            <div className="ms-card-icon">🎓</div>
            <h3>Éducation Continue</h3>
            <p>Informer pour prévenir, former pour soigner. Nous sommes le relais du savoir entre experts et grand public.</p>
            <div className="ms-card-img ms-card-img-edu" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="ms-cta-wrap">
        <div className="ms-cta">
          <h2>Rejoignez notre mission.</h2>
          <p>Que vous soyez patient, professionnel de santé ou donateur, votre engagement fait la différence dans la vie de milliers de familles.</p>
          <div className="ms-cta-buttons">
            <button className="ms-btn-white">Devenir membre</button>
            <button className="ms-btn-dark">Nous contacter</button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
