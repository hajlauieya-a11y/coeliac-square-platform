import React, { useEffect, useState } from "react";
import Header from "../../shared/components/layout/Header";
import Footer from "../../shared/components/layout/Footer";
import { useToast } from "../../shared/components/ui/ToastContext";
import { getWorkshops, registerWorkshop } from "../services/workshop.service";
import "../index.css";

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

export default function Workshop() {
  const [workshops, setWorkshops] = useState([]);
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    getWorkshops()
      .then((res) => {
        setWorkshops(res.data);
        setSelectedWorkshop(res.data[0] || null);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const handleRegister = async (workshopId) => {
    try {
      const res = await registerWorkshop(workshopId);
      showToast({
        title: "Workshop secured",
        message: `Registration code: ${res.data.registrationCode}`,
        type: "success",
      });

      const refreshed = await getWorkshops();
      setWorkshops(refreshed.data);
      setSelectedWorkshop((prev) =>
        refreshed.data.find((item) => item._id === prev?._id) || refreshed.data[0] || null
      );
    } catch (err) {
      showToast({
        title: "Registration failed",
        message: err.response?.data?.message || "Could not secure this workshop.",
        type: "error",
      });
    }
  };

  if (loading) {
    return (
      <div className="wk-page">
        <Header />
        <div style={{ padding: 60 }}>Loading workshops...</div>
        <Footer />
      </div>
    );
  }

  if (!selectedWorkshop) {
    return (
      <div className="wk-page">
        <Header />
        <div style={{ padding: 60 }}>No workshops available.</div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="wk-page">
      <Header />

      <section
        className="wk-detail-hero"
        style={
          selectedWorkshop.image
            ? {
                backgroundImage: `linear-gradient(180deg, rgba(255,255,255,0.4), rgba(0,0,0,0.2)), url(${selectedWorkshop.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }
            : undefined
        }
      >
        <span className="wk-eyebrow">EXPERIENCE MASTERCLASS</span>
        <h1>{selectedWorkshop.title}</h1>
        <div className="wk-detail-meta">
          <div>
            <small>DATE & HEURE</small>
            <p>{formatDate(selectedWorkshop.startsAt)} - {formatTime(selectedWorkshop.startsAt)}</p>
          </div>
          <div>
            <small>LIEU</small>
            <p>{selectedWorkshop.isOnline ? "En ligne" : selectedWorkshop.location}</p>
          </div>
        </div>
      </section>

      <section className="wk-detail-intro">
        <div>
          <h3>{selectedWorkshop.title}</h3>
          <p>{selectedWorkshop.description}</p>
        </div>
        <aside className="wk-detail-intro-card">
          <h5>CURATED TECHNIQUES</h5>
          <ul>
            {(selectedWorkshop.techniques || []).map((technique) => (
              <li key={technique}>{technique}</li>
            ))}
          </ul>
        </aside>
      </section>

      <section className="wk-curator">
        <div className="wk-curator-img" />
        <div className="wk-curator-text">
          <small>THE CURATOR</small>
          <h2>{selectedWorkshop.formateur?.name || "Votre formateur"}</h2>
          <p>{selectedWorkshop.formateur?.email || "Expert en formation sans gluten."}</p>
        </div>
      </section>

      <section className="wk-itinerary-wrap">
        <div className="wk-itinerary">
          <h3>Available Formations</h3>
          {workshops.map((workshop) => (
            <button
              key={workshop._id}
              className={`wk-workshop-option ${selectedWorkshop._id === workshop._id ? "active" : ""}`}
              onClick={() => setSelectedWorkshop(workshop)}
            >
              <strong>{workshop.title}</strong>
              <span>{formatDate(workshop.startsAt)} - {workshop.availableSeats}/{workshop.capacity} seats</span>
            </button>
          ))}
        </div>

        <aside className="wk-included">
          <h3>What's Included</h3>
          {(selectedWorkshop.included || []).map((item) => (
            <div key={item} className="wk-included-item">
              <span className="ic">+</span>
              <div>
                <h5>{item}</h5>
              </div>
            </div>
          ))}
          <div className="wk-included-price">
            <small>INVESTMENT</small>
            <h2>{selectedWorkshop.price} {selectedWorkshop.currency}</h2>
          </div>
        </aside>
      </section>

      <section className="wk-register">
        <form className="wk-register-form" onSubmit={(e) => e.preventDefault()}>
          <h3>Secure Your Place</h3>
          <p>Limited seats for an intimate experience.</p>
          <button
            type="button"
            disabled={selectedWorkshop.isSoldOut}
            onClick={() => handleRegister(selectedWorkshop._id)}
          >
            {selectedWorkshop.isSoldOut ? "WORKSHOP FULL" : "FINALIZE REGISTRATION"}
          </button>
          <small>
            {selectedWorkshop.availableSeats} SEATS REMAINING FOR THIS DATE
          </small>
        </form>
        <div className="wk-studio">
          <h3>The Studio</h3>
          <p>{selectedWorkshop.isOnline ? "Online workshop" : selectedWorkshop.location}</p>
          <div className="wk-studio-map" />
        </div>
      </section>

      <Footer />
    </div>
  );
}
