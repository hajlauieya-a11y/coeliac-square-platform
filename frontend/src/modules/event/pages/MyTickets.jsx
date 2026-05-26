import React, { useEffect, useState } from "react";
import Header from "../../shared/components/layout/Header";
import Footer from "../../shared/components/layout/Footer";
import { cancelMyEventTicket, getMyEventTickets } from "../services/event.service";
import {
  cancelMyWorkshopRegistration,
  getMyWorkshopRegistrations,
} from "../../workshop/services/workshop.service";
import { useToast } from "../../shared/components/ui/ToastContext";
import "./tickets.css";

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

export default function MyTickets() {
  const [tickets, setTickets] = useState([]);
  const [workshopRegistrations, setWorkshopRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { showToast } = useToast();

  useEffect(() => {
    Promise.all([getMyEventTickets(), getMyWorkshopRegistrations()])
      .then(([ticketRes, workshopRes]) => {
        setTickets(ticketRes.data);
        setWorkshopRegistrations(workshopRes.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.response?.data?.message || "Could not load tickets.");
        setLoading(false);
      });
  }, []);

  const cancelTicket = async (ticketId) => {
    const confirmed = window.confirm("Cancel this ticket reservation?");
    if (!confirmed) return;

    try {
      const res = await cancelMyEventTicket(ticketId);
      setTickets((prev) =>
        prev.map((ticket) =>
          ticket._id === ticketId ? { ...ticket, status: res.data.ticket.status } : ticket
        )
      );
      showToast({
        title: "Ticket cancelled",
        message: "Your reservation has been cancelled.",
        type: "success",
      });
    } catch (err) {
      const message = err.response?.data?.message || "Could not cancel ticket.";
      setError(message);
      showToast({
        title: "Cancellation failed",
        message,
        type: "error",
      });
    }
  };

  const cancelWorkshopRegistration = async (registrationId) => {
    const confirmed = window.confirm("Cancel this workshop registration?");
    if (!confirmed) return;

    try {
      const res = await cancelMyWorkshopRegistration(registrationId);
      setWorkshopRegistrations((prev) =>
        prev.map((registration) =>
          registration._id === registrationId
            ? { ...registration, status: res.data.registration.status }
            : registration
        )
      );
      showToast({
        title: "Workshop cancelled",
        message: "Your registration has been cancelled.",
        type: "success",
      });
    } catch (err) {
      const message = err.response?.data?.message || "Could not cancel workshop registration.";
      setError(message);
      showToast({
        title: "Cancellation failed",
        message,
        type: "error",
      });
    }
  };

  const hasItems = tickets.length > 0 || workshopRegistrations.length > 0;

  return (
    <div className="evt-page">
      <Header />

      <main className="tickets-page">
        <div className="tickets-shell">
          <div className="tickets-head">
            <span>Event Access</span>
            <h1>My Tickets</h1>
            <p>Your reserved event tickets and secure ticket codes.</p>
          </div>

          {error && <div className="tickets-message error">{error}</div>}

          {loading ? (
            <p>Loading tickets...</p>
          ) : !hasItems ? (
            <section className="tickets-empty">
              <h2>No tickets yet</h2>
              <p>Reserve a place for an event or workshop and it will appear here.</p>
            </section>
          ) : (
            <div className="tickets-grid">
              {workshopRegistrations.map((registration) => (
                <article key={registration._id} className="ticket-card">
                  <div className="ticket-card-top">
                    <span className={`ticket-status ticket-status-${registration.status}`}>
                      workshop - {registration.status}
                    </span>
                    <strong>{registration.registrationCode}</strong>
                  </div>

                  <h2>{registration.workshop?.title}</h2>
                  <p>{registration.workshop?.description}</p>

                  <div className="ticket-meta">
                    <span>{registration.workshop?.startsAt && formatDate(registration.workshop.startsAt)}</span>
                    <span>{registration.workshop?.startsAt && formatTime(registration.workshop.startsAt)}</span>
                    <span>{registration.workshop?.isOnline ? "En ligne" : registration.workshop?.location}</span>
                  </div>

                  {registration.status === "active" && (
                    <button
                      className="ticket-cancel-btn"
                      onClick={() => cancelWorkshopRegistration(registration._id)}
                    >
                      Cancel Registration
                    </button>
                  )}
                </article>
              ))}

              {tickets.map((ticket) => (
                <article key={ticket._id} className="ticket-card">
                  <div className="ticket-card-top">
                    <span className={`ticket-status ticket-status-${ticket.status}`}>
                      event - {ticket.status}
                    </span>
                    <strong>{ticket.ticketCode}</strong>
                  </div>

                  <h2>{ticket.event?.title}</h2>
                  <p>{ticket.event?.description}</p>

                  <div className="ticket-meta">
                    <span>{ticket.event?.startsAt && formatDate(ticket.event.startsAt)}</span>
                    <span>{ticket.event?.startsAt && formatTime(ticket.event.startsAt)}</span>
                    <span>{ticket.event?.isOnline ? "En ligne" : ticket.event?.location}</span>
                  </div>

                  {ticket.status === "active" && (
                    <button
                      className="ticket-cancel-btn"
                      onClick={() => cancelTicket(ticket._id)}
                    >
                      Cancel Reservation
                    </button>
                  )}
                </article>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
