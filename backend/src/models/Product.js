import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  seller: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  currency: { type: String, default: "DT" },
  category: {
    type: String,
    enum: ["SNACKS", "TREATS", "BREAKFAST", "PASTRIES"],
    required: true
  },
  image: { type: String, default: "" },
  weight: { type: String, default: "" },
  variant: { type: String, default: "GLUTEN-FREE" },
  stock: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model("Product", productSchema);
