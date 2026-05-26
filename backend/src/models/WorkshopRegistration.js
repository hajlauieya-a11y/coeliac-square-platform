import mongoose from "mongoose";

const workshopRegistrationSchema = new mongoose.Schema(
  {
    workshop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Workshop",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    registrationCode: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: String,
      enum: ["active", "cancelled", "attended"],
      default: "active",
    },
  },
  { timestamps: true }
);

workshopRegistrationSchema.index({ workshop: 1, user: 1 }, { unique: true });

export default mongoose.model("WorkshopRegistration", workshopRegistrationSchema);
