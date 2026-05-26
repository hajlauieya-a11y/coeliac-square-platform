import mongoose from "mongoose";

const eventTicketSchema = new mongoose.Schema(
  {
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    ticketCode: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: String,
      enum: ["active", "cancelled", "checked_in"],
      default: "active",
    },
  },
  { timestamps: true }
);

eventTicketSchema.index({ event: 1, user: 1 }, { unique: true });

export default mongoose.model("EventTicket", eventTicketSchema);
