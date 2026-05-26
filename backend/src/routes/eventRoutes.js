import express from "express";
import { allowRoles, protect } from "../middleware/authMiddleware.js";
import {
  cancelMyTicket,
  createEvent,
  deleteEvent,
  getEventById,
  getEventTickets,
  getEvents,
  getFeaturedEvent,
  getMyTickets,
  reserveTicket,
  updateEvent,
} from "../controllers/eventController.js";

const router = express.Router();

router.get("/", getEvents);
router.get("/featured", getFeaturedEvent);
router.get("/my-tickets", protect, getMyTickets);
router.patch("/my-tickets/:ticketId/cancel", protect, cancelMyTicket);
router.get("/:id", getEventById);
router.post("/", protect, allowRoles("admin"), createEvent);
router.patch("/:id", protect, allowRoles("admin"), updateEvent);
router.delete("/:id", protect, allowRoles("admin"), deleteEvent);
router.post("/:id/tickets", protect, reserveTicket);
router.get("/:id/tickets", protect, allowRoles("admin"), getEventTickets);

export default router;
