import express from "express";
import { allowRoles, protect } from "../middleware/authMiddleware.js";
import {
  createRecipe,
  deleteRecipe,
  getFeaturedRecipe,
  getRecipeById,
  getRecipes,
  updateRecipe,
} from "../controllers/recipeController.js";

const router = express.Router();

router.get("/", getRecipes);
router.get("/featured", getFeaturedRecipe);
router.get("/:id", getRecipeById);
router.post("/", protect, allowRoles("admin"), createRecipe);
router.patch("/:id", protect, allowRoles("admin"), updateRecipe);
router.delete("/:id", protect, allowRoles("admin"), deleteRecipe);

export default router;
