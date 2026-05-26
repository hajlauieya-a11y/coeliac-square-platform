import crypto from "crypto";
import Event from "../models/Event.js";
import EventTicket from "../models/EventTicket.js";

const getAvailableSeats = async (eventId, capacity) => {
  const reservedCount = await EventTicket.countDocuments({
    event: eventId,
    status: { $ne: "cancelled" },
  });

  return Math.max(capacity - reservedCount, 0);
};

const formatEvent = async (event) => {
  const obj = event.toObject ? event.toObject() : event;
  const availableSeats = await getAvailableSeats(obj._id, obj.capacity);

  return {
    ...obj,
    availableSeats,
    isSoldOut: availableSeats <= 0,
  };
};

export const getEvents = async (req, res) => {
  try {
    const { category, search } = req.query;
    const query = { isActive: true };

    if (category && category !== "TOUS") {
      query.category = category;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { location: { $regex: search, $options: "i" } },
      ];
    }

    const events = await Event.find(query).sort({ startsAt: 1 });
    const formattedEvents = await Promise.all(events.map(formatEvent));

    res.json(formattedEvents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getFeaturedEvent = async (req, res) => {
  try {
    const event = await Event.findOne({ isActive: true, isFeatured: true }).sort({
      startsAt: 1,
    });

    if (!event) {
      return res.status(404).json({ message: "Featured event not found" });
    }

    res.json(await formatEvent(event));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event || !event.isActive) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json(await formatEvent(event));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createEvent = async (req, res) => {
  try {
    const event = await Event.create(req.body);
    res.status(201).json(await formatEvent(event));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json(await formatEvent(event));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json({ message: "Event deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const reserveTicket = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event || !event.isActive) {
      return res.status(404).json({ message: "Event not found" });
    }

    if (new Date(event.startsAt) < new Date()) {
      return res.status(400).json({ message: "This event has already started" });
    }

    const existingTicket = await EventTicket.findOne({
      event: event._id,
      user: req.user._id,
      status: { $ne: "cancelled" },
    });

    if (existingTicket) {
      return res.status(400).json({ message: "You already have a ticket for this event" });
    }

    const availableSeats = await getAvailableSeats(event._id, event.capacity);

    if (availableSeats <= 0) {
      return res.status(400).json({ message: "Event is sold out" });
    }

    const ticket = await EventTicket.create({
      event: event._id,
      user: req.user._id,
      ticketCode: crypto.randomBytes(12).toString("hex").toUpperCase(),
    });

    const populatedTicket = await EventTicket.findById(ticket._id)
      .populate("event")
      .populate("user", "name email");

    res.status(201).json(populatedTicket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyTickets = async (req, res) => {
  try {
    const tickets = await EventTicket.find({ user: req.user._id })
      .populate("event")
      .sort({ createdAt: -1 });

    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const cancelMyTicket = async (req, res) => {
  try {
    const ticket = await EventTicket.findOne({
      _id: req.params.ticketId,
      user: req.user._id,
    }).populate("event");

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    if (ticket.status === "cancelled") {
      return res.status(400).json({ message: "Ticket is already cancelled" });
    }

    if (ticket.event?.startsAt && new Date(ticket.event.startsAt) < new Date()) {
      return res.status(400).json({ message: "You cannot cancel a ticket after the event starts" });
    }

    ticket.status = "cancelled";
    await ticket.save();

    res.json({ message: "Ticket cancelled", ticket });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getEventTickets = async (req, res) => {
  try {
    const tickets = await EventTicket.find({ event: req.params.id })
      .populate("user", "name email")
      .populate("event")
      .sort({ createdAt: -1 });

    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
