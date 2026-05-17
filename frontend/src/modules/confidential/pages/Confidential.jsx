import React from "react";
import Header from "../../shared/components/layout/Header";
import Footer from "../../shared/components/layout/Footer";
import "../index.css";

export default function Confidential() {
  return (
    <div className="cf-page">
      <Header />

      {/* HERO */}
      <section className="cf-hero">
        <div className="cf-hero-text">
          <div className="cf-eyebrow">CONFIANCE & TRANSPARENCE</div>
          <h1>Politique de<br />confidentialité</h1>
          <p>Votre vie privée est le socle de notre relation. Nous nous engageons à protéger vos données avec la même rigueur que nous mettons à soutenir notre communauté.</p>
        </div>
        <div className="cf-hero-img-wrap">
          <div className="cf-hero-img" />
        </div>
      </section>

      {/* CONTENT */}
      <section className="cf-content">
        <div className="cf-update-pill">⏱ DERNIÈRE MISE À JOUR : 14 OCTOBRE 2023</div>

        <div className="cf-section">
          <div className="cf-section-num">01.</div>
          <div className="cf-section-body">
            <h3>Introduction</h3>
            <p>La Fondation Cœliaque s'engage à ce que la collecte et le traitement de vos données soient conformes au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés.</p>
            <p>Cette politique vise à vous informer sur les catégories de données personnelles que nous traitons, la manière dont nous les utilisons, ainsi que les droits dont vous disposez concernant vos informations.</p>
          </div>
        </div>

        <div className="cf-section">
          <div className="cf-section-num">02.</div>
          <div className="cf-section-body">
            <h3>Données collectées</h3>
            <div className="cf-data-grid">
              <div className="cf-data-card">
                <div className="cf-data-title">COLLECTE DIRECTE</div>
                <ul>
                  <li>Nom et Prénom</li>
                  <li>Adresse électronique</li>
                  <li>Coordonnées postales</li>
                  <li>Informations de paiement</li>
                </ul>
              </div>
              <div className="cf-data-card">
                <div className="cf-data-title">COLLECTE AUTOMATIQUE</div>
                <ul>
                  <li>Adresse IP</li>
                  <li>Cookies de navigation</li>
                  <li>Données d'utilisation</li>
                  <li>Type de navigateur</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="cf-section">
          <div className="cf-section-num">03.</div>
          <div className="cf-section-body">
            <h3>Finalités du traitement</h3>
            <p>Nous utilisons vos données pour des finalités spécifiques et légitimes :</p>
            <div className="cf-purpose">
              <span>📋</span>
              <div><strong>Gestion des dons :</strong> Pour traiter vos contributions et émettre vos reçus fiscaux conformément à la législation en vigueur.</div>
            </div>
            <div className="cf-purpose">
              <span>✉</span>
              <div><strong>Communication :</strong> Pour vous envoyer notre newsletter, des invitations à nos événements et des mises à jour sur nos actions (si consenti).</div>
            </div>
            <div className="cf-purpose">
              <span>📊</span>
              <div><strong>Amélioration du service :</strong> Pour analyser l'audience de notre site et optimiser l'expérience utilisateur globale.</div>
            </div>
          </div>
        </div>

        <div className="cf-section">
          <div className="cf-section-num">04.</div>
          <div className="cf-section-body">
            <h3>Conservation des données</h3>
            <p>Vos données personnelles ne sont conservées que pour la durée strictement nécessaire à l'accomplissement des finalités pour lesquelles elles ont été collectées. Par exemple, les données de donateurs sont conservées pendant 10 ans pour répondre aux obligations comptables et fiscales.</p>
          </div>
        </div>

        <div className="cf-section">
          <div className="cf-section-num">05.</div>
          <div className="cf-section-body">
            <h3>Vos droits</h3>
            <p>Conformément à la réglementation, vous disposez d'un droit d'accès, de rectification, d'effacement et de portabilité de vos données. Vous pouvez également vous opposer au traitement de vos données ou demander sa limitation.</p>
            <a href="#" className="cf-link">Exercer mes droits →</a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cf-cta-wrap">
        <div className="cf-cta">
          <h2>Une question sur vos données ?</h2>
          <p>Notre délégué à la protection des données est à votre disposition pour répondre à toutes vos interrogations.</p>
          <div className="cf-cta-buttons">
            <button className="cf-btn-white">Contactez-nous</button>
            <button className="cf-btn-dark">Notre FAQ</button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
