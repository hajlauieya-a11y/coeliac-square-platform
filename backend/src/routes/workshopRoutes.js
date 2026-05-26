import express from "express";
import { allowRoles, protect } from "../middleware/authMiddleware.js";
import {
  cancelMyWorkshopRegistration,
  createWorkshop,
  deleteWorkshop,
  getFormateurWorkshops,
  getMyWorkshopRegistrations,
  getWorkshopById,
  getWorkshopRegistrations,
  getWorkshops,
  registerWorkshop,
  updateWorkshop,
} from "../controllers/workshopController.js";

const router = express.Router();

router.get("/", getWorkshops);
router.get("/formateur/mine", protect, allowRoles("formateur"), getFormateurWorkshops);
router.get("/my-registrations", protect, getMyWorkshopRegistrations);
router.patch("/my-registrations/:registrationId/cancel", protect, cancelMyWorkshopRegistration);
router.get("/:id", getWorkshopById);
router.post("/", protect, allowRoles("formateur"), createWorkshop);
router.patch("/:id", protect, allowRoles("formateur"), updateWorkshop);
router.delete("/:id", protect, allowRoles("formateur"), deleteWorkshop);
router.post("/:id/register", protect, registerWorkshop);
router.get("/:id/registrations", protect, allowRoles("formateur"), getWorkshopRegistrations);

export default router;
