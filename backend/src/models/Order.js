import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  contact: {
    email: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true }
  },
  shippingAddress: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    postcode: { type: String, required: true }
  },
  deliveryMethod: {
    type: String,
    enum: ["standard", "express"],
    default: "standard"
  },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
      },
      seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },
      name: String,
      price: Number,
      qty: Number,
      image: String,
      vendorStatus: {
        type: String,
        enum: ["pending", "confirmed", "refused"],
        default: "pending"
      }
    }
  ],
  subtotal: { type: Number, required: true },
  shippingCost: { type: Number, required: true },
  taxes: { type: Number, required: true },
  total: { type: Number, required: true },
  status: {
    type: String,
    enum: ["pending", "paid", "shipped", "cancelled"],
    default: "pending"
  }
}, { timestamps: true });

export default mongoose.model("Order", orderSchema);
