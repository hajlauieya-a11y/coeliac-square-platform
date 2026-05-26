import React, { useEffect, useState } from "react";
import Header from "../../shared/components/layout/Header";
import Footer from "../../shared/components/layout/Footer";
import { getPublishedExpertContent } from "../../dashboard/expert/services/expert.service";
import "../index.css";

const RESOURCES = [
  { icon: "👥", title: "Support Network", desc: "Lorem ipsum dolor sit amet consectetur adipiscing elit.", cta: "FIND A GROUP" },
  { icon: "🍽", title: "The Bourague", desc: "Lorem ipsum dolor sit amet consectetur adipiscing elit.", cta: "SHOP NOW" },
  { icon: "⬇", title: "Resource Library", desc: "Lorem ipsum dolor sit amet consectetur adipiscing elit.", cta: "GET GUIDE" },
];

export default function Maladie() {
  const [expertContent, setExpertContent] = useState([]);
  const [expertLoading, setExpertLoading] = useState(true);
  const [expertError, setExpertError] = useState("");

  useEffect(() => {
    getPublishedExpertContent()
      .then((res) => {
        setExpertContent(res.data);
        setExpertLoading(false);
      })
      .catch(() => {
        setExpertError("Le contenu des experts sera disponible bientot.");
        setExpertLoading(false);
      });
  }, []);

  return (
    <div className="md-page">
      <Header />

      {/* HERO */}
      <section className="md-hero">
        <div className="md-hero-text">
          <div className="md-eyebrow">A GENTLE WELCOME</div>
          <h1>Understanding<br />Coeliac Disease: A<br />Journey to<br />Wellness</h1>
          <p>Your comprehensive resource for living a full, vibrant, gluten-free life.</p>
        </div>
        <div className="md-hero-img" />
      </section>

      {/* CLARITY BAND */}
      <section className="md-clarity">
        <h2>A Gentle Path to Clarity</h2>
        <p>Coeliac disease is more than a dietary restriction; it is an immune mediated systemic disorder. When someone with this condition consumes gluten, a protein found in wheat, barley and rye, their immune system mistakenly attacks the small intestinal lining.</p>
        <p>At The Curated Sanctuary, we believe that a diagnosis can be the beginning of a more intentional, vibrant life on your terms. We are here to go beyond the diet to offer medical insights and empathetic lifestyle support to your need to navigate this transformative journey.</p>
      </section>

      {/* SYMPTOMS */}
      <section className="md-symptoms">
        <h2>Symptoms &amp; Clinical Pathway</h2>
        <div className="md-symptoms-grid">
          <div className="md-card-light">
            <div className="md-card-icon">📋</div>
            <h3>Gastrointestinal Manifestations</h3>
            <p>Persistent bloating, abdominal pain, and a host of other digestive patterns are most often the primary indicators of the autoimmune response.</p>
            <div className="md-tags">
              <span>Bloating</span><span>Nausea</span><span>Malabsorption</span>
            </div>
          </div>
          <div className="md-card-light">
            <div className="md-card-icon">⚕</div>
            <h3>The Invisible Impact</h3>
            <ul>
              <li>✓ Chronic fatigue</li>
              <li>✓ Joint &amp; bone pain</li>
              <li>✓ Brain fog</li>
            </ul>
          </div>
        </div>

        <div className="md-diagnosis">
          <div className="md-diagnosis-info">
            <h3>The Path to Diagnosis</h3>
            <p>Securing a precise, medically confirmed diagnosis is the crucial first step toward initiating the curated gluten-free protocol and ensuring lasting wellness for the body.</p>
            <div className="md-diag-step">
              <strong>1. Serology Testing</strong>
              <p>An initial blood test screens for the tTG-IgA antibodies that signal active autoimmune response.</p>
            </div>
            <div className="md-diag-step">
              <strong>2. Endoscopic Biopsy</strong>
              <p>The gold standard for confirmation, examining the intestinal villi for damage and atrophy.</p>
            </div>
          </div>
          <div className="md-diagnosis-img" />
        </div>
      </section>

      {/* DINING */}
      <section className="md-dining">
        <div className="md-dining-img" />
        <div className="md-dining-info">
          <h2>The Joy of Curated Dining</h2>
          <p className="md-dining-quote">"Healing the immune system from the inside out."</p>
          <h4>OUR APPROACH</h4>
          <p>Learn how to incorporate a range of dishes that go far beyond simple substitutes, embracing seasonal whole-food alternatives that nourish every aspect of you.</p>
          <p><strong>Spelt, mustard greens, garlic, and a touch of cold-pressed olive oil — every meal must be a celebration of the heart of our culture.</strong></p>
          <a href="#" className="md-link">Explore Our Recipe Index →</a>
        </div>
      </section>

      {/* IMMUNE */}
      <section className="md-immune">
        <div className="md-immune-card">
          <h3>The Immune Response</h3>
          <p>Coeliac disease is the result of a body's own immune response. When the body produces gluten, the small intestine produces fewer enzymes and tissue. This results in a chronic spike to the bloodstream that disturbs absorption (around 1 in 100 people in the UK).</p>
          <p>Therefore, this leads to a range of nutritional deficiencies that — if untreated — may contribute to other autoimmune conditions and complications.</p>
        </div>
        <div className="md-immune-list">
          <div><strong>STAGE 1: PRESENTATION</strong><p>Most patients exhibit a mild form of the disease at first.</p></div>
          <div><strong>CO-OPERATION</strong><p>The body develops sensitivity over time, with autoimmune flare-ups during the gluten exposure.</p></div>
          <div><strong>RECOVERY</strong><p>Intestine heals progressively when a strict gluten-free protocol is upheld.</p></div>
        </div>
      </section>

      {/* VIDEO BANNER */}
      <section className="md-video">
        <div className="md-video-img" />
        <button className="md-play" aria-label="Play">▶</button>
      </section>

      {/* EXPERT CONTENT */}
      <section className="md-expert-content">
        <div className="md-expert-heading">
          <div>
            <div className="md-eyebrow">AVIS DES EXPERTS</div>
            <h2>Articles, videos et conseils nutritionnels</h2>
          </div>
          <p>Les contenus publies par les experts apparaissent ici automatiquement.</p>
        </div>

        {expertLoading && <p className="md-expert-state">Chargement du contenu...</p>}
        {expertError && <p className="md-expert-state">{expertError}</p>}
        {!expertLoading && !expertError && expertContent.length === 0 && (
          <p className="md-expert-state">Aucun contenu expert publie pour le moment.</p>
        )}

        {expertContent.length > 0 && (
          <div className="md-expert-grid">
            {expertContent.map((content) => (
              <article key={content._id} className="md-expert-card">
                <div className="md-expert-meta">
                  <span>{content.type}</span>
                  {content.createdAt && <span>{new Date(content.createdAt).toLocaleDateString()}</span>}
                </div>

                <h3>{content.title}</h3>
                <p className="md-expert-summary">{content.summary}</p>
                <p>{content.body}</p>

                {content.mediaUrl && (
                  <a href={content.mediaUrl} target="_blank" rel="noreferrer" className="md-expert-link">
                    Ouvrir la ressource
                  </a>
                )}

                <footer className="md-expert-author">
                  {content.expert?.expertProfile?.image && (
                    <img src={content.expert.expertProfile.image} alt={content.expert.name} />
                  )}
                  <div>
                    <strong>{content.expert?.name}</strong>
                    <span>{content.expert?.expertProfile?.specialty || "Expert"}</span>
                    {content.expert?.expertProfile?.bio && <p>{content.expert.expertProfile.bio}</p>}
                  </div>
                </footer>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* RESOURCES */}
      <section className="md-resources">
        <h2>Resources for the Journey</h2>
        <p className="md-resources-sub">You are never alone on this. Our toolkit includes:</p>
        <div className="md-resources-grid">
          {RESOURCES.map((r) => (
            <div key={r.title} className="md-resource-card">
              <div className="md-resource-icon">{r.icon}</div>
              <h3>{r.title}</h3>
              <p>{r.desc}</p>
              <a href="#" className="md-resource-cta">{r.cta}</a>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
