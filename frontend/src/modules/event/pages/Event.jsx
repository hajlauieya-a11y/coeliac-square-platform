import React, { useEffect, useState } from "react";
import Header from "../../shared/components/layout/Header";
import Footer from "../../shared/components/layout/Footer";
import {
  getEvents,
  getFeaturedEvent,
  reserveEventTicket,
} from "../services/event.service";
import { useToast } from "../../shared/components/ui/ToastContext";
import "../index.css";

const filters = [
  { label: "TOUS", value: "TOUS" },
  { label: "CUISINE", value: "CUISINE" },
  { label: "MEDICAL", value: "MEDICAL" },
  { label: "BIEN-ETRE", value: "BIEN-ETRE" },
  { label: "CONFERENCES", value: "CONFERENCES" },
];

const formatDate = (date) =>
  new Date(date).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

const formatTime = (date) =>
  new Date(date).toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  });

export default function Event() {
  const [events, setEvents] = useState([]);
  const [featuredEvent, setFeaturedEvent] = useState(null);
  const [activeFilter, setActiveFilter] = useState("TOUS");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const { showToast } = useToast();

  useEffect(() => {
    setLoading(true);

    getEvents({ category: activeFilter })
      .then((res) => {
        setEvents(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.response?.data?.message || "Could not load events.");
        setLoading(false);
      });
  }, [activeFilter]);

  useEffect(() => {
    getFeaturedEvent()
      .then((res) => setFeaturedEvent(res.data))
      .catch(() => setFeaturedEvent(null));
  }, []);

  const handleReserve = async (eventId) => {
    setMessage("");
    setError("");

    try {
      const res = await reserveEventTicket(eventId);
      const successMessage = `Ticket code: ${res.data.ticketCode}`;
      setMessage(`Ticket reserved. ${successMessage}`);
      showToast({
        title: "Ticket reserved",
        message: successMessage,
        type: "success",
      });

      const refreshed = await getEvents({ category: activeFilter });
      setEvents(refreshed.data);

      if (featuredEvent?._id === eventId) {
        const featured = await getFeaturedEvent();
        setFeaturedEvent(featured.data);
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Could not reserve ticket.";
      setError(errorMessage);
      showToast({
        title: "Reservation failed",
        message: errorMessage,
        type: "error",
      });
    }
  };

  const heroEvent = featuredEvent || events[0];

  return (
    <div className="evt-page">
      <Header />

      <section className="evt-hero">
        <span className="evt-hero-badge">SAISON 2026</span>
        <h1>Experiences &<br />Ateliers</h1>
        <p>
          L'art de vivre sans compromis. Rejoignez notre cercle de passionnes pour
          des moments d'apprentissage et de partage d'exception.
        </p>
      </section>

      <div className="evt-filters">
        {filters.map((filter) => (
          <button
            key={filter.value}
            className={`evt-filter ${activeFilter === filter.value ? "active" : ""}`}
            onClick={() => setActiveFilter(filter.value)}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {message && <div className="evt-message success">{message}</div>}
      {error && <div className="evt-message error">{error}</div>}

      {heroEvent && (
        <section className="evt-featured">
          <div className="evt-featured-img-wrap">
            <div
              className="evt-featured-img"
              style={
                heroEvent.image
                  ? {
                      backgroundImage: `url(${heroEvent.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }
                  : undefined
              }
            />
            <div className="evt-featured-date">
              <div className="evt-eyebrow-mini">PROCHAIN EVENEMENT</div>
              <h4>{formatDate(heroEvent.startsAt)}</h4>
              <p>{heroEvent.description}</p>
              <div className="evt-loc">
                {heroEvent.isOnline ? "En ligne" : heroEvent.location}
              </div>
            </div>
          </div>

          <div className="evt-featured-text">
            <div className="evt-eyebrow">- {heroEvent.tag || heroEvent.category}</div>
            <h2>{heroEvent.title}</h2>
            <p>{heroEvent.description}</p>
            <p>
              {heroEvent.availableSeats} place{heroEvent.availableSeats === 1 ? "" : "s"} disponible
              {heroEvent.availableSeats === 1 ? "" : "s"}
            </p>
            <button
              className="evt-btn-dark"
              disabled={heroEvent.isSoldOut}
              onClick={() => handleReserve(heroEvent._id)}
            >
              {heroEvent.isSoldOut ? "Complet" : "Reserver ma place"}
            </button>
          </div>
        </section>
      )}

      <section className="evt-calendar">
        <div className="evt-calendar-head">
          <div>
            <h2>Calendrier des Evenements</h2>
            <p>Explorez nos prochaines retraites, diners et conferences exclusives.</p>
          </div>
        </div>

        {loading ? (
          <p>Loading events...</p>
        ) : events.length === 0 ? (
          <p>No events found.</p>
        ) : (
          <div className="evt-calendar-grid">
            {events.map((event) => (
              <div key={event._id} className="evt-card">
                <div
                  className="evt-card-img"
                  style={
                    event.image
                      ? {
                          backgroundImage: `url(${event.image})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }
                      : undefined
                  }
                >
                  <span className="evt-card-tag">{event.tag || event.category}</span>
                </div>
                <div className="evt-card-body">
                  <h4>{event.title}</h4>
                  <p>{event.description}</p>
                  <div className="evt-card-meta">
                    <span>{formatDate(event.startsAt)}</span>
                    <span>{formatTime(event.startsAt)}</span>
                    <span>{event.isOnline ? "En ligne" : event.location}</span>
                  </div>
                  <button
                    className="evt-card-btn"
                    disabled={event.isSoldOut}
                    onClick={() => handleReserve(event._id)}
                  >
                    {event.isSoldOut ? "Complet" : "Reserver"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="evt-quote">
        <div className="evt-quote-mark">"</div>
        <p>
          "Ces ateliers ne sont pas seulement des cours de cuisine, ce sont des moments
          ou l'on cesse de se sentir different pour simplement savourer l'instant."
        </p>
        <div className="evt-quote-author">
          <div className="evt-quote-avatar" />
          <span>SONIA NASRI</span>
          <small>Membre depuis 2021</small>
        </div>
      </section>

      <section className="evt-newsletter">
        <h2>Ne manquez aucun<br />evenement</h2>
        <p>Soyez les premiers informes de nos prochains ateliers, conferences et masterclasses privees.</p>
        <form className="evt-newsletter-form" onSubmit={(e) => e.preventDefault()}>
          <input type="email" placeholder="votre@email.com" />
          <button type="submit">S'inscrire</button>
        </form>
        <small>EN VOUS INSCRIVANT VOUS ACCEPTEZ NOTRE POLITIQUE DE CONFIDENTIALITE</small>
      </section>

      <Footer />
    </div>
  );
}
