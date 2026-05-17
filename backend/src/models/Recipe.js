import mongoose from "mongoose";

const ingredientSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    qty: { type: String, required: true, trim: true },
  },
  { _id: false }
);

const stepSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    text: { type: String, required: true },
    image: { type: String, default: "" },
  },
  { _id: false }
);

const recipeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    image: { type: String, default: "" },
    badge: { type: String, default: "" },
    imageBadge: { type: String, default: "" },
    time: { type: String, required: true },
    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced", "Expert"],
      default: "Beginner",
    },
    servings: { type: String, default: "" },
    profile: { type: String, default: "Gluten-Free" },
    category: { type: String, default: "Bakery", trim: true },
    filters: [{ type: String, trim: true }],
    ingredients: [ingredientSchema],
    steps: [stepSchema],
    tip: { type: String, default: "" },
    isFeatured: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Recipe", recipeSchema);
