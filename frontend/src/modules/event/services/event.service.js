import API from "../../api";

export const getEvents = ({ category, search } = {}) => {
  const params = {};

  if (category && category !== "TOUS") {
    params.category = category;
  }

  if (search) {
    params.search = search;
  }

  return API.get("/events", { params });
};

export const getFeaturedEvent = () => {
  return API.get("/events/featured");
};

export const getEventById = (id) => {
  return API.get(`/events/${id}`);
};

export const createEvent = (eventData) => {
  return API.post("/events", eventData);
};

export const updateEvent = (id, eventData) => {
  return API.patch(`/events/${id}`, eventData);
};

export const deleteEvent = (id) => {
  return API.delete(`/events/${id}`);
};

export const reserveEventTicket = (id) => {
  return API.post(`/events/${id}/tickets`);
};

export const getMyEventTickets = () => {
  return API.get("/events/my-tickets");
};

export const cancelMyEventTicket = (ticketId) => {
  return API.patch(`/events/my-tickets/${ticketId}/cancel`);
};

export const getEventTickets = (id) => {
  return API.get(`/events/${id}/tickets`);
};
