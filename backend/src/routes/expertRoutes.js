import express from "express";
import { allowRoles, protect } from "../middleware/authMiddleware.js";
import {
  createExpertContent,
  deleteExpertContent,
  getExpertProfile,
  getMyExpertContent,
  getPublishedExpertContent,
  updateExpertContent,
  updateExpertProfile,
} from "../controllers/expertController.js";

const router = express.Router();

router.get("/contents", getPublishedExpertContent);
router.get("/contents/mine", protect, allowRoles("expert"), getMyExpertContent);
router.post("/contents", protect, allowRoles("expert"), createExpertContent);
router.patch("/contents/:id", protect, allowRoles("expert"), updateExpertContent);
router.delete("/contents/:id", protect, allowRoles("expert"), deleteExpertContent);

router.get("/profile", protect, allowRoles("expert"), getExpertProfile);
router.patch("/profile", protect, allowRoles("expert"), updateExpertProfile);

export default router;
