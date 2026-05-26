import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    category: {
      type: String,
      enum: ["CUISINE", "MEDICAL", "BIEN-ETRE", "CONFERENCES", "AUTRE"],
      default: "AUTRE",
    },
    tag: { type: String, default: "" },
    image: { type: String, default: "" },
    location: { type: String, required: true },
    isOnline: { type: Boolean, default: false },
    startsAt: { type: Date, required: true },
    endsAt: { type: Date },
    capacity: { type: Number, required: true, min: 1 },
    price: { type: Number, default: 0, min: 0 },
    currency: { type: String, default: "DT" },
    isFeatured: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Event", eventSchema);
