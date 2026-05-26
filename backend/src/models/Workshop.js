import mongoose from "mongoose";

const workshopSchema = new mongoose.Schema(
  {
    formateur: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    image: { type: String, default: "" },
    category: {
      type: String,
      enum: ["BAKERY", "COOKING", "NUTRITION", "WELLNESS", "OTHER"],
      default: "OTHER",
    },
    location: { type: String, required: true },
    isOnline: { type: Boolean, default: false },
    startsAt: { type: Date, required: true },
    endsAt: { type: Date },
    capacity: { type: Number, required: true, min: 1 },
    price: { type: Number, default: 0, min: 0 },
    currency: { type: String, default: "DT" },
    techniques: [{ type: String, trim: true }],
    included: [{ type: String, trim: true }],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Workshop", workshopSchema);
