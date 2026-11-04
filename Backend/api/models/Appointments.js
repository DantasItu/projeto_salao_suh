import mongoose from "mongoose";

const appointmentsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  serviceId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "services",
  },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  professionalId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  start: { type: Date, required: true },
  end: { type: Date, required: true },
});

export default mongoose.model("Appointment", appointmentsSchema);
